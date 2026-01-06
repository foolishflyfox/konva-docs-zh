<script setup>
import { bindingEventsDemo, bindingEventsCodes } from './codes/binding-events';
</script>

# 图形事件

我看可以通过 `on()` 方法，绑定一个节点的事件。

`on()` 方法接受两个参数：第一个参数为事件类型，第二个参数为事件发生后的回调函数。

鼠标事件: `mouseover`/`mouseout`/`mouseenter`/`mouseleave`/`mousemove`/`mousedown`/`mouseup`/`wheel`/`click`/`dblclick`。

触摸事件: `touchstart`/`touchmove`/`touchend`/`tap`/`dbltap`。

指针事件: `pointerdown`/`pointermove`/`pointerup`/`pointercancel`/`pointerover`/`pointerenter`/`pointerout`/`pointerleave`/`pointerclick`/`pointerdblclick`。

拖拽事件: `dragstart`/`dragmove`/`dragend`。

变换事件: `transformstart`/`transform`/`transformend`。

示例指令：将鼠标移入、移出三角形状；将鼠标移入、移出、点击圆形。

<KShape :afterMounted="bindingEventsDemo" :width="320" :height="200" />

<ShapeCode v-bind="bindingEventsCodes" />
