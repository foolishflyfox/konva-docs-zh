import { addRanges, createLayer } from "@docs/utils";
import Konva from "konva";
import darthVaderUrl from "@docs/tutorial/shapes/codes/image/darth-vader.jpg?url";
import { watchEffect } from "vue";

export function rgbDemo(stage: Konva.Stage) {
  const layer = createLayer(stage);

  Konva.Image.fromURL(darthVaderUrl, function (image) {
    layer.add(image);
    image.setAttr("x", 80);
    image.setAttr("y", 80);
    image.filters([Konva.Filters.RGB]);
    image.cache();
    const [r, g, b] = addRanges(stage, [
      {
        min: 0,
        max: 255,
        defaultValue: 100,
        label: "Red",
      },
      {
        min: 0,
        max: 255,
        defaultValue: 100,
        label: "Green",
      },
      {
        min: 0,
        max: 255,
        defaultValue: 100,
        label: "Blue",
      },
    ]);
    watchEffect(() => image.red(r.value));
    watchEffect(() => image.green(g.value));
    watchEffect(() => image.blue(b.value));
  });
}
