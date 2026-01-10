<script setup>
import { simpleClippingDemo, simpleClippingCodes } from './codes/simple-clipping'
</script>

# 简单裁剪

在使用 Konva 绘制内容时，若要将其限制在特定的裁剪区域内，我们可以为组或图层设置 `clip` 属性。裁剪区域由 `x`、`y`、`width` 和 `height` 四个参数定义。在本教程中，我们将在一个应用了矩形裁剪区域的组内绘制斑点图形。

对于更复杂的裁剪需求，可以参考 [裁剪函数（Clipping Function）](./clipping-functions)。

<KShape :afterMounted="simpleClippingDemo" :width="500" :height="300" />

<ShapeCode v-bind="simpleClippingCodes" />
