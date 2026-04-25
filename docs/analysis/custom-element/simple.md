<script setup>
import { simpleCustomDemo, hitFuncDemo, ringDemo, pixelTextDemo, rainbowDemo, rainbowSingleDemo, multiBeginPathDemo, numericInputDemo, softKeyboardDemo, softKeyboardHelperDemo } from "./codes/simple";
</script>

# 自定义元素（简单示例）

Konva.js 内置了丰富的图形（`Rect`、`Circle`、`Line` 等），但当这些内置图形无法满足需求时，可以通过 `Konva.Shape` 创建任意自定义图形。

## 核心：sceneFunc

自定义图形的核心是为 `Konva.Shape` 提供一个 `sceneFunc` 绘制函数：

```ts
const shape = new Konva.Shape({
  x: 100,
  y: 100,
  fill: '#4ECDC4',
  stroke: '#2C3E50',
  strokeWidth: 3,
  sceneFunc: function (context: Konva.Context, shape: Konva.Shape) {
    context.beginPath();
    // ... 使用 canvas 2D API 绘制路径
    context.fillStrokeShape(shape); // 应用 fill / stroke 等样式
  },
});
```

`sceneFunc` 接收两个参数：

- `context`：`Konva.Context` 实例，透明代理了原生 canvas 2D 上下文的全部方法（`beginPath`、`moveTo`、`lineTo`、`arc` 等），并额外提供了 `fillStrokeShape(shape)` 方法，用于根据 Shape 属性自动应用样式。
- `shape`：当前 `Konva.Shape` 实例，可通过 `shape.getAttr(key)` 读取自定义属性。Konva 内部以 `drawFunc.call(this, context, this)` 的形式调用 `sceneFunc`，因此在**普通函数**中 `this` 与 `shape` 指向同一个实例，两者等价；但在**箭头函数**中 `this` 指向外层作用域而非 Shape，此时只能依赖 `shape` 参数。提供显式的 `shape` 参数正是为了让箭头函数也能正常工作。

## fillStrokeShape 的本质

`fillStrokeShape` **不负责定义路径**，只负责"用正确的颜色把路径画出来"。`beginPath()` 到 `closePath()` 之间的路径定义完全由 `sceneFunc` 负责，`fillStrokeShape` 在此基础上完成填充和描边。

其内部调用链如下：

```
fillStrokeShape(shape)
  │  （根据 fillAfterStrokeEnabled 决定顺序，默认先 fill 后 stroke）
  ├─ fillShape(shape)
  │    └─ shape.fillEnabled() 检查 → _fill(shape)
  │         ├─ SceneContext._fill：
  │         │    根据 fillPriority 依次判断 color / pattern /
  │         │    linear-gradient / radial-gradient
  │         │    → setAttr('fillStyle', <对应值>)
  │         │    → shape._fillFunc(this)    // ctx.fill()
  │         └─ HitContext._fill：
  │              save()
  │              → setAttr('fillStyle', shape.colorKey)
  │              → shape._fillFuncHit(this) // ctx.fill()
  │              restore()
  │
  └─ strokeShape(shape)
       └─ shape.hasStroke() 检查 → _stroke(shape)
            ├─ SceneContext._stroke：
            │    setAttr('lineWidth', strokeWidth)
            │    setAttr('strokeStyle', stroke 或线性渐变)
            │    处理 dash / lineCap / shadow 等
            │    → shape._strokeFunc(this)  // ctx.stroke()
            └─ HitContext._stroke：
                 setAttr('lineWidth', hitStrokeWidth)
                 setAttr('strokeStyle', shape.colorKey)
                 → shape._strokeFuncHit(this) // ctx.stroke()
```

### fill 与 stroke 的执行顺序

`fillStrokeShape` 根据 `fillAfterStrokeEnabled` 属性决定执行顺序：

- **默认（`fillAfterStrokeEnabled = false`）：先 fill，后 stroke。** stroke 的描边压在 fill 的填充色上方，描边内侧边缘清晰可见。
- **`fillAfterStrokeEnabled = true`：先 stroke，后 fill。** fill 把描边内侧覆盖，描边实际显示宽度约为 `strokeWidth / 2`（外侧露出，内侧被盖住）。

对绝大多数图形，默认顺序（先 fill 后 stroke）即是期望行为；`fillAfterStrokeEnabled` 主要用于需要"描边不侵占填充区域"的特殊场景。

### 本质上做了三件事：

1. **读 shape 属性**：`fill`、`stroke`、`strokeWidth`、`dash`、`lineCap` 等
2. **写 context 状态**：将这些属性翻译成 `fillStyle`、`strokeStyle`、`lineWidth` 等写入 canvas context；在 hit canvas 上统一替换为 `shape.colorKey`
3. **触发绘制**：调用 `ctx.fill()` 和 `ctx.stroke()` 对当前路径执行填充和描边

正因为 `fillStrokeShape` 在 hit canvas 上自动替换为 `colorKey`，所以**使用 `fillStrokeShape` 的 shape 无需单独定义 `hitFunc`**——颜色切换已被封装在内部。

## 坐标系说明

在 `sceneFunc` 中，坐标原点为图形自身的 `(0, 0)`。Konva 会在调用 `sceneFunc` 前自动处理好位置（`x`、`y`）和变换（`scaleX`、`rotation` 等），因此：

- 无需在 `sceneFunc` 中手动加上 `x`、`y` 偏移量
- 直接以 `(0, 0)` 为中心绘制图形即可

## 示例：绘制正六边形

下面通过循环计算顶点坐标，绘制一个正六边形：

```ts
const hexagon = new Konva.Shape({
  x: 150,
  y: 100,
  fill: '#4ECDC4',
  stroke: '#2C3E50',
  strokeWidth: 3,
  sceneFunc: function (context: Konva.Context, shape: Konva.Shape) {
    const radius = 60;
    context.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i - Math.PI / 6;
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);
      if (i === 0) {
        context.moveTo(x, y);
      } else {
        context.lineTo(x, y);
      }
    }
    context.closePath();
    context.fillStrokeShape(shape);
  },
});

layer.add(hexagon);
```

