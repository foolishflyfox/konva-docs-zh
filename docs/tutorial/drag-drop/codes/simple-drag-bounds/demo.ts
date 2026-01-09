import { createLayer } from "@docs/utils";
import Konva from "konva";

export function simpleDragBoundsDemo(stage: Konva.Stage) {
  const layer = createLayer(stage);
  const horizontalText = new Konva.Text({
    x: 50,
    y: 50,
    text: "Drag me horizontally",
    fontSize: 16,
    draggable: true,
    fill: "black",
  });

  horizontalText.on("dragmove", function () {
    // horizontal only
    this.y(50);
  });

  const verticalText = new Konva.Text({
    x: 200,
    y: 50,
    text: "Drag me vertically",
    fontSize: 16,
    draggable: true,
    fill: "black",
  });

  verticalText.on("dragmove", function () {
    // vertical only
    this.x(200);
  });

  layer.add(horizontalText);
  layer.add(verticalText);
}
