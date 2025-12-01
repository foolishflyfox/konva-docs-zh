# Sprite 精灵图

::: info 类信息

- [类关系图](../analysis/inheritance-diagram.md)
- 父类：[Shape](./shape)
- 子类: 无

:::

`Sprite` 类用于创建精灵动画，可以从一张包含多个帧的图片中播放动画序列，是 Konva 中专门用于处理精灵动画的形状类。主要功能包括：

1. 动画序列管理

- 支持定义多个动画序列
- 每个动画序列由多个帧组成，每帧用 x, y, width, height 坐标定义

2. 动画控制

- `start()`: 开始播放动画
- `stop()`: 停止动画
- `isRunning()`: 检查动画是否正在运行

3. 帧率控制

- 可以设置动画的帧率(FPS, Frames Per Second)
- 默认帧率为 17 FPS

## 构造函数

构造函数传入 `config` 参数，绿色部分为相对 `Shape` 构造函数增加的字段。

| 字段名                                               | 类型       | 描述                                             |
| ---------------------------------------------------- | ---------- | ------------------------------------------------ |
| <a class="ar"/> `animation`                          | `String`   | 动画键名                                         |
| <a class="ar"/> `animations`                         | `Object`   | 动画映射                                         |
| <a class="ar"/> `frameIndex`(可选)                   | `Integer`  | 动画帧索引号(指定初始帧)                         |
| <a class="ar"/> `image`                              | `Image`    | 图片对象(精灵图来源)                             |
| <a class="ar"/> `frameRate` (可选)                   | `Integer`  | 动画帧率                                         |
| <a class="ar"/> `fill` (可选)                        | `String`   | 背景色                                           |
| <a class="ar"/> `fillPatternImage` (可选)            | `Image`    | 填充图案图片                                     |
| <a class="ar"/>`fillPatternX`(可选)                  | `Number`   | 填充图案(pattern)的 X 轴平移位置                 |
| <a class="ar"/>`fillPatternY`(可选)                  | `Number`   | 填充图案(pattern)的 Y 轴平移位置                 |
| <a class="ar"/>`fillPatternOffset`(可选)             | `Object`   | 填充图案(pattern)的 X/Y 轴偏移位置               |
| <a class="ar"/>`fillPatternOffsetX`(可选)            | `Number`   | 填充图案(pattern)的 X 轴偏移位置                 |
| <a class="ar"/>`fillPatternOffsetY`(可选)            | `Number`   | 填充图案(pattern)的 Y 轴偏移位置                 |
| <a class="ar"/>`fillPatternScale`(可选)              | `Object`   | 填充图案(pattern)的缩放                          |
| <a class="ar"/>`fillPatternScaleX`(可选)             | `Number`   | 填充图案(pattern)的 X 缩放                       |
| <a class="ar"/>`fillPatternScaleY`(可选)             | `Number`   | 填充图案(pattern)的 Y 缩放                       |
| <a class="ar"/>`fillPatternRotation`(可选)           | `Number`   | 填充图案(pattern)的旋转角                        |
| <a class="ar"/>`fillPatternRepeat`(可选)             | `String`   | 填充重复模式(repeat/repeat-x/repeat-y/no-repeat) |
| <a class="ar"/>`fillLinearGradientStartPoint`(可选)  | `Object`   | 线性渐变填充的起始点                             |
| <a class="ar"/>`fillLinearGradientStartPointX`(可选) | `Number`   | 线性渐变填充的起始点 X 坐标                      |
| <a class="ar"/>`fillLinearGradientStartPointY`(可选) | `Number`   | 线性渐变填充的起始点 Y 坐标                      |
| <a class="ar"/>`fillLinearGradientEndPoint`(可选)    | `Object`   | 线性渐变填充的结束点                             |
| <a class="ar"/>`fillLinearGradientEndPointX`(可选)   | `Number`   | 线性渐变填充的结束点 X 坐标                      |
| <a class="ar"/>`fillLinearGradientEndPointY`(可选)   | `Number`   | 线性渐变填充的结束点 Y 坐标                      |
| <a class="ar"/>`fillLinearGradientColorStop`(可选)   | `Array`    | 线性渐变中颜色过渡的关键点                       |
| <a class="ar"/>`fillRadialGradientStartPoint`(可选)  | `Object`   | 径向渐变填充的起始点                             |
| <a class="ar"/>`fillRadialGradientStartPointX`(可选) | `Number`   | 径向渐变填充的起始点 X 坐标                      |
| <a class="ar"/>`fillRadialGradientStartPointY`(可选) | `Number`   | 径向渐变填充的起始点 Y 坐标                      |
| <a class="ar"/>`fillRadialGradientEndPoint`(可选)    | `Object`   | 径向渐变填充的结束点                             |
| <a class="ar"/>`fillRadialGradientEndPointX`(可选)   | `Number`   | 径向渐变填充的起始点 X 坐标                      |
| <a class="ar"/>`fillRadialGradientEndPointY`(可选)   | `Number`   | 径向渐变填充的起始点 Y 坐标                      |
| <a class="ar"/>`fillRadialGradientStartRadius`(可选) | `Number`   | 径向渐变填充的起始半径                           |
| <a class="ar"/>`fillRadialGradientEndRadius`(可选)   | `Number`   | 径向渐变填充的结束半径                           |
| <a class="ar"/>`fillRadialGradientColorStops`(可选)  | `Array`    | 径向渐变中颜色过渡的关键点                       |
| <a class="ar"/>`fillEnabled`(可选)                   | `Boolean`  | 是否允许填充，默认为 true                        |
| <a class="ar"/>`fillPriority`(可选)                  | `String`   | 选择填充的模式，纯色/图案/线性渐变/径向渐变      |
| <a class="ar"/>`stroke`(可选)                        | `String`   | 描边颜色                                         |
| <a class="ar"/>`strokeWidth`(可选)                   | `Number`   | 描边宽度                                         |
| <a class="ar"/>`fillAfterStrokeEnabled`(可选)        | `Boolean`  | 是否先描边后填充，默认为 false                   |
| <a class="ar"/>`hitStrokeWidth`(可选)                | `Number`   | 击中的描边大小。默认 auto，等于 strokeWidth      |
| <a class="ar"/>`strokeHitEnable`(可选)               | `Boolean`  | 已废弃，建议用 hitStrokeWidth                    |
| <a class="ar"/>`perfectDrawEnabled`(可选)            | `Boolean`  | 是否使用缓存画布(效果好，性能差)，默认 true      |
| <a class="ar"/>`shadowForStrokeEnabled`(可选)        | `Boolean`  | 启用或禁用描边阴影的标志。默认值为 true          |
| <a class="ar"/>`strokeScaleEnabled`(可选)            | `Boolean`  | 启用或禁用描边缩放的标志。默认值为 true          |
| <a class="ar"/>`strokeEnabled`(可选)                 | `Boolean`  | 是否支持描边，默认为 true                        |
| <a class="ar"/>`lineJoin`(可选)                      | `String`   | 线连接方式 `miter`/`round`/`bevel`，默认 `miter` |
| <a class="ar"/>`lineCap`(可选)                       | `String`   | 线帽 `butt`/`round`/`square`，默认 `butt`        |
| <a class="ar"/>`shadowColor`(可选)                   | `String`   | 阴影颜色                                         |
| <a class="ar"/>`shadowBlur`(可选)                    | `Number`   | 阴影模糊值                                       |
| <a class="ar"/>`shadowOffset`(可选)                  | `Object`   | 阴影偏移 `{x: number, y: number}`                |
| <a class="ar"/>`shadowOffsetX`(可选)                 | `Number`   | 阴影 X 轴的偏移                                  |
| <a class="ar"/>`shadowOffsetY`(可选)                 | `Number`   | 阴影 Y 轴的偏移                                  |
| <a class="ar"/>`shadowOpacity`(可选)                 | `Number`   | 阴影不透明度                                     |
| <a class="ar"/>`shadowEnabled`(可选)                 | `Boolean`  | 是否启用阴影                                     |
| <a class="ar"/>`dash`(可选)                          | `number[]` | 虚线描边效果                                     |
| <a class="ar"/>`dashEnabled`(可选)                   | `Boolean`  | 是否启用虚线描边                                 |
| `x` (可选)                                           | `Number`   | 位置：x 坐标                                     |
| `y` (可选)                                           | `Number`   | 位置：y 坐标                                     |
| `width` (可选)                                       | `Number`   | 宽度                                             |
| `height` (可选)                                      | `Number`   | 高度                                             |
| `visible` (可选)                                     | `Boolean`  | 是否可见                                         |
| `listening` (可选)                                   | `Boolean`  | 节点是否正在监听事件                             |
| `id`(可选)                                           | `String`   | 唯一 id                                          |
| `name`(可选)                                         | `String`   | 非唯一的名称                                     |
| `opacity`(可选)                                      | `Number`   | 不透明度，0 ～ 1 间的数值                        |
| `scale`(可选)                                        | `Object`   | 缩放大小                                         |
| `scaleX`(可选)                                       | `Number`   | x 方向上的缩放                                   |
| `scaleY`(可选)                                       | `Number`   | y 方向上的缩放                                   |
| `rotation`(可选)                                     | `Number`   | 旋转角度                                         |
| `offset`(可选)                                       | `Object`   | 相对于中心点和旋转点的偏移                       |
| `offsetX`(可选)                                      | `Number`   | x 方向上的偏移                                   |
| `offsetY`(可选)                                      | `Number`   | y 方向上的偏移                                   |
| `draggable`(可选)                                    | `Boolean`  | 节点是否可被拖拽                                 |
| `dragDistance`(可选)                                 | `Number`   | 触发拖拽的距离阈值                               |
| `dragBoundFunc`(可选)                                | `function` | 拖拽过程中限制或修改节点的位置的回调函数         |

