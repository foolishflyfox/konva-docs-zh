<script setup>
import { codesData, groupDemo } from './codes/group';
</script>

# 组教程

通过实例化 `Konva.Group()` 对象，你可以创建一个组。

完整的属性和方法可参见 [Group API](../../api/group)。

<KShape :afterMounted="groupDemo" :width="200" />

<ShapeCode v-bind="codesData" />
