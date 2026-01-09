<script setup>
import { transformEventsDemo, transformEventsCodes } from './codes/transform-events';
</script>

# 变换事件

`Konva.Transformer` 对象具有特殊的变换事件，您可以在应用程序中使用：`transformstart`（变换开始）、`transform`（变换中）和 `transformend`（变换结束）。

这些事件也会在绑定的节点上触发。

操作说明：请打开控制台，尝试变换图形并查看日志输出。

<KShape :afterMounted="transformEventsDemo" :width="500" :height="300" />

<ShapeCode v-bind="transformEventsCodes" />
