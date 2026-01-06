import { createLayer } from "@docs/utils";
import Konva from "konva";

export function cancelPropagationDemo(stage: Konva.Stage) {
  const layer = createLayer(stage);
  const circle = new Konva.Circle({
    x: stage.width() / 2,
    y: stage.height() / 2,
    radius: 70,
    fill: "red",
    stroke: "black",
    strokeWidth: 4,
  });

  circle.on("click", function (evt) {
    alert("You clicked on the circle");
    // stop event bubble
    evt.cancelBubble = true;
  });

  layer.on("click", function () {
    alert("You clicked on the layer");
  });

  layer.add(circle);
}
