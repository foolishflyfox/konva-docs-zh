import { addRanges, createLayer } from "@docs/utils";
import Konva from "konva";
import darthVaderUrl from "@docs/tutorial/shapes/codes/image/darth-vader.jpg?url";
import { watchEffect } from "vue";

export function hslDemo(stage: Konva.Stage) {
  const layer = createLayer(stage);

  Konva.Image.fromURL(darthVaderUrl, function (image) {
    layer.add(image);
    image.setAttr("x", 80);
    image.setAttr("y", 80);
    image.filters([Konva.Filters.HSL]);
    image.cache();
    const [hue, saturation, luminance] = addRanges(stage, [
      {
        min: -180,
        max: 180,
        defaultValue: 0,
        label: "Hue",
      },
      {
        min: -2,
        max: 10,

        defaultValue: 0,
        step: 0.1,
        label: "Saturation",
      },
      {
        min: -2,
        max: 2,
        defaultValue: 0,
        step: 0.1,
        label: "Luminance",
      },
    ]);
    watchEffect(() => image.hue(hue.value));
    watchEffect(() => image.saturation(saturation.value));
    watchEffect(() => image.luminance(luminance.value));
  });
}
