<script setup>
import { lineJoinDemo, lineJoinCodes } from './codes/line-join';
</script>

# 线拐点样式

在 Konva 中为形状设置线段连接方式时，我们可以在实例化形状时设置 lineJoin 属性，或者使用 lineJoin() 方法。

lineJoin 属性可以设置为 miter（斜接）、bevel（斜角）或 round（圆角）。除非另有指定，默认的线段连接方式为 miter。

操作说明：将鼠标悬停在三角形上以改变线段连接样式。

<KShape :afterMounted="lineJoinDemo" :width="250" :height="250" />

<ShapeCode v-bind="lineJoinCodes" />
