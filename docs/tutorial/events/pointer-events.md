<script setup>
import { pointerEventsDemo, pointerEventsCodes } from './codes/pointer-events'
</script>

# 指针事件

指针事件可用于通过单个处理程序同时处理移动设备和桌面设备的事件。

在使用 Konva 为形状绑定指针事件处理程序时，我们可以使用 `on()` 方法。`on()` 方法需要一个事件类型和一个在事件发生时执行的函数。Konva 支持 `pointerdown`、`pointermove`、`pointerup`、`pointercancel`、`pointerover`、`pointerenter`、`pointerout`、`pointerleave`、`pointerclick`、pointerdblclick 事件。

注意：此示例在移动设备和桌面设备上均可运行。

操作说明：将鼠标/手指在三角形上移动以查看指针坐标。

<KShape :afterMounted="pointerEventsDemo"  :width="680" :height="300" />

<ShapeCode v-bind="pointerEventsCodes" />
