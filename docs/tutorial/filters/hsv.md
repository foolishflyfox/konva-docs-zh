<script setup>
import { hsvDemo, hsvCodes } from './codes/hsv';
</script>

# HSV

要将滤镜应用于 `Konva.Image`，我们必须先使用 `cache()` 函数缓存图像，然后通过 `filters()` 函数应用滤镜。

要使用 Konva 调整图像的色调、饱和度和明度，我们可以使用 `Konva.Filters.HSV` 滤镜。

操作说明：滑动控制器以调整 HSV 数值。

完整滤镜列表请参阅：[滤镜官方文档](../../api/filters)。

<KShape :afterMounted="hsvDemo" :width="600" :height="400" />

<ShapeCode v-bind="hsvCodes" />
