# Label 标签

::: info 类信息

- [类关系图](../analysis/inheritance-diagram.md)
- 父类：[Group](./group)
- 子类: 无

:::

```js
new Konva.Label(config);
```

标签构造器。标签是包含了 `Text`(文本)和 `Tag`(背景) 的组。

## 与父类 Group 的差异

`Label` 相比 `Group` 主要添加了标签组件的自动化管理功能。

### 自动监听和同步机制

`Label` 在构造函数中监听子元素添加事件，自动调用 `_sync()` 方法。

```js
this.on("add.konva", function (evt) {
  this._addListeners(evt.child);
  this._sync();
});
```

这个自动监听机制确保了：

- 当你动态修改 `Label` 中的 `Text` 属性时，背景 `Tag` 会自动调整大小
- 无需手动调整同步方法
- 保持了标签组件的一致性和易用性

### 便捷的子元素访问方法

提供 `getText()` 和 `getTag()` 方法快速访问内部的 Text 和 Tag 元素。

### 自动尺寸同步

当文本属性（如 `fontSize`、`text`、`padding` 等）改变时，`Label` 会自动调整 `Tag` 的尺寸以适应文本。

### 代理文本尺寸方法

`getWidth()` 和 `getHeight()` 方法直接返回内部 `Text` 元素的尺寸。

## 构造函数

构造函数参数为 config，与父类 `Group` 一致。

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
| `offsetX`(可选)       | `Number`   | x 方向上的偏移                           |
| `offsetY`(可选)       | `Number`   | y 方向上的偏移                           |
| `draggable`(可选)     | `Boolean`  | 节点是否可被拖拽                         |
| `dragDistance`(可选)  | `Number`   | 触发拖拽的距离阈值                       |
| `dragBoundFunc`(可选) | `function` | 拖拽过程中限制或修改节点的位置的回调函数 |

## 自带的成员方法

### getText()

获取标签内的 `Text`。你如果需要更新文本的属性，需要先获取 `Text` 图形。

例如：

```js
label.getText().fill("red");
```

### getTag()

获取标签内的 `Tag`。你如果需要更新标签箭头属性以及圆角半径，你需要先获取 `Tag` 图形。
