<script setup>
import { removeEventDemo, removeEventCodes } from './codes/remove-event'
</script>

# 移除事件

要使用 Konva 移除事件监听器，我们可以通过形状对象的 `off()` 方法实现，该方法需要指定事件类型，例如 `click` 或 `mousedown`。

操作说明：首先点击圆形，会触发 `onclick` 事件绑定的警告弹窗。接着点击按钮移除事件监听器，再次点击圆形，即可观察到事件绑定已被成功移除。

<KShape :afterMounted="removeEventDemo" :width="500" :height="300" />

<ShapeCode v-bind='removeEventCodes' />
