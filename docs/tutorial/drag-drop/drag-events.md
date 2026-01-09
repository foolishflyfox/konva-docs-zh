<script setup>
import { dragEventsDemo, dragEventsCodes } from './codes/drag-events';
</script>

# 拖拽事件

要在 Konva 中检测拖放事件，我们可以使用 on() 方法将 `dragstart`、`dragmove` 或 `dragend` 事件绑定到节点。on() 方法需要指定事件类型以及事件触发时执行的函数。

<KShape :afterMounted="dragEventsDemo" :width="500" :height="300" />

<ShapeCode v-bind="dragEventsCodes" />
