<script setup>
import { rectangleCodes, rectangleDemo } from './codes/rectangle';
</script>

# 矩形教程

通过实例化 `Konva.Rect` 对象可以创建一个矩形。

完整的属性和方法可参见 [Rect API](../../api/rect)。

你可以指定 `Konva.Rect` 的圆角半径，可以是一个数字或者是 `[topLeft, topRight, bottomRight, bottomLeft]` 组成的数字数组。

<KShape :after-mounted="rectangleDemo" :width="300" :height="250" />

<ShapeCode v-bind="rectangleCodes" />
