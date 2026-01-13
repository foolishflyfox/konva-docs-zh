import { addRanges, createLayer } from "@docs/utils";
import Konva from "konva";
import darthVaderUrl from "@docs/tutorial/shapes/codes/image/darth-vader.jpg?url";
import { watch } from "vue";

export function brightnessDemo(stage: Konva.Stage) {
  const layer = createLayer(stage);
  const imageObj = new Image();
  imageObj.onload = () => {
    const image = new Konva.Image({
      x: 50,
      y: 50,
      image: imageObj,
      draggable: true,
    });
    layer.add(image);

    image.cache();
    image.filters([Konva.Filters.Brightness]);
    image.brightness(1.5);
    const valueRefs = addRanges(stage, [
      { min: 0, max: 2, defaultValue: image.brightness(), step: 0.1 },
    ]);
    watch(
      () => valueRefs[0].value,
      (nv) => {
        image.brightness(nv);
      }
    );
  };
  imageObj.src = darthVaderUrl;
}
