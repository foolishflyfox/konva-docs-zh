<script setup>
import { dragLineDemo, dragLineCodes } from './codes/drag-line'
</script>

# 拖拽线段

要在 Konva 中拖放线条，我们可以在实例化线条时将配置对象的 `draggable` 属性设为 `true`，或者使用 `draggable()` 方法。

注意：拖拽线条时，并不会改变线条的 `points` 属性，而是会改变其 `x` 和 `y` 属性。

<KShape :afterMounted="dragLineDemo" :width="500" :height="300" />

<ShapeCode v-bind="dragLineCodes" />
