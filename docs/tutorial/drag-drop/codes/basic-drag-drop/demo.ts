import { createLayer } from "@docs/utils";
import Konva from "konva";

export function basicDragDropDemo(stage: Konva.Stage) {
  const layer = createLayer(stage);
  const circle = new Konva.Circle({
    x: stage.width() / 2,
    y: stage.height() / 2,
    radius: 70,
    fill: "red",
    stroke: "black",
    strokeWidth: 4,
    draggable: true,
  });

  // add cursor styling
  circle.on("mouseover", function () {
    document.body.style.cursor = "pointer";
  });
  circle.on("mouseout", function () {
    document.body.style.cursor = "default";
  });

  layer.add(circle);
}
