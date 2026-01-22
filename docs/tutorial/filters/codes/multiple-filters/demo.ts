import { addRanges, addSelectableRanges, createLayer } from "@docs/utils";
import Konva from "konva";
import darthVaderUrl from "@docs/tutorial/shapes/codes/image/darth-vader.jpg?url";
import { watchEffect } from "vue";

export function multipleFiltersDemo(stage: Konva.Stage) {
  const layer = createLayer(stage);

  Konva.Image.fromURL(darthVaderUrl, function (image) {
    layer.add(image);
    image.setAttr("x", 80);
    image.setAttr("y", 80);
    image.cache();
    const [blur, brightness, contrast] = addSelectableRanges(stage, [
      {
        min: 0,
        max: 40,
        defaultValue: 10,
        label: "Blur",
        selected: false,
      },
      {
        min: -1,
        max: 1,
        defaultValue: 0.3,
        step: 0.1,
        label: "Brightness",
        selected: false,
      },
      {
        min: -100,
        max: 100,
        defaultValue: 50,
        label: "Value",
        selected: false,
      },
    ]);
    // watchEffect(() => image.hue(hue.value));
    // watchEffect(() => image.saturation(saturation.value));
    // watchEffect(() => image.value(value.value));
    watchEffect(() => {
      const filters: any[] = [];
      if (blur.selected) {
        filters.push(Konva.Filters.Blur);
        image.blurRadius(blur.value);
      }
      if (brightness.selected) {
        filters.push(Konva.Filters.Brightness);
        image.brightness(brightness.value);
      }
      if (contrast.selected) {
        filters.push(Konva.Filters.Contrast);
        image.contrast(contrast.value);
      }
      image.filters(filters);
    });
  });
}
