<script setup>
import { hslDemo, hslCodes } from './codes/hsl'
</script>

# HSL

要将滤镜应用于 `Konva.Image`，我们必须先使用 `cache()` 函数缓存图像，然后通过 `filters()` 函数应用滤镜。

要使用 Konva 更改图像的色相、饱和度和亮度分量，我们可以使用 `Konva.Filters.HSL` 滤镜。

操作说明：滑动控制条以调整 HSL 数值。

完整滤镜列表请参阅：[滤镜官方文档](../../api/filters)。

<KShape :afterMounted="hslDemo" :width="600" :height="400" />

<ShapeCode v-bind="hslCodes" />
