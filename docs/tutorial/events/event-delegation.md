<script setup>
import { eventDelegationDemo, eventDelegationCodes } from './codes/event-delegation';
</script>

# 事件代理

在使用 Konva 时获取事件目标，我们可以访问 Event 对象的 target 属性。这在事件委托中特别有用，我们可以将事件处理程序绑定到父节点，并监听其子节点上发生的事件。

操作说明：点击星形，观察图层事件绑定如何正确识别被点击的形状。

<KShape :afterMounted="eventDelegationDemo" :width="500" :height="300" />

<ShapeCode v-bind="eventDelegationCodes" />
