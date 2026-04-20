<script setup>
import { simpleCustomDemo, hitFuncDemo, ringDemo } from "./codes/simple";
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
- `shape`：当前 `Konva.Shape` 实例，可通过 `shape.getAttr(key)` 读取自定义属性。

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
