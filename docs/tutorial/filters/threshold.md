<script setup>
import { thresholdDemo, thresholdCodes } from './codes/threshold'
</script>

# 阈值滤镜

要将滤镜应用于 `Konva.Image`，我们必须先使用 `cache()` 函数缓存图像，然后通过 `filters()` 函数应用滤镜。

在使用 Konva 为图像应用阈值效果时，可以使用 Konva.Filters.Threshold 滤镜。该阈值滤镜会将图像转换为黑白图像：所有高于阈值的像素变为白色，所有低于阈值的像素变为黑色。

操作说明：滑动控制条以调整阈值大小。

完整滤镜列表请参阅：[滤镜官方文档](../../api/filters)。

<KShape :afterMounted="thresholdDemo" :width="600" :height="400" />

<ShapeCode v-bind="thresholdCodes" />
