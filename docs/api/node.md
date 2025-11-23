<script setup>
import { KShape } from "@docs/components/kshapes";
import { 
  getClientRectDemo, 
  showBaseCompositeOperationType, 
  showSpecialCompositeOperationType,
  showColorCompositeOperationType,
  showHslColorCompositeOperationType,
  offsetDemo,
  filtersDemo,
  transformsEnabledDemo
} from './codes/node';

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

### getAbsolutePosition(Ancestor)

获取节点的绝对位置。该函数可用于计算相对于任何祖先节点的绝对位置。

**参数：**

- `Ancestor`: `Node`，可选，祖先节点

**返回值：** `{x: number, y: number}`

**例子：**

```js
// 返回相对于 canvas 左上角的绝对位置
node.getAbsolutePosition();

// 计算节点在 Stage 内的绝对位置
// Stage 的变换会被忽略
node.getAbsolutePosition(stage);
```

### move(change)

相对于节点当前位置移动一定距离。

**参数：**

- `config`: 类型 `{x: number, y: number}`

**返回值：** `Konva.Node`

**例子：**

```js
// node 在 x 方向上移动 1 个像素，在 y 方向上移动 2 个像素
node.move({ x: 1, y: 2 });
```

### rotate(theta)

相对于节点当前的旋转角度再旋转 theta 度。

**参数：**

- `theta`: `number` 类型

**返回值：** `Konva.Node`

### moveToTop()

将节点移动到相对于其兄弟节点的最上层。操作的是节点在其父容器的子节点数组中的位置，它的实现是:

1. 从父容器的 children 数组中移除当前节点
2. 将节点添加到数组末尾(最后一个位置)
3. 重新设置所有子节点的索引

**返回值：** `boolean`，是否移动成功

### moveUp()

将节点上移，改变的是其在父容器中的子节点数组中的位置。

**返回值：** `boolean`，是否移动成功

### moveDown()

将节点下移，改变的是其在父容器中的子节点数组中的位置。

**返回值：** `boolean`，是否移动成功

### moveToBottom()

将节点移动到相对于其兄弟节点的最底层。

**返回值：** `boolean`，是否移动成功

### getAbsoluteOpacity()

返回节点的绝对不透明度，即节点最终渲染时的实际不透明度。它的计算逻辑是：

- 从节点自身的 opacity() 值开始
- 递归地乘以所有父节点的绝对不透明度
- 返回最终的累积结果

例如,如果一个圆形的 `opacity` 是 0.5,它的父 Layer 的 `opacity` 也是 0.5,那么圆形的 `getAbsoluteOpacity()` 将返回 0.25 (0.5 × 0.5)。

### moveTo(newContainer)

将节点移动到另一个容器中。

**参数：**

- `newContainer`: `Container` 类型

**返回值：** `Konva.Node`，被移动的节点

**例子：**

```js
// 将节点从当前图层移动到 layer2
node.moveTo(layer2);
```

### toObject()

将节点转换成对象，用于序列化。返回一个对象。

**返回值：** `Object` 类型

### toJSON()

将节点转换成 JSON 字符串，返回一个 JSON 字符串。

**返回值：** `string`

### getParent()

获取节点的父容器。

**返回值：** `Konva.Node`

### findAncestors(selector, includeSelf, stopNode)

获取该节点的所有祖先节点（父节点以及父节点的父节点，等等）

**参数：**

- `selector`: `string`，节点选择器，选择器类型包括
  - ID 选择器: 以 `#` 开头
  - Name 选择器: 以 `.` 开头
  - 类型选择器: 节点类名
  - 多选择器: 用逗号分隔
  - 函数选择器: `(node) => void` 类型函数
- `includeSelf`: `boolean`，可选，是否认为本节点也属于其自身的祖先节点
- `stopNode`: `Konva.Node`，可选，是其祖先节点中的一个，遇到该节点就停止搜索

**返回值：** `Node[]`

**例子：**

```js
// 获取 Group 类别的祖先节点
var parentGroups = node.findAncestors("Group");
```

### findAncestor(selector, includeSelf, stopNode)

获取满足选择器的第一个祖先节点。

