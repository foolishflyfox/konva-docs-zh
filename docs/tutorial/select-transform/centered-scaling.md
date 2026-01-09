<script setup>
import { centeredScalingDemo, centeredScalingCodes } from './codes/centered-scaling'
</script>

# 居中缩放

要同时从两侧调整节点大小，您可以将 `centeredScaling` 属性设为 true，或在移动锚点时按住 ALT 键（即使 `centeredScaling` 为 `false`）。

操作说明：请尝试调整文本的大小。

<KShape :afterMounted="centeredScalingDemo" :width="500" :height="300" />

<ShapeCode v-bind="centeredScalingCodes" />
