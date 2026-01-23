import { addRanges, createLayer } from "@docs/utils";
import Konva from "konva";
import darthVaderUrl from "@docs/tutorial/shapes/codes/image/darth-vader.jpg?url";
import { watch } from "vue";

export function pixelateDemo(stage: Konva.Stage) {
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
    image.filters([Konva.Filters.Pixelate]);
    image.pixelSize(8);
    const [pixelSize] = addRanges(stage, [
      {
        min: 2,
        max: 32,
        defaultValue: image.noise(),
        label: "Pixel Size",
      },
    ]);
    watch(pixelSize, (nv) => {
      image.pixelSize(nv);
    });
  };
  imageObj.src = darthVaderUrl;
}
