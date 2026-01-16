<script setup>
import { embossDemo, embossCodes } from './codes/emboss';
</script>

# 浮雕

要将滤镜应用于 `Konva.Image`，我们必须先使用 `cache()` 函数缓存图像，然后通过 `filters()` 函数应用滤镜。

操作说明：滑动控制条以调整浮雕滤镜的数值。

所有可用滤镜请参阅滤镜文档。

完整滤镜列表请参阅：[滤镜官方文档](../../api/filters)。

<KShape :afterMounted="embossDemo" :width="600" :height="450" />

<ShapeCode v-bind="embossCodes" />
