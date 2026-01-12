<script setup>
import { layeringDemo, layeringCodes } from './codes/layering';
</script>

# 分层

在 Konva 中对形状进行层级排序时，可以使用以下任一方法：`moveToTop()`、`moveToBottom()`、`moveUp()`、`moveDown()` 或 zIndex()。这些方法同样适用于组（Group）和层（Layer）的层级调整。

操作说明：拖动方框调整其位置，然后使用左侧按钮重新排列黄色方框的显示层级。

<KShape :afterMounted="layeringDemo" :width="500" :height="300" />

<ShapeCode v-bind="layeringCodes" />
