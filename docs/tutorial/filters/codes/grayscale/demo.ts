import { createLayer } from "@docs/utils";
import Konva from "konva";
import darthVaderUrl from "@docs/tutorial/shapes/codes/image/darth-vader.jpg?url";

export function grayscaleDemo(stage: Konva.Stage) {
  const layer = createLayer(stage);

  Konva.Image.fromURL(darthVaderUrl, function (image) {
    layer.add(image);
    image.setAttr("x", 80);
    image.setAttr("y", 30);
    image.filters([Konva.Filters.Grayscale]);
    image.cache();
  });
}
