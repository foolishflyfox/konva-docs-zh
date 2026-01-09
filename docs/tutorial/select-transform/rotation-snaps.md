<script setup>
import { rotationSnapsDemo, rotationSnapsCodes } from './codes/rotation-snaps'
</script>

# 旋转吸附

在某些应用中，您可能希望旋转操作能对齐到特定角度值附近。对齐功能使图形在接近预设角度时具有“吸附”效果，其作用类似于角度取整。

最常用的对齐角度通常是 0°、45°、90°、135°、180° 等。对齐功能允许用户更简便地将旋转角度精确设置为这些数值。

例如，如果您设置了 45° 的对齐点，用户将无法将旋转角度设为 43°，它会被自动调整为 45°。但用户仍然可以设置 35° 的旋转角度，因为它距离 45° 较远，不会触发吸附效果。

操作说明：请尝试旋转图形。您会看到图形在 0°、90°、180° 和 270° 时的吸附效果。

<KShape :afterMounted="rotationSnapsDemo" :width="500" :height="300" />

<ShapeCode v-bind="rotationSnapsCodes" />
