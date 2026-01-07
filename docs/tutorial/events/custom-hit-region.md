<script setup>
import { customHitRegion, customHitRegionCodes } from './codes/custom-hit-region';
</script>

# 自定义命中区域

有两种方法可以改变图形的点击检测区域：hitFunc 和 hitStrokeWidth 属性。

## 1. 什么是 hitFunc？

在 Konva 中为图形创建自定义点击绘制函数，我们可以设置 `hitFunc` 属性。

点击绘制函数是 Konva 用于绘制点击检测区域的函数。使用自定义的点击绘制函数有几个好处：例如使点击区域更大，让用户更容易与图形交互；使图形的某些部分可检测而其他部分不可检测；或者简化点击绘制函数以提高渲染性能。

也可以参考编写自定义 `sceneFunc` 的一些最佳实践，这些实践同样适用于 `hitFunc`。

`hitFunc` 是一个带有两个参数的函数：`Konva.Context` 渲染器和一个图形实例。

## 2. 什么是 hitStrokeWidth？

对于某些图形，如 `Konva.Line`，重写 `hitFunc` 过于困难。在某些情况下，您可能只想让事件的检测区域更宽。在这种情况下，最好使用 `hitStrokeWidth` 属性并设置较大的值。

操作说明：将鼠标悬停、移出、按下和释放在星形上，观察点击区域是一个包围图形的超大圆形。对线条也尝试相同的操作。您还可以切换点击画布的显示以查看其外观，这对调试可能很有用。

<KShape :afterMounted="customHitRegion" :width="500" :height="400" />

<ShapeCode v-bind="customHitRegionCodes" />
