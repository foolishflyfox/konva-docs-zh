import { createLayer } from "@docs/utils";
import Konva from "konva";

export function dragLineDemo(stage: Konva.Stage) {
  const layer = createLayer(stage);
  const redLine = new Konva.Line({
    x: 50,
    y: 50,
    points: [0, 0, 150, 0],
    stroke: "red",
    strokeWidth: 15,
    lineCap: "round",
    lineJoin: "round",
    draggable: true,
  });

  // add cursor styling
  redLine.on("mouseover", function () {
    document.body.style.cursor = "pointer";
  });
  redLine.on("mouseout", function () {
    document.body.style.cursor = "default";
  });

  layer.add(redLine);
}
