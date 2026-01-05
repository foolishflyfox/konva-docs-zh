<script setup>
import { fillStrokeOrderDemo, fillStrokeOrderCodes } from './codes/fill-stroke-order';
</script>

# 填充与描边顺序

如果图形同时具有填充（fill）和描边（stroke），默认情况下，Konva 会先绘制填充，再在其上方绘制描边。这对于大多数应用场景来说是最佳表现。

## 如何将填充部分绘制在描边之上？

在少数特殊情况下，您可能需要一个先绘制描边，再将填充绘制在其上方的图形。针对这种用例，您可以使用 fillAfterStrokeEnabled 属性。

```javascript
shape.fillAfterStrokeEnabled(true);
```

操作说明：请查看两种不同填充与描边绘制顺序的示例。

<KShape :afterMounted="fillStrokeOrderDemo" :width="600" :height="300" />

<ShapeCode v-bind="fillStrokeOrderCodes" />
