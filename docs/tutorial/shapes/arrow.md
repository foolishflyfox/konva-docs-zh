<script setup>
import { codesData, arrowDemo } from './codes/arrow';
</script>

# 箭头教程

通过实例化 `Konva.Arrow()` 对象，你可以创建一个箭头。

完整的属性和方法可参见 [Arrow API](../../api/arrow)。

<KShape :afterMounted="arrowDemo" />

<ShapeCode v-bind="codesData" />
