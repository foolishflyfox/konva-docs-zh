<script setup>
import { forceUpdateDemo, forceUpdateCodes } from './codes/force-update'
</script>

# 强制更新

`Konva.Transformer` 会自动跟踪所绑定节点的属性变化，并相应调整自身的属性。

但在某些情况下，`Konva.Transformer` 无法自动完成这一过程。目前，`Konva.Transformer` 无法跟踪 `Konva.Group` 节点内部的深层属性变化。此时，您需要使用 `forceUpdate` 方法来重新设置变换工具。

操作说明：点击按钮，观察变换工具的变化。

<KShape :afterMounted="forceUpdateDemo" :width="500" :height="300" />

<ShapeCode v-bind="forceUpdateCodes" />
