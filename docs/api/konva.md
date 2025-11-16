# Konva 命名空间

> 原文地址: https://konvajs.org/api/Konva.html

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

Konva 是否要在发生任意变化时自动更新画布。

**默认值:** `true`

**例子:**

```js
Konva.autoDrawEnabled = true;
```

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
