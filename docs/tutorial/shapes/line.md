<script setup>
import { codesData, lineDemo } from './codes/line'
</script>

# 线条教程

通过实例化 `Konva.Line()` 对象，你可以创建线条。通过不同配置方式，线条可以呈现多种形态，包括简单线段、样条曲线、不规则闭合图形和多边形等。

完整的属性和方法可参见 [Arrow API](../../api/line)。

<KShape :afterMounted="lineDemo" :width="320" :height="150"/>

<ShapeCode v-bind="codesData" />
