# Konva 命名空间

> 原文地址: https://konvajs.org/api/Konva.html

<script setup>
import { KShape } from "@docs/components/kshapes";
import { autoDrawEnabledDemo, closeAutoDrawEnabledDemo } from './codes/konva';
</script>

## 类

- [Transform 变换](./transform)
- [Context 上下文](./context)
- [Convas 画布](./canvas)
- [Node 节点](./node)
- [Container 容器](./container)
- [Stage 舞台](./stage)
- [Shape 图形](./shape)
- [FastLayer 快图层](./fast-layer)
- [Group 组](./group)
- [Animation 动画](./animation)
- [Tween 补间动画](./tween)
- [Arc 圆弧](./arc)
- [Line 线](./line)
- [Path 路径](./path)
- [Arrow 箭头](./arrow)
- [Circle 圆](./circle)
- [Ellipse 椭圆](./ellipse)
- [Image 图片](./image)
- [Label 标签](./label)
- [Tag 标签背景](./tag)
- [Rect 矩形](./rect)
- [RegularPolygon 正多边形](./regular-polygon)
- [Ring 环](./ring)
- [Spirte 精灵图](./sprite)
- [Star 星形](./star)
- [Text 文本](./text)
- [TextPath 文本路径](./text-path)
- [Transformer 变换器](./transformer)
- [Wedge 楔形](./wedge)

## 命名空间

- [Util 工具集](./util.md)
- [Easings 缓动函数集](./easings.md)
- [Filters 滤镜集](./filters.md)

## 属性

## static autoDrawEnabled

`Konva.autoDrawEnabled` 是一个全局配置属性,用于控制 Konva 是否在节点属性变化时自动重绘画布，默认值为 **true**。

该值为 `true` 时，会在以下情况自动调用 [layer.batchDraw()](./layer#batch-draw) 进行重绘:

- 修改节点属性(如位置、颜色、大小等)
- 添加或删除节点
- 执行缓存操作
- 改变节点顺序

**示例 1: 自动重绘(默认行为)**

```js
// Konva.autoDrawEnabled 默认为 true
var layer = new Konva.Layer();
var circle = new Konva.Circle({
  x: 50,
  y: 50,
  radius: 45,
  fill: "green",
});
layer.add(circle);

// 修改属性时自动重绘,无需手动调用 layer.draw()
circle.radius(35); // 自动触发 layer.batchDraw()
circle.fill("#0bf"); // 自动触发 layer.batchDraw()
```

<KShape :afterMounted="autoDrawEnabledDemo" :width="100" :height="100" />

可以看到通过改变 circle 的属性，canvas 上显示的画面也改变了。

**示例 2: 禁用自动重绘**

下面的例子添加了 `Konva.autoDrawEnabled = false`。

```js
// 关闭自动重绘
Konva.autoDrawEnabled = false;
var layer = new Konva.Layer();
var circle = new Konva.Circle({
  x: 50,
  y: 50,
  radius: 45,
  fill: "green",
});
layer.add(circle);

circle.radius(35);
circle.fill("#0bf");
```

结果为如下，可以看到 circle 都没绘制出来，因为添加 circle 的操作也属于数据变化，但是没有触发重绘，所以没显示出来，可以通过 `layer.draw()` 进行手动重绘。

<KShape :afterMounted="closeAutoDrawEnabledDemo" :width="100" :height="100" />

:::tip

- 自动重绘功能在 Konva 8.0.0 版本引入
- 实现上使用 `batchDraw()` 而非 `draw()` 是因为它会延迟到下一个动画帧执行，性能更好
- 在高性能场景(如粒子系统、大量动画对象)中,建议禁用自动重绘并手动控制重绘时机,避免每次属性变化都触发重绘

:::

## static hitOnDragEnable

是否在拖拽时进行命中检测（即检查图形是否被击中）？为了性能优化，此项默认是关闭的(`false`)。不过，如果您需要在拖拽时查看图形的命中区域或检测交互，请将其开启（设为 true）

**默认值:** `false`

**例子:**

```js
Konva.hitOnDragEnabled = true;
```

## static capturePointerEventsEnabled

我们是否应捕获触摸事件并将其绑定到 `touchstart` 的目标元素？这正是 DOM 元素的工作机制。具体场景如下：我们在 div1 上触发 `touchstart`，然后将手指移出该元素，进入另一个元素 div2。DOM 会继续在 div1（而非 div2）上触发 `touchmove` 事件，因为事件已被“捕获”到初始目标中。默认情况下，Konva 不这样做，它会在指针移动时，在另一个元素上触发 `touchmove` 事件。

**默认值:** `false`

**例子:**

```js
Konva.capturePointerEventsEnabled = true;
```
