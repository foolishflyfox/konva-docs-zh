<script setup>
import { rotationOriginDemo, matrixDisplayDemo, absoluteTransformDemo } from "./codes/transform";
</script>

# 形变（Transform）的实现

Konva 通过一组属性描述节点的形变状态，在渲染时将其转换为 **2D 仿射变换矩阵**，并通过 `canvas.setTransform()` 应用到上下文。本文剖析这套机制的内部实现。

## 形变属性一览

每个 `Konva.Node`（Shape、Group、Layer、Stage）都支持以下 8 个形变属性：

| 属性 | 默认值 | 说明 |
|------|--------|------|
| `x` | `0` | 节点在父坐标系中的 X 位置 |
| `y` | `0` | 节点在父坐标系中的 Y 位置 |
| `rotation` | `0` | 旋转角度（单位：度，顺时针为正） |
| `scaleX` | `1` | X 轴缩放比例 |
| `scaleY` | `1` | Y 轴缩放比例 |
| `skewX` | `0` | X 轴斜切系数 |
| `skewY` | `0` | Y 轴斜切系数 |
| `offsetX` | `0` | 锚点 X 偏移量（影响旋转、缩放、斜切的原点） |
| `offsetY` | `0` | 锚点 Y 偏移量（影响旋转、缩放、斜切的原点） |

## Konva.Transform：2D 仿射变换矩阵

Konva 内部用 `Konva.Transform` 类封装 2D 仿射变换。其核心是 6 个数值 `[a, b, c, d, e, f]`，对应的 3×3 齐次矩阵结构为：

```
     a  c  e
M =  b  d  f
     0  0  1
```

变换一个点 `(x, y)` 时：

```
x' = a·x + c·y + e
y' = b·x + d·y + f
```

几种基本变换对应的矩阵：

| 变换类型 | `[a, b, c, d, e, f]` |
|----------|----------------------|
| 单位变换（无变换） | `[1, 0, 0, 1, 0, 0]` |
| 平移 (tx, ty) | `[1, 0, 0, 1, tx, ty]` |
| 旋转 θ（弧度） | `[cosθ, sinθ, −sinθ, cosθ, 0, 0]` |
| 缩放 (sx, sy) | `[sx, 0, 0, sy, 0, 0]` |
| 水平斜切 k | `[1, 0, k, 1, 0, 0]` |
| 垂直斜切 k | `[1, k, 0, 1, 0, 0]` |

`Konva.Transform` 提供的主要方法：

```js
const t = new Konva.Transform();
t.translate(tx, ty);      // 在当前矩阵基础上叠加平移
t.rotate(angle);          // 叠加旋转（弧度）
t.scale(sx, sy);          // 叠加缩放
t.skew(kx, ky);           // 叠加斜切
t.multiply(other);        // 左乘另一个 Transform（M = M × other）
t.invert();               // 求逆矩阵
t.point({ x, y });        // 将点 (x, y) 经此矩阵变换后返回新坐标
t.getMatrix();            // 返回 [a, b, c, d, e, f] 数组
```

## getTransform() 的实现

`Node._getTransform()` 将 8 个属性按**固定顺序**左乘，组合成最终矩阵：

```js
// Node.js — _getTransform() 核心逻辑（已简化）
_getTransform() {
  const m = new Transform(); // 从单位矩阵出发

  if (x !== 0 || y !== 0)
    m.translate(x, y);                        // ① 平移到目标位置
  if (rotation !== 0)
    m.rotate(Konva.getAngle(rotation));        // ② 旋转（度→弧度）
  if (scaleX !== 1 || scaleY !== 1)
    m.scale(scaleX, scaleY);                  // ③ 缩放
  if (skewX !== 0 || skewY !== 0)
    m.skew(skewX, skewY);                     // ④ 斜切
  if (offsetX !== 0 || offsetY !== 0)
    m.translate(-offsetX, -offsetY);          // ⑤ 反向偏移锚点

  return m;
}
```

完整的变换链（矩阵乘法形式）：

```
M = T(x,y) · R(rotation) · S(scaleX, scaleY) · K(skewX, skewY) · T(−offsetX, −offsetY)
```

## offset 的作用：移动旋转 / 缩放锚点

变换链最后一步 `T(−offsetX, −offsetY)` 决定了旋转和缩放的**锚点（anchor point）**位置。

矩阵乘法中右侧的矩阵**先作用于坐标**。对一个局部点 `(px, py)` 实际的变换顺序是：

```
(px, py)
  → T(-offset):  (px - offsetX, py - offsetY)   ← 先平移到以 offset 为原点
  → K:           斜切
  → S:           缩放
  → R:           旋转
  → T(x,y):      平移到最终位置
```

