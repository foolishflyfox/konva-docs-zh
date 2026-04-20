<script setup>
import { simpleCustomDemo } from "./codes/simple";
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