<KShape :afterMounted="simpleCustomDemo" :width="300" :height="200" />

## 封装为可复用的类

当同一种自定义图形需要多次使用时，可以继承 `Konva.Shape` 并覆写 `_sceneFunc` 方法（注意前缀 `_`）：

```ts
interface HexagonConfig extends Konva.ShapeConfig {
  radius?: number;
}

class Hexagon extends Konva.Shape {
  constructor(config: HexagonConfig) {
    super(config);
  }

  _sceneFunc(context: Konva.Context): void {
    const radius: number = this.getAttr('radius') ?? 50;
    context.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i - Math.PI / 6;
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);
      if (i === 0) {
        context.moveTo(x, y);
      } else {
        context.lineTo(x, y);
      }
    }
    context.closePath();
    context.fillStrokeShape(this);
  }
}

const hex = new Hexagon({
  x: 150,
  y: 100,
  radius: 60,
  fill: '#4ECDC4',
  stroke: '#2C3E50',
  strokeWidth: 3,
});
layer.add(hex);
```

通过类继承的方式，可以将自定义属性（如 `radius`）与绘制逻辑封装在一起，使用方式与内置图形完全一致。

## hitFunc：自定义命中区域

`sceneFunc` 决定图形的视觉外观，而 `hitFunc` 决定图形的**事件命中区域**（鼠标点击、悬停等事件的检测范围）。两者相互独立，不设置 `hitFunc` 时，Konva 默认用 `sceneFunc` 绘制的路径作为命中区域。

自定义 `hitFunc` 的典型场景：

- **扩大命中区域**：图形较小时，让用户更容易点击
- **简化命中检测**：图形视觉上很复杂（如星形、路径），但用一个简单的矩形或圆形代替，提升性能
- **排除部分区域**：例如环形图，使中间空洞不可点击

`hitFunc` 的签名与 `sceneFunc` 完全相同，接收 `context` 和 `shape` 两个参数：

```ts
const shape = new Konva.Shape({
  x: 150,
  y: 100,
  fill: '#FF6B6B',
  stroke: '#2C3E50',
  strokeWidth: 2,
  sceneFunc: function (context: Konva.Context, shape: Konva.Shape) {
    // 绘制六边形（视觉）
    drawHexPath(context, 50);
    context.fillStrokeShape(shape);
  },
  hitFunc: function (context: Konva.Context, shape: Konva.Shape) {
    // 用更大的圆形作为命中区域
    context.beginPath();
    context.arc(0, 0, 75, 0, Math.PI * 2);
    context.closePath();
    context.fillStrokeShape(shape);
  },
});
```

下面的示例中，左侧六边形使用默认命中区域（形状本身），右侧六边形使用半径 75px 的圆形命中区域。将鼠标悬停在右侧图形周围（六边形之外、圆形之内），可以看到事件依然被触发：

<KShape :afterMounted="hitFuncDemo" :width="340" :height="200" />

## colorKey 与离屏颜色拾取

前面多次提到 `colorKey` 和 hit canvas，这里系统说明 Konva 事件命中检测的底层原理——**离屏颜色拾取（offscreen color picking）**。

### 第一步：为每个 shape 分配唯一颜色

`Shape` 构造函数里随机生成一个 6 位 hex 颜色，保证全局唯一，并存入全局 `shapes` map：

```ts
// Shape.js 构造函数
while (true) {
  key = Util.getRandomColor(); // 随机 #rrggbb，如 "#3a7fc1"
  if (key && !(key in shapes)) break;
}
this.colorKey = key;
shapes[key] = this; // 全局 map：颜色 → shape 实例
```

shape 销毁时从 map 中删除，确保 `colorKey` 始终与活跃 shape 一一对应。

### 第二步：在隐藏的 hit canvas 上用 colorKey 绘制

每个 `Layer` 除了用户可见的 scene canvas 外，还维护一张对用户不可见的 `hitCanvas`。每次重绘时，所有 shape 都在 hit canvas 上用各自的 `colorKey` 画一遍（即 `HitContext` 替换颜色的过程）。最终 hit canvas 上每个像素的颜色代表"哪个 shape 覆盖了这里"：

```
可见 canvas（scene）     隐藏 canvas（hit）
┌──────────────────┐    ┌──────────────────┐
│  绿色六边形       │    │  #3a7fc1 六边形   │  ← shape A 的 colorKey
│  红色圆形         │    │  #e2109f 圆形     │  ← shape B 的 colorKey
└──────────────────┘    └──────────────────┘
```

### 第三步：鼠标事件时读像素，反查 shape

鼠标移动时，`Layer._getIntersection` 用 `getImageData` 读取鼠标位置那 **1×1 像素**的颜色，再从全局 map 里反查对应的 shape：

```ts
// Layer.js — _getIntersection(pos)
// pos：调用方传入的舞台坐标，即 stage.getPointerPosition() 返回的 { x, y }
// ratio：设备像素比（devicePixelRatio），将 CSS 像素换算为 canvas 物理像素
_getIntersection(pos: Vector2d): { shape?: Konva.Shape; antialiased?: true } {
  const ratio = this.hitCanvas.pixelRatio;
  const p = this.hitCanvas.context.getImageData(
    Math.round(pos.x * ratio), // sx：读取矩形左上角的 x 坐标（物理像素）
    Math.round(pos.y * ratio), // sy：读取矩形左上角的 y 坐标（物理像素）
    1,                         // sw：读取宽度，1 个物理像素
    1                          // sh：读取高度，1 个物理像素
  ).data; // 返回 Uint8ClampedArray，布局为 [r, g, b, a]（每分量 0–255）

  if (p[3] === 255) {
    // alpha = 255：完全不透明，是某个 shape 的纯色区域
    // _rgbToHex 返回不含 # 前缀的 6 位十六进制字符串，如 "3a7fc1"
    const colorKey = Util._rgbToHex(p[0], p[1], p[2]);
    // HASH 是常量 "#"；shapes map 的键是完整的 "#rrggbb" 格式，
    // 所以需要拼接 "#" 前缀才能命中正确的条目
    const shape = shapes[HASH + colorKey];
    if (shape) return { shape };
  } else if (p[3] > 0) {
    // 0 < alpha < 255：半透明像素，说明此处是图形边缘的抗锯齿混合区域，
    // 颜色已不是纯 colorKey，无法直接反查 shape；
    // 返回 { antialiased: true } 通知外层循环向外再扩一圈继续搜索
    return { antialiased: true };
  }
  // alpha = 0：透明，此坐标没有任何 shape，返回空对象
  return {};
}
```

