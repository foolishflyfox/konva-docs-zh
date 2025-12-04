<script setup>
import { strokeCodes, strokeDemo } from './codes/stroke';
</script>

# 描边颜色和宽度设置教程

在初始化一个图形时，通过 `stroke` 和 `strokeWidth` 属性设置可以指定描边的颜色和线宽，也可以通过 `stroke()` 和 `strokeWidth()` 方法进行设置。

操作指令：鼠标移动到五边形，改变其描边颜色与宽度。

<KShape :afterMounted="strokeDemo" width="200" height="200" />

<ShapeCode v-bind="strokeCodes" />
