import { createLayer } from "@docs/utils";
import Konva from "konva";
import darthVaderUrl from "@docs/tutorial/shapes/codes/image/darth-vader.jpg?url";

export function sepiaDemo(stage: Konva.Stage) {
  const layer = createLayer(stage);

  Konva.Image.fromURL(darthVaderUrl, function (image) {
    layer.add(image);
    image.setAttr("x", 30);
    image.setAttr("y", 20);
    image.filters([Konva.Filters.Sepia]);
    image.cache();
  });
}
