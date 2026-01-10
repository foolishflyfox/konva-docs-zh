<script setup>
import { stopTransformDemo, stopTransformCodes } from './codes/stop-transform'
</script>

# 停止变换

如果需要立即停止变换操作，您可以使用 Konva.Transformer 实例的 stopTransform 方法。

操作说明：请尝试调整图形的大小。如果图形的宽度超过 200，变换操作将会被停止。

<KShape :afterMounted="stopTransformDemo" :width="500" :height="300" />

<ShapeCode v-bind="stopTransformCodes" />