## 自带方法

### start()

启动精灵动画。

### stop()

停止精灵动画。

### isRunning()

确定精灵动画是否处于运行状态，返回 `true` 或 `false`。

### animation(anim)

设置/获取动画键名。

**参数：**

- `anim`: String，动画键名

**例子：**

```js
// 获取动画键名
var animation = sprite.animation();

// 设置动画键名
sprite.animation("kicking");
```

### animations(animations)

获取/设置动画序列映射。

**例子：**

```js
// 获取动画序列映射
var animations = sprite.animations();
// 设置动画序列映射
// prettier-ignore
sprite.animations({
  standing: [
    // x, y, width, height (6 帧)
    0, 0, 49, 109,
    52, 0, 49, 109,
    105, 0, 49, 109,
    158, 0, 49, 109,
    210, 0, 49, 109,
    262, 0, 49, 109
  ],
  kicking: [
    // x, y, width, height (6 帧)
    0, 109, 45, 98,
    45, 109, 45, 98,
    95, 109, 63, 98,
    156, 109, 70, 98,
    229, 109, 60, 98,
    287, 109, 41, 98
  ]
});
```

### frameOffsets(offsets)

获取/设置帧偏移。

**例子：**

```js
// 获取帧偏移
var offsets = sprite.frameOffsets();
// 设置帧偏移
// prettier-ignore
sprite.offsets({
    standing: [
    // x, y (6 frames)
    0, 0,
    0, 0,
    5, 0,
    0, 0,
    0, 3,
    2, 0
  ],
  kicking: [
    // x, y (6 frames)
    0, 5,
    5, 0,
    10, 0,
    0, 0,
    2, 1,
    0, 0
  ]
})
```

### image(image)

获取/设置精灵图来源图片。

### frameIndex(frameIndex)

获取/设置帧索引。

**例子：**

```js
// 获取动画帧索引
var frameIndex = sprite.frameIndex();

// 设置动画帧索引
sprite.frameIndex(3);
```

### frameRate(frameRate)

获取/设置帧率(FPS)。该值越大，表示精灵图动画越快，该值越小，表示精灵图动画越慢。默认值为 17 FPS。

**参数：**

- `frameRate`: `Integer`

**例子：**

```js
// 获取帧率
var frameRate = sprite.frameRate();
// 设置帧率为 2 FPS
sprite.frameRate(2);
```

## 继承方法
