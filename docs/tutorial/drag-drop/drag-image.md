<script setup>
import { dragImageDemo, dragImageCodes } from './codes/drag-image'
</script>

# 图片拖拽

要在 Konva 中拖放图像，我们可以在实例化图形时将 `draggable` 属性设为 `true`，或者使用 `draggable()` 方法。该方法会自动为桌面端和移动端应用启用拖放功能。

<KShape :afterMounted="dragImageDemo" :width="500" :height="300" />

<ShapeCode v-bind="dragImageCodes" />
