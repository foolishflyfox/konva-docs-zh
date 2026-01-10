<script setup>
import { ignoreStrokeDemo, ignoreStrokeCodes } from './codes/ignore-stroke'
</script>

# 忽略描边

请记住，`Konva.Transformer` 会改变节点的 `scaleX` 和 `scaleY` 属性。默认情况下，当你变换一个形状时，其描边也会被缩放。在某些情况下，这不是理想的效果。

有两种方法可以防止描边被缩放：

重置形状的比例。

组合使用 `shape.strokeScaleEnabled(false)` 和 `transformer.ignoreStroke(false)`。

操作说明：这里有两个可以调整大小的矩形。绿色的矩形将重置其比例，红色的矩形则只是禁用了描边缩放。

<KShape :afterMounted="ignoreStrokeDemo" :width="500" :height="300" />

<ShapeCode v-bind="ignoreStrokeCodes" />