找到 shape 后，Konva 就知道鼠标当前在哪个 shape 上，从而触发 `mouseenter`、`mousemove`、`click` 等事件。

**为什么要乘以 `ratio`？**

先区分两种"像素"：

- **CSS 像素**（逻辑像素）：浏览器布局和 JavaScript 坐标系使用的单位。`element.style.width`、`getBoundingClientRect()`、鼠标事件的 `clientX` 都以 CSS 像素为单位，与屏幕的物理分辨率无关。
- **物理像素**（设备像素）：屏幕上真实存在的发光点。普通屏幕 1 CSS 像素 = 1 物理像素；Retina / 高 DPI 屏幕 1 CSS 像素 = 2×2 甚至 3×3 个物理像素，图像才不会看起来模糊。

`window.devicePixelRatio`（即代码中的 `ratio`）就是这个倍数。

`stage.getPointerPosition()` 返回的是 **CSS 像素**坐标，而 `getImageData` 操作的是 canvas 的**物理像素**缓冲区。在高 DPI 屏幕（如 Retina，`devicePixelRatio = 2`）上，Konva 会将 canvas 的实际分辨率设置为 CSS 尺寸的 2 倍，以保证图形清晰：

```
CSS 尺寸：500 × 300  →  canvas.width = 1000，canvas.height = 600
```

此时鼠标坐标 `pos.x = 100`（CSS 像素）对应物理缓冲区中的第 200 列。若直接用 `getImageData(100, ...)` 读取的是错误位置的像素，命中检测就会失效。乘以 `ratio` 后才能正确映射到物理像素坐标。

本质上是把**"鼠标在哪个形状上"这个几何问题，转换成"这个像素是什么颜色"这个像素读取问题**，完全依赖 `getImageData` API，不涉及任何几何计算。

### 抗锯齿边缘的螺旋搜索

图形边缘因抗锯齿产生半透明混合像素（alpha < 255），颜色已不是纯 `colorKey`，直接读会查不到 shape。Konva 的解法是向外做螺旋扩展搜索，直到找到 alpha = 255 的像素为止。

`getIntersection` 由 `Stage` 的指针事件处理器调用。每当鼠标移动或点击时，`Stage` 通过 `_fireOnChildContext` 等方法遍历所有 Layer，对每个 Layer 调用 `layer.getIntersection(pointerPos)`，收集命中结果后再决定向哪个 shape 派发 `mousemove`、`mouseenter`、`click` 等事件。调用链如下：

```
鼠标事件（mousemove / click / ...）
  └─ Stage._pointerMove / _pointerDown / ...
       └─ layer.getIntersection(pos)        ← 螺旋搜索入口
            └─ layer._getIntersection(pos)  ← 单次像素读取
```

```ts
// Layer.js — getIntersection()
// 返回命中的 Shape，若该位置无任何 shape 则返回 null
getIntersection(pos: Vector2d): Konva.Shape | null {

// 检测点：当前位置（距离为 0）+ 4 个对角方向
// 每轮以相同的 spiralSearchDistance 同时探测这 5 个点
const INTERSECTION_OFFSETS = [
  { x:  0, y:  0 }, // 当前点
  { x: -1, y: -1 }, // 左上
  { x:  1, y: -1 }, // 右上
  { x:  1, y:  1 }, // 右下
  { x: -1, y:  1 }, // 左下
];
// 提前缓存数组长度（= 5），避免循环每次读取 .length 属性
const INTERSECTION_OFFSETS_LEN = INTERSECTION_OFFSETS.length;

let spiralSearchDistance = 1;
let continueSearch = false;
while (true) {
  for (let i = 0; i < INTERSECTION_OFFSETS_LEN; i++) {
    const intersectionOffset = INTERSECTION_OFFSETS[i];
    const obj = this._getIntersection({
      x: pos.x + intersectionOffset.x * spiralSearchDistance,
      y: pos.y + intersectionOffset.y * spiralSearchDistance,
    });
    if (obj.shape) return obj.shape; // 找到纯色像素，命中 shape，立即返回
    // 遇到抗锯齿像素则标记需要继续向外搜索
    continueSearch = !!obj.antialiased;
    if (!obj.antialiased) break;     // 遇到透明像素，本圈无需再查其他方向
  }
  // 本轮所有方向均为透明：说明已脱离抗锯齿区域，此处确实无 shape
  if (continueSearch) {
    spiralSearchDistance += 1;       // 仍在抗锯齿区域内，向外再扩一圈
  } else {
    return null;
  }
}
```

## hitFunc 的默认实现原理

"不设置 `hitFunc` 时，Konva 默认用 `sceneFunc` 绘制的路径作为命中区域"——这一行为的实现藏在 `Shape.drawHit()` 的一行代码里：

```ts
// Shape.js — drawHit() 内部
const drawFunc = this.hitFunc() || this.sceneFunc();
```

`hitFunc()` 读取 `attrs.hitFunc` 或子类的 `_hitFunc`，若两者均未定义则返回 `undefined`，于是 `drawFunc` 回退到 `sceneFunc`，**直接把 sceneFunc 当 hitFunc 在 hit canvas 上执行**：

```ts
drawFunc.call(this, context, this); // context 此时是 HitContext 实例
```

### HitContext 的多态替换

传入 `sceneFunc` 的 `context` 是 `HitContext` 实例，而非普通的 `SceneContext`。`HitContext` 覆写了基类的 `_fill` 和 `_stroke`：