**参数：**

- `selector`: `string`，节点选择器
- `includeSelf`: `boolean`，可选，是否认为本节点也属于其自身的祖先节点
- `stopNode`: `Konva.Node`，可选，是其祖先节点中的一个，遇到该节点就停止搜索

**返回值：** `Konva.Node | undefined`

**例子：**

```js
// 获取第一个 name 为 .mygroup 的祖先节点
var group = node.findAncestors(".mygroup");
```

### getLayer()

获取图层祖先

**返回值：** `Konva.Layer`

### getStage()

获取 Stage 祖先

**返回值：** `Konva.Stage`

### fire(eventType, evt, bubble)

触发事件

**参数：**

- `eventType`: `string`，事件类型，可以是常规事件，例如 `click`、`mouseover`，也可以是自定义事件，例如 `myCustomEvent`
- `evt`: `Event`，可选，事件对象内容
- `bubble`: `boolean`，可选，将该值设置为 false 或保留为 undefined 将导致事件不会冒泡，将该值设置为 true 将导致事件进行冒泡

**返回值：** `Konva.Node`

**例子：**

```js
// 手动触发点击事件
node.fire("click");

// 触发自定义事件
node.fire("foo");

// 触发携带事件数据的自定义事件
node.fire("foo", {
  bar: 10,
});

// 触发点击事件并进行事件冒泡
node.fire("click", null, true);
```

### getAbsoluteTransform(top)

获取节点相对于祖先节点的绝对变换（会考虑其祖先节点的变换）

**参数：**

- `top`: `Konva.Node`，可选，指定作为参考节点的祖先节点

**返回值：** `Konva.Transform`

### getAbsoluteScale(top)

获取节点的绝对缩放（会考虑其祖先节点的缩放）

**参数：**

- `top`: `Konva.Node`，可选，指定作为参考节点的祖先节点

**返回值：** `{x: number, y: number}`

### getAbsoluteRotation()

获取节点的绝对旋转（会考虑其祖先节点的旋转）

**返回值：** `number`

### getTransform()

获取节点变换（不考虑祖先节点变换）

**返回值：** `Konva.Transform`

### clone(obj)

克隆节点。返回一个具有相同属性的新节点实例，您还可以通过对象字面量覆盖节点属性，从而使用现有节点作为其他节点的模板

**参数：**

- `obj`: 对象，可选，指定的需要覆盖的属性

**返回值：** `Konva.Node`

**例子：**

```js
// 简单的克隆
var clone = node.clone();

// 克隆一个节点，并覆盖新节点的 x 属性
var clone = node.clone({ x: 5 });
```

### toCanvas(config)

将节点转换为一个 HTML Canvas 元素。它返回一个原生的 `HTMLCanvasElement` 对象，其中包含了所有节点及其子节点的渲染结果。

**参数：**

- `config`：`CanvasConfig`，可选
  - `x`: `number` 可选，canvas 导出区域的 X 坐标
  - `y`: `number` 可选，canvas 导出区域的 Y 坐标
  - `width`: `number` 可选，canvas 导出区域的宽度
  - `height`: `number` 可选，canvas 导出区域的高度
  - `pixoRatio`: `number` 可选，输出 canvas 的像素比率，默认值为 1。您可以使用此属性提高图像质量，pixelRatio 将用于乘以导出图像的尺寸，例如您以 500x500 尺寸导出且 pixelRatio = 2，则生成的图像尺寸将为 1000x1000。
  - `imageSmoothingEnable`: `boolean` 可选，如果要禁用图像平滑处理，请将此值设置为 false，不传时启用图形平滑处理

### toDataURL(config)

创建一个复合数据 URL（base64 字符串）。如果未指定 MIME 类型，则默认生成"image/png"。对于"image/jpeg"格式，需指定质量级别（取值范围 0.0-1.0）。

**参数：**

