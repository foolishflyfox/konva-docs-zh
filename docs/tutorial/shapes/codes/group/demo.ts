import { createLayer } from "@docs/utils";
import Konva from "konva";

export function groupDemo(stage: Konva.Stage) {
  const layer = createLayer(stage);
  const group = new Konva.Group({
    x: 50,
    y: 50,
    draggable: true,
  });
  const circle = new Konva.Circle({
    x: 0,
    y: 0,
    radius: 30,
    fill: "red",
  });
  const rect = new Konva.Rect({
    x: 20,
    y: 20,
    width: 100,
    height: 50,
    fill: "green",
  });
  group.add(circle);
  group.add(rect);
  layer.add(group);
}
