<script setup>
import { codesData, customDemo } from './codes/custom';
</script>

# 自定义图形教程

你可以通过实例化 `Konva.Shape`，并定义一个自定义的绘制函数，你就可以创建一个自定义图形。

创建自定义形状时，需要定义一个绘图函数，该函数将接收 [`Konva.Context`](../../api/context) 渲染器和一个 `Shape` 实例作为参数。以下是一个简单的矩形示例：

```js
const rect = new Konva.Shape({
  x: 10,
  y: 20,
  fill: "#00D2FF",
  width: 100,
  height: 50,
  sceneFunc: function (context, shape) {
    context.beginPath();
    // 不需要指定矩形的位置，Konva 将会处理
    context.rect(0, 0, shape.getAttr("width"), shape.getAttr("height"));
    // 这是Konva特有的方法，它非常重要，将应用所有必需的样式。
    context.fillStrokeShape(shape);
  },
});
```

`Konva.Context` 是对原生 2D 画布上下文对象的封装，它具备与原生上下文相同的属性和方法，并提供了额外的 API 接口。

绘制自定义形状时可使用以下两个属性：

- `sceneFunc`: 定义形状的视觉外观
- `hitFunc`: 可选函数，用于为事件定义自定义碰撞检测区域（ 参见 [自定义碰撞区域示例](../events/custom-hit-region.md) ）

**编写 sceneFunc 和 hitFunc 的最佳实践：**

1. 性能优化：该函数每秒可能被多次调用，应避免创建图像或大型对象；
2. 无副作用：函数不应产生移动图形、绑定事件或修改应用状态等副作用；
3. 碰撞检测：应用复杂样式或绘制图像时，建议定义自定义 `hitFunc`；
4. 坐标处理：无需在 `sceneFunc` 中手动处理位置和缩放，应通过图形属性交由 Konva 自动处理；
5. 样式应用：避免在 `sceneFunc` 中手动设置样式，推荐使用 `context.fillStrokeShape；(shape)` 进行样式渲染；
6. 参考实现：更多示例可参考 [Konva 核心图形组件的实现源码](https://github.com/konvajs/konva/tree/master/src/shapes)

有关完整属性和方法列表，请参阅 [Shape API 参考文档](../../api/shape)。

<KShape :afterMounted="customDemo" :width="250" :height="200" />

<ShapeCode v-bind="codesData" />