- `config`: 配置对象，可选
  - `mimeType`: `string` 可选，可以是 `"image/png"` 或 `"image/jpeg"`，默认值为 `"image/png"`
  - `quality`: `number` 可选，指定 jpeg 图像质量。若使用 `"image/jpeg"` 格式，可指定 0 到 1 之间的质量参数：0 表示极低质量，1 表示最佳质量
  - `x`: `number` 可选，导出区域的 X 坐标
  - `y`: `number` 可选，导出区域的 Y 坐标
  - `width`: `number` 可选，导出区域的宽度
  - `height`: `number` 可选，导出区域的高度
  - `pixoRatio`: `number` 可选，输出的像素比率，默认值为 1。您可以使用此属性提高图像质量，pixelRatio 将用于乘以导出图像的尺寸，例如您以 500x500 尺寸导出且 pixelRatio = 2，则生成的图像尺寸将为 1000x1000。
  - `imageSmoothingEnable`: `boolean` 可选，如果要禁用图像平滑处理，请将此值设置为 false，不传时启用图形平滑处理

**返回值：** `string`

### toImage(config)

将节点转换为图像。由于 toImage 方法是异步的，生成的图像只能通过配置回调函数或返回的 Promise 对象获取。该方法最常用于将复杂图形缓存为图像，从而避免重复绘制。

**参数：**

- `config`: 配置对象，可选
  - `callback`: `(img: HTMLImageElement) => void` 可选，转换完成后的回调函数
  - `mimeType`: `string` 可选，可以是 `"image/png"` 或 `"image/jpeg"`，默认值为 `"image/png"`
  - `quality`: `number` 可选，指定 jpeg 图像质量。若使用 `"image/jpeg"` 格式，可指定 0 到 1 之间的质量参数：0 表示极低质量，1 表示最佳质量
  - `x`: `number` 可选，导出区域的 X 坐标
  - `y`: `number` 可选，导出区域的 Y 坐标
  - `width`: `number` 可选，导出区域的宽度
  - `height`: `number` 可选，导出区域的高度
  - `pixoRatio`: `number` 可选，输出的像素比率，默认值为 1。您可以使用此属性提高图像质量，pixelRatio 将用于乘以导出图像的尺寸，例如您以 500x500 尺寸导出且 pixelRatio = 2，则生成的图像尺寸将为 1000x1000。
  - `imageSmoothingEnable`: `boolean` 可选，如果要禁用图像平滑处理，请将此值设置为 false，不传时启用图形平滑处理

**返回值：** `Promise<HTMLImageElement>`

**例子：**

```js
var image = node.toImage({
  callback(img) {
    // 操作 img
  },
});
```

### toBlob(config)

将节点转换为 Blob 对象。由于 toBlob 方法是异步的，生成的 Blob 只能通过配置回调函数或返回的 Promise 对象获取。

- `config`: 配置对象，可选
  - `callback`: `(img: Blob) => void` 可选，转换完成后的回调函数
  - `x`: `number` 可选，导出区域的 X 坐标
  - `y`: `number` 可选，导出区域的 Y 坐标
  - `width`: `number` 可选，导出区域的宽度
  - `height`: `number` 可选，导出区域的高度
  - `pixoRatio`: `number` 可选，输出的像素比率，默认值为 1。您可以使用此属性提高图像质量，pixelRatio 将用于乘以导出图像的尺寸，例如您以 500x500 尺寸导出且 pixelRatio = 2，则生成的图像尺寸将为 1000x1000。
  - `imageSmoothingEnable`: `boolean` 可选，如果要禁用图像平滑处理，请将此值设置为 false，不传时启用图形平滑处理

**返回值：** `Promise<Blob>`

### getClassName()

获取节点类名，例如可能返回 `Stage`、`Layer`、`Group`，或者是图形名，如 `Rect`、`Circle`、`Text` 等等。

**返回值：** `string`

### getType()

获取节点类型，例如可能返回 `Stage`、`Layer`、`Group` 或 `Shape`

**返回值：** `string`

:::tip

- 节点的 `type` 是节点的抽象类型,表示节点在 Konva 层次结构中的位置(如 `Stage、Layer、Group`、`Shape`)
- 节点的 `className` 是节点的具体类名,表示节点的实际类(如 `Circle`、`Rect`、`Text`)
- 对于容器类型(`Stage`、`Layer`、`Group`)，`nodeType` 和 `className` 通常相同
- 对于形状类型，`nodeType` 是 `Shape`，但 `className` 是具体的形状的类名称

