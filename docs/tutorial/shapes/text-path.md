<script setup>
import { textPathCodes, textPathDemo } from './codes/text-path';
</script>

# 文本路径教程

要创建沿着路径显示的文本，可以实例化 `Konva.TextPath` 对象。

完整的属性和方法可参见 [TextPath API](../../api/text-path)。

<KShape :after-mounted="textPathDemo" :width="500" :height="300" />

<ShapeCode v-bind="textPathCodes" />
