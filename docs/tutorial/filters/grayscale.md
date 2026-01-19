<script setup>
import { grayscaleDemo, grayscaleCodes } from './codes/grayscale'
</script>

# 灰度

要将滤镜应用于 `Konva.Image`，我们必须先使用 `cache()` 函数缓存图像，然后通过 `filters()` 函数应用滤镜。

使用 Konva 将图像颜色灰度化，我们可以使用 `Konva.Filters.Grayscale` 滤镜。

完整滤镜列表请参阅：[滤镜官方文档](../../api/filters)。

<KShape :afterMounted="grayscaleDemo" :width="600" :height="400" />

<ShapeCode v-bind="grayscaleCodes" />
