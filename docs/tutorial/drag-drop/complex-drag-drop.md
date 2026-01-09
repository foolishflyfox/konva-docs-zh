<script setup>
import { complexDragDropDemo, complexDragDropCodes } from './codes/complex-drag-drop'
</script>

# 复杂拖放

为了限制使用 Konva 在区域内拖拽节点的移动范围，我们可以利用 `dragmove` 事件来定义节点不可越界的边界。

:::tip

提示：您可以使用 shape.absolutePosition()方法来获取/设置节点的绝对位置，而非相对坐标 x 和 y。

:::

操作说明：拖拽浅蓝色矩形并观察其移动被限制在 y = 50 的虚拟边界下方。拖拽黄色矩形并观察其移动被限制在一个虚拟圆形范围内。

<KShape :afterMounted="complexDragDropDemo" :width="500" :height="300" />

<ShapeCode v-bind="complexDragDropCodes" />
