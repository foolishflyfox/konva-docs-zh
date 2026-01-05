<script setup>
import { blendModeDemo, blendModeCodes } from './codes/blend-mode';
</script>

# 混合模式

使用 Konva 框架，您可以通过 `globalCompositeOperation` 属性设置全局合成操作或混合模式。

操作说明：将红色矩形拖到绿色文字上方，观察 XOR 混合效果。

<KShape :afterMounted="blendModeDemo" :width="400" :height="300" />

<ShapeCode v-bind="blendModeCodes" />
