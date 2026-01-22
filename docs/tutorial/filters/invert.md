<script setup>
import { invertDemo, invertCodes } from './codes/invert';
</script>

# 反转滤镜

要将滤镜应用于 `Konva.Image`，我们必须先使用 `cache()` 函数缓存图像，然后通过 `filters()` 函数应用滤镜。

使用 Konva 反转图像颜色，我们可以采用 `Konva.Filters.HSV` 滤镜。

完整滤镜列表请参阅：[滤镜官方文档](../../api/filters)。

<KShape :afterMounted="invertDemo" :width="600" :height="400" />

<ShapeCode v-bind="invertCodes" />
