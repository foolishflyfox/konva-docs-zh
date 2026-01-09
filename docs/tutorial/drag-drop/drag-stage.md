<script setup>
import { dragStageDemo, dragStageCodes } from './codes/drag-stage'
</script>

# 拖拽整个 Stage

要在 Konva 中拖放舞台，我们可以在实例化舞台时将配置对象的 `draggable` 属性设为 `true`，或者使用 `draggable()` 方法。

与其他节点的拖放功能不同，对于形状、组、图层等节点，我们只需拖动舞台的任意部分即可拖动整个舞台。

<KShape :afterMounted="dragStageDemo" :width="500" :height="300" />

<ShapeCode v-bind="dragStageCodes" />
