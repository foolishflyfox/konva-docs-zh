<script setup>
import { sepiaDemo, sepiaCodes } from './codes/sepia';
</script>

# 怀旧滤镜

要将滤镜应用于 `Konva.Image`，我们必须先使用 `cache()` 函数缓存图像，然后通过 `filters()` 函数应用滤镜。

要在 Konva 中对图像应用复古棕褐色调效果，我们可以使用 `Konva.Filters.Sepia` 滤镜。

操作说明：滑动控制条来调整 RGB 数值。

完整滤镜列表请参阅：[滤镜官方文档](../../api/filters)。

<KShape :afterMounted="sepiaDemo" :width="500" :height="350" />

<ShapeCode v-bind="sepiaCodes" />
