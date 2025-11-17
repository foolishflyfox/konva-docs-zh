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

## 全局配置属性

### static autoDrawEnabled 是否自动重绘

`Konva.autoDrawEnabled` 用于控制 Konva 是否在节点属性变化时自动重绘画布，默认值为 **true**。

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

### static hitOnDragEnable 拖动时是否进行碰撞检测

控制在拖拽过程中是否启用碰撞检测(hit detection) ？为了性能优化，此项默认是关闭的(`false`)。在某些特殊情况下,您可能需要在拖拽时查看碰撞图并检查交集,此时可以将其设置为 true。

**默认值:** `false`

### static capturePointerEventsEnabled 是否捕获鼠标时间

用于控制是否捕获指针事件并将其绑定到初始触摸目标。

**默认值:** `false`

**默认行为:** 当指针移出初始元素时,事件会在新元素上触发

**启用后行为:** 模拟 DOM 元素的行为,事件会继续在初始触摸的目标上触发,即使指针已经移出该元素

### static legacyTextRendering

使用传统文本渲染方式，其基线默认对齐方式为 "middle"(即垂直居中)。

**默认值:** `false`

### static pixelRatio 像素比例调整

控制 Konva 画布的像素比率,以便在不同设备上实现清晰的渲染效果，简而言之，会改变图形看起来的清晰度。

**默认值**: 自动检测设备的 window.devicePixelRatio,如果不在浏览器环境则为 1

:::tip

devicePixelRatio (设备像素比，简称 DPR)是一个非常重要的前端概念，它反映了物理像素与逻辑像素(也称为 CSS 像素)之间的比例关系。`devicePixelRatio = 物理像素 / 逻辑像素`，表明一个 CSS 像素的宽度，实际上填充了多少个物理像素。

**为什么需要它？**

早期的显示器 DPR = 1，一个 CSS 像素就对应屏幕上一个物理像素。

但随着 Retina（视网膜）屏等高分辨率屏幕的普及，在同样大小的物理尺寸上，厂商塞进了更多的物理像素。如果仍然用 1 CSS 像素 = 1 物理像素来渲染，所有的文字、图片、UI 元素都会变得非常小，无法看清。

为了解决这个问题，操作系统和浏览器引入了“逻辑像素”的概念。它们将多个物理像素虚拟成一个逻辑像素（CSS 像素）来使用。这个“多个”就是 devicePixelRatio。

:::

### static dragDistance 触发拖拽的距离阈值

当您开始拖拽一个节点时，您可能希望等待指针从起始点移动一定距离后再触发拖拽。此属性即为该距离阈值，其**默认值为 3 像素**。

### static angleDeg 角度/弧度

指定旋转时参数的单位为角度还是弧度。为 `true` 时表示使用角度，为 `false` 时表示使用弧度，**默认为 true**，例如：

```js
node.rotation(45); // 旋转 45 度
Konva.angleDeg = false;
node.rotation(Math.PI / 2); // 旋转 PI/2 弧度，也就是 90 度
```

### static showWarnings 是否显示报警信息

用于控制是否在控制台显示 Konva 的警告信息，**默认值为 true**。当设置为 false 时,Konva 会抑制所有警告信息的输出

Konva 在以下情况会显示告警信息：

1. Stage 层数过多：当 Stage 添加超过推荐数量的 Layer 时；
2. Stage 不支持裁剪：当尝试在 Stage 上使用裁剪功能时；
3. 无效的选择器: 当使用错误格式的选择器查找节点时；
4. 组件 setter 使用非对象值: 当为组件属性设置器传入错误类型的值时；
5. 无效的 zIndex 值: 当设置不合理的 zIndex 值时；
6. stroke 属性验证: 当 stroke 属性值不符合预期时；

`showWarnings` 是一个开发辅助工具,帮助开发者在开发过程中发现潜在的 API 误用或性能问题。 在生产环境中,您可以选择禁用它以减少控制台输出,但建议在开发阶段保持启用状态。

### static dragButtons 拖拽键

配置鼠标的哪个键可用于拖放。默认值为 `[0]`，表示仅鼠标左键支持拖放。

例如：

```js
// 设置鼠标左键和右键都支持拖放
Konva.dragButtons = [0, 2];
```

### static releaseCanvasOnDestroy 销毁时释放 Canvas

指定在释放销毁 Konva 元素时，是否释放 canvas 元素，**默认值为 true**。避免 macOS / iOS 上的 Safari 浏览器的内存泄漏问题。

## 全局函数

### isDragging() 是否正在拖拽

检查当前是否有任何节点正在进行拖拽操作。

### isDragReady() 拖拽是否准备就绪

检查拖拽操作是否已准备就绪但尚未开始。主要用于区分"用户按下了可拖拽节点"和"用户实际开始拖拽"这两个状态。这在需要精确控制拖拽行为的场景中很有用,例如在拖拽准备阶段显示不同的视觉反馈。
