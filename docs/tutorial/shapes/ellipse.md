<script setup>
import { codesData, ellipseDemo } from './codes/ellipse'
</script>

# 椭圆教程

通过实例化 `Konva.Ellipse()` 对象，你可以创建一个椭圆。

完整的属性和方法可参见 [Ellipse API](../../api/ellipse)。

<KShape :afterMounted="ellipseDemo" :width="220" />

<ShapeCode v-bind="codesData" />
