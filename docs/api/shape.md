# Shape 图形

::: info 类信息

- [类关系图](../analysis/inheritance-diagram.md)
- 父类：[Node](./node)
- 子类：[Arc](./arc) / [Circle](./circle) / [Ellipse](./ellipse) / [Image](./image) / [Label](./label) / [Line](./line) / [Path](./path) / [Rect](./rect) / [RegularPolygon](./regular-polygon) / [Ring](./ring) / [Sprite](./sprite) / [Star](./star) / [Text](./text) / [TextPath](./text-path) / [Wedge](./wedge)

:::

`Shape` 是如矩形、圆形、文本、线条等的基类。

## 参数

| 字段名                                          | 类型       | 描述                                     |
| ----------------------------------------------- | ---------- | ---------------------------------------- |
| <a class="add-row"/>`fill`(可选)                | `String`   | 填充色标                                 |
| <a class="add-row"/>`fillPatternImage`(可选)    | `String`   | 填充图案图片                             |
| <a class="add-row"/>`fillPatternX`(可选)        | `Number`   | 填充图案(pattern)的 X 轴平移位置         |
| <a class="add-row"/>`fillPatternY`(可选)        | `Number`   | 填充图案(pattern)的 Y 轴平移位置         |
| <a class="add-row"/>`fillPatternOffset`(可选)   | `Object`   | 填充图案(pattern)的 X/Y 轴偏移位置       |
| <a class="add-row"/>`fillPatternOffsetX`(可选)  | `Object`   | 填充图案(pattern)的 X 轴偏移位置         |
| <a class="add-row"/>`fillPatternOffsetY`(可选)  | `Object`   | 填充图案(pattern)的 Y 轴偏移位置         |
| <a class="add-row"/>`fillPatternScale`(可选)    | `Object`   | 填充图案(pattern)的缩放                  |
| <a class="add-row"/>`fillPatternScaleX`(可选)   | `Object`   | 填充图案(pattern)的 X 缩放               |
| <a class="add-row"/>`fillPatternScaleY`(可选)   | `Object`   | 填充图案(pattern)的 Y 缩放               |
| <a class="add-row"/>`fillPatternRotation`(可选) | `Object`   | 填充图案(pattern)的旋转角度              |
| <a class="add-row"/>`fillPatternRepeat`(可选)   | `Object`   | 填充图案(pattern)的重复方式              |
| `x` (可选)                                      | `Number`   | 位置：x 坐标                             |
| `y` (可选)                                      | `Number`   | 位置：y 坐标                             |
| `width` (可选)                                  | `Number`   | 宽度                                     |
| `height` (可选)                                 | `Number`   | 高度                                     |
| `visible` (可选)                                | `Boolean`  | 是否可见                                 |
| `listening` (可选)                              | `Boolean`  | 节点是否正在监听事件                     |
| `id`(可选)                                      | `String`   | 唯一 id                                  |
| `name`(可选)                                    | `String`   | 非唯一的名称                             |
| `opacity`(可选)                                 | `Number`   | 不透明度，0 ～ 1 间的数值                |
| `scale`(可选)                                   | `Object`   | 缩放大小                                 |
| `scaleX`(可选)                                  | `Number`   | x 方向上的缩放                           |
| `scaleY`(可选)                                  | `Number`   | y 方向上的缩放                           |
| `rotation`(可选)                                | `Number`   | 旋转角度                                 |
| `offset`(可选)                                  | `Object`   | 相对于中心点和旋转点的偏移               |
| `offsetX`(可选)                                 | `Number`   | x 方向上的偏移                           |
| `offsetY`(可选)                                 | `Number`   | y 方向上的偏移                           |
| `draggable`(可选)                               | `Boolean`  | 节点是否可被拖拽                         |
| `dragDistance`(可选)                            | `Number`   | 触发拖拽的距离阈值                       |
| `dragBoundFunc`(可选)                           | `function` | 拖拽过程中限制或修改节点的位置的回调函数 |
