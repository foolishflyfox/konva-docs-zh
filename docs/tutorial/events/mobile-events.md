<script setup>
import { mobileEventsDemo, mobileEventsCodes } from './codes/mobile-events';
</script>

# 移动端事件

在使用 Konva 为移动设备上的形状绑定事件处理程序时，我们可以使用 `on()` 方法。`on()` 方法需要一个事件类型和一个在事件发生时执行的函数。Konva 支持 `touchstart`、`touchmove`、`touchend`、`tap`、`dbltap`、`dragstart`、`dragmove` 和 `dragend` 等移动设备事件。

对于更复杂的手势（如旋转），请查看 [手势演示](../sandbox/guestures)。

如果你正在寻找整个 Stage 的平移和缩放逻辑，请查看 [多点触控画布缩放演示](../sandbox/multi-touch-scale-stage)。

注意：此示例仅在移动设备上有效，因为它使用的是触摸事件而非鼠标事件。

操作说明：将手指在三角形上移动以查看触摸坐标，并在圆形上开始和结束触摸。

<KShape :afterMounted="mobileEventsDemo" :width="400" :height="300" />

<ShapeCode v-bind="mobileEventsCodes" />
