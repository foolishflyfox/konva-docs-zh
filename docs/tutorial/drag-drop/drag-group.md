<script setup>
import { dragGroupDemo, dragGroupCodes } from './codes/drag-group';
</script>

# 组拖拽

要在 Konva 中实现组的拖放操作，我们可以在实例化组时将配置对象的 draggable 属性设为 true，或者使用 draggable() 方法。

注意：请记住，拖拽组时，并不会改变其子节点的 x 和 y 属性，而是改变组本身的属性。

<KShape :afterMounted="dragGroupDemo" :width="500" :height="300" />

<ShapeCode v-bind="dragGroupCodes" />
