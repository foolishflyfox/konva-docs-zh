<script setup>
import { keyboardEventsDemo, keyboardEventsCodes } from './codes/keyboard-events'
</script>

# 键盘事件

Konva 中没有内置的键盘事件，如 keydown 或 keyup。

但是如何在画布上监听 keydown 或 keyup 事件呢？您可以通过两种方式轻松添加它们：

1. 在 window 对象上监听全局事件

2. 或者通过 tabIndex 属性使舞台容器可聚焦，并在其上监听事件。

操作说明：点击舞台以聚焦它，使用方向键移动形状

<KShape :afterMounted="keyboardEventsDemo" :width="500" :height="300" />

<ShapeCode v-bind="keyboardEventsCodes" />
