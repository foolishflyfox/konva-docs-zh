import { createLayer } from "@docs/utils";
import Konva from "konva";

export function groupsDemo(stage: Konva.Stage) {
  const layer = createLayer(stage);
  const group = new Konva.Group({
    x: 50,
    y: 50,
    draggable: true,
  });

  const circle = new Konva.Circle({
    x: 40,
    y: 40,
    radius: 30,
    fill: "red",
    stroke: "black",
    strokeWidth: 4,
  });

  const rect = new Konva.Rect({
    x: 80,
    y: 20,
    width: 100,
    height: 50,
    fill: "green",
    stroke: "black",
    strokeWidth: 4,
  });

  group.add(circle);
  group.add(rect);
  layer.add(group);
  group.on("dragmove", () => {
    console.log(
      `group: (${group.x()}, ${group.y()}), circle: (${circle.x()}, ${circle.y()}), rect: (${rect.x()},${rect.y()})`
    );
  });
}
