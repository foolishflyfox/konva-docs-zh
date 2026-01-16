<script setup>
import { customGrayerDemo } from './codes/custom-grayer';
</script>

# 自定义灰度滤镜

该自定义滤镜将图片处理成灰度图。

<KShape :afterMounted="customGrayerDemo" :width="500" :height="300" bg-color="#fafafa" />

代码为：

```ts
function Grayer(this: Konva.Node, imageData: ImageData) {
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const [r, g, b] = [data[i], data[i + 1], data[i + 2]];
    const argV = Math.ceil((r + g + b) / 3);
    data[i] = data[i + 1] = data[i + 2] = argV;
  }
}
Konva.Image.fromURL(lionUrl, function (image) {
  layer.add(image);
  image.setAttr("x", 80);
  image.setAttr("y", 30);
  image.filters([Grayer]);
  image.cache();
});
```
