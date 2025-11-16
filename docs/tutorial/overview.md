# Konva 框架概览

原文地址: https://konvajs.org/docs/overview.html

<script setup>
import { KCircle, KShape } from "@docs/components/kshapes";
import { createLayer } from "@docs/utils";

function basicShapeDrawer(stage) {
  var triangle = new Konva.Shape({
    sceneFunc: function (context) {
      context.beginPath();
      context.moveTo(20, 50);
      context.lineTo(220, 80);
      context.quadraticCurveTo(150, 100, 260, 170);
      context.closePath();
      context.fillStrokeShape(this);
    },
    fill: '#00D2FF',
    stroke: 'black',
    strokeWidth: 4,
  });
  createLayer(stage).add(triangle);
}

function stylesShapeDrawer(stage) {
  const pentagon = new Konva.RegularPolygon({
    x: stage.width() / 2,
    y: stage.height() / 2,
    sides: 5,
    radius: 70,
    fill: 'red',
    stroke: 'black',
    strokeWidth: 4,
    shadowOffsetX: 20,
    shadowOffsetY: 25,
    shadowBlur: 40,
    opacity: 0.5,
  });
  createLayer(stage).add(pentagon);
}
</script>

## 什么是 Konva？

Konva 是一个 HTML5 的 Canvas JavaScript 框架，增强了原生的 2d context 的交互功能，可用于桌面应用和移动应用。

Konva 让桌面与移动应用都能拥有高性能动画、平滑过渡、节点嵌套、分层、滤镜、缓存、事件处理等丰富功能，并且远不止于此。

## Konva 是怎么工作的？

一切从 `Konva.Stage` 开始，`Stage` 包含多个用户层(`Konva.Layer`)。

每一层都有两个 `<canvas>` 渲染器：一个场景渲染器和一个点击图渲染器。场景渲染器是你能看到的内容，而点击图渲染器是一个特殊的隐藏画布，用于高性能的事件检测。

每一层都已包含图形、图形组成的组、由图形组组成的组。其中 stage、layers、groups 和 shapes 是虚拟节点，类似于 HTML 页面的 DOM 节点。

下面是节点层级的示例：

```txt:no-line-numbers
                   Stage
                     |
              +------+------+
              |             |
            Layer         Layer
              |             |
        +-----+-----+     Shape
        |           |
      Group       Group
        |           |
        +       +---+---+
        |       |       |
     Shape   Group    Shape
                |
                +
                |
              Shape
```

所有节点都可以设置样式和进行变换。尽管 Konva 已内置多种形状——如矩形、圆形、图像、精灵图、文本、直线、多边形、正多边形、路径、星形等——你仍可通过实例化 Shape 类并自定义绘制函数来创建任意自定义形状。

一旦你搭建好包含图层和形状的 stage，就可以绑定事件监听器、变换节点、运行动画、应用滤镜、 ...，等等操作。

最小代码演示：

```ts
// 我们先要创建一个 stage
var stage = new Konva.Stage({
  container: "container", // 要挂载的目标容器 <div> 的 id
  width: 500,
  height: 500,
});

// 接着创建一个图层
var layer = new Konva.Layer();

// 创建一个图形
var circle = new Konva.Circle({
  x: stage.width() / 2,
  y: stage.height() / 2,
  radius: 70,
  fill: "red",
  stroke: "black",
  strokeWidth: 4,
});

// 向图层中添加图形
layer.add(circle);

// 将图层添加到 stage
stage.add(layer);
```

结果为：

<KCircle :radius="70" fill="red" stroke="black" :strokeWidth="4" :width="160" :height="160" />

## 基础图形

Konva.js 支持的图形包括：[矩形](./shapes/rect)、[圆](./shapes/circle)、[椭圆](./shapes/ellipse.md)、[线](./shapes/line.md)、[多边形](./shapes/line_polygon.md)、[精灵图](./shapes/sprite.md)、[不规则图](./shapes/line_blob.md)、[图片](./shapes/image.md)、[文本](./shapes/text.md)、[文本路径](./shapes/text-path.md)、[星形](./shapes/star.md)、[标签](./shapes/star.md)、[SVG 路径](./shapes/path.md)、[正多边形](./shapes/regular-polygon.md)。另外你也可以创建 [自定义图形](./shapes/custom.md):

```js
var triangle = new Konva.Shape({
  sceneFunc: function (context) {
    context.beginPath();
    context.moveTo(20, 50);
    context.lineTo(220, 80);
    context.quadraticCurveTo(150, 100, 260, 170);
    context.closePath();

    // special Konva.js method
    context.fillStrokeShape(this);
  },
  fill: "#00D2FF",
  stroke: "black",
  strokeWidth: 4,
});
```

<KShape :afterMounted="basicShapeDrawer" :width="280" :height="180" />

## 样式

每个图形支持以下的样式属性：

