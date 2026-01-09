<script setup>
import { dropEventsDemo, dropEventsCodes } from './codes/drop-events';
</script>

# 放置事件

Konva 本身并不支持拖放事件，但您可以自行实现拖放检测功能。要检测拖放目标形状，您需要将被拖动的对象移至另一个图层。

本示例展示了如何实现拖放（`drop`）、拖入（`dragenter`）、拖出（`dragleave`）和悬停拖拽（`dragover`）事件。

操作说明：将一个形状拖拽到另一个形状上方，或将一个形状拖拽并放入另一个形状中。

<KShape :afterMounted="dropEventsDemo" :width="500" :height="400" />

<ShapeCode v-bind="dropEventsCodes" />
