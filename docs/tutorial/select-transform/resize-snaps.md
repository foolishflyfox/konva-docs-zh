<script setup>
import { resizeSnapsDemo, resizeSnapsCodes } from './codes/resize-snaps'
</script>

# 调整吸附

在某些应用中，您可能需要使调整大小的操作能对齐到特定值附近。对齐功能使图形在接近预设值时具有“吸附”效果，其作用类似于取整。您可以通过 `anchorDragBoundFunc` 方法控制锚点的拖拽行为。

```js
transformer.anchorDragBoundFunc(function (oldAbsPos, newAbsPos, event) {
  // 将 x 轴上的任何位置限制为 0
  return {
    x: 0,
    y: newAbsolutePosition.y,
  };
});
```

操作说明：请尝试调整图形大小。您将看到 Transformer 如何尝试对齐到参考线。

<KShape :afterMounted="resizeSnapsDemo" :width="500" :height="300" />

<ShapeCode v-bind="resizeSnapsCodes" />
