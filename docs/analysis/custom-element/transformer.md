<script setup>
import { getClientRectDemo, manualResizeDemo, manualRotateDemo, fullTransformerDemo } from "./codes/transformer";
</script>

# 手动形变（Transformer）的实现

`Konva.Transformer` 是封装好的形变工具，但在理解其工作原理后，也可以用基础 API 手动实现同等功能。本文拆解三个核心机制：**包围盒计算**、**调整尺寸**、**旋转**，并通过可交互演示加以验证。

## Konva.Transformer 的结构

`Konva.Transformer` 本质上是一个特殊的 `Konva.Group`，包含：

- **8 个尺寸锚点**：4 个角 + 4 条边的中点，用于拖拽调整尺寸
- **1 个旋转手柄**：默认位于节点正上方，拖拽以改变旋转角
- **1 个边框矩形**：用于展示选中区域的视觉边界

调用 `tr.nodes([shape])` 时，Transformer 会：

1. 调用 `shape.getClientRect()` 计算节点在 Stage 坐标系下的**轴对齐包围盒**
2. 将自身（Group）的位置、宽高对齐到包围盒
3. 在包围盒四周放置锚点和旋转手柄
4. 监听锚点的 `dragmove` 事件，实时更新被绑定节点的 `scaleX`、`scaleY`、`rotation`

```
Transformer (Group)
  ├─ 边框矩形
  ├─ 角点锚点 ×4
  ├─ 边中点锚点 ×4
  └─ 旋转手柄 ×1
```

## getClientRect() — 轴对齐包围盒

`node.getClientRect()` 返回节点在 **Stage 坐标系**下的轴对齐包围盒（AABB），格式为 `{ x, y, width, height }`。

对于旋转的矩形，包围盒的尺寸**大于**节点本身——Konva 通过将 4 个角点经过完整变换后取最大/最小 x、y 来计算：

```js
// 伪代码
function getClientRect(node) {
  const transform = node.getAbsoluteTransform();
  const corners = [
    { x: 0,         y: 0          },
    { x: node.width(), y: 0       },
    { x: node.width(), y: node.height() },
    { x: 0,         y: node.height() },
  ];
  const pts = corners.map(p => transform.point(p)); // 变换到 Stage 坐标
  return {
    x:      Math.min(...pts.map(p => p.x)),
    y:      Math.min(...pts.map(p => p.y)),
    width:  Math.max(...pts.map(p => p.x)) - Math.min(...pts.map(p => p.x)),
    height: Math.max(...pts.map(p => p.y)) - Math.min(...pts.map(p => p.y)),
  };
}
```

调整旋转角度，观察红色虚线包围盒的变化——旋转 45° 时包围盒面积最大（约为原始面积的 `(w+h)²/2wh` 倍）：

<KShape :afterMounted="getClientRectDemo" :width="460" :height="250" />

> `getClientRect()` 还接受 `{ skipTransform: true }` 参数，此时忽略变换直接返回节点局部坐标的矩形，常用于布局计算。

## 核心一：调整尺寸的算法

### 关键约束：对角固定

拖拽某个角点调整尺寸时，**对角角点**的位置保持不动。以拖拽右下角（SE）为例：

```
初始状态：
  NW(固定) ─────── NE
     │                │
     SW ──────── SE(拖拽)

拖拽后：
  NW(固定) ──────────── NE
     │                     │
     SW ──────────── SE(新位置)
```

设 SE 手柄当前位置为 `(hx, hy)`，固定角 NW 位置为 `(anchX, anchY)`，则：

```js
// 视觉宽高 = 手柄坐标 - 对角坐标
let newW = hx - anchX;  // SE 时 newW > 0
let newH = hy - anchY;  // SE 时 newH > 0

// 根据 newW/newH 的符号确定矩形左上角位置
const newX = newW >= 0 ? anchX : hx;
const newY = newH >= 0 ? anchY : hy;
newW = Math.abs(newW);
newH = Math.abs(newH);

// 用 scaleX/scaleY 表达新尺寸，保持 width/height 不变
rect.setAttrs({
  x: newX, y: newY,
  scaleX: newW / originalWidth,
  scaleY: newH / originalHeight,
});
```

