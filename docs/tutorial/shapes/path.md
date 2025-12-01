<script setup>
import { pathCodes, pathDemo } from './codes/path';
</script>

# 路径教程

可以通过实例化 `Konva.Path` 对象，创建一个自定义路径图形。

完整的属性和方法，请参考 [Path API](../../api/path)。

<KShape :after-mounted="pathDemo" :width="200" :height="200" />

<ShapeCode v-bind="pathCodes" />