```ts
// HitContext._fill
_fill(shape) {
  this.save();
  this.setAttr('fillStyle', shape.colorKey); // 强制替换为唯一命中色
  shape._fillFuncHit(this);                  // ctx.fill()
  this.restore();
}

// HitContext._stroke
_stroke(shape) {
  // ...
  this.setAttr('strokeStyle', shape.colorKey); // 强制替换为唯一命中色
  shape._strokeFuncHit(this);                  // ctx.stroke()
}
```

`fillStrokeShape` 定义在基类 `Context` 上，只是调用 `this.fillShape()` → `this._fill()`。由于多态，在 hit canvas 上 `this._fill()` 解析为 `HitContext._fill`，颜色被自动替换为 `colorKey`。

### 完整调用链（无 hitFunc 时）

```
layer.batchDraw()
  └─ shape.drawHit(hitCanvas)
       │  drawFunc = hitFunc() || sceneFunc()
       │  → hitFunc() 返回 undefined，取 sceneFunc
       │
       └─ sceneFunc.call(shape, hitContext, shape)
            │  用户写的路径逻辑（beginPath / arc / lineTo ...）
            └─ context.fillStrokeShape(shape)
                 │  context 是 HitContext 实例
                 ├─ fillShape(shape) → HitContext._fill(shape)
                 │    setAttr('fillStyle', shape.colorKey)  ← 颜色被替换
                 │    ctx.fill()
                 └─ strokeShape(shape) → HitContext._stroke(shape)
                      setAttr('strokeStyle', shape.colorKey) ← 颜色被替换
                      ctx.stroke()
```

也就是说，"默认实现"并不是一个单独的函数，而是 `drawHit` 中的回退逻辑配合 `HitContext` 的多态覆写共同完成的。正因如此，`fillStrokeShape` 可以无感地在 scene/hit 两种 context 下切换颜色；而手动调用 `fillText` / `context.fill()` 时绕过了这条多态路径，`HitContext` 没有机会介入，所以必须显式定义 `hitFunc`。

## 多次 beginPath 对命中区域的影响

`sceneFunc` 中可以多次调用 `beginPath`，但命中区域取决于**哪些路径调用了 `fillStrokeShape`**，而非最后一次 `beginPath`。

### 情况一：多次 beginPath，末尾一次 fillStrokeShape

```ts
sceneFunc(context: Konva.Context, shape: Konva.Shape) {
  context.beginPath();
  context.rect(0, 0, 50, 60);   // 路径 A

  context.beginPath();           // ← 清除路径 A
  context.arc(103, 30, 28, 0, Math.PI * 2);
  context.closePath();
  context.fillStrokeShape(shape); // 只有路径 B（圆形）被绘制和命中
}
```

`beginPath()` 是原生 canvas API，**会清空当前路径**。路径 A 在被 `fillStrokeShape` 提交之前就被第二个 `beginPath` 丢弃，scene canvas 和 hit canvas 上都不存在路径 A。

### 情况二：每段路径各自 fillStrokeShape

```ts
sceneFunc(context: Konva.Context, shape: Konva.Shape) {
  context.beginPath();
  context.rect(0, 0, 50, 60);
  context.closePath();
  context.fillStrokeShape(shape); // 矩形提交到 scene + hit canvas

  context.beginPath();
  context.arc(103, 30, 28, 0, Math.PI * 2);
  context.closePath();
  context.fillStrokeShape(shape); // 圆形也提交到 scene + hit canvas
}
```

两段路径都被 `fillStrokeShape` 提交，hit canvas 上矩形和圆形都涂上了 `colorKey`，命中区域是两者的**并集**。

下面的示例中，左侧图形使用情况一（虚线矩形标示被丢弃的路径，悬停该区域不触发事件），右侧图形使用情况二（矩形和圆形区域均可命中）：

<KShape :afterMounted="multiBeginPathDemo" :width="420" :height="160" />

## 示例：圆环的命中区域

圆环（Donut）形状的命中区域需要排除中心空洞——鼠标移到空洞上不应触发事件。这个示例同时展示了另一个视觉需求：在中心空洞里填充一块天蓝色背景，而圆环本身保持绿色（鼠标进入变橘黄色）。

```ts
const outerRadius = 75;
const innerRadius = 35;

const ring = new Konva.Shape({
  x: stage.width() / 2,
  y: stage.height() / 2,
  fill: '#4CAF50',
  stroke: '#2C3E50',
  strokeWidth: 2,
  sceneFunc: function (context: Konva.Context, shape: Konva.Shape) {
    // 先用 context.fill() 直接绘制天蓝色内圆（半径比内环小 5px）
    context.beginPath();
    context.arc(0, 0, innerRadius - 5, 0, Math.PI * 2);
    context.closePath();
    context.setAttr('fillStyle', 'rgb(135, 206, 235)');
    context.fill();

    // 再绘制圆环（外圆顺时针、内圆逆时针，形成镂空路径）
    context.beginPath();
    context.arc(0, 0, outerRadius, 0, Math.PI * 2, false); // 外圆，顺时针
    context.moveTo(innerRadius, 0);
    context.arc(0, 0, innerRadius, 0, Math.PI * 2, true);  // 内圆，逆时针，镂空
    context.closePath();
    context.fillStrokeShape(shape);
  },
});
```

将鼠标移入圆环区域，颜色变为橘黄色；移入中心天蓝色区域，圆环颜色保持不变：

<KShape :afterMounted="ringDemo" :width="320" :height="220" />

### 为什么中心区域不触发事件

这里没有定义 `hitFunc`，Konva 直接把 `sceneFunc` 用于 hit canvas 绘制。两段绘制在 hit canvas 上产生的效果截然不同：

**第一段（内圆，`context.fill()`）**：`HitContext` 只覆写了 `_fill()`（由 `fillStrokeShape` 内部调用），未覆写代理方法 `fill()`。因此 `context.fill()` 直接以 `rgb(135,206,235)` 涂色，hit canvas 上内圆区域是天蓝色，**不是** `colorKey`。

**第二段（圆环，`fillStrokeShape`）**：经过 `HitContext._fill` / `_stroke` 的颜色替换，hit canvas 上圆环区域被正确涂成 `colorKey`。

hit canvas 上各区域的 alpha 分布如下：

