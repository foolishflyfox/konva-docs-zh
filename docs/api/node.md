<script setup>
import { KShape } from "@docs/components/kshapes";
// import { autoDrawEnabledDemo, closeAutoDrawEnabledDemo } from './codes/konva';
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
```
