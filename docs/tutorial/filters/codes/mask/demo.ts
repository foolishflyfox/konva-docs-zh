import { addRanges, createLayer } from "@docs/utils";
import Konva from "konva";
import spaceUrl from "@docs/assets/imgs/space.jpg?url";
import { watchEffect } from "vue";

export function maskDemo(stage: Konva.Stage) {
  const layer = createLayer(stage);

  Konva.Image.fromURL(spaceUrl, function (image) {
    layer.add(image);
    image.setAttr("x", 10);
    image.setAttr("y", 30);
    image.filters([Konva.Filters.Mask]);
    image.threshold(10);
    image.cache();
    const [threshold] = addRanges(stage, [
      {
        min: 0,
        max: 255,
        defaultValue: image.threshold(),
        label: "threshold",
      },
    ]);
    watchEffect(() => image.threshold(threshold.value));
  });
}