```
r < 30（内圆）      → 天蓝色 rgb(135,206,235)，alpha = 255，无对应 colorKey
30 < r < ~34（间隙）→ 完全透明，alpha = 0
35 < r < 75（圆环） → colorKey，alpha = 255
```

当鼠标位于天蓝色区域时，`_getIntersection` 读到 alpha = 255 但颜色不是任何 shape 的 `colorKey`，返回 `{ antialiased: true }`。螺旋搜索因此持续向外扩展，直到某个采样点落入透明间隙（alpha = 0），此时返回 `{}`，`continueSearch` 置为 `false`，搜索终止，`getIntersection` 返回 `null`——事件不触发。

### 间隙宽度的影响

天蓝色内圆的半径是 `innerRadius - 5`（= 30），比圆环内壁（r = 35）小 **5px**，形成约 4–5 个像素宽的透明间隙。这个宽度足以确保螺旋搜索在向外扩展时命中透明像素，而不会"跳过"间隙直接触及圆环的 `colorKey` 区域。

如果将内圆半径改为 `innerRadius - 2`（= 33），间隙收窄到约 1–2px。螺旋搜索步长以整数像素递增，在很多鼠标位置下，某一步的采样点会直接越过这条细缝落在圆环 `colorKey` 像素上，导致 `mouseenter` 被意外触发，中心区域悬停时圆环同样变为橘黄色。

**结论**：天蓝色内圆与圆环内壁之间保留足够宽的透明间隙，是让这个方案奏效的关键。若不想依赖间隙宽度，更可靠的做法是明确定义 `hitFunc`，只将圆环区域（镂空路径）用 `fillStrokeShape` 绘制到 hit canvas，内圆区域在 `hitFunc` 中完全不绘制，保持透明。

### colorKey 碰撞风险

这个方案还存在一个低概率但真实的隐患：`context.fill()` 将天蓝色 `rgb(135, 206, 235)`（即 `#87ceeb`）写入 hit canvas，而 `colorKey` 是从 `#000000` 到 `#ffffff` 随机生成的。如果场景中恰好有另一个 shape 被分配到 `colorKey = "#87ceeb"`，`_getIntersection` 读到天蓝色像素后就会在 `shapes` map 里命中该 shape，向它派发 `mouseenter`——完全是误触。

```ts
// _getIntersection 内部
if (p3 === 255) {
  const colorKey = Util.getHitColorKey(p[0], p[1], p[2]);
  const shape = shapes[colorKey]; // "#87ceeb" 若恰好是某个 shape 的 colorKey → 误命中
  if (shape) return { shape };
}
```

单次碰撞概率约为 1/16,777,216，页面 shape 数量越多风险越高。**`hitFunc` 从根本上消除这一风险**：内圆区域在 hit canvas 上保持透明（alpha = 0），不写入任何颜色，无论其他 shape 的 `colorKey` 是什么都不会产生干扰。

## 示例：按像素命中的文字

`Konva.Text` 的默认 `hitFunc` 使用整个文字包围矩形，字母镂空处（如"o"、"a"内部）同样可触发事件。

要实现像素级命中，需要自定义 shape，在 `hitFunc` 中用 `fillText` / `strokeText` 将文字笔画直接绘制到 hit canvas 上。关键点在于：Konva **不会**在调用 `hitFunc` 前预设命中色，需要手动将 `fillStyle` / `strokeStyle` 设置为 `shape.colorKey`——这是 Konva 为每个 shape 分配的唯一标识色，用于 hit canvas 的像素识别。

```ts
const shape = new Konva.Shape({
  x: 200,
  y: 75,
  fill: '#4CAF50',
  stroke: '#4CAF50',
  strokeWidth: 8,
  sceneFunc(context: Konva.Context, shape: Konva.Shape) {
    context.setAttr('font', 'bold 72px Arial');
    context.setAttr('textAlign', 'center');
    context.setAttr('textBaseline', 'middle');
    context.setAttr('lineWidth', shape.getAttr('strokeWidth'));
    context.setAttr('strokeStyle', shape.getAttr('stroke'));
    context.strokeText('Konva', 0, 0);
    context.setAttr('fillStyle', shape.getAttr('fill'));
    context.fillText('Konva', 0, 0);
  },
  hitFunc(context: Konva.Context, shape: Konva.Shape) {
    const hitColor: string = shape.colorKey; // Konva 分配给该 shape 的唯一命中色
    context.setAttr('font', 'bold 72px Arial');
    context.setAttr('textAlign', 'center');
    context.setAttr('textBaseline', 'middle');
    context.setAttr('lineWidth', shape.getAttr('strokeWidth'));
    context.setAttr('fillStyle', hitColor);
    context.setAttr('strokeStyle', hitColor);
    context.fillText('Konva', 0, 0);
    context.strokeText('Konva', 0, 0);
  },
});
```

将鼠标移到文字笔画上，颜色变为橘黄色；移到字母镂空处，不触发任何事件：

<KShape :afterMounted="pixelTextDemo" :width="420" :height="150" />

## 为什么此处必须定义 hitFunc

此示例中 `hitFunc` 不可省略，原因在于 `sceneFunc` 与 `fillStrokeShape` 的工作方式不同。

**使用 `fillStrokeShape` 的 shape 不需要单独定义 `hitFunc`**，因为该方法内部会判断当前绘制的是 scene canvas 还是 hit canvas，并自动切换填色策略：

```
fillStrokeShape(shape)
  ├─ scene canvas → 使用 shape.fill()、shape.stroke()（视觉色）
  └─ hit canvas   → 使用 shape.colorKey（唯一命中色）
```

**而 `fillText` / `strokeText` 是原生 canvas 调用**，完全绕过了这套机制。在 `sceneFunc` 中手动写下：

```ts
context.setAttr('fillStyle', shape.getAttr('fill')); // 始终是视觉色 #4CAF50
context.fillText('Konva', 0, 0);
```

若不定义 `hitFunc`，Konva 会在 hit canvas 上执行同一个 `sceneFunc`，文字被画成绿色 `#4CAF50`。Konva 读取鼠标位置的像素颜色后，在全局 `shapes` map 里查找 `#4CAF50`——查不到对应 shape，事件完全失效。

