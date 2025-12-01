<script setup>
import { ringCodes, ringDemo } from './codes/ring'
</script>

# 环形教程

通过实例化 `Konva.Ring` 对象，可以创建圆环。

完整的属性和方法可参见 [Ring API](../../api/ring)。

<KShape :after-mounted="ringDemo" :width="200" :height="200" />

<ShapeCode v-bind="ringCodes" />
