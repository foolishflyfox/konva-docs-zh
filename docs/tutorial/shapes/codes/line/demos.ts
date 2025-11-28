import { createLayer } from "@docs/utils";
import Konva from "konva";

export function lineDemo(stage: Konva.Stage) {
  const layer = createLayer(stage);
  const redLine = new Konva.Line({
    points: [5, 70, 140, 23, 250, 60, 300, 20],
    stroke: "red",
    strokeWidth: 15,
    lineCap: "round",
    lineJoin: "round",
  });
  const greenLine = new Konva.Line({
    points: [5, 70, 140, 23, 250, 60, 300, 20],
    stroke: "green",
    strokeWidth: 2,
    lineJoin: "round",
    dash: [33, 10],
  });
  greenLine.y(50);
  layer.add(redLine, greenLine);
}
