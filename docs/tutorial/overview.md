# Konva 框架概览

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

原文地址: https://konvajs.org/docs/overview.html

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
