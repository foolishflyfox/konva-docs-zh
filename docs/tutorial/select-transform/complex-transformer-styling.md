<script setup>
import { complexTransformerStylingDemo, complexTransformerStylingCodes } from './codes/complex-transformer-styling'
</script>

# 复杂变换器样式

您可以使用 `Konva.Transformer` 的 `anchorStyleFunc` 属性来更精细地控制锚点的样式。

对于更简单的应用场景，也可参考 [变换器样式设置](./styling.md) 相关内容。

<KShape :afterMounted="complexTransformerStylingDemo" :width="500" :height="300" />

<ShapeCode v-bind="complexTransformerStylingCodes" />
