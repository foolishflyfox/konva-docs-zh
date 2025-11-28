import { createLayer } from "@docs/utils";
import Konva from "konva";

export function arcDemo(stage: Konva.Stage) {
  const layer = createLayer(stage);
  const arc = new Konva.Arc({
    x: stage.width() / 2,
    y: stage.height() / 2,
    innerRadius: 40,
    outerRadius: 70,
    angle: 60,
    fill: "yellow",
    stroke: "black",
    strokeWidth: 4,
  });
  layer.add(arc);
}
