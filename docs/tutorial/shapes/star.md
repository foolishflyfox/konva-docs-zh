<script setup>
import { starCodes, starDemo } from './codes/star';
</script>

# 星形教程

通过实例化 `Konva.Star` 对象，可以创建一个星形。

完整的属性和方法，请参见 [Star API](../../api/star)。

<KShape :after-mounted="starDemo" />

<ShapeCode v-bind="starCodes" />
