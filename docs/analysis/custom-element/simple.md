<script setup>
import { simpleCustomDemo, hitFuncDemo, ringDemo, pixelTextDemo, rainbowDemo, rainbowSingleDemo, multiBeginPathDemo, numericInputDemo } from "./codes/simple";
</script>

# 自定义元素（简单示例）

Konva.js 内置了丰富的图形（`Rect`、`Circle`、`Line` 等），但当这些内置图形无法满足需求时，可以通过 `Konva.Shape` 创建任意自定义图形。

## 核心：sceneFunc

自定义图形的核心是为 `Konva.Shape` 提供一个 `sceneFunc` 绘制函数：

```js
const shape = new Konva.Shape({
  x: 100,
  y: 100,
  fill: '#4ECDC4',
  stroke: '#2C3E50',
  strokeWidth: 3,
  sceneFunc: function (context, shape) {
    // context: Konva.Context，对原生 CanvasRenderingContext2D 的封装
    // shape: 当前 Konva.Shape 实例
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

本质上做了三件事：

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

```js
const hexagon = new Konva.Shape({
  x: 150,
  y: 100,
  fill: '#4ECDC4',
  stroke: '#2C3E50',
  strokeWidth: 3,
  sceneFunc: function (context, shape) {
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

```js
class Hexagon extends Konva.Shape {
  _sceneFunc(context) {
    const radius = this.getAttr('radius') || 50;
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

```js
const shape = new Konva.Shape({
  x: 150,
  y: 100,
  fill: '#FF6B6B',
  stroke: '#2C3E50',
  strokeWidth: 2,
  sceneFunc: function (context, shape) {
    // 绘制六边形（视觉）
    drawHexPath(context, 50);
    context.fillStrokeShape(shape);
  },
  hitFunc: function (context, shape) {
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

```js
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

```js
// Layer.js — _getIntersection()
const p = this.hitCanvas.context.getImageData(
  Math.round(pos.x * ratio),
  Math.round(pos.y * ratio),
  1, 1
).data; // [r, g, b, a]

if (p[3] === 255) { // alpha=255 说明有图形覆盖此点
  const colorKey = Util._rgbToHex(p[0], p[1], p[2]); // rgb → hex
  const shape = shapes[HASH + colorKey];              // 反查 map
  if (shape) return { shape };
}
```

找到 shape 后，Konva 就知道鼠标当前在哪个 shape 上，从而触发 `mouseenter`、`mousemove`、`click` 等事件。

本质上是把**"鼠标在哪个形状上"这个几何问题，转换成"这个像素是什么颜色"这个像素读取问题**，完全依赖 `getImageData` API，不涉及任何几何计算。

### 抗锯齿边缘的螺旋搜索

图形边缘因抗锯齿产生半透明混合像素（alpha < 255），颜色已不是纯 `colorKey`，直接读会查不到 shape。Konva 的解法是向外做螺旋扩展搜索，直到找到 alpha = 255 的像素为止：

```js
// Layer.js — getIntersection()
let spiralSearchDistance = 1;
while (true) {
  for (let i = 0; i < INTERSECTION_OFFSETS_LEN; i++) {
    const obj = this._getIntersection({
      x: pos.x + intersectionOffset.x * spiralSearchDistance,
      y: pos.y + intersectionOffset.y * spiralSearchDistance,
    });
    if (obj.antialiased) { spiralSearchDistance += 1; } // 向外扩一圈再查
    else break;
  }
}
```

## hitFunc 的默认实现原理

"不设置 `hitFunc` 时，Konva 默认用 `sceneFunc` 绘制的路径作为命中区域"——这一行为的实现藏在 `Shape.drawHit()` 的一行代码里：

```js
// Shape.js — drawHit() 内部
const drawFunc = this.hitFunc() || this.sceneFunc();
```

`hitFunc()` 读取 `attrs.hitFunc` 或子类的 `_hitFunc`，若两者均未定义则返回 `undefined`，于是 `drawFunc` 回退到 `sceneFunc`，**直接把 sceneFunc 当 hitFunc 在 hit canvas 上执行**：

```js
drawFunc.call(this, context, this); // context 此时是 HitContext 实例
```

### HitContext 的多态替换

传入 `sceneFunc` 的 `context` 是 `HitContext` 实例，而非普通的 `SceneContext`。`HitContext` 覆写了基类的 `_fill` 和 `_stroke`：

```js
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

```js
sceneFunc(context, shape) {
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

```js
sceneFunc(context, shape) {
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

圆环（Donut）是 `hitFunc` 的典型应用场景——视觉上是一个镂空的圆环，命中区域也应该排除中心空洞，否则鼠标移到空洞上也会错误触发事件。

绘制镂空路径的关键在于：**外圆顺时针、内圆逆时针**。在 canvas 的非零绕数（nonzero）填充规则下，两段路径绕数相消，中心区域不被填充，命中检测也自然排除该区域：

```js
context.beginPath();
context.arc(0, 0, outerRadius, 0, Math.PI * 2, false); // 外圆，顺时针
context.moveTo(innerRadius, 0);                         // 抬笔，避免外圆到内圆的连线
context.arc(0, 0, innerRadius, 0, Math.PI * 2, true);  // 内圆，逆时针，形成镂空
context.closePath();
context.fillStrokeShape(shape);
```

`sceneFunc` 和 `hitFunc` 使用相同的路径，保证视觉与命中区域完全一致：

```js
const ring = new Konva.Shape({
  x: 150,
  y: 120,
  fill: '#4CAF50',
  stroke: '#2C3E50',
  strokeWidth: 2,
  sceneFunc: function (context, shape) {
    context.beginPath();
    context.arc(0, 0, 75, 0, Math.PI * 2, false);
    context.moveTo(35, 0);
    context.arc(0, 0, 35, 0, Math.PI * 2, true);
    context.closePath();
    context.fillStrokeShape(shape);
  },
  hitFunc: function (context, shape) {
    context.beginPath();
    context.arc(0, 0, 75, 0, Math.PI * 2, false);
    context.moveTo(35, 0);
    context.arc(0, 0, 35, 0, Math.PI * 2, true);
    context.closePath();
    context.fillStrokeShape(shape);
  },
});

ring.on('mouseenter', () => {
  ring.fill('#FF9800');
  layer.batchDraw();
});
ring.on('mouseleave', () => {
  ring.fill('#4CAF50');
  layer.batchDraw();
});
```

将鼠标移入圆环区域，颜色变为橘黄色；移入中心空洞，事件不触发，颜色保持不变：

<KShape :afterMounted="ringDemo" :width="320" :height="220" />

## 示例：按像素命中的文字

`Konva.Text` 的默认 `hitFunc` 使用整个文字包围矩形，字母镂空处（如"o"、"a"内部）同样可触发事件。

要实现像素级命中，需要自定义 shape，在 `hitFunc` 中用 `fillText` / `strokeText` 将文字笔画直接绘制到 hit canvas 上。关键点在于：Konva **不会**在调用 `hitFunc` 前预设命中色，需要手动将 `fillStyle` / `strokeStyle` 设置为 `shape.colorKey`——这是 Konva 为每个 shape 分配的唯一标识色，用于 hit canvas 的像素识别。

```js
const shape = new Konva.Shape({
  x: 200,
  y: 75,
  fill: '#4CAF50',
  stroke: '#4CAF50',
  strokeWidth: 8,
  sceneFunc(context, shape) {
    context.setAttr('font', 'bold 72px Arial');
    context.setAttr('textAlign', 'center');
    context.setAttr('textBaseline', 'middle');
    context.setAttr('lineWidth', shape.getAttr('strokeWidth'));
    context.setAttr('strokeStyle', shape.getAttr('stroke'));
    context.strokeText('Konva', 0, 0);
    context.setAttr('fillStyle', shape.getAttr('fill'));
    context.fillText('Konva', 0, 0);
  },
  hitFunc(context, shape) {
    const hitColor = shape.colorKey; // Konva 分配给该 shape 的唯一命中色
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

```js
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

```js
const colors = ['#FF0000', '#FF7F00', '#FFFF00', '#00AA00', '#0000FF', '#4B0082', '#9400D3'];
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
    sceneFunc(context, shape) {
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

```js
const bandFromInner = Math.floor((r - baseRadius) / bandWidth); // 0=最内 ~ 6=最外
const colorIdx = colors.length - 1 - bandFromInner;            // 对应 colors 下标
```

**难点二：必须定义 `hitFunc`。** `sceneFunc` 里对每个色带手动调用 `context.fill()`，绕过了 `fillStrokeShape` 的 `colorKey` 机制。若不定义 `hitFunc`，hit canvas 上画的是视觉色而非 `colorKey`，`mousemove` 完全失效。`hitFunc` 将整个彩虹区域（排除中心空洞）作为一个整体命中区域，配合 `fillStrokeShape` 确保正确识别。

```js
const rainbow = new Konva.Shape({
  x: cx,
  y: cy,
  sceneFunc(context, _shape) {
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
  hitFunc(context, shape) {
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

```js
let value = 0;
const btnW = 26, totalH = 26, displayW = 72, r = 5;

const numInput = new Konva.Shape({
  x: shapeX, y: shapeY,
  sceneFunc(context, _shape) {
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
  hitFunc(context, shape) {
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
