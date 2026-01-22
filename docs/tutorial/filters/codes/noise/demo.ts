import { addRanges, createLayer } from "@docs/utils";
import Konva from "konva";
import darthVaderUrl from "@docs/tutorial/shapes/codes/image/darth-vader.jpg?url";
import { watch } from "vue";

export function noiseDemo(stage: Konva.Stage) {
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
    image.filters([Konva.Filters.Noise]);
    image.noise(0.3);
    const valueRefs = addRanges(stage, [
      { min: 0, max: 1, defaultValue: image.noise(), step: 0.1 },
    ]);
    watch(
      () => valueRefs[0].value,
      (nv) => {
        image.noise(nv);
      },
    );
  };
  imageObj.src = darthVaderUrl;
}