:::

### addName

向节点添加名称。

**参数：**

- `name`: `string`，名称

**例子：**

```js
node.name("red");
node.addName("selected");
node.name(); // 返回 'red selected'
```

### hasName(name)

检查节点是否有指定名称。

**参数：**

- `name`: `string`

**返回值：** `boolean`

```js
node.name("red");
node.hasName("red"); // 返回 true
node.hasName("selected"); // 返回 false
node.hasName(""); // 返回 false
```

### removeName(name)

从节点中移除名称

**参数：**

- `name`: `string`

**返回值：** `Konva.Node`

**例子：**

```js
node.name("red selected");
node.removeName("selected");
node.hasName("selected"); // 返回 false
node.name(); // 返回 'red'
```

### setAttr(attr, val)

设置属性

**参数：**

- `attr`: `string`，属性名
- `val`: 属性值

**返回值：** `Konva.Node`

**例子：**

```js
node.setAttr("x", 5);
```

### draw()

绘制场景图和交互图。如果正在绘制的节点是 stage，所有图层都将被清空并重新绘制。

**返回值：** `Konve.Node`

**通常情况下不需要手动调用**。从 Konva 8.0.0 版本开始，引入了自动绘制机制。 当您修改节点属性、添加/移除节点或进行缓存操作时，Konva 会自动调用 `layer.batchDraw()` 来重绘。这个功能由 Konva.autoDrawEnabled 属性控制,默认为 true。

需要手动调用的场景：

- 场景 1: 禁用自动绘制时。如果您设置了 `Konva.autoDrawEnabled = false`,则需要手动调用 `draw()` 或 `batchDraw()`。
- 场景 2: 需要立即同步绘制。`draw()` 是同步的，会立即执行绘制。相比之下，`batchDraw()` 会将绘制延迟到下一个动画帧(使用 `requestAnimationFrame`)。

### startDrag()

初始化拖放。`startDrag()` 方法用于手动启动节点的拖拽操作。 它的主要功能是:

- 如果拖拽元素不存在,先创建拖拽元素
- 将拖拽状态设置为 `dragging`
- 触发 `dragstart` 事件

**通常情况下不需要手动调用：**在正常的拖拽流程中,Konva 会自动处理拖拽。

1. 当用户按下鼠标/触摸时,会创建拖拽元素(状态为 `ready`)
2. 当指针移动超过 `dragDistance` 时,自动调用 `startDrag()` 开始拖拽
3. 拖拽过程中持续更新位置

**需要手动调用的场景：**

1. **程序化启动拖拽**：如果您想在没有用户交互的情况下启动拖拽,可以直接调用 `startDrag()`
2. **Transformer 中的拖拽同步**：在 Transformer 类中,当一个节点开始拖拽时,会手动调用其他节点的 `startDrag()` 来同步拖拽，这确保了当拖拽一个被 Transformer 选中的节点时,其他选中的节点也会跟随移动。
3. **自定义拖拽逻辑**：如果您需要在特定条件下才启动拖拽(例如只有在按住某个键时才允许拖拽),可以监听 `mousedown` 事件并根据条件手动调用
4. 正常情况下,只有当指针移动超过 `dragDistance` 时才会开始拖拽。如果您想立即开始拖拽而不等待移动距离,可以直接调用 `startDrag()`

### stopDrag()

停止拖放。

### isDragging()

判断节点是否处于拖拽模式。

### isClientRectOnScreen(margin)

判断节点是否(至少部分)在用户可见区域内。它返回一个布尔值,表示节点的客户端矩形区域是否与 Stage 的可见区域有交集。

**参数：**

- `margin`: `{ x: number; y: number }` 可选，在判断时为节点或屏幕区域添加额外的边距，这个边距参数可以用于提前判断即将进入屏幕的节点,或者扩大可见区域的判断范围

**返回值：** `Konva.Node`

**例子：**

```js
var isOnScreen = node.isClientRectOnScreen();

var isOnScreen = node.isClientRectOnScreen({
  x: stage.width(),
  y: stage.height(),
});
```