- Fill: 填充，可以是纯色、渐变色或图片
- Stoke: 描边（颜色，宽度）
- Shadow: 阴影（颜色、偏移、不透明度、模糊）
- Opacity: 不透明度

```js
var pentagon = new Konva.RegularPolygon({
  x: stage.width() / 2,
  y: stage.height() / 2,
  sides: 5,
  radius: 70,
  fill: "red",
  stroke: "black",
  strokeWidth: 4,
  shadowOffsetX: 20,
  shadowOffsetY: 25,
  shadowBlur: 40,
  opacity: 0.5,
});
```

<KShape :afterMounted="stylesShapeDrawer" :width="280" :height="180" />

## 事件

通过 Konva 你能很容易地监听以下事件：

- 用户的输入事件（包括 `click`单击、`dblclick`双击、`mouseover`鼠标移动、`tap`轻击、`dbltap`双轻击、`touchstart`触摸开始等等）；
- 属性改变事件（`scaleXChange`X 轴缩放、`fillChange`填充改变）；
- 拖拽事件（`dragstart`拖拽开始、`dragmove`拖拽移动、`dragend`拖拽结束）；

```js
circle.on("mouseout touchend", function () {
  console.log("user input");
});

circle.on("xChange", function () {
  console.log("position change");
});

circle.on("dragend", function () {
  console.log("drag stopped");
});
```

详细内容参见 [事件绑定](./events/binding-events)。

## 拖放

Konva 内置了对拖拽的支持。目前没有 **放置** 事件(例如 `drop`、`dragenter`、`dragleave`、`dragover`)，但[通过框架](./drag-drop/drop-events.md)可以轻而易举地实现它们。

通过设置 `draggable` 属性为 `true` 就启用了拖放功能。

```js
shape.draggable(true);
```

之后，你就可以订阅拖放事件，并设置[移动限制](./drag-drop/complex-drag-drop.md)。

## 滤镜

Konva 包含多种滤镜：模糊、反转、降噪等。可通过[滤镜 API](../api/filters.md) 查看所有滤镜。

一个滤镜使用的例子：

![滤镜使用示例](./assets/overview/overview-filter-demo.png)

## 动画

你有两种方式创建动画：

1. 通过 `Konva.Animation`，[例子](./animations/moving.md)：

```js
var anim = new Konva.Animation(function (frame) {
  var time = frame.time,
    timeDiff = frame.timeDiff,
    frameRate = frame.frameRate;
  // 更新数据
}, layer);
anim.start();
```

2. 通过 `Konva.Tween`，[例子](./tweens/linear-easing.md)：

```js
var tween = new Konva.Tween({
  node: rect,
  duration: 1,
  x: 140,
  rotation: Math.PI * 2,
  opacity: 1,
  strokeWidth: 6,
});
tween.play();

// 或使用新的简化方法:
circle.to({
  duration: 1,
  fill: "green",
});
```

## 选择器

当你在开发大型应用时，选择器对搜索元素有大用途。你可以使用 `find()` 函数(返回一个集合)或 `findOne()` 函数(返回集合中的第一个元素)。

```js
var circle = new Konva.Circle({
  radius: 10,
  fill: "red",
  id: "face",
  name: "red circle",
});
layer.add(circle);

// 接着尝试搜索

// 通过类型搜寻
layer.find("Circle"); // returns array of all circles

// 通过 id 搜寻
layer.findOne("#face");

// 通过名称搜寻（类似于 css 类）
layer.find(".red");
```

## 序列化与反序列化

所有创建的对象都可以保存为 JSON。你可以将其保存到服务器或本地存储。

```js
var json = stage.toJSON();
```

你也可以从 JSON 恢复对象：

```js
var json =
  '{"attrs":{"width":578,"height":200},"className":"Stage","children":[{"attrs":{},"className":"Layer","children":[{"attrs":{"x":100,"y":100,"sides":6,"radius":70,"fill":"red","stroke":"black","strokeWidth":4},"className":"RegularPolygon"}]}]}';

var stage = Konva.Node.create(json, "container");
```

## 性能

Konva 提供了诸多提升应用速度的工具。其中最重要的方法是：

1. 缓存：缓存允许您将元素绘制到缓冲画布中，然后从该画布中绘制元素。对于复杂节点（如带有阴影和描边的文本或形状），这可能会大幅提升性能。[示例](./performance/shape-caching.md)

```js
shape.cache();
```

2. 分层机制：由于本框架支持多个 `<canvas>` 元素，您可以酌情放置对象。例如，如果您的应用包含一个复杂的背景和若干移动图形，您可以将背景置于一个图层，将图形置于另一个图层。这样，在更新图形时，就无需重新绘制背景画布。 [示例](./performance/layer-management.md)

你可以从这里找到所有可行的性能优化技巧: [所有性能优化技巧](./performance/all-performance-tips.md) 。
