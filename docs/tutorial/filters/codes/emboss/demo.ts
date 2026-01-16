import { addRanges, createLayer } from "@docs/utils";
import Konva from "konva";
import darthVaderUrl from "@docs/tutorial/shapes/codes/image/darth-vader.jpg?url";
import { watch } from "vue";

export function embossDemo(stage: Konva.Stage) {
  const [strength, whiteLevel, blend] = addRanges(stage, [
    {
      min: 0,
      max: 1,
      step: 0.1,
      defaultValue: 0.5,
      label: "Strength",
    },
    {
      min: 0,
      max: 1,
      step: 0.1,
      defaultValue: 0.5,
      label: "White Level",
    },
    {
      min: 0,
      max: 1,
      step: 1,
      defaultValue: 1,
      label: "blend",
    },
  ]);
  const layer = createLayer(stage);
  const imageObj = new Image();
  imageObj.onload = () => {
    const image = new Konva.Image({
      x: 50,
      y: 100,
      image: imageObj,
      draggable: true,
    });

    layer.add(image);

    image.cache();
    image.filters([Konva.Filters.Emboss]);
    image.embossStrength(0.5);
    image.embossWhiteLevel(0.5);
    image.embossDirection("top-left");
    image.embossBlend(Boolean(1));
    watch(strength, (nv) => image.embossStrength(nv));
    watch(whiteLevel, (nv) => image.embossWhiteLevel(nv));
    watch(blend, (nv) => image.embossBlend(Boolean(nv)));
  };
  imageObj.src = darthVaderUrl;
}
