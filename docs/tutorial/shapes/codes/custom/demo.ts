import { createLayer } from "@docs/utils";
import Konva from "konva";

export function customDemo(stage: Konva.Stage) {
  const layer = createLayer(stage);
  const triangle = new Konva.Shape({
    sceneFunc: function (context, shape) {
      context.beginPath();
      context.moveTo(20, 50);
      context.lineTo(220, 80);
      context.lineTo(100, 150);
      context.closePath();
      context.fillStrokeShape(shape);
    },
    fill: "#00D2FF",
    stroke: "black",
    strokeWidth: 4,
  });
  layer.add(triangle);
}
