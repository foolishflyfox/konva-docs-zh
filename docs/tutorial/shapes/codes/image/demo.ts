import { createLayer } from "@docs/utils";
import Konva from "konva";
import yodaJpgUrl from "./yoda.jpg?url";
import darthVaderUrl from "./darth-vader.jpg?url";

export function imageDemo(stage: Konva.Stage) {
  const layer = createLayer(stage);
  const imageObj = new Image();
  imageObj.onload = function () {
    const yoda = new Konva.Image({
      x: 50,
      y: 50,
      image: imageObj,
      width: 106,
      height: 118,
    });
    layer.add(yoda);
  };
  imageObj.src = yodaJpgUrl;

  // 等效 API
  Konva.Image.fromURL(darthVaderUrl, function (darthNode) {
    darthNode.x(200).y(50).scaleX(0.5).scaleY(0.5).cornerRadius(20);
    layer.add(darthNode);
  });
}
