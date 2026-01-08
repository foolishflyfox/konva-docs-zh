import Konva from "konva";
import yodaUrl from "@docs/tutorial/shapes/codes/image/yoda.jpg?url";
import { createLayer } from "@docs/utils";

export function dragImageDemo(stage: Konva.Stage) {
  const layer = createLayer(stage);
  const imageObj = new Image();
  imageObj.onload = () => {
    const yoda = new Konva.Image({
      x: 50,
      y: 50,
      image: imageObj,
      width: 106,
      height: 118,
      draggable: true,
    });

    // add cursor styling
    yoda.on("mouseover", function () {
      document.body.style.cursor = "pointer";
    });
    yoda.on("mouseout", function () {
      document.body.style.cursor = "default";
    });

    layer.add(yoda);
  };
  imageObj.src = yodaUrl;
}
