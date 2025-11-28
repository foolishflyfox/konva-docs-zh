import { createLayer } from "@docs/utils";
import Konva from "konva";

export function ellipseDemo(stage: Konva.Stage) {
  const layer = createLayer(stage);
  const ellipse = new Konva.Ellipse({
    x: stage.width() / 2,
    y: stage.height() / 2,
    radiusX: 100,
    radiusY: 50,
    fill: "yellow",
    stroke: "black",
    strokeWidth: 4,
  });
  layer.add(ellipse);
}
