import { addRanges, createLayer } from "@docs/utils";
import Konva from "konva";
import darthVaderUrl from "@docs/tutorial/shapes/codes/image/darth-vader.jpg?url";
import { watchEffect } from "vue";

export function thresholdDemo(stage: Konva.Stage) {
  const layer = createLayer(stage);

  Konva.Image.fromURL(darthVaderUrl, function (image) {
    layer.add(image);
    image.setAttr("x", 10);
    image.setAttr("y", 30);
    image.filters([Konva.Filters.Threshold]);
    image.threshold(0.5);
    image.cache();
    const [threshold] = addRanges(stage, [
      {
        min: 0,
        max: 1,
        step: 0.1,
        defaultValue: image.threshold(),
        label: "threshold",
      },
    ]);
    watchEffect(() => image.threshold(threshold.value));
  });
}
