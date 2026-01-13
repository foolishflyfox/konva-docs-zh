import { addRanges, createLayer } from "@docs/utils";
import Konva from "konva";
import darthVaderUrl from "@docs/tutorial/shapes/codes/image/darth-vader.jpg?url";
import { watch } from "vue";

export function blurDemo(stage: Konva.Stage) {
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
    image.filters([Konva.Filters.Blur]);
    image.blurRadius(10);
    const valueRefs = addRanges(stage, [
      { label: "模糊半径", min: 0, max: 40, defaultValue: 10 },
    ]);
    watch(
      () => valueRefs[0].value,
      (nv) => {
        image.blurRadius(nv);
      }
    );
  };
  imageObj.src = darthVaderUrl;
}