同一套公式对 4 个角点均适用：`newW = hx - anchX` 在 NW 拖拽时为负值，`Math.abs` 处理后得到正确的宽度，符号位也正确确定了矩形左上角。

### 为什么改 scaleX/scaleY 而不改 width/height

`Konva.Transformer` 故意如此设计：`width`/`height` 是**原始属性**，`scaleX`/`scaleY` 是**倍率**。在形变期间保持 `width`/`height` 不变，只调整 `scaleX`/`scaleY`，方便在形变结束后通过以下代码将缩放"烘焙"回尺寸：

```js
// transformend 回调中归一化尺寸
const scaleX = node.scaleX();
node.width(node.width() * scaleX);
node.scaleX(1);  // 还原 scale，尺寸已写入 width
```

下面演示中，4 个角点均可拖拽调整尺寸，底部实时显示 `scaleX`/`scaleY` 和视觉像素尺寸：

<KShape :afterMounted="manualResizeDemo" :width="460" :height="250" />

## 核心二：旋转的算法

### 手柄的世界坐标

旋转手柄固定在节点的**局部正上方**，即局部坐标 `(0, -d)`（d 为手柄到旋转中心的距离）。将这个局部点转换为世界坐标：

```js
// 旋转矩阵（顺时针 θ 度）将局部点 (lx, ly) 映射到世界偏移 (dx, dy)：
// dx = cos(θ)·lx - sin(θ)·ly
// dy = sin(θ)·lx + cos(θ)·ly
//
// 代入 (lx=0, ly=-d)：
const rad = rotation * Math.PI / 180;
const hx = cx + Math.sin(rad) * d;   // cos(rad)·0 - sin(rad)·(-d)
const hy = cy - Math.cos(rad) * d;   // sin(rad)·0 + cos(rad)·(-d)
```

验证：`rotation=0` 时 `hx=cx, hy=cy-d`（正上方） ✓；`rotation=90°` 时 `hx=cx+d, hy=cy`（正右方） ✓

### 从手柄位置反推旋转角

拖拽手柄后，已知中心 `(cx, cy)` 和手柄新位置 `(hx, hy)`，反推旋转角：

```
sin(θ) = (hx - cx) / d      →  ①
cos(θ) = -(hy - cy) / d     →  ②
```

由 ①② 得：

```js
const angle = Math.atan2(hx - cx, -(hy - cy)) * 180 / Math.PI;
//            atan2(sin(θ)·d, cos(θ)·d) = atan2(sin(θ), cos(θ)) = θ
```

`atan2(y, x)` 的入参顺序：第一个参数对应 `sin(θ)`，第二个对应 `cos(θ)`，结果即为旋转角（弧度转度数）。

### 拖拽期间与结束后的状态

- **拖拽期间**：手柄由用户鼠标驱动，Konva 自动更新其坐标；代码只需读取手柄坐标、计算角度、更新节点 `rotation`，同时刷新连线。
- **拖拽结束后**：手柄可能偏离正确半径（用户斜向拖拽），需调用 `syncHandle()` 将其吸附回 `(cx + sin(θ)·d, cy - cos(θ)·d)`。

下面演示中，拖拽旋转手柄（空心红圈）旋转矩形，也可拖拽矩形本身移动位置：

<KShape :afterMounted="manualRotateDemo" :width="460" :height="260" />

## 完整 Transformer 的额外工作

`Konva.Transformer` 在上述两个核心算法之外还处理了：

