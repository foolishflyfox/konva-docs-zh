<script setup>
import { KShape } from "@docs/components/kshapes";
import { getClientRectDemo } from './codes/node';

getClientRectDemo();
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

为节点绑定事件。KonvaJS 支持以下事件：mouseover（鼠标悬停）、mousemove（鼠标移动）、mouseout（鼠标移出）、mouseenter（鼠标进入）、mouseleave（鼠标离开）、mousedown（鼠标按下）、mouseup（鼠标释放）、wheel（滚轮）、contextmenu（右键菜单）、click（单击）、dblclick（双击）、touchstart（触摸开始）、touchmove（触摸移动）、touchend（触摸结束）、tap（轻击）、dbltap（双击触摸）、dragstart（拖拽开始）、dragmove（拖拽移动）和 dragend（拖拽结束）。

要同时绑定多个事件，请传入以空格分隔的事件字符串，例如：'mousedown mouseup mousemove'。如需为事件添加命名空间，请使用类似 'click.foobar' 的格式来按名称绑定事件。

**参数：**

- `evtStr`: String，例如 `'click'`，`'mousedown touchstart'`，`'mousedown.foo touchstart.foo'`
- `handler`: function， 事件处理函数。该函数的第一个参数是事件对象。事件对象包含以下属性：target 是事件的主要目标，currentTarget 是当前绑定了监听器的节点，evt 是原生浏览器事件对象。

**返回：** `Konva.Node`

::: tip

1. 事件的命名空间什么用
2. 为什么需要 target 和 currentTarget
3. evt 是什么，evt.evt 是什么
4. 事件传播是什么模型，和 DOM 的一样吗

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
// 注意：在 TypeScript 下只声明了2参数的on方法，因此3参数的on方法不能使用
// 在 JavaScript 下使用没有问题，如果要强用，需要使用类型断言 as any
// 测试文件中的3参数的事件委托测试也被标记为 skip，说明该功能可能不是官方主推的 API
layer.on("click", "Group", function (evt) {
  var shape = evt.target;
  var group = evt.currentTarget;
});
```
