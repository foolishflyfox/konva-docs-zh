<script setup>
import { enhanceDemo, enhanceCodes } from './codes/enhance'
</script>

# 增强

要将滤镜应用于 `Konva.Image`，我们必须先使用 `cache()` 函数缓存图像，然后通过 `filters()` 函数应用滤镜。

若需使用 Konva 增强图像效果，可选用 Konva.Filters.Enhance 滤镜，并通过 enhance 属性来设置增强程度。

操作说明：滑动控制条以调整增强数值。

完整滤镜列表请参阅：[滤镜官方文档](../../api/filters)。

<KShape :afterMounted="enhanceDemo" :width="600" :height="400" />

<ShapeCode v-bind="enhanceCodes" />
