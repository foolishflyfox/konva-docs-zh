import { createLayer } from "@docs/utils";
import Konva from "konva";

export function opacityDemo(stage: Konva.Stage) {
  const layer = createLayer(stage);
  const pentagon = new Konva.RegularPolygon({
    x: stage.width() / 2,
    y: stage.height() / 2,
    sides: 5,
    radius: 70,
    stroke: "black",
    strokeWidth: 4,
    fill: "red",
    opacity: 0.5,
  });
  layer.add(pentagon);
  pentagon.on("mouseover", function () {
    this.opacity(1);
  });
  pentagon.on("mouseout", function () {
    this.opacity(0.5);
  });
}