因此，凡是在 `sceneFunc` 中使用了**手动设置颜色的原生绘制调用**（`fillText`、`strokeText`、`context.fill()` 配合 `setAttr('fillStyle', ...)` 等），都必须显式定义 `hitFunc`，在其中用 `shape.colorKey` 替换颜色，确保 hit canvas 上的像素能被正确识别。

## 示例：彩虹图案

将 7 种颜色各自定义为一个独立的 `Konva.Shape`，每个 shape 都是一段半圆弧形区域。默认 `opacity` 为 0.75，鼠标进入时提升至 1，离开时恢复，各颜色互不干扰。

关键实现：

- **每个色带是一个独立 shape**：这样 `mouseenter` / `mouseleave` 可以精确对应到单个色带
- **`opacity` 属性**：作用于整个 shape，不影响其他 shape
- **无需 `hitFunc`**：`sceneFunc` 中使用了 `fillStrokeShape`，hit canvas 颜色由 Konva 自动处理

```ts
const colors: string[] = ['#FF0000', '#FF7F00', '#FFFF00', '#00AA00', '#0000FF', '#4B0082', '#9400D3'];
const bandWidth = 25;
const baseRadius = 35;

colors.forEach((color, i) => {
  const outerRadius = baseRadius + (colors.length - i) * bandWidth;
  const innerRadius = baseRadius + (colors.length - i - 1) * bandWidth;

  const band = new Konva.Shape({
    x: cx,
    y: cy,   // 圆心置于 stage 底部，半圆弧向上展开
    fill: color,
    opacity: 0.75,
    sceneFunc(context: Konva.Context, shape: Konva.Shape) {
      context.beginPath();
      context.arc(0, 0, outerRadius, Math.PI, 0, false); // 外弧：从左到右经过顶部
      context.arc(0, 0, innerRadius, 0, Math.PI, true);  // 内弧：从右到左经过顶部
      context.closePath();
      context.fillStrokeShape(shape);
    },
  });

  band.on('mouseenter', () => { band.opacity(1);    layer.batchDraw(); });
  band.on('mouseleave', () => { band.opacity(0.75); layer.batchDraw(); });

  layer.add(band);
});
```

<KShape :afterMounted="rainbowDemo" :width="420" :height="210" bgColor="white" />

## 单 Shape 实现彩虹

上面的方案用 7 个独立 shape，每个色带自己响应事件、自己管理 opacity，思路直观，但也可以用**一个 shape** 实现相同效果。

两种方案的核心差异：

| | 7 个 shape | 单个 shape |
|--|--|--|
| 事件绑定 | 每个色带独立 `mouseenter`/`mouseleave` | 整体 `mousemove` + 手动计算色带 |
| opacity 控制 | Konva `opacity` 属性 | `sceneFunc` 内手动设 `globalAlpha` |
| `hitFunc` | 不需要（`fillStrokeShape` 自动处理） | **必须定义**（`sceneFunc` 使用原生 `fill()`） |
| 重绘粒度 | 仅目标 shape 属性变化 | `layer.batchDraw()` 重绘整个 shape |

**难点一：识别当前色带。** 单个 shape 只有一个命中区域，无法通过事件直接区分色带。解法是在 `mousemove` 中计算鼠标到圆心的距离 `r`，按色带宽度换算索引：

```ts
const bandFromInner = Math.floor((r - baseRadius) / bandWidth); // 0=最内 ~ 6=最外
const colorIdx = colors.length - 1 - bandFromInner;            // 对应 colors 下标
```

**难点二：必须定义 `hitFunc`。** `sceneFunc` 里对每个色带手动调用 `context.fill()`，绕过了 `fillStrokeShape` 的 `colorKey` 机制。若不定义 `hitFunc`，hit canvas 上画的是视觉色而非 `colorKey`，`mousemove` 完全失效。`hitFunc` 将整个彩虹区域（排除中心空洞）作为一个整体命中区域，配合 `fillStrokeShape` 确保正确识别。

```ts
const rainbow = new Konva.Shape({
  x: cx,
  y: cy,
  sceneFunc(context: Konva.Context, _shape: Konva.Shape) {
    colors.forEach((color, i) => {
      const outerRadius = baseRadius + (colors.length - i) * bandWidth;
      const innerRadius = baseRadius + (colors.length - i - 1) * bandWidth;
      context.beginPath();
      context.arc(0, 0, outerRadius, Math.PI, 0, false);
      context.arc(0, 0, innerRadius, 0, Math.PI, true);
      context.closePath();
      context.setAttr('globalAlpha', i === activeIndex ? 1 : 0.75);
      context.setAttr('fillStyle', color);
      context.fill();
    });
    context.setAttr('globalAlpha', 1);
  },
  hitFunc(context: Konva.Context, shape: Konva.Shape) {
    const outerRadius = baseRadius + colors.length * bandWidth;
    context.beginPath();
    context.arc(0, 0, outerRadius, Math.PI, 0, false);
    context.moveTo(baseRadius, 0);
    context.arc(0, 0, baseRadius, 0, Math.PI, true);
    context.closePath();
    context.fillStrokeShape(shape);
  },
});

rainbow.on('mousemove', () => {
  const pos = stage.getPointerPosition();
  const r = Math.sqrt((pos.x - cx) ** 2 + (pos.y - cy) ** 2);
  const bandFromInner = Math.floor((r - baseRadius) / bandWidth);
  const newIndex = colors.length - 1 - bandFromInner;
  const clamped = newIndex >= 0 && newIndex < colors.length ? newIndex : -1;
  if (clamped !== activeIndex) {
    activeIndex = clamped;
    layer.batchDraw();
  }
});

rainbow.on('mouseleave', () => { activeIndex = -1; layer.batchDraw(); });
```

<KShape :afterMounted="rainbowSingleDemo" :width="420" :height="210" bgColor="white" />

## 示例：数字输入控件

