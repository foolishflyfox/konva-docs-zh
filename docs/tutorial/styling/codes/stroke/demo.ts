import { createLayer } from "@docs/utils";
import Konva from "konva";

export function strokeDemo(stage: Konva.Stage) {
  const layer = createLayer(stage);
  const pentagon = new Konva.RegularPolygon({
    x: stage.width() / 2,
    y: stage.height() / 2,
    sides: 5,
    radius: 70,
    fill: "red",
    stroke: "black",
    strokeWidth: 4,
  });
  pentagon.on("mouseover", function () {
    this.stroke("blue");
    this.strokeWidth(20);
  });
  pentagon.on("mouseout", function () {
    this.stroke("black");
    this.strokeWidth(4);
  });
  layer.add(pentagon);
}
