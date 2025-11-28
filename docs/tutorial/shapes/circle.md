<script setup>
import { codesData, circleDemo } from "./codes/circle";
</script>

# 圆形教程

通过可以实例化一个 `Konva.Circle()` 对象创建圆形。

有关完整属性和方法列表，请参阅 [Circle API 参考文档](../../api/circle)。

<KShape :afterMounted="circleDemo" :width="200" :height="200" />

<ShapeCode v-bind="codesData" />
