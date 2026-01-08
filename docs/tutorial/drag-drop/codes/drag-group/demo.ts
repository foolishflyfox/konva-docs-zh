import { createLayer } from "@docs/utils";
import Konva from "konva";

export function dragGroupDemo(stage: Konva.Stage) {
  const layer = createLayer(stage);
  const group = new Konva.Group({
    draggable: true,
  });
  layer.add(group);

  const colors = ["red", "orange", "yellow", "green", "blue", "purple"];

  for (let i = 0; i < 6; i++) {
    const box = new Konva.Rect({
      x: i * 30 + 10,
      y: i * 18 + 40,
      width: 100,
      height: 50,
      name: colors[i],
      fill: colors[i],
      stroke: "black",
      strokeWidth: 4,
    });
    group.add(box);
  }

  group.on("mouseover", function () {
    document.body.style.cursor = "move";
  });
  group.on("mouseout", function () {
    document.body.style.cursor = "default";
  });
}
