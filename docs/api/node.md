<script setup>
import { KShape } from "@docs/components/kshapes";
import { getClientRectDemo } from './codes/node';

// getClientRectDemo();
</script>

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
| `offsetX`(可选)       | `Number`   | x 方向上的偏移                           |
| `offsetY`(可选)       | `Number`   | y 方向上的偏移                           |
| `draggable`(可选)     | `Boolean`  | 节点是否可被拖拽                         |
| `dragDistance`(可选)  | `Number`   | 触发拖拽的距离阈值                       |
| `dragBoundFunc`(可选) | `function` | 拖拽过程中限制或修改节点的位置的回调函数 |

## 成员方法

### cache()

缓存节点可以提高绘图效率、应用滤镜或创建更精确的命中区域。对于所有基本图形，缓存画布的大小将被自动检测。如需缓存自定义 Konva.Shape 实例，您需要传入该形状的边界框属性。更多信息可参阅 [图形缓存性能优化技巧](../tutorial/performance/shape-caching)。

**参数：**

- `config`: 对象，可选
- `config.x`: 数值，可选
- `config.y`: 数值，可选
- `config.width`: 数值，可选
- `config.height`: 数值，可选
- `config.offset`: 数值，可选。沿所有方向增加画布尺寸，每个方向增加的偏移像素量
- `config.drawBoard`: 布尔，可选。如果设置为 true，则将围绕缓存区域绘制一圈红色边框，用于调试目的
- `config.pixelRatio`: 数值，可选。调整缓存图像的质量（或像素比率）。`pixelRatio = 2` 将生成双倍尺寸的缓存。
- `config.imageSmoothingEnabled `: 布尔，可选。控制为缓存所创建画布的 `imageSmoothingEnabled` 属性。
- `config.hitCanvasPixelRatio`: 数值，可选。调整缓存命中画布的质量（或像素比率）。

**返回结果:** `Konva.Node`，即调用 `cache()` 函数对象的实例。

**例子:**

```js
// 缓存一个形状，其边界框的 x、y 位置位于中心点，
// 且边界框的宽度和高度等于通过 shape.width() 和 shape.height() 获取的形状宽度和高度
image.cache();

// 缓存节点并指定边界框的位置和尺寸。
node.cache({
  x: -30,
  y: -30,
  width: 100,
  height: 200,
});

// 缓存节点并在边界框周围绘制红色边框
// 用于调试目的
node.cache({
  x: -30,
  y: -30,
  width: 100,
  height: 200,
  offset: 10,
  drawBorder: true,
});
```

### clearCache()

清除缓存的 canvas。

**返回值:** `Konva.Node`

**例子:**

```js
node.clearCache();
```

### isCached()

查询节点当前是否已经缓存。

**返回值:** 布尔类型。

### getClientRect(config)

返回节点的客户端矩形区域 {x, y, width, height}。该矩形区域包含所有样式效果（描边、阴影等）。此方法的功能类似于 DOM 的 getBoundingClientRect API。

**参数：**

- `config`: 对象
- `config.skipTransform`: 布尔，可选，是否跳过变换(位置、旋转、缩放)的应用，为 `true` 时，返回节点的原始尺寸，不考虑任何变换
- `config.skipShadow`: 布尔，可选，是否跳过阴影效果的计算，为 `true` 时，计算边界框时不包含阴影区域
- `config.skipStroke`: 布尔，可选，是否跳过描边宽度的计算，为 `true` 时，计算边界框时不包含描边宽度
- `config.relativeTo`: Container 对象，可选，相对于哪个父容器计算客户端矩形，可以获取相对于特定父节点的坐标，而不是绝对坐标

**返回值:** 对象，包含了 `{x, y, width, height}` 属性的矩形

**例子：**

```js
var rect = new Konva.Rect({
  width: 100,
  height: 100,
  x: 50,
  y: 50,
  strokeWidth: 4,
  stroke: "black",
  offsetX: 50,
  scaleY: 2,
});

// 获取客户端矩形，不考虑变换(位置、旋转、缩放、偏移、等等)
rect.getClientRect({ skipTransform: true });
// returns {
//     x : -2,   // 两个像素：stroke / 2
//     y : -2,
//     width : 104, // 因为 stroke 增加了 4 个像素
//     height : 104
//}

// 获取客户端矩形，考虑变换
rect.getClientRect();
// 返回对象 {x: -2, y: 46, width: 104, height: 208}

// 获取客户端矩形，不考虑描边
rect.getClientRect({ skipStroke: true });
// 返回对象 { x: 0, y: 50, width: 100, height: 200 }
```

