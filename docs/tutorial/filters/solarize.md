<script setup>
import { solarizeDemo, solarizeCodes } from './codes/solarize'
</script>

# 太阳化滤镜

要将滤镜应用于 `Konva.Image`，我们必须先使用 `cache()` 函数缓存图像，然后通过 `filters()` 函数应用滤镜。

在使用 Konva 对图像应用曝光（负片）效果时，可以使用 `Konva.Filters.Solarize` 滤镜。

操作说明：滑动控制条以调整阈值大小。

完整滤镜列表请参阅：[滤镜官方文档](../../api/filters)。

<KShape :afterMounted="solarizeDemo" :width="600" :height="400" />

<ShapeCode v-bind="solarizeCodes" />
