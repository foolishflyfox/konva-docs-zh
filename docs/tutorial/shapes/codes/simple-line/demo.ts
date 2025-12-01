import { createLayer } from "@docs/utils";
import Konva from "konva";

export function simpleLineDemo(stage: Konva.Stage) {
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

  const blueLine = new Konva.Line({
    points: [5, 70, 140, 23, 250, 60, 300, 20],
    stroke: "blue",
    strokeWidth: 10,
    lineCap: "round",
    lineJoin: "round",
    dash: [29, 20, 0.001, 20],
  });
  redLine.move({ x: 0, y: 5 });
  greenLine.move({ x: 0, y: 55 });
  blueLine.move({ x: 0, y: 105 });
  layer.add(redLine, greenLine, blueLine);
}
