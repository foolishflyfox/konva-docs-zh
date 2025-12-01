<script setup>
import { simpleLineCodes, simpleLineDemo } from './codes/simple-line'
</script>

# 简单折线教程

通过实例化 `Konva.Line` 对象，我们可以创建简单的线图形。

完整的属性和方法可参见 [Line API](../../api/line)。

<KShape :after-mounted="simpleLineDemo" :width="320" :height="200" />

<ShapeCode v-bind="simpleLineCodes" />
