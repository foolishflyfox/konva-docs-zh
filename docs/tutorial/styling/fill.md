<script setup>
import { fillCodes, fillDemo } from './codes/fill'
</script>

# 填充

要为图形填充颜色，可以在创建图形时设置填充属性，也可以用 `fill()` 方法设置。

Konva 支持颜色填充、图案填充、线性渐变填充和径向渐变填充。

**操作说明：将鼠标悬停在每个五边形上可改变其填充样式，您还可以拖拽这些图形进行移动。**

<KShape :afterMounted="fillDemo" :width="600" :height="250" />

<ShapeCode v-bind="fillCodes" />
