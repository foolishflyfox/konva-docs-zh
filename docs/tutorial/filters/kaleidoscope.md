<script setup>
import { kaleidoscopeDemo, kaleidoscopeCodes } from './codes/kaleidoscope';
</script>

# 万花筒滤镜

要将滤镜应用于 `Konva.Image`，我们必须先使用 `cache()` 函数缓存图像，然后通过 `filters()` 函数应用滤镜。

使用 Konva 创建万花筒效果，我们可以利用 `Konva.Filters.Kaleidoscope` 滤镜，并通过设置 `kaleidoscopePower`（万花筒密度）和 `kaleidoscopeAngle`（万花筒角度）属性进行调整。

操作说明：滑动控制器来调整万花筒的密度和角度。

完整滤镜列表请参阅：[滤镜官方文档](../../api/filters)。

<KShape :afterMounted="kaleidoscopeDemo" :width="600" :height="400" />

<ShapeCode v-bind="kaleidoscopeCodes" />
