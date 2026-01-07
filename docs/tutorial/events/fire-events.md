<script setup>
import { fireEventsDemo, fireEventsCodes } from './codes/fire-events';
</script>

# 触发事件

在使用 Konva 时触发事件，我们可以使用 fire() 方法。这使我们能够以编程方式触发诸如 click、mouseover、mousemove 等事件，也可以触发自定义事件，如 foo 和 bar。

:::warning

注意：虽然可以触发自定义事件，但通常最好使用内置的交互事件，如 click、mouseover、mousemove 等。自定义事件可能会使代码更难维护和调试。

:::

<KShape :afterMounted="fireEventsDemo" :width="500" :height="300" />

<ShapeCode v-bind="fireEventsCodes" />
