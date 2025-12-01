<script setup>
import { textCodes, textDemo } from './codes/text'
</script>

# 文本教程

通过实例化 `Konva.Text` 对象，创建文本。

完整的属性与方法，参见 [Text API](../../api/text)。

<KShape :after-mounted="textDemo" :width="500" :height="300" />

<ShapeCode v-bind="textCodes" />
