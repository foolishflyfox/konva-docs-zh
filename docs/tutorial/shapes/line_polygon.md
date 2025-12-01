<script setup>
import { polygonCodes, polygonDemo } from './codes/line';
</script>

# 多边形教程

通过实例化 `Konva.Line` 对象，并指定 `closed` 为 `true` 创建一个多边形。

完整的属性和方法可参见 [Line API](../../api/line)。

<KShape :after-mounted="polygonDemo" :width="600" height="250" />

<ShapeCode v-bind="polygonCodes" />