关键推论：局部坐标 `(offsetX, offsetY)` 经过 `T(-offset)` 后变为 `(0, 0)`，之后绕原点旋转/缩放，最终落在 `(x, y)` 处。也就是说，**`(offsetX, offsetY)` 就是旋转和缩放的支点**。

对一个 `width=90, height=56` 的矩形：

- `offsetX=0, offsetY=0`：支点在矩形**左上角**，即节点的 `(x, y)` 处
- `offsetX=45, offsetY=28`：支点在矩形**几何中心**，旋转和缩放均以中心为原点

下面的动画演示了两种情况的差异。红点标记支点位置（即 `(x, y)` 坐标），可以看到两个矩形都以同样的速度旋转，但左侧绕角旋转，右侧绕中心旋转：

<KShape :afterMounted="rotationOriginDemo" :width="440" :height="220" />

## 交互式变换与矩阵

下面的演示通过滑块控制 `rotation`、`scaleX`、`skewX`，并实时展示由 `getTransform().getMatrix()` 返回的矩阵 `[a, b, c, d, e, f]`。红点为锚点（offsetX=60, offsetY=40，位于矩形中心），虚线十字标记其绝对位置：

<KShape :afterMounted="matrixDisplayDemo" :width="500" :height="280" />

可以观察到：
- 仅调整 `rotation` 时，`e`、`f`（平移分量）保持不变，`a`、`b`、`c`、`d` 变化
- `scaleX` 放大时，`a` 线性增大（`cos θ × scaleX`）
- `skewX` 非零时，`c` 分量出现，使矩形水平方向产生剪切错位

## getAbsoluteTransform()：级联父子变换

`getTransform()` 返回节点相对于其**父节点**的局部变换。当节点处于多级嵌套时，需要将所有祖先的变换逐一复合，才能得到从 Stage 根坐标到当前节点的完整变换——这就是 `getAbsoluteTransform()` 的职责。

```js
// Node.js — getAbsoluteTransform() 核心逻辑（已简化）
getAbsoluteTransform(top?) {
  const nodes = [];
  let el = this;
  // 从当前节点向上收集到根节点
  do {
    nodes.unshift(el);
    el = el.getParent();
  } while (el && el !== top);

  // 从根节点向下依次左乘各节点的局部变换
  const result = new Transform();
  for (const node of nodes) {
    result.multiply(node._getTransform());
  }
  return result;
}
```

**局部变换 vs 绝对变换的区别**：

- `getTransform()`：只包含节点自身的 8 个属性，与父节点无关
- `getAbsoluteTransform()`：从根到当前节点所有变换的复合，反映的是"这个点在 Stage 上的真实位置"

下面的演示中，父组（蓝色虚圆）持续旋转，子矩形（红色）同时自转。红点跟踪子矩形的绝对位置，左上角实时展示局部矩阵与绝对矩阵的差异——可以看到绝对矩阵 `e`、`f` 分量随父组旋转而变化，而局部矩阵只反映子矩形自身的旋转：

<KShape :afterMounted="absoluteTransformDemo" :width="440" :height="260" />

## 坐标转换工具方法

基于 `getAbsoluteTransform()`，Konva 提供了若干常用的坐标转换方法：

| 方法 | 说明 |
|------|------|
| `node.getAbsolutePosition()` | 将节点局部原点 `(0, 0)` 转换为 Stage 坐标 |
| `node.getAbsolutePosition(ancestor)` | 转换为相对于指定祖先节点的坐标 |
| `stage.getPointerPosition()` | 鼠标相对于 Stage 的绝对坐标 |
| `group.getRelativePointerPosition()` | 鼠标在 Group 局部坐标系中的位置 |

`getRelativePointerPosition()` 使用逆矩阵将绝对坐标转回局部坐标：

```js
// Node.js — getRelativePointerPosition()
getRelativePointerPosition() {
  const transform = this.getAbsoluteTransform().copy();
  transform.invert(); // 求逆矩阵：绝对坐标 → 局部坐标
  const pos = this.getStage().getPointerPosition();
  return transform.point(pos); // 变换鼠标位置
}
```

这是 Konva 坐标转换的核心模式：**正向用绝对变换（局部 → Stage），逆向用逆矩阵（Stage → 局部）**。

在处理复杂嵌套场景中的鼠标交互时（如在旋转过的 Group 内拖拽元素），应始终使用 `getRelativePointerPosition()` 而非直接读取 `getPointerPosition()`，否则坐标系不匹配会导致元素跳动或偏移。
