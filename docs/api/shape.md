# Shape 图形

::: info 类信息

- [类关系图](../analysis/inheritance-diagram.md)
- 父类：[Node](./node)
- 子类：[Arc](./arc) / [Circle](./circle) / [Ellipse](./ellipse) / [Image](./image) / [Label](./label) / [Line](./line) / [Path](./path) / [Rect](./rect) / [RegularPolygon](./regular-polygon) / [Ring](./ring) / [Sprite](./sprite) / [Star](./star) / [Text](./text) / [TextPath](./text-path) / [Wedge](./wedge)

:::

`Shape` 是如矩形、圆形、文本、线条等的基类。

## 参数

| 字段名                                                    | 类型       | 描述                                        |
| --------------------------------------------------------- | ---------- | ------------------------------------------- |
| <a class="add-row"/>`fill`(可选)                          | `String`   | 填充色标                                    |
| <a class="add-row"/>`fillPatternImage`(可选)              | `String`   | 填充图案图片                                |
| <a class="add-row"/>`fillPatternX`(可选)                  | `Number`   | 填充图案(pattern)的 X 轴平移位置            |
| <a class="add-row"/>`fillPatternY`(可选)                  | `Number`   | 填充图案(pattern)的 Y 轴平移位置            |
| <a class="add-row"/>`fillPatternOffset`(可选)             | `Object`   | 填充图案(pattern)的 X/Y 轴偏移位置          |
| <a class="add-row"/>`fillPatternOffsetX`(可选)            | `Object`   | 填充图案(pattern)的 X 轴偏移位置            |
| <a class="add-row"/>`fillPatternOffsetY`(可选)            | `Object`   | 填充图案(pattern)的 Y 轴偏移位置            |
| <a class="add-row"/>`fillPatternScale`(可选)              | `Object`   | 填充图案(pattern)的缩放                     |
| <a class="add-row"/>`fillPatternScaleX`(可选)             | `Object`   | 填充图案(pattern)的 X 缩放                  |
| <a class="add-row"/>`fillPatternScaleY`(可选)             | `Object`   | 填充图案(pattern)的 Y 缩放                  |
| <a class="add-row"/>`fillPatternRotation`(可选)           | `Object`   | 填充图案(pattern)的旋转角度                 |
| <a class="add-row"/>`fillLinearGradientStartPoint`(可选)  | `Object`   | 线性渐变填充的起始点                        |
| <a class="add-row"/>`fillLinearGradientStartPointX`(可选) | `Number`   | 线性渐变填充的起始点 X 坐标                 |
| <a class="add-row"/>`fillLinearGradientStartPointY`(可选) | `Number`   | 线性渐变填充的起始点 Y 坐标                 |
| <a class="add-row"/>`fillLinearGradientEndPoint`(可选)    | `Object`   | 线性渐变填充的结束点                        |
| <a class="add-row"/>`fillLinearGradientEndPointX`(可选)   | `Number`   | 线性渐变填充的结束点 X 坐标                 |
| <a class="add-row"/>`fillLinearGradientEndPointY`(可选)   | `Number`   | 线性渐变填充的结束点 Y 坐标                 |
| <a class="add-row"/>`fillLinearGradientColorStop`(可选)   | `Array`    | 线性渐变中颜色过渡的关键点                  |
| <a class="add-row"/>`fillRadialGradientStartPoint`(可选)  | `Object`   | 径向渐变填充的起始点                        |
| <a class="add-row"/>`fillRadialGradientStartPointX`(可选) | `Number`   | 径向渐变填充的起始点 X 坐标                 |
| <a class="add-row"/>`fillRadialGradientStartPointY`(可选) | `Number`   | 径向渐变填充的起始点 Y 坐标                 |
| <a class="add-row"/>`fillRadialGradientEndPoint`(可选)    | `Object`   | 径向渐变填充的结束点                        |
| <a class="add-row"/>`fillRadialGradientEndPointX`(可选)   | `Number`   | 径向渐变填充的起始点 X 坐标                 |
| <a class="add-row"/>`fillRadialGradientEndPointY`(可选)   | `Number`   | 径向渐变填充的起始点 Y 坐标                 |
| <a class="add-row"/>`fillRadialGradientStartRadius`(可选) | `Number`   | 径向渐变填充的起始半径                      |
| <a class="add-row"/>`fillRadialGradientEndRadius`(可选)   | `Number`   | 径向渐变填充的结束半径                      |
| <a class="add-row"/>`fillRadialGradientColorStops`(可选)  | `Array`    | 径向渐变中颜色过渡的关键点                  |
| <a class="add-row"/>`fillEnabled`(可选)                   | `Boolean`  | 是否允许填充，默认为 true                   |
| <a class="add-row"/>`fillPriority`(可选)                  | `String`   | 选择填充的模式，纯色/图案/线性渐变/径向渐变 |
| <a class="add-row"/>`stroke`(可选)                        | `String`   | 描边颜色                                    |
| <a class="add-row"/>`strokeWidth`(可选)                   | `Number`   | 描边宽度                                    |
| <a class="add-row"/>`fillAfterStrokeEnabled`(可选)        | `Boolean`  | 是否先描边后填充，默认为 false              |
| <a class="add-row"/>`hitStrokeWidth`(可选)                | `Number`   | 击中的描边大小。默认 auto，等于 strokeWidth |
| <a class="add-row"/>`strokeHitEnable`(可选)               | `Boolean`  | 已废弃，建议用 hitStrokeWidth               |
| <a class="add-row"/>`perfectDrawEnabled`(可选)            | `Boolean`  | 是否使用缓存画布(效果好，性能差)，默认 true |
| `x` (可选)                                                | `Number`   | 位置：x 坐标                                |
| `y` (可选)                                                | `Number`   | 位置：y 坐标                                |
| `width` (可选)                                            | `Number`   | 宽度                                        |
| `height` (可选)                                           | `Number`   | 高度                                        |
| `visible` (可选)                                          | `Boolean`  | 是否可见                                    |
| `listening` (可选)                                        | `Boolean`  | 节点是否正在监听事件                        |
| `id`(可选)                                                | `String`   | 唯一 id                                     |
| `name`(可选)                                              | `String`   | 非唯一的名称                                |
| `opacity`(可选)                                           | `Number`   | 不透明度，0 ～ 1 间的数值                   |
| `scale`(可选)                                             | `Object`   | 缩放大小                                    |
| `scaleX`(可选)                                            | `Number`   | x 方向上的缩放                              |
| `scaleY`(可选)                                            | `Number`   | y 方向上的缩放                              |
| `rotation`(可选)                                          | `Number`   | 旋转角度                                    |
| `offset`(可选)                                            | `Object`   | 相对于中心点和旋转点的偏移                  |
| `offsetX`(可选)                                           | `Number`   | x 方向上的偏移                              |
| `offsetY`(可选)                                           | `Number`   | y 方向上的偏移                              |
| `draggable`(可选)                                         | `Boolean`  | 节点是否可被拖拽                            |
| `dragDistance`(可选)                                      | `Number`   | 触发拖拽的距离阈值                          |
| `dragBoundFunc`(可选)                                     | `function` | 拖拽过程中限制或修改节点的位置的回调函数    |
