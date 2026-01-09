<script setup>
import { simpleDragBoundsDemo, simpleDragBoundsCodes } from './codes/simple-drag-bounds';
</script>

# 拖拽边界

为了限制使用 Konva 拖拽形状时的移动范围，我们可以利用 `dragmove` 事件并在其中覆盖拖拽位置。

该事件可用于以多种方式约束拖放移动，例如限制水平、垂直、对角线或径向移动，甚至可以将节点限定在矩形、圆形或任意路径范围内。

```js
shape.on("dragmove", () => {
  // 锁定形状在 x 轴上的位置
  // y 轴位置保持不变
  shape.x(0);
});
```

提示：您可以使用 `shape.absolutePosition()` 方法来获取/设置节点的绝对位置，而非相对坐标 x 和 y。

操作说明：拖拽水平文本并观察其仅能水平移动。拖拽垂直文本并观察其仅能垂直移动。

<KShape :afterMounted="simpleDragBoundsDemo" :width="500" :height="300" />

<ShapeCode v-bind="simpleDragBoundsCodes" />