### Node.create(json, container)

可以使用 JSON 字符串或对象创建节点。反序列化不会生成自定义形状绘制函数、图像或事件处理程序（这会使序列化对象变得非常庞大）。

如果您的应用程序使用自定义形状、图像和事件处理程序（很可能如此），那么在加载到 Stage 后，您需要选择相应的形状，并通过 `on()`、`setSceneFunc()` 和 `setImage()` 方法来设置这些属性。

**参数：**

- `json`: `string | object`
- `container`: 可选的容器 DOM 元素，仅在创建 Stage 节点时使用。

### zIndex(index)

获取/设置节点相对于其同父级兄弟节点的 zIndex 顺序。请记住，zIndex 不是绝对的（不像在 CSS 中）。它仅相对于父元素。

**参数：**

- `index`: `number` 可选，不填为获取；

**返回值：** `Number`

**例子：**

```js
// 获取 index
var index = node.zIndex();

// 设置 index
node.zIndex(2);
```

### absolutePosition(pos)

获取或设置节点的绝对位置。绝对位置是指节点相对于 Stage 左上角的最终位置，它考虑了节点自身的位置以及所有祖先节点的变换，因为 Stage 也是节点的祖先节点，因此 Stage 的移动，也会导致绝对位置的改变。

**参数：**

- `pos`: `{x: number, y: number}`，位置信息

**例子：**

```js
// 获取位置
var position = node.absolutePosition();
// 设置位置
node.absolutePosition({ x: 5, y: 10 });
```

### position(pos)

获取或设置节点相对于父节点的位置。

**参数：**

- `pos`: `{x: number, y: number}`，位置信息

### x(x)

获取/设置 x 的位置（相对于父节点的位置）。

### y(y)

获取/设置 y 的位置（相对于父节点的位置）。

### globalCompositeOperation(type)

获取/设置节点的全局合成操作。全局合成操作不会影响节点的事件命中区域。因此即使修改了该属性，节点仍会按照默认的"source-over"合成模式触发事件。

**参数：**

- `type`: `string` 类型，可以取如下值

**基础混合模式**

- `'source-over'`: 默认，新内容绘制在现有内容之上
- `'source-in'`: 只显示新内容与现有内容重叠的部分
- `'source-out'`: 只显示新内容不与现有内容重叠的部分
- `'source-atop'`: 新内容只在与现有内容重叠的地方显示
- `'destination-over'`: 新内容绘制在现有内容之下
- `'destination-in'`: 只保留现有内容与新内容重叠的部分
- `'destination-out'`: 只保留现有内容不与新内容重叠的部分
- `'destination-atop'`: 现有内容只在与新内容重叠的地方保留

<KShape :afterMounted="showBaseCompositeOperationType" :width="600" :height="210" />

**特殊混合模式效果：**

- `'lighter'`: 重叠区域的颜色值相加
- `'copy'`: 只显示新内容
- `'xor'`: 只显示不重叠的部分

<KShape :afterMounted="showSpecialCompositeOperationType" :width="600" :height="110" />

**颜色混合模式效果：**

- `'multiply'`: 颜色相乘,产生更暗的颜色
- `'screen'`: 颜色反相相乘再反相,产生更亮的颜色
- `'overlay'`: 根据现有颜色混合 multiply 和 screen
- `'darken'`: 保留较暗的颜色
- `'lighten'`: 保留较亮的颜色
- `'color-dodge'`: 提亮现有颜色以反映新颜色
- `'color-burn'`: 加深现有颜色以反映新颜色
- `'hard-light'`: 类似 overlay,但基于新颜色
- `'soft-light'`: 类似 hard-light,但效果更柔和
- `'difference'`: 从较亮颜色中减去较暗颜色
- `'exclusion'`: 类似 difference,但对比度更低

<KShape :afterMounted="showColorCompositeOperationType" :width="600" :height="310" />

**HSL 混合模式：**

- `'hue'`: 使用新内容的色调,保留现有内容的饱和度和亮度
- `'saturation'`: 使用新内容的饱和度,保留现有内容的色调和亮度
- `'color'`: 使用新内容的色调和饱和度,保留现有内容的亮度
- `'luminosity';`: 使用新内容的亮度,保留现有内容的色调和饱和度