### on(evtStr, handler)

为节点绑定事件。KonvaJS 支持以下事件：

- `mouseover`（鼠标悬停）
- `mousemove`（鼠标移动）
- `mouseout`（鼠标移出）
- `mouseenter`（鼠标进入）
- `mouseleave`（鼠标离开）
- `mousedown`（鼠标按下）
- `mouseup`（鼠标释放）
- `wheel`（滚轮）
- `contextmenu`（右键菜单）
- `click`（单击）
- `dblclick`（双击）
- `touchstart`（触摸开始）
- `touchmove`（触摸移动）
- `touchend`（触摸结束）
- `tap`（轻击）
- `dbltap`（双击触摸）
- `dragstart`（拖拽开始）
- `dragmove`（拖拽移动）
- `dragend`（拖拽结束）。

要同时绑定多个事件，请传入以空格分隔的事件字符串，例如：`'mousedown mouseup mousemove'`。如需为事件添加命名空间，请使用类似 `'click.foobar'` 的格式来按名称绑定事件。

**参数：**

- `evtStr`: string，例如 `'click'`，`'mousedown touchstart'`，`'mousedown.foo touchstart.foo'`
- `handler`: function， 事件处理函数。该函数的第一个参数是事件对象。事件对象为 `KonvaEventObject` 类型，包含以下属性：
  - type: string，事件类型名称，注意，该值不会带上命名空间
  - target: (`Shape | Stage`)是事件的主要目标，即最初触发事件的节点
  - currentTarget 是当前绑定了监听器的节点，evt 是原生浏览器事件对象。
  - evt: EventType，原生浏览器事件对象
  - pointerId: number，指针 ID，用于多点触控场景
  - cancelBubble: boolean，设置为 true 可以阻止事件冒泡
  - child: Node，可选，子节点引用

**返回：** `Konva.Node`

::: tip Q&A

**问题 1: 事件的命名空间有什么用?**

A：命名空间提供了细粒度的事件管理能力，在开发复杂应用或插件时，使用命名空间可以避免移除其他代码的监听器，提高代码的可维护性和模块化程度。使用场景包括：

- 选择性移除监听：当您有多个相同类型的事件监听器时，可以通过命名空间精确移除特定的监听器，例如：

```js
circle.on("click.foo", function () {});
circle.on("click.bar", function () {});

// 只移除 foo 命名空间的监听器
circle.off("click.foo"); // bar 监听器仍然存在
```

- 批量移除同一命名空间的所有事件：您可以使用 .foo 语法移除所有使用该命名空间的监听器，无论事件类型，例如：

```js
circle.on("click.foo", function () {});
circle.on("touch.foo", function () {});
circle.on("click.bar", function () {});

// 移除所有 foo 命名空间的监听器
circle.off(".foo"); // click.foo 和 touch.foo 都被移除
```

**问题 2: 为什么需要 target 和 currentTarget？**

A：这两个字段的存在是为了支持事件冒泡（event bubbling）机制。它们在事件传播过程中有不同的含义：

- `target`：最初触发事件的节点，在整个冒泡过程中保持不变；
- `currentTarget`：当前正在处理事件的节点（即事件监听器所在的节点），在冒泡过程中会变化

冒泡过程：当一个事件发生时，它会从最深层的节点开始向上冒泡到父节点。**与 DOM 事件模型不同，Konva 的事件模型只有冒泡阶段，没有捕获阶段。**

:::

**例子：**

```js
// 添加 click 事件的监听器
node.on("click", function () {
  console.log("you clicked me!");
});

// 获取目标节点
node.on("click", function (evt) {
  console.log(evt.target);
});

// 停止事件传递
node.on("click", function (evt) {
  evt.cancelBubble = true;
});

// 绑定多个事件监听器
node.on("click touchstart", function () {
  console.log("you clicked/touched me!");
});

// 命名空间监听器
node.on("click.foo", function () {
  console.log("you clicked/touched me!");
});

// 获取事件类型
node.on("click tap", function (evt) {
  var eventType = evt.type;
});

// 获取原生事件对象
node.on("click tap", function (evt) {
  var nativeEvent = evt.evt;
});

// 对于变更事件，获取变更前的旧值和变更后的新值。
node.on("xChange", function (evt) {
  var oldVal = evt.oldVal;
  var newVal = evt.newVal;
});

// 通过事件代理获取多个事件目标
// 注意：在 TypeScript 下只声明了 2 参数的on方法，因此 3 参数的on方法不能使用
// 在 JavaScript 下使用没有问题，如果要强用，需要使用类型断言 as any
// 测试文件中的 3 参数的事件委托测试也被标记为 skip，说明该功能可能不是官方主推的 API
layer.on("click", "Group", function (evt) {
  var shape = evt.target;
  var group = evt.currentTarget;
});
```

