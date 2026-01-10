<script setup>
import { changeContainersDemo, changeContainersCodes } from './codes/change-containers'
</script>

# 更改容器

要将一个形状从一个容器移动到另一个容器中，使用 Konva 的 `moveTo()` 方法，该方法需要一个容器作为参数。容器可以是另一个 stage、图层（layer）或组（group）。你也可以将组移动到其他组或图层中，或者直接将形状从组移动到其他图层。

操作说明：拖放组并观察红色矩形是否绑定到黄色组或蓝色组。使用左侧的按钮将矩形从一个组移动到另一个组中。

<KShape :afterMounted="changeContainersDemo" :width="500" :height="300" />

<ShapeCode v-bind="changeContainersCodes" />
