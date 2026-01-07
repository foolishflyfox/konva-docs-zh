<script setup>
import { mobileScrollingDemo, mobileScrollingCodes } from './codes/mobile-scrolling';
</script>

# 移动端滚动

默认情况下，Konva 会阻止与舞台的所有指针交互的默认行为。这将防止在移动设备上尝试拖放形状时页面发生意外滚动。

但在某些情况下，您可能希望保留浏览器事件的默认行为。在这种情况下，您可以将形状的 `preventDefault` 属性设置为 `false`。

操作说明：如果您在移动设备上，请尝试通过每个矩形滚动页面。绿色矩形 - 应阻止默认行为（无页面滚动）。红色矩形 - 将保留默认行为（滚动应正常进行），滑动会使页面滚动条移动。

<KShape :afterMounted="mobileScrollingDemo" :width="400" :height="300" />

<ShapeCode v-bind="mobileScrollingCodes" />
