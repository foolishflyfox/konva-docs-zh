<script setup>
import { codesData, arrowDemo } from './codes/arrow';
</script>

# 箭头教程

通过实例化 `Konva.Arrow()` 对象，你可以创建一个箭头。

`Arrow` 形状中，有两套坐标系统：

1. 位置坐标 `(x, y)`
   - 继承自 Node 基类，表示整个箭头形状在父容器中的位置偏移
   - 这会影响箭头所有点的最终渲染位置
2. 路径点坐标 `points`
   - `points` 数组包含箭头的实际路径点：`[x1, y1, x2, y2, ...]`
   - 这些坐标是相对于箭头自身坐标系的

完整的属性和方法可参见 [Arrow API](../../api/arrow)。

<KShape :afterMounted="arrowDemo" />

<ShapeCode v-bind="codesData" />
