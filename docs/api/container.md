# Container 容器类

::: info 类信息

- [类关系图](../analysis/inheritance-diagram.md)
- 父类：[Node](./node)
- 子类：[Stage](./stage) / [Layer](./layer) / [Group](./group)
  :::

Konva.Container 是一个抽象类，表示一个容器，用于包含节点或其他容器，例如 Stage、Layer 及 Group 都继承自该类。

## 构造函数

构造函数参数为 config，因为 Container 继承自 Node，因此其构造函数参数大多数都与 Node 类似，下表底部绿色的行为相对于 Node 新增的字段：

| 字段名                                 | 类型       | 描述                                      |
| -------------------------------------- | ---------- | ----------------------------------------- |
| `x` (可选)                             | `Number`   | 位置：x 坐标                              |
| `y` (可选)                             | `Number`   | 位置：y 坐标                              |
| `width` (可选)                         | `Number`   | 宽度                                      |
| `height` (可选)                        | `Number`   | 高度                                      |
| `visible` (可选)                       | `Boolean`  | 是否可见                                  |
| `listening` (可选)                     | `Boolean`  | 节点是否正在监听事件                      |
| `id`(可选)                             | `String`   | 唯一 id                                   |
| `name`(可选)                           | `String`   | 非唯一的名称                              |
| `opacity`(可选)                        | `Number`   | 不透明度，0 ～ 1 间的数值                 |
| `scale`(可选)                          | `Object`   | 缩放大小                                  |
| `scaleX`(可选)                         | `Number`   | x 方向上的缩放                            |
| `scaleY`(可选)                         | `Number`   | y 方向上的缩放                            |
| `rotation`(可选)                       | `Number`   | 旋转角度                                  |
| `offset`(可选)                         | `Object`   | 相对于中心点和旋转点的偏移                |
| `offsetX`(可选)                        | `Number`   | x 方向上的偏移                            |
| `offsetY`(可选)                        | `Number`   | y 方向上的偏移                            |
| `draggable`(可选)                      | `Boolean`  | 节点是否可被拖拽                          |
| `dragDistance`(可选)                   | `Number`   | 触发拖拽的距离阈值                        |
| `dragBoundFunc`(可选)                  | `function` | 拖拽过程中限制或修改节点的位置的回调函数  |
| <a class="add-row"/>`clipX`(可选)      | `Number`   | 裁剪矩形区域的 X 坐标                     |
| <a class="add-row"/>`clipY`(可选)      | `Number`   | 裁剪矩形区域的 Y 坐标                     |
| <a class="add-row"/>`clipWidth`(可选)  | `Number`   | 裁剪矩形区域宽度                          |
| <a class="add-row"/>`clipHeight`(可选) | `Number`   | 裁剪矩形区域高度                          |
| <a class="add-row"/>`clipFunc`(可选)   | `function` | 自定义裁剪函数,用于定义容器的裁剪区域形状 |
