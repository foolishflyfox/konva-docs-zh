<script setup>
import { codesData, labelDemo } from './codes/label'
</script>

# 标签教程

通过实例化 `Konva.Label` 对象，创建标签。

完整的属性和方法可参见 [Label API](../../api/label)。

<KShape :afterMounted="labelDemo" :width="450" :height="200" />

<ShapeCode v-bind="codesData" />
