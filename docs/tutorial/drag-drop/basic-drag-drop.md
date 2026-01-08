<script setup>
import { basicDragDropDemo, basicDragDropCodes } from './codes/basic-drag-drop'
</script>

# 拖放基础教程

要在 Konva 中实现图形拖放，我们可以在实例化图形时将 `draggable` 属性设为 `true`，或者使用 `draggable()` 方法。该方法会自动为桌面端和移动端应用启用拖放功能。

要检测拖放事件，我们可以使用 `on()` 方法将 `dragstart`、`dragmove` 或 `dragend` 事件绑定到节点。该方法需要指定事件类型，以及事件触发时执行的函数。

<KShape :afterMounted="basicDragDropDemo" :width="500" :height="300" />

<ShapeCode v-bind="basicDragDropCodes" />
