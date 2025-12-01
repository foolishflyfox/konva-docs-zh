<script setup>
import { blobCodes, blobDemo } from './codes/line'
</script>

# 不规则图形教程

通过实例化 `Konva.Line` 对象，并指定 `closed` 和 `tension` 属性，我们可以创建一个不规则图形。

完整的属性和方法可参见 [Line API](../../api/line)。

<KShape :after-mounted="blobDemo" :width="300" :height="170" />

<ShapeCode v-bind="blobCodes" />
