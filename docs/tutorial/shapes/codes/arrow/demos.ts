import { createLayer } from "@docs/utils";
import Konva from "konva";

export function arrowDemo(stage: Konva.Stage) {
  const layer = createLayer(stage);
  const arrow = new Konva.Arrow({
    x: stage.width() / 4,
    y: stage.width() / 4,
    points: [0, 0, 100, 100],
    pointerLength: 30,
    pointerWidth: 15,
    fill: "green",
    stroke: "orange",
    strokeWidth: 4,
  });
  layer.add(arrow);
}
