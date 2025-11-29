# Group 组

::: info 类信息

- [类关系图](../analysis/inheritance-diagram.md)
- 父类：[Container](./container)
- 子类: [Label](./label) / [Transformer](./transformer)

:::

```js
new Konva.Group(config);
```

组构造器。组用于包含形状(shapes)和其他组(groups)。

## 与父类 Container 的差异

`Group` 相比 `Container` 主要增加了一个关键功能：对着节点类型的验证限制。

### Container 的功能

`Container` 是抽象基类，提供了基本的容器功能：

- 管理 `children` 数组存储子节点
- 提供 `getChildren()` / `hasChildren()` / `removeChildren()` 等基础方法
- 定义了抽象的 `_validateAdd()` 方法供子类实现

### Group 增加的功能

`Group` 继承子 `Container`，主要增加了类型校验：

```js
export class Group extends Container<Group | Shape> {
  _validateAdd(child: Node) {
    const type = child.getType();
    if (type !== "Group" && type !== "Shape") {
      Util.throw("You may only add groups and shapes to groups.");
    }
  }
}
```

这意味着 Group 只能添加：

- `Group` 类型的节点（嵌套组）
- `Shape` 类型的节点（图形元素）

而不能添加其他类型的节点（如 `Layer`）。

## 构造函数

构造函数参数为 config。与父类 `Container` 的构造函数参数一模一样。

| 字段名                | 类型       | 描述                                      |
| --------------------- | ---------- | ----------------------------------------- |
| `x` (可选)            | `Number`   | 位置：x 坐标                              |
| `y` (可选)            | `Number`   | 位置：y 坐标                              |
| `width` (可选)        | `Number`   | 宽度                                      |
| `height` (可选)       | `Number`   | 高度                                      |
| `visible` (可选)      | `Boolean`  | 是否可见                                  |
| `listening` (可选)    | `Boolean`  | 节点是否正在监听事件                      |
| `id`(可选)            | `String`   | 唯一 id                                   |
| `name`(可选)          | `String`   | 非唯一的名称                              |
| `opacity`(可选)       | `Number`   | 不透明度，0 ～ 1 间的数值                 |
| `scale`(可选)         | `Object`   | 缩放大小                                  |
| `scaleX`(可选)        | `Number`   | x 方向上的缩放                            |
| `scaleY`(可选)        | `Number`   | y 方向上的缩放                            |
| `rotation`(可选)      | `Number`   | 旋转角度                                  |
| `offset`(可选)        | `Object`   | 相对于中心点和旋转点的偏移                |
| `offsetX`(可选)       | `Number`   | x 方向上的偏移                            |
| `offsetY`(可选)       | `Number`   | y 方向上的偏移                            |
| `draggable`(可选)     | `Boolean`  | 节点是否可被拖拽                          |
| `dragDistance`(可选)  | `Number`   | 触发拖拽的距离阈值                        |
| `dragBoundFunc`(可选) | `function` | 拖拽过程中限制或修改节点的位置的回调函数  |
| clipX`(可选)          | `Number`   | 裁剪矩形区域的 X 坐标                     |
| clipY`(可选)          | `Number`   | 裁剪矩形区域的 Y 坐标                     |
| clipWidth`(可选)      | `Number`   | 裁剪矩形区域宽度                          |
| clipHeight`(可选)     | `Number`   | 裁剪矩形区域高度                          |
| clipFunc`(可选)       | `function` | 自定义裁剪函数,用于定义容器的裁剪区域形状 |

## 成员方法

与 [Container 成员方法](./container#成员方法) 一模一样。
