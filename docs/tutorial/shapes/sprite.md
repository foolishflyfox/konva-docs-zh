<script setup>
import { spriteCodes, spriteDemo } from './codes/sprite'
</script>

# 精灵图教程

可以实例化一个 `Konva.Sprite` 对象，来使用 Konva 创建动画精灵。

完整的属性和方法可参见 [Sprite API](../../api/sprite)。

<KShape :after-mounted="spriteDemo" :width="300" :height="200" />

<ShapeCode v-bind="spriteCodes" />
