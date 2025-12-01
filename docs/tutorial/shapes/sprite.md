<script setup>
import { spriteCodes, spriteDemo } from './codes/sprite'
</script>

# 精灵图教程

可以实例化一个 `Konva.Sprite` 对象，来使用 Konva 创建动画精灵。

<KShape :after-mounted="spriteDemo" />

<ShapeCode v-bind="spriteCodes" />
