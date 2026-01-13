<script setup>
import { brightnessDemo, brightnessCodes } from './codes/brightness';
</script>

# 亮度滤镜

注意：此滤镜在 Konva 10.0.0 版本中引入，用于替代原有的 Brighten 滤镜。Brighten 滤镜为保持向后兼容目前仍可用，但已弃用，未来将被移除。新滤镜的渲染效果更接近 CSS 滤镜的 brightness(0.5)。

使用方法：
要对 Konva.Image 应用滤镜，必须先用 cache() 函数缓存图像，然后通过 filters() 函数应用滤镜。

亮度调节原理：
使用 Konva.Filters.Brightness 滤镜，并通过 brightness 属性设置亮度值。亮度值可设置为 0 到 2 之间的任意数字：

- 0：生成纯黑图像
- 1：原始图像（无变化）
- 大于 1 的值：提升图像亮度
- 2：生成极亮图像

操作说明：滑动控制条调整亮度值

完整滤镜列表请参阅：[滤镜官方文档](../../api/filters)。

<KShape :afterMounted="brightnessDemo" :width="600" :height="400" />

<ShapeCode v-bind="brightnessCodes" />
