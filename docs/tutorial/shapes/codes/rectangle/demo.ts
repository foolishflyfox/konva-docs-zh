import { createLayer } from "@docs/utils";
import Konva from "konva";

export function rectangleDemo(stage: Konva.Stage) {
  const layer = createLayer(stage);
  const rect1 = new Konva.Rect({
    x: 20,
    y: 20,
    width: 100,
    height: 50,
    fill: "green",
    stroke: "black",
    strokeWidth: 4,
  });
  const rect2 = new Konva.Rect({
    x: 150,
    y: 40,
    width: 100,
    height: 50,
    fill: "red",
    shadowBlur: 10,
    cornerRadius: 10,
  });
  const rect3 = new Konva.Rect({
    x: 50,
    y: 120,
    width: 100,
    height: 100,
    fill: "blue",
    cornerRadius: [0, 10, 20, 30],
  });
  layer.add(rect1, rect2, rect3);
}
