# Node 节点

::: info 类信息

- [类关系图](../analysis/inheritance-diagram.md)
- 父类：无
- 子类：[Container](./container) / [Shape](./shape)
  :::

Node 节点类，节点是可被变换、分层并具有绑定事件的实体。Stage、Layer、Group 和 Shape 都继承自 Node。

## 构造函数参数

构造函数参数传入一个对象类型的参数 config，包括如下字段：

| 字段名                | 类型       | 描述                                     |
| --------------------- | ---------- | ---------------------------------------- |
| `x` (可选)            | `Number`   | 位置：x 坐标                             |
| `y` (可选)            | `Number`   | 位置：y 坐标                             |
| `width` (可选)        | `Number`   | 宽度                                     |
| `height` (可选)       | `Number`   | 高度                                     |
| `visible` (可选)      | `Boolean`  | 是否可见                                 |
| `listening` (可选)    | `Boolean`  | 节点是否正在监听事件                     |
| `id`(可选)            | `String`   | 唯一 id                                  |
| `name`(可选)          | `String`   | 非唯一的名称                             |
| `opacity`(可选)       | `Number`   | 不透明度，0 ～ 1 间的数值                |
| `scale`(可选)         | `Object`   | 缩放大小                                 |
| `scaleX`(可选)        | `Number`   | x 方向上的缩放                           |
| `scaleY`(可选)        | `Number`   | y 方向上的缩放                           |
| `rotation`(可选)      | `Number`   | 旋转角度                                 |
| `offset`(可选)        | `Object`   | 相对于中心点和旋转点的偏移               |
| `offsetX`(可选)       | `Number`   | x 方向上的便宜                           |
| `offsetY`(可选)       | `Number`   | y 方向上的便宜                           |
| `draggable`(可选)     | `Boolean`  | 节点是否可被拖拽                         |
| `dragDistance`(可选)  | `Number`   | 触发拖拽的距离阈值                       |
| `dragBoundFunc`(可选) | `function` | 拖拽过程中限制或修改节点的位置的回调函数 |