将 LabVIEW 风格的数字输入控件实现为**单一 `Konva.Shape`**：左侧为带圆角的按钮区（点击上半 +1、点击下半 -1），右侧为显示当前数值的文本区。

关键实现：

- **`sceneFunc` 绘制整个控件**：按钮区（圆角矩形 + 斜面效果 + 箭头）和显示区（白色矩形 + 数字文本）全部在同一个 `sceneFunc` 中完成
- **必须定义 `hitFunc`**：`sceneFunc` 中全程使用原生 `fill()`、`stroke()`、`fillText()` 调用，绕过了 `fillStrokeShape` 的 `colorKey` 替换机制，若不定义 `hitFunc`，hit canvas 上写的是视觉色而非 `colorKey`，点击事件完全失效
- **点击区域判断**：单 shape 只有一个事件对象，在 `click` 回调中手动计算鼠标相对坐标，区分上半按钮（+1）和下半按钮（-1）

```ts
let value = 0;
const btnW = 26, totalH = 26, displayW = 72, r = 5;

const numInput = new Konva.Shape({
  x: shapeX, y: shapeY,
  sceneFunc(context: Konva.Context, _shape: Konva.Shape) {
    // ── 按钮区（圆角左矩形 + 3D 斜面）──
    context.beginPath();
    context.moveTo(r, 0);
    context.lineTo(btnW, 0);
    context.lineTo(btnW, totalH);
    context.lineTo(r, totalH);
    context.arc(r, totalH - r, r, Math.PI / 2, Math.PI, false); // 左下圆角
    context.lineTo(0, r);
    context.arc(r, r, r, Math.PI, Math.PI * 3 / 2, false);      // 左上圆角
    context.closePath();
    context.setAttr('fillStyle', '#b8b8b8');
    context.fill();
    // ... 斜面高亮、分割线、上下箭头三角形 ...

    // ── 显示区 ──
    context.beginPath();
    context.rect(btnW, 0, displayW, totalH);
    context.setAttr('fillStyle', 'white');
    context.fill();
    context.setAttr('strokeStyle', '#888');
    context.stroke();
    context.setAttr('font', '14px sans-serif');
    context.setAttr('textAlign', 'right');
    context.setAttr('textBaseline', 'middle');
    context.setAttr('fillStyle', '#000');
    context.fillText(String(value), btnW + displayW - 6, totalH / 2);
  },
  hitFunc(context: Konva.Context, shape: Konva.Shape) {
    // sceneFunc 全程使用原生 fill()，必须手动定义 hitFunc
    context.beginPath();
    context.rect(0, 0, btnW + displayW, totalH);
    context.closePath();
    context.fillStrokeShape(shape); // 以 colorKey 填充，确保点击可被识别
  },
});

numInput.on('click', () => {
  const pos = stage.getPointerPosition();
  const relX = pos.x - shapeX;
  const relY = pos.y - shapeY;
  if (relX < btnW) {
    relY < totalH / 2 ? value++ : value--;
    layer.batchDraw(); // 触发重绘，sceneFunc 读取新 value
  }
});
```

<KShape :afterMounted="numericInputDemo" :width="300" :height="100" />

## 示例：软键盘

将整个 QWERTY 字母键盘实现为**单一 `Konva.Shape`**，鼠标移入任意键时该键高亮为绿色。

由于所有按键都在同一个 `sceneFunc` 中绘制，Konva 的 shape 级事件无法区分具体按键。解决方案是在应用层**复刻 Konva 颜色拾取原理**，构建一张离屏命中画布：

| | Konva 内部（shape 级） | 本示例（应用级） |
|--|--|--|
| 颜色分配 | 构造函数里随机生成 `colorKey` | 用 `index + 1` 编码到红色通道 |
| 命中画布绘制 | `drawHit()` 在 `hitCanvas` 上用 `colorKey` 绘制 | 初始化时手动绘制到离屏 `<canvas>` |
| 像素读取 | `Layer._getIntersection` 调用 `getImageData` | `mousemove` 中手动调用 `getImageData` |
| 反查目标 | 全局 `shapes` map | 本地 `keyList` 数组按 `index` 索引 |

整个键盘被封装为继承 `Konva.Shape` 的 `SoftKeyboard` 类，提示文本作为普通 `Konva.Text` 放在类外，通过自定义事件 `keychange` 解耦通信。

**类内部（三个核心步骤）：**

**步骤一：** 构造函数中，为每个按键分配唯一颜色并绘制到离屏画布（红色通道值 = `index + 1`，背景保持透明）：

```ts
interface SoftKeyboardConfig extends Konva.ShapeConfig {
  stageWidth: number;
  stageHeight: number;
}

interface KeyInfo {
  index: number;
  label: string;
  x: number;
  y: number;
}

class SoftKeyboard extends Konva.Shape {
  private _hitCtx: CanvasRenderingContext2D;
  private _keyList: KeyInfo[];
  private _activeKey: number = -1;

  constructor(config: SoftKeyboardConfig) {
    super(config);
    // ... 构建 keyList ...

    // 离屏命中画布
    const hitCanvas = document.createElement('canvas');
    hitCanvas.width = config.stageWidth;
    hitCanvas.height = config.stageHeight;
    this._hitCtx = hitCanvas.getContext('2d')!;
    for (const key of this._keyList) {
      this._hitCtx.fillStyle = `rgb(${key.index + 1}, 0, 0)`;
      this._hitCtx.beginPath();
      this._hitCtx.roundRect(key.x, key.y, KEY_W, KEY_H, KEY_R);
      this._hitCtx.fill();
    }

    // mousemove：读像素 → 更新状态 → 发出 keychange 事件
    this.on('mousemove', () => {
      const pos = this.getStage()!.getPointerPosition()!;
      const px = this._hitCtx.getImageData(Math.round(pos.x), Math.round(pos.y), 1, 1).data;
      const newKey = px[3] === 255 ? px[0] - 1 : -1;
      if (newKey !== this._activeKey) {
        this._activeKey = newKey;
        this.fire('keychange', { key: newKey >= 0 ? this._keyList[newKey].label : '' }, true);
        this.getLayer()!.batchDraw();
      }
    });
  }
```

