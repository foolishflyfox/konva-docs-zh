<script setup>
import { clippingFunctionsDemo, clippingFunctionsCodes } from './codes/clipping-functions';
</script>

# 裁剪函数

如何在图层中裁剪节点？

要在 Konva 中利用复杂裁剪区域进行绘图，我们可以设置群组或图层的 `clipFunc` 属性。本教程中，我们将演示如何在一个应用了双圆形裁剪区域的群组内绘制斑点图形。

<KShape :afterMounted="clippingFunctionsDemo" :width="500" :height="300" />

<ShapeCode v-bind="clippingFunctionsCodes" />
