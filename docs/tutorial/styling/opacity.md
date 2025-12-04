<script setup>
import { opacityCodes, opacityDemo } from './codes/opacity';
</script>

# 不透明度教程

在实例化图形时，可以通过 `opacity` 属性指定图形的不透明度，或者通过 `opacity()` 方法指定不透明度。

图形的不透明度在 0 ~ 1 之间，0 表示完全透明，1 表示完全不透明，所有形状的默认不透明度值为 1。

如果您希望为多个形状应用透明度效果，同时避免重叠区域可见，请参考 [透明分组演示](../sandbox/transparent-group)。

操作指令：鼠标悬浮在五边形上可改变其不透明度。

<KShape :afterMounted="opacityDemo" width="200" height="200" />

<ShapeCode v-bind="opacityCodes" />
