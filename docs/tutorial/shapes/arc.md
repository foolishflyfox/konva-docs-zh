<script setup>
import { codesData, arcDemo } from "./codes/arc";
</script>

# 弧形

通过实例化 `Konva.Arc()` 对象，你可以创建一个圆弧。

完整的属性和方法可参见 [Arc API](../../api/arc)。

<KShape :afterMounted="arcDemo" :width="200" :height="200"/>

<ShapeCode v-bind="codesData" />