<KShape :afterMounted="showHslColorCompositeOperationType" :width="600" :height="110" />

### opacity(opacity)

获取/设置不透明度。不透明度值的范围是 0 到 1。不透明度为 0 的节点完全透明，不透明度为 1 的节点完全不透明。

**参数：**

- `opacity`: `number`

### name(name)

读写 `name` 属性。

**例子：**

```js
// 获取 name
var name = node.name();

// 设置 name
node.name("foo");

// 设置多个 name (类似 css 的 class)
node.name("foo bar");
```

### id(id)

读写 `id`。`id` 是整个页面的全局变量。

**参数：**

- `id`: `string`

**例子：**

```js
// 获取 id
var id = node.id();

// 设置 id
node.id("foo");
```

### rotation(rotation)

读写旋转角度。

**参数：**

- `rotation`: `number`

### scale(scale)

读写缩放。

**参数：**

- `scale`: `{ x: number, y: number }`

**例子：**

```js
// 获取缩放
var scale = node.scale();

// 设置缩放
node.scale({ x: 2, y: 3 });
```

### scaleX(x)

读写 x 方向上的缩放。

### scaleY(y)

读写 y 方向上的缩放。

### skew(skew)

读写倾斜值。

**参数：**

- `skew`: `{ x: number, y: number }`

**例子：**

```js
// 获取倾斜值
var skew = node.skew();

// 设置倾斜值
node.skew({ x: 20, y: 10 });
```

### skewX(x)

读写 x 轴倾斜值。

### skewY(y)

读写 y 轴倾斜值。

### offset(offset)

设置节点偏移。**注意：offset 是从节点位置减去的，因此正值会使图形向左上方移动，这与直觉可能相反。**

**参数：**

- `offset`: `{ x: number, y: number }`

例如下面的示例，蓝色的为原节点，绿色的为偏移量设置为 `{ x: 25, y: 45 }` 的效果。

<KShape :afterMounted="offsetDemo" :width="180" :height="180" />

### offsetX(x)

设置 X 方向上的偏移。

### offsetY(y)

设置 Y 方向上的偏移。

### dragDistance(distance)

读写拖动阈值。

**参数：**

- `distance`: `number`

**例子：**

```js
// 获取拖拽阈值
var dragDistance = Node.dragDistance();
// 设置拖拽阈值，下面的代码表示只有指针拖拽移动大于3像素时才真正开始拖拽
node.dragDistance(3);
// 或者全局设置
Konva.dragDistance = 3;
```

### width(width)

读写宽度。

### height(height)

读写高度。

### listening(listening)

获取/设置监听属性。若需通过节点父级状态判断其是否处于监听状态，请使用 `isListening()` 方法。监听属性设为 `false` 的节点将不会在点击图中被检测到，因此容器 `getIntersection()` 方法会忽略这些节点。

**参数：**

- `listenging`: `boolean`

**例子：**

```js
// 获取 listening 属性
var listening = node.listening();

// 停止事件监听，从点击图中移除节点及其所有的子节点
node.listening(false);

// 根据父级状态监听事件
node.listening(true);
```

### preventDefault(preventDefault)

获取/设置阻止默认行为属性。默认情况下，所有图形都会阻止浏览器在指针移动或点击时的默认行为，这能避免在拖放节点时触发原生滚动。但某些情况下您可能需要启用默认操作，此时可将该属性设为 false。

**例子：**

```js
// 获取 preventDefault 属性
var shouldPrevent = shape.preventDefault();

// 设置 preventDefault
shape.preventDefault(false);
```

### filters(filters)

获取/设置滤镜属性。支持函数滤镜、CSS 滤镜字符串或混合数组。CSS 滤镜会优先使用浏览器原生功能进行处理，而函数滤镜则通过 ImageData 操作实现。在不支持 CSS 滤镜的浏览器中，系统会自动降级为函数滤镜。

**参数：**

- `filters`: 数组，滤镜函数/CSS 滤镜字符串组成的数组

**例子：**