**步骤二：** `_sceneFunc` 根据 `_activeKey` 渲染按键；`_hitFunc` 将整个画布作为 Konva 命中区域：

```ts
  _sceneFunc(context: Konva.Context): void {
    for (const key of this._keyList) {
      const active = key.index === this._activeKey;
      this._roundRect(context, key.x, key.y, KEY_W, KEY_H, KEY_R);
      context.setAttr('fillStyle', active ? '#4caf50' : '#e8e8e8');
      context.fill();
      context.setAttr('fillStyle', active ? '#fff' : '#444');
      context.fillText(key.label, key.x + KEY_W / 2, key.y + KEY_H / 2);
    }
  }

  _hitFunc(context: Konva.Context): void {
    const s = this.getStage()!;
    context.beginPath();
    context.rect(0, 0, s.width(), s.height());
    context.closePath();
    context.fillStrokeShape(this); // 以 colorKey 填充整体区域
  }
}
```

**类外部（提示文本通过 `keychange` 事件更新）：**

```ts
const statusText = new Konva.Text({ text: '移动鼠标到按键上', ... });

const keyboard = new SoftKeyboard({ x: 0, y: 0, stageWidth: stage.width(), stageHeight: stage.height() });

keyboard.on('keychange', (e) => {
  statusText.text(e.key ? `当前按键：${e.key}` : '移动鼠标到按键上');
  layer.batchDraw();
});

layer.add(statusText, keyboard);
```

<KShape :afterMounted="softKeyboardDemo" :width="420" :height="180" />

## 使用 ShapeHelper 重构软键盘

上一节的 `SoftKeyboard` 类有一段模板式代码：创建离屏 `<canvas>`、分配颜色索引、在 `mousemove` 中读像素、手动 `fire` 事件。`ShapeHelper`（`docs/utils/shape-helper.ts`）将这套模式封装成统一接口，让开发者只需声明路径与区域，无需关心像素检测细节。

| | `SoftKeyboard`（手动） | `ShapeHelper` |
|--|--|--|
| 离屏 canvas | 手动 `createElement` + 分配尺寸 | 内部自动创建 |
| 颜色编码 | 手动 `rgb(index+1, 0, 0)` | 内部 `_areaCounter` 自增 |
| 像素读取 | `mousemove` 中手动 `getImageData` | 内部 `_onMouseMove` 自动处理 |
| 事件触发 | 手动 `this.fire('keychange', ...)` | 自动触发 `"KEY/mouseenter"` 等 |

与 `SoftKeyboard` 相同，将键盘封装为继承 `Konva.Shape` 的 `SoftKeyboardHelper` 类，提示文本和高亮框放在类外。

**类内部（构造函数完成全部初始化）：**

**步骤一：** 在 `this` 上创建 `ShapeHelper`。`width`/`height` 设为键盘包围盒尺寸，而非 stage 尺寸：

```ts
// hitLeft/hitTop/hitRight/hitBottom 由外层函数作用域的 rowBounds 预先计算
const helper = new ShapeHelper(this, {
  width: hitRight - hitLeft,
  height: hitBottom - hitTop,
});
```

ShapeHelper 的 `_getAreaAtPointer` 用 `getRelativePointerPosition()` 直接索引 hitCanvas，因此 shape 的局部坐标原点必须与 hitCanvas 左上角对齐：**外部实例化时将 shape 定位于 `(hitLeft, hitTop)`**，使局部坐标 `(0, 0)` 对应包围盒左上角，鼠标坐标转换后恰好落在 `[0, width) × [0, height)` 范围内。

**步骤二：** 多次调用 `draw()` 声明路径。所有坐标减去 `(hitLeft, hitTop)` 后传入，与 hitCanvas 局部坐标系对齐；带 `area` 的路径自动触发 `"name/mouseenter"`、`"name/mouseleave"` 等事件：

```ts
// 背景：坐标整体偏移
helper.draw(
  (ctx) => {
    ctx.beginPath();
    ctx.moveTo(startX - hitLeft, startY - hitTop);
    // ... arcTo 同样减去偏移 ...
  },
  { fillStyle: '#ddeeff' },
);

// 按键：area 声明 → 自动触发 "Q/mouseenter" 等事件
for (const key of keyList) {
  helper.draw(
    (ctx) => { ctx.beginPath(); ctx.roundRect(key.x - hitLeft, key.y - hitTop, KEY_W, KEY_H, KEY_R); },
    { fillStyle: '#e8e8e8', strokeStyle: '#aaa', area: { name: key.label, label: key.label } },
  );
}

// 文字：hitTarget: false → 仅视觉装饰，不参与命中
helper.draw(textFn, { hitTarget: false });
```

**步骤三：** 将 ShapeHelper 触发的子区域事件转为对外的 `keychange`；`x`/`y` 传原始 layer 绝对坐标，供外部直接定位高亮框：

```ts
for (const key of keyList) {
  this.on(`${key.label}/mouseenter`, () => {
    this.fire('keychange', { key: key.label, x: key.x, y: key.y }, true);
  });
  this.on(`${key.label}/mouseleave`, () => {
    this.fire('keychange', { key: '' }, true);
  });
}
```

**类外部（shape 定位于包围盒左上角，高亮框与提示文本通过 `keychange` 事件更新）：**

```ts
// x: hitLeft, y: hitTop 使 shape 局部坐标与 hitCanvas 坐标对齐
const keyboard = new SoftKeyboardHelper({ x: hitLeft, y: hitTop });

keyboard.on('keychange', (e) => {
  if (e.key) {
    highlight.position({ x: e.x, y: e.y }); // e.x/e.y 为 layer 绝对坐标
    highlight.visible(true);
    statusText.text(`当前按键：${e.key}`);
  } else {
    highlight.visible(false);
    statusText.text('移动鼠标到按键上');
  }
  layer.batchDraw();
});
```

高亮效果由独立的 `Konva.Rect`（`highlight`）承担：鼠标进入键时移到对应坐标并显示，离开时隐藏，与键盘 shape 本身解耦。

<KShape :afterMounted="softKeyboardHelperDemo" :width="420" :height="180" />
