<script setup>
import { multipleFiltersDemo, multipleFiltersCodes } from './codes/multiple-filters'
</script>

# 多重滤镜

要将滤镜应用于 `Konva.Image`，我们必须先使用 `cache()` 函数缓存图像，然后通过 `filters()` 函数应用滤镜。

操作说明：使用复选框来切换不同的滤镜，并通过滑块调整其参数值。

完整滤镜列表请参阅：[滤镜官方文档](../../api/filters)。

<KShape :afterMounted="multipleFiltersDemo" :width="600" :height="400" />

<ShapeCode v-bind="multipleFiltersCodes" />
