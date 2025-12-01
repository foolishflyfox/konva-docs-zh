<script setup>
import { simpleLineCodes, splineCodes, polygonCodes, blobCodes, lineDemo, splineDemo, polygonDemo, blobDemo } from './codes/line';
</script>

# 线条教程

通过实例化 `Konva.Line()` 对象，你可以创建线条。通过不同配置方式，线条可以呈现多种形态，包括简单线段、样条曲线、不规则闭合图形和多边形等。

完整的属性和方法可参见 [Arrow API](../../api/line)。

## 简单线条

<KShape :afterMounted="lineDemo" :width="320" :height="150"/>

<ShapeCode v-bind="simpleLineCodes" />

## 样条（曲线）

要创建曲线，需要添加 `tension` 属性。

`Line` 类的 `tension` 属性用于控制线条的弯曲程度：

- **值为 0**: 绘制直线段，不进行插值
- **值大于 0**: 创建平滑曲线，数值越大曲线越弯曲

默认值为 0。

<KShape :afterMounted="splineDemo" :width="320" height="100" />

<ShapeCode v-bind="splineCodes" />

### 多边形

要创建一个多边形，你需要将 `closed` 属性设置为 `true`，表示创建的图形是闭合的图形。

<KShape :afterMounted="polygonDemo" :width="600" height="250" />

<ShapeCode v-bind="polygonCodes" />

### 不规则闭合图形

要创建不规则闭合图形，需同时设置 `closed` 和 `tension` 属性：

<KShape :afterMounted="blobDemo" :width="300" :height="170" />

<ShapeCode v-bind="blobCodes" />
