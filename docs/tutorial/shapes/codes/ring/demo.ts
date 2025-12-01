import { createLayer } from "@docs/utils";
import Konva from "konva";

export function ringDemo(stage: Konva.Stage) {
  const layer = createLayer(stage);
  const ring = new Konva.Ring({
    x: stage.width() / 2,
    y: stage.height() / 2,
    innerRadius: 40,
    outerRadius: 70,
    fill: "yellow",
    stroke: "bloack",
    strokeWidth: 4,
  });
  layer.add(ring);
}
