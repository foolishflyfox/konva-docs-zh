import { createLayer } from "@docs/utils";
import Konva from "konva";

export function shadowDemo(stage: Konva.Stage) {
  const layer = createLayer(stage);
  const text = new Konva.Text({
    text: "Text Shadow!",
    fontFamily: "Calibri",
    fontSize: 40,
    x: 20,
    y: 20,
    stroke: "red",
    strokeWidth: 2,
    shadowBlur: 0,
    shadowOffset: { x: 10, y: 10 },
    shadowOpacity: 0.5,
  });
  const line = new Konva.Line({
    stroke: "green",
    strokeWidth: 10,
    lineJoin: "round",
    lineCap: "round",
    points: [50, 140, 250, 160],
    shadowColor: "black",
    shadowBlur: 10,
    shadowOffset: { x: 10, y: 10 },
    shadowOpacity: 0.5,
  });
  const rect = new Konva.Rect({
    x: 100,
    y: 120,
    width: 100,
    height: 50,
    fill: "#00D2FF",
    stroke: "black",
    strokeWidth: 4,
    shadowColor: "black",
    shadowBlur: 10,
    shadowOffset: { x: 10, y: 10 },
    shadowOpacity: 0.5,
  });
  layer.add(text, line, rect);
  stage.add(layer);
}