### off(evtStr)

移除节点上的事件绑定。传入由空格分隔的事件类型字符串可一次性移除多个事件绑定，例如 `"mousedown mouseup mousemove"` 。通过包含命名空间可移除特定名称的事件绑定，例如 `"click.foobar"` 。若仅提供命名空间名称如 `".foobar"`，则会移除该命名空间下的所有事件。

**参数：**

- `evtStr`: string，例如 `'click'`, `'mousedown touchstart'`, `'.foobar'`

**返回值：** `Konva.Node`

**例子：**

```js
// 移除事件监听器
node.off("click");

// 移除多个事件监听器
node.off("click touchstart");

// 按名称移除监听器
node.off("click.foo");
```

### remove()

将节点从其父节点中移除，但不销毁该节点。你可以之后复用该节点。

**返回值：** `Konva.Node`

**例子：**

```js
node.remove();
```

### destroy()

将一个节点从其父节点中移除，并将其销毁。销毁后将不能复用该节点。如果该节点是一个容器（例如 Group、Stage 或 Layer 类型），那其子元素也都将被销毁。

**例子：**

```js
node.destroy();
```

### getAttr(attr)

获取节点属性。

**参数：**

- `attr`: string，属性名

**返回值：** `number | string | object | Array`

**例子：**

```js
var x = node.getAttr("x");
```

### getAncestors()

获取节点的祖先节点。

**返回值：**：`Node[]`

**例子：**

```js
shape.getAncestors().forEach(function (node) {
  console.log(node.id());
});
```

### getAttrs()

获取节点所有属性组成的对象。

**返回值：** `Object`

### setAttrs(config)

传入一个对象一次性设置多个属性。

**参数：**

- config：对象，包含多个配置属性

**返回值：** `Konva.Node`

**例子：**

```js
node.setAttrs({
  x: 5,
  fill: "red",
});
```

### isListening()

判断节点是否正在监听事件，需考虑其祖先节点。存在以下逻辑关系：

| 父节点 | 自身节点 | 是否监听 |
| ------ | -------- | -------- |
| 是     | 是       | 是       |
| 是     | 否       | 否       |
| 否     | 是       | 否       |
| 否     | 否       | 否       |

`listening` 属性用于控制节点是否参与命中检测，为 `false` 时，节点会从命中图中移除，不会响应任何交互事件，即使已经通过 `on()` 绑定了事件处理器。这个设计允许您独立控制事件监听状态，而不需要移除或重新绑定事件处理器。

**返回值：** `boolean`

### isVisible()

判断节点是否可见，需考虑其祖先节点。存在以下逻辑关系：

| 父节点 | 自身节点 | 是否可见 |
| ------ | -------- | -------- |
| 是     | 是       | 是       |
| 是     | 否       | 否       |
| 否     | 是       | 否       |
| 否     | 否       | 否       |

**返回值：** `boolean`

### show()

显示节点，设置 `visible` 为 `true`。

**返回值：** `Konva.Node`

### hide()

隐藏节点。隐藏后的节点将不可被检测。

**返回值：** `Konva.Node`

### getAbsoluteZIndex()

获取绝对层级索引，该索引已综合考虑兄弟节点与祖先节点的层级关系。

**返回值：** `number`

### getDepth()

获取节点在节点树中的深度。返回一个整数值。例如：舞台节点的深度始终为 0，图层节点深度始终为 1，群组和形状节点的深度始终大于等于 2。

**返回值：** `number`

### getRelativePointerPosition()

获取首个指针设备（如鼠标或首次触摸）相对于当前节点本地坐标系的位置。

**返回值：** `{x: number, y: number}`

```js
// 假设我们有一个位于 x = 10, y = 10 位置的矩形
// 现在我们在舞台的 x = 15, y = 15 位置进行了点击
// 若需获取该点击相对于矩形的位置，您可以使用该函数
rect.getRelativePointerPosition();
```
