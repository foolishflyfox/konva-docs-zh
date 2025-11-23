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

## 成员方法

### getChildren(filterFunc)

返回直接子节点数组。

**参数：**

- `filterFunc`: `(item: Node) => boolean`，过滤函数，返回 `false` 就被过滤掉

**返回值：** 子节点组成的数组

**例子：**

```ts
// 获取所有子节点
var children = layer.getChildren();

// 子获取圆形
var circles = layer;
```

### hasChildren()

确定本节点是否有子节点。

### removeChildren()

移除所有子节点，子节点仍在内存中。如果你想完全销毁所有子节点，请使用 `destroyChildren`。

### destroyChildren()

销毁所有子节点。

### add(children)

添加一个或多个节点到容器中。

**例子：**

```js
layer.add(rect);
layer.add(shape1, shape2, shape3);
// 空数组是可接受的，但每个独立的子元素必须已定义。
layer.add(...shapes);
```

### find(selector)

返回与选择器匹配的节点数组。您可以使用以 `"#"` 开头的字符串选择 ID，以 `"."` 开头的字符串选择名称，或传入节点时返回 `true`/`false` 的判断函数。具体用法参见下方示例。使用字符串时还可按类型或类名进行选择。多个选择器请用逗号分隔。

搜索的对象包括所有子孙节点，而不仅仅是直接子节点。

**例子：**

```js
/***** 传入字符串选择器参数 *****/
// 传入一个字符串作为选择器
var node = stage.find("#foo");
// 选择图层内名称为"bar"的节点。
var nodes = layer.find(".bar");
// 选择图层内所有的 Group 实例
var nodes = layer.find("Group");
// 选择图层内所有的 Rect 实例
var nodes = layer.find("Rect");
// 选择图层内 id 为 foo 的节点或名称为 bar 的节点
var nodes = layer.find("#foo, .bar");

/***** 传入函数选择器参数 *****/
// 通过函数获取所有的 Group 实例
var groups = stage.find((node) => {
  return node.getType() === "Group";
});
// 值获取节点并且有透明属性
var alphaNodes = layer.find((node) => {
  return node.getType() === "Node" && node.getAbsoluteOpactiy() < 1;
});
```

### findOne(select)

返回 `find` 函数结果的第一个节点。

**例子：**

```js
// 根据 id = foo 选择一个节点
var node = stage.findOne("#foo");
// 根据名称 bar 选择图层中的一个节点
var node = layer.findOne(".bar");
// 选择满足函数的第一个节点
var node = stage.findOne((node) => {
  return node.getType() === "Shape";
});
```

### isAncestorOf(node)

判断本节点是否为参数指定的节点的祖先节点。

**参数：**

- `node`: `Konva.node`

### getAllIntersections(pos)

获取与指定点相交的所有图形。注意：由于此方法需清空临时画布并重绘容器内每个图形，其性能开销极大，应仅限特殊场景使用。请尽可能改用 Konva.Stage#getIntersection 方法，该方案性能更优。此外，监听设置（listening）为 false 的节点将无法被检测到。

**参数：**

- `pos`: `{x: number, y: number}`

**返回：** 图形组成的数组

### clip(clip)

获取/设置容器裁剪区域的配置属性,它可以限制容器内子节点的可见范围。只有在裁剪区域内的内容才会被渲染,超出部分会被裁剪掉。

**参数：**

- `clip`: `{x: number, y: number, width: number, height: number}`

**例子：**

```js
// 获取裁剪区
var clip = container.clip();
// 设置裁剪区
container.clip({
  x: 20,
  y: 20,
  width: 20,
  height: 20,
});
```

### clipX(x)

读取/设置 `clip` 裁剪区的 `x` 属性。

### clipY(y)

读取/设置 `clip` 裁剪区的 `y` 属性。

### clipWidth(width)

读取/设置 `clip` 裁剪区的 `width` 属性。

### clipHeight(height)

读取/设置 `clip` 裁剪区的 `height` 属性。

### clipFunc(function)

读取/设置裁剪函数。

**例子：**

```js
// 获取裁剪函数
var clipFunction = container.clipFunc();
// 设置裁剪函数
container.clipFunc(function (ctx) {
  ctx.rect(0, 0, 100, 100);
});
container.clipFunc(function (ctx) {
  // 可选择返回一个Path2D裁剪路径及裁剪规则，或仅返回裁剪规则。
  return [new Path2D("M0 0v50h50Z"), "evenodd"];
});
```

## 继承的函数

都是从 `Konva.Node` 继承而来的函数，可参考 [Node](./node) 。
