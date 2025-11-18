# Container 容器类

父类：[Node](./node)

子类：[Stage](./stage) / [Layer](./layer) / [Group](./group)

Konva.Container 是一个抽象类，表示一个容器，用于包含节点或其他容器，例如 Stage、Layer 及 Group 都继承自该类。

## 构造函数

构造函数参数为 config，因为 Container 继承自 Node，因此其构造函数参数大多数都与 Node 类似，下表绿色的行为相对于 Node 新增的字段：

| 字段名                         | 类型     | 描述 |
| ------------------------------ | -------- | ---- |
| `x` (可选)                     | `Number` |      |
| `y` (可选)                     | `Number` |      |
| `width` (可选)                 | `Number` |      |
| `height` (可选)                | `Number` |      |
| <div class="add-row">xxx</div> |          |      |
