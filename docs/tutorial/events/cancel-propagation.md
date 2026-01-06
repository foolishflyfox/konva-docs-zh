<script setup>
import { cancelPropagationDemo, cancelPropagationCodes } from './codes/cancel-propagation';
</script>

# 取消事件冒泡传递

在使用 Konva 时，要取消事件冒泡传播，我们可以将 `Event` 对象的 `cancelBubble` 属性设置为 true。

操作说明：点击圆形，观察到只有圆形的事件绑定被处理，因为在圆形事件触发时取消了事件传播，从而阻止了事件对象向上冒泡。

<KShape :afterMounted="cancelPropagationDemo" :width="200" :height="200" />

<ShapeCode v-bind="cancelPropagationCodes" />
