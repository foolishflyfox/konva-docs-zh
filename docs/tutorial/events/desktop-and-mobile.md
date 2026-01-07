<script setup>
import { desktopAndMobileDemo, desktopAndMobileCodes } from './codes/desktop-and-mobile';
</script>

# 手机端与移动端事件教程

注意：这个演示可能已经过时，因为现代浏览器支持指针事件。你也可以在 Konva 中使用指针事件。请参阅指针事件演示。但如果你偏好不使用指针事件，请继续阅读……

要为 Konva 中的图形添加同时适用于桌面和移动应用的事件处理程序，我们可以使用 on() 方法并传入成对的事件。例如，为了让 mousedown 事件在桌面和移动应用上都能触发，我们可以使用 "mousedown touchstart" 事件对来覆盖两种平台。为了让 mouseup 事件在桌面和移动应用上都能触发，我们可以使用 "mouseup touchend" 事件对。我们还可以使用 "dblclick dbltap" 事件对来绑定同时适用于桌面和移动设备的双击事件。

操作说明：在桌面或移动设备上对圆形进行 mousedown、mouseup、touchstart 或 touchend 操作，观察相同的功能效果。

<KShape :afterMounted="desktopAndMobileDemo" :width="500" :height="300" />

<ShapeCode v-bind="desktopAndMobileCodes" />
