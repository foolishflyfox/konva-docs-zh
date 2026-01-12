<script setup>
import { groupsDemo, groupsCodes } from './codes/groups'
</script>

# 形状组

在 Konva 中将多个形状分组时，我们可以实例化一个 `Konva.Group()` 对象，然后通过 `add()` 方法将形状添加到该组中。当我们需要对多个形状进行整体变换时（例如同时移动、旋转或缩放多个形状），分组功能非常实用。组还可以嵌套添加到其他组中，从而构建更复杂的节点树结构。

如需查看完整的属性和方法列表，请参阅 Konva.Group 官方文档。

操作提示：请尝试拖动这个组，观察所有形状是如何同步移动的。注意：拖动组的行为只会改变 group 对象的 x、y 属性，不会改变组内元素的 x、y 坐标。

<KShape :afterMounted="groupsDemo" :width="500" :height="300" />

<ShapeCode v-bind="groupsCodes" />
