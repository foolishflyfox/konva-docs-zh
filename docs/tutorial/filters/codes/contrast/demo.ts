import { addRanges, createLayer } from "@docs/utils";
import Konva from "konva";
import darthVaderUrl from "@docs/tutorial/shapes/codes/image/darth-vader.jpg?url";
import { watch } from "vue";

export function contrastDemo(stage: Konva.Stage) {
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
    image.filters([Konva.Filters.Contrast]);
    image.contrast(30);
    const valueRefs = addRanges(stage, [
      { min: -100, max: 100, defaultValue: image.contrast() },
    ]);
    watch(
      () => valueRefs[0].value,
      (nv) => {
        image.contrast(nv);
      }
    );
  };
  imageObj.src = darthVaderUrl;
}
