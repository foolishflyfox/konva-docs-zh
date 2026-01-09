<script setup>
import { keepRatioDemo, keepRatioCodes } from './codes/keep-ratio';
</script>

# 保持比例

默认情况下，当您使用角锚点（左上、右上、左下或右下）调整大小时，Transformer 会保持节点的比例不变。

如果不需要该功能，您可以将 `keepRatio` 设置为 `false`。

即使将 `keepRatio` 设为 `false`，您仍可按住 SHIFT 键以保持比例。

<KShape :afterMounted="keepRatioDemo" :width="500" :height="300" />

<ShapeCode v-bind="keepRatioCodes" />
