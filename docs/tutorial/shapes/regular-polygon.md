<script setup>
import { regularPolygonCodes, regularPolygonDemo } from './codes/regular-polygon'
</script>

# 正多边形教程

你可以通过实例化 `Konva.RegularPolygon` 对象来创建正多边形。

完整的属性和方法可参见 [RegularPolygon](../../api/regular-polygon.md)。

<KShape :after-mounted="regularPolygonDemo" />

<ShapeCode v-bind="regularPolygonCodes" />
