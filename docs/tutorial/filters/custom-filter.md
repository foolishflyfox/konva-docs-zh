<script setup>
import { customFilterDemo, customFilterCodes } from './codes/custom-filter'
</script>

# 自定义滤镜

如何在 Konva 中为节点应用自定义滤镜？本示例演示如何在 Konva 框架中使用自定义滤镜。

滤镜是一个以 `Canvas` 的 `ImageData` 作为输入并对其进行处理的函数。

```javascript
function Filter(imageData) {
  // 对图像数据进行处理
  imageData.data[0] = 0;
}
```

如需查看所有可用滤镜，请参阅[滤镜官方文档](../../api/filters)。

同时可参考 [图像边框示例](../sandbox/image-border) 了解自定义滤镜的实际应用。

在本示例中，我们将移除图像中的所有透明度。

<KShape :afterMounted="customFilterDemo" :width="500" :height="200" />

<ShapeCode v-bind="customFilterCodes" />
