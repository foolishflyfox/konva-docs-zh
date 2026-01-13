<script setup>
import { blurDemo, blurCodes } from './codes/blur';
</script>

# 模糊滤镜

要对 `Konva.Image` 应用滤镜，我们首先需要使用 `cache()` 函数进行缓存，随后通过 `filters()` 函数添加滤镜效果。

若需在 `Konva` 中实现图像模糊效果，可选用 `Konva.Filters.Blur` 滤镜，并通过 `blurRadius` 属性调节模糊强度。

操作说明：滑动控制条以调整模糊半径。

所有可用滤镜详见[滤镜文档](../../api/filters)。

<KShape :afterMounted="blurDemo" :width="600" :height="400" />

<ShapeCode v-bind="blurCodes" />
