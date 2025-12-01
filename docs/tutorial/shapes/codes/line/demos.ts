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

export function splineDemo(stage: Konva.Stage) {
  const layer = createLayer(stage);
  const line = new Konva.Line({
    points: [5, 70, 140, 23, 250, 60, 300, 20],
    stroke: "red",
    strokeWidth: 15,
    lineCap: "round",
    lineJoin: "round",
    tension: 1,
  });
  layer.add(line);
}

export function polygonDemo(stage: Konva.Stage) {
  const layer = createLayer(stage);
  const line = new Konva.Line({
    points: [73, 192, 73, 160, 340, 23, 500, 109, 499, 139, 342, 93],
    fill: "#00D2FF",
    stroke: "black",
    strokeWidth: 5,
    closed: true,
  });
  layer.add(line);
}

export function blobDemo(stage: Konva.Stage) {
  const layer = createLayer(stage);
  const blob = new Konva.Line({
    points: [23, 20, 23, 160, 70, 93, 150, 109, 290, 139, 270, 93],
    fill: "#00D2FF",
    stroke: "black",
    strokeWidth: 5,
    closed: true,
    tension: 0.3,
  });
  layer.add(blob);
}
