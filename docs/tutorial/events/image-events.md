<script setup>
import { imageEventsDemo, imageEventsCodes } from './codes/image-events';
</script>

# 图片事件

在使用 Konva 时，要仅检测图像中非透明像素的事件，我们可以使用 `drawHitFromCache()` 方法来生成更精确的图像点击区域。默认情况下，图像内的任何像素（即使是透明像素）都可以触发事件。`drawHitFromCache()` 方法还接受一个可选的回调方法，该回调会在图像点击区域创建完成后执行。

注意：`drawHitFromCache()` 方法要求图像托管在与执行代码相同域的 Web 服务器上。

操作说明：将鼠标悬停在猴子和狮子图像上，观察鼠标悬停事件的绑定情况。注意，对于猴子图像，鼠标悬停在图像的任意部分（包括透明像素）都会触发事件。由于我们为狮子图像创建了图像点击区域，透明像素被忽略，从而实现了更精确的事件检测。

<KShape :afterMounted="imageEventsDemo" :width="600" :height="300" />

<ShapeCode v-bind="imageEventsCodes" />
