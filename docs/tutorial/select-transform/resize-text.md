<script setup>
import { resizeTextDemo, resizeTextCodes } from './codes/resize-text';
</script>

# 调整文本

请记住，`Konva.Transformer` 会改变节点的 `scaleX` 和 `scaleY` 属性。如果你想改变文本的宽度而不改变其显示大小，应先将文本的比例重置为 1，并相应调整宽度值。

你可以利用 transform 事件来按需更新文本的属性。

操作说明：请尝试调整文本大小。

<KShape :afterMounted="resizeTextDemo" :width="500" :height="300" />

<ShapeCode v-bind="resizeTextCodes" />
