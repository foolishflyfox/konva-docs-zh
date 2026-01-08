<script setup>
import { removeByNameDemo, removeByNameCodes } from './codes/remove-by-name';
</script>

# 图形事件

要在 Konva 中通过命名空间移除事件监听器，我们可以使用 on() 方法为事件类型添加命名空间，这样之后就能通过相同的命名空间使用 off() 方法移除事件监听器。

操作说明：点击圆形，会触发两个不同 onclick 事件绑定所弹出的提示信息。随后点击左侧的按钮移除对应的事件监听器，再次点击圆形，即可观察到当前生效的 onclick 事件绑定。

注意：Vue 和 React 不支持事件命名空间功能，因此我们不为它们提供相关示例。我们也不建议在 Vue 和 React 中使用命名空间机制。

<KShape :afterMounted="removeByNameDemo" :width="500" :height="300" />

<ShapeCode v-bind="removeByNameCodes" />
