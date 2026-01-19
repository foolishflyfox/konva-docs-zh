import { addRanges, createLayer } from "@docs/utils";
import darthVaderUrl from "@docs/tutorial/shapes/codes/image/darth-vader.jpg?url";
import Konva from "konva";
import { watch } from "vue";

export function enhanceDemo(stage: Konva.Stage) {
  const layer = createLayer(stage);
  const imageObj = new Image();
  const defaultEnhanceValue = 0.4;
  imageObj.onload = () => {
    const image = new Konva.Image({
      x: 50,
      y: 50,
      image: imageObj,
      draggable: true,
    });
    layer.add(image);
    image.cache();
    image.filters([Konva.Filters.Enhance]);
    image.enhance(defaultEnhanceValue);
    const [range] = addRanges(stage, [
      {
        min: -1,
        max: 1,
        step: 0.1,
        defaultValue: defaultEnhanceValue,
      },
    ]);
    watch(range, (nv) => {
      image.enhance(nv);
    });
  };
  imageObj.src = darthVaderUrl;
}
