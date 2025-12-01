<script setup>
import { wedgeCodes, wedgeDemo } from './codes/wedge';
</script>

# 楔形教程

我们可以通过实例化一个 `Konva.Wedge`对象创建楔形（扇形切片）形状。

完整的属性和方法，可参考 [Wedge API](../../api/wedge) 。

<KShape :after-mounted="wedgeDemo" />

<ShapeCode v-bind="wedgeCodes" />
