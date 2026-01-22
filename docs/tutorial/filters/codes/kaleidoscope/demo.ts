import { addRanges, createLayer } from "@docs/utils";
import Konva from "konva";
import darthVaderUrl from "@docs/tutorial/shapes/codes/image/darth-vader.jpg?url";
import { watchEffect } from "vue";

export function kaleidoscopeDemo(stage: Konva.Stage) {
  const layer = createLayer(stage);

  Konva.Image.fromURL(darthVaderUrl, function (image) {
    layer.add(image);
    image.setAttr("x", 80);
    image.setAttr("y", 80);
    image.filters([Konva.Filters.Kaleidoscope]);
    image.cache();
    const [power, angle] = addRanges(stage, [
      {
        min: 0,
        max: 8,
        defaultValue: 3,
        label: "Power",
      },
      {
        min: 0,
        max: 360,
        defaultValue: 0,
        label: "Angle",
      },
    ]);
    watchEffect(() => image.kaleidoscopePower(power.value));
    watchEffect(() => image.kaleidoscopeAngle(angle.value));
  });
}
