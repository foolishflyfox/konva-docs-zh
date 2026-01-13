<script setup>
import { contrastDemo, contrastCodes } from './codes/contrast';
</script>

# 对比度滤镜

使用方法：要对 Konva.Node 应用滤镜，必须先用 `cache()` 函数缓存节点，然后通过 `filters()` 函数应用滤镜。

对比度调节：使用 `Konva.Filters.Contrast` 滤镜可调整图像对比度。

操作说明：滑动控制条改变对比度数值。

完整滤镜列表请参阅：[滤镜官方文档](../../api/filters)。

<KShape :afterMounted="contrastDemo" :width="600" :height="400" />

<ShapeCode v-bind="contrastCodes" />
