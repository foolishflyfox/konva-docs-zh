<script setup>
import { codesData, labelDemo } from './codes/label'
</script>

# 标签教程

通过实例化 `Konva.Label` 对象，创建标签。

完整的属性和方法可参见 [Label API](../../api/label)。

在 Konva 中，`Label`、`Tag` 和 `Text` 是组合关系：`Label` 是一个容器，包含 `Tag`(背景) 和 `Text`(文本)两个子元素。

<KShape :afterMounted="labelDemo" :width="450" :height="200" />

<ShapeCode v-bind="codesData" />
