<script setup>
import { maskDemo, maskCodes } from './codes/mask';
</script>

# 蒙版滤镜

要将滤镜应用于 `Konva.Image`，我们必须先使用 `cache()` 函数缓存图像，然后通过 `filters()` 函数应用滤镜。

使用 Konva 为图像添加遮罩颜色，我们可以采用 `Konva.Filters.Mask` 滤镜。

`Konva.Filters.Mask` 滤镜旨在移除图像的背景。其工作原理如下：

1. 采样图像四个角点的颜色。
2. 如果这些角点颜色相似（在设定的阈值范围内），则假定此颜色代表背景色。
3. 然后创建一个遮罩，使与识别出的背景色相似的像素变为透明，而其他像素保持不透明。
4. 该遮罩会通过图像处理技术（如腐蚀和膨胀）进行优化，以去除噪点并平滑边缘。
5. 最后，优化后的遮罩将应用到图像的 Alpha 通道。

阈值属性（取值范围为 0 到 255）用于控制像素颜色需要与背景色多相似才能被遮罩移除。阈值越低，则只有非常接近背景色的颜色会被移除；而阈值越高，将移除更广范围的颜色。

操作说明：滑动控制器以调整遮罩阈值。

完整滤镜列表请参阅：[滤镜官方文档](../../api/filters)。

<KShape :afterMounted="maskDemo" :width="630" :height="650" />

<ShapeCode v-bind="maskCodes" />
