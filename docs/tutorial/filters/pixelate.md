<script setup>
import { pixelateDemo, pixelateCodes } from './codes/pixelate'
</script>

# 像素化滤镜

要将滤镜应用于 `Konva.Image`，我们必须先使用 `cache()` 函数缓存图像，然后通过 `filters()` 函数应用滤镜。

使用 Konva 调整图像的像素化效果，我们可以采用 `Konva.Filters.Pixelate` 滤镜。

操作说明：滑动控制器以更改像素尺寸值。

完整滤镜列表请参阅：[滤镜官方文档](../../api/filters)。

<KShape :afterMounted="pixelateDemo" :width="600" :height="400" />

<ShapeCode v-bind="pixelateCodes" />
