<script setup>
import { codesData, imageDemo } from './codes/image';
</script>

# 图片教程

通过实例化 `Konva.Image` 对象，创建图片。

完整的属性和方法可参见 [Image API](../../api/image)。

<KShape :afterMounted="imageDemo" :width="500" :height="250" />

<ShapeCode v-bind="codesData" />
