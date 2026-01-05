<script setup>
import { mouseCursorDemo, mouseCursorCodes } from './codes/mouse-cursor'
</script>

# 鼠标样式

要使用 Konva 框架更改鼠标光标，您只需要监听需要更改光标位置的事件，并为 Stage 容器手动应用新的样式。

操作说明：将鼠标悬停在每个五边形上，观察光标如何变化。

<KShape :afterMounted="mouseCursorDemo" :width="360" :height="200" />

<ShapeCode v-bind="mouseCursorCodes" />
