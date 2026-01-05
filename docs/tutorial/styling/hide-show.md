<script setup>
import { hideShowDemo, hideShowCodes } from './codes/hide-show';
</script>

# 显示与隐藏

在 Konva 中隐藏和显示形状时，我们可以在实例化形状时设置 visible 属性，或者使用 hide() 和 show() 方法。

操作说明：点击按钮来显示和隐藏形状。

<KShape :afterMounted="hideShowDemo" :width="400" :height="300" />

<ShapeCode v-bind="hideShowCodes" />
