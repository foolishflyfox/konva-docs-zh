import { createLayer } from "@docs/utils";
import Konva from "konva";

export function regularPolygonDemo(stage: Konva.Stage) {
  const hexagon = new Konva.RegularPolygon({
    x: stage.width() / 2,
    y: stage.height() / 2,
    sides: 6,
    radius: 70,
    fill: "red",
    stroke: "black",
    strokeWidth: 4,
  });
  createLayer(stage).add(hexagon);
}
