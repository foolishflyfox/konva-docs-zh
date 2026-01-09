<script setup>
import { stylingDemo, stylingCodes } from './codes/styling';
</script>

# 样式

您可以为您的网络应用调整 Konva.Transformer 的样式。您可以更改所有锚点的描边、尺寸和填充，也可以调整边框的颜色和粗细。

此外，您也可以参考 [复杂变换器样式](./complex-transformer-styling) 来进行更精细的调整。

<KShape :afterMounted="stylingDemo" :width="500" :height="300" />

<ShapeCode v-bind="stylingCodes" />
