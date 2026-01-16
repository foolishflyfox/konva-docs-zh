import lionUrl from "@docs/tutorial/events/codes/image/lion.png?url";
import { createLayer } from "@docs/utils";
import Konva from "konva";

export function customGrayerDemo(stage: Konva.Stage) {
  const layer = createLayer(stage);
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
}
