import { createLayer } from "@docs/utils";
import Konva from "konva";

export function starDemo(stage: Konva.Stage) {
  const layer = createLayer(stage);
  const star = new Konva.Star({
    x: stage.width() / 2,
    y: stage.height() / 2,
    numPoints: 5,
    innerRadius: 30,
    outerRadius: 70,
    fill: "yellow",
    stroke: "black",
    strokeWidth: 4,
  });
  layer.add(star);
}
