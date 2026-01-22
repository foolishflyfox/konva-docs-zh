<script setup>
import { noiseDemo, noiseCodes } from './codes/noise';
</script>

# 噪声

要将滤镜应用于 `Konva.Image`，我们必须先使用 `cache()` 函数缓存图像，然后通过 `filters()` 函数应用滤镜。

要使用 Konva 更改图像的噪点效果，我们可以使用 Konva.Filters.Noise 滤镜。

操作说明：滑动控制条来调整噪点值

完整滤镜列表请参阅：[滤镜官方文档](../../api/filters)。

<KShape :afterMounted="noiseDemo" :width="600" :height="400" />

<ShapeCode v-bind="noiseCodes" />