```js
// 获取滤镜
var filters = node.filters();

// 仅设置 CSS 滤镜，不需要缓存，使用浏览器功能
// 注：结果测试，也是需要使用 node.cache() 的，否则没有效果，官网这里写的可能有点问题
node.cache();
node.filters(["blur(5px)", "brightness(1.2)", "constract(1.5)"]);

// 仅设置函数滤镜，需要缓存
node.cache();
node.filters([Konva.Filters.Blur, Konva.Filters.Sepia, Konva.Filters.Invert]);

// CSS 和函数滤镜混合，需要缓存
node.cache();
node.filters([
  "blur(3px)", // CSS 滤镜
  Konva.Filters.Invert, // 函数滤镜
  "brightness(1.5)", // CSS 滤镜
]);
```

下面分别是添加了 `filters` 的效果:

<KShape :after-mounted="filtersDemo" :width="400" :height="250" />

### visible

获取/设置可见性属性。取值可为 `true` 或 `false`，默认值为 `true`。若需结合节点父级状态判断其实际可见性，请使用 `isVisible()` 方法。

**参数：**

- `visible`: `boolean`

例子：

```js
// 获取 visible 属性
var visible = node.visible();

// 设置属性为不可见
node.visible(false);

// 设置属性为可见
node.visible(true);
```

### transformsEnable(enabled)

读写是否启用变换操作。可以是 `all` / `none` / `position` 。默认值为 `all`。

- `all`: 应用所有变换属性(位置、缩放、旋转、倾斜、偏移等)
- `position`: 仅应用位置和偏移变换(`x`, `y`, `offsetX`, `offsetY`)
- `none`: 不应用任何变化，节点会保持在其父容器的原点位置，因为 `x`/`y` 都不生效了。

设置为 `"position"` 可以显著提升绘制性能，特别适用于：

- 大量简单移动的对象（如粒子系统）
- 不需要旋转或缩放的元素

**例子：**

```js
// 允许位置变换，提高绘图效率
node.transformsEnabled("position");
// 允许所有变换
node.transformsEnabled("all");
```

下面是为 `all` 时的图形绘制：

<KShape :after-mounted="transformsEnabledDemo.allTransformsDraw" />

下面为 `position` 时的图形绘制：

<KShape :after-mounted="transformsEnabledDemo.positionTransformsDraw" />

下面为 `none` 时的图形绘制：

<KShape :after-mounted="transformsEnabledDemo.noneTransformsDraw" />

### size(size)

设置节点尺寸

**参数：**

- `size`: `{ width: number, height: number }`

**例子：**

```js
// 获取节点尺寸
var size = node.size();
var width = size.width;
var height = size.height;

// 设置尺寸
node.size({
  width: 100,
  height: 200,
});
```

### dragBoundFunc(dragBoundFunc)

获取/设置拖拽边界函数。此函数用于重写默认的拖放位置。

**参数：**

- `dragBoundFunc`: `(this: Node, pos: Vector2d) => Vector2d`

**例子：**

```js
// 获取拖拽边界函数
var dragBoundFuncs = node.dragBoundFunc();

// 设置仅允许垂直拖拽
node.dragBoundFunc(function (pos) {
  // 输入的 pos 是节点的绝对位置
  // 因此您的返回也应该是绝对位置
  return {
    x: this.absolutePosition().x(),
    y: pos.y,
  };
});
```

### draggable(draggable)

设置是否可拖拽的标识。

**参数：**

- `draggable`: `boolean`

**例子：**

```js
// 获取是否允许拖拽标志
var draggable = node.draggable();

// 允许拖拽
node.draggable(true);

// 不允许拖拽
node.draggable(false);
```

### to(params)

补间节点属性。这是 [Konva.Tween](./tween.md) 对象的简化用法。

**参数值：**

- `params`: 补间参数

**例子：**

```js
circle.to({
  x: 50,
  duration: 0.5,
  onUpdate: () => console.log("props updated"),
  onFinish: () => console.log("finished"),
});
```

### blurRadius(radius)

获取/设置模糊半径。需与 `Konva.Filters.Blur` 滤镜配合使用。

**参数：**

- `radius`: `number`
