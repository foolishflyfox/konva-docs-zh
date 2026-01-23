<script setup>
import { rgbDemo, rgbCodes } from './codes/rgb'
</script>

# RGB 滤镜

要将滤镜应用于 `Konva.Image`，我们必须先使用 `cache()` 函数缓存图像，然后通过 `filters()` 函数应用滤镜。

使用 Konva 更改图像的 RGB 分量时，我们可以采用 `Konva.Filters.RGB` 滤镜。

操作说明：滑动控制条来调整 RGB 数值。

完整滤镜列表请参阅：[滤镜官方文档](../../api/filters)。

<KShape :afterMounted="rgbDemo" :width="600" :height="400" />

<ShapeCode v-bind="rgbCodes" />