- **带旋转的 Resize**：需将光标坐标通过节点绝对变换的逆矩阵转换到局部空间，再计算尺寸变化，避免旋转后拖拽方向错位
- **多节点同时变换**：计算多个节点的联合 `getClientRect()`，形变时对每个节点的 `x`、`y`、`scaleX`、`scaleY` 分别施加等比例变换
- **`boundBoxFunc` 限制**：在计算出新的包围盒后调用用户提供的 `boundBoxFunc(oldBox, newBox)` 钩子，实现最小尺寸、吸附等约束
- **`keepRatio`**：按住 Shift 或 `keepRatio=true` 时，根据对角线方向将 `newW`、`newH` 锁定为等比缩放
- **`rotationSnaps`**：拖拽旋转手柄时，在接近特定角度（如 0°/90°/180°）时磁吸对齐

## 完整实现：9 控制点 Transformer

下面将上述所有算法整合为一个完整演示，从零实现带有旋转支持的 Transformer。

**9 个控制点的设计：**

| 控制点 | 数量 | 视觉 | 交互 |
|--------|------|------|------|
| 缩放手柄（Scale handles） | 8 | 白色圆角方块，位于矩形轮廓上 | 鼠标移入显示双向箭头，拖拽调整尺寸 |
| 旋转区域（Rotate zones） | 8 | 透明圆，紧贴缩放手柄外侧 | 鼠标移入显示旋转光标，拖拽旋转 |
| 旋转中心锚点（Origin anchor） | 1 | 带十字的蓝圈，默认在矩形中心 | 拖动可迁移旋转中心，形状保持不动 |

### 带旋转的缩放算法

对 8 个手柄中任意一个，缩放的核心步骤：

1. 在 `dragstart` 时记录**对角手柄的世界坐标** `anchWorld` 和原始尺寸 `origW/H`
2. `dragmove` 时，将"固定对角→当前手柄"的**世界向量旋转回矩形局部坐标系**：
   ```js
   const vx = hWorld.x - anchWorld.x;   // 世界空间向量
   const vy = hWorld.y - anchWorld.y;
   // 乘以 R^(-1)（旋转矩阵的逆 = 转置）得到局部向量
   const localVx =  vx * cos + vy * sin;  // 局部空间下的新视觉宽
   const localVy = -vx * sin + vy * cos;  // 局部空间下的新视觉高
   ```
3. 由局部向量推算 `scaleX = |localVx| / origW, scaleY = |localVy| / origH`
4. 反算新的 `rect.x/y` 使对角手柄保持在 `anchWorld`：
   ```js
   // 固定对角的局部坐标经过 T(-offset) → S → R → T(cx,cy) 应得到 anchWorld
   const sLx = (oppLx - offsetX) * scaleX;
   const sLy = (oppLy - offsetY) * scaleY;
   const newCx = anchWorld.x - (sLx * cos - sLy * sin);
   const newCy = anchWorld.y - (sLx * sin + sLy * cos);
   ```

### 迁移旋转中心的算法

拖动旋转中心锚点到世界坐标 `(px, py)` 时：

1. 通过绝对变换的逆矩阵，将 `(px, py)` 换算为矩形局部坐标 `(newOffX, newOffY)`
2. 补偿 `rect.x/y`，使视觉形状保持不动：
   ```js
   // Δoffset 在局部空间（pre-scale）中：
   const dx = newOffX - oldOffX, dy = newOffY - oldOffY;
   // 应用 S(scale) 和 R(rotation) 转换到世界空间补偿量：
   rect.offsetX(newOffX);
   rect.offsetY(newOffY);
   rect.x(rect.x() + scaleX * dx * cos - scaleY * dy * sin);
   rect.y(rect.y() + scaleX * dx * sin + scaleY * dy * cos);
   ```
   这保证了局部坐标系中任意点的世界坐标在修改 offset 前后不变。

### 交互演示

矩形可**拖动**移位。8 个边框手柄可**拖拽缩放**（支持旋转后的缩放）。将鼠标移到手柄外侧的透明旋转区域并**拖拽旋转**。将旋转中心（蓝色十字圆）拖到任意位置后，后续的旋转和缩放均以新的锚点为中心：

<KShape :afterMounted="fullTransformerDemo" :width="560" :height="380" />
