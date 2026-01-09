<script setup>
import { resizeLimitsDemo, resizeLimitsCodes } from './codes/resize-limits'
</script>

# 缩放限制

要限制或调整缩放和变换行为，您可以使用 boundBoxFunc 属性。其功能与 `dragBoundFunc` 略有相似。

操作说明：请尝试调整图形大小。您会看到其宽度被限制在 200 以内。

此外，您还可以单独控制每个锚点的移动。请参阅 [调整吸附演示](./resize-snaps)。

<KShape :afterMounted="resizeLimitsDemo" :width="500" :height="300" />

<ShapeCode v-bind="resizeLimitsCodes" />
