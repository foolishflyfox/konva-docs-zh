<script setup>
import {  splineCodes, splineDemo } from './codes/line';
</script>

# 曲线教程

通过实例化 `Konva.Line` 对象，并制定 `tension` 属性实现曲线创建。

完整的属性和方法可参见 [Line API](../../api/line)。

<KShape :after-mounted="splineDemo" :width="320" height="100"/>

<ShapeCode v-bind="splineCodes" />
