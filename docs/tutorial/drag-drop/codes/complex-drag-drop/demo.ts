import { createLayer } from "@docs/utils";
import Konva from "konva";

export function complexDragDropDemo(stage: Konva.Stage) {
  const layer = createLayer(stage);
  const blueGroup = new Konva.Group({
    x: 30,
    y: 70,
    draggable: true,
  });

  // bound below y=50
  blueGroup.on("dragmove", () => {
    blueGroup.y(Math.max(blueGroup.y(), 50));
  });

  // bound inside a circle
  const yellowGroup = new Konva.Group({
    x: stage.width() / 2,
    y: 70,
    draggable: true,
  });

  yellowGroup.on("dragmove", () => {
    const x = stage.width() / 2;
    const y = 70;
    const radius = 50;
    const pos = yellowGroup.absolutePosition();
    const scale =
      radius / Math.sqrt(Math.pow(pos.x - x, 2) + Math.pow(pos.y - y, 2));

    if (scale < 1) {
      yellowGroup.x(Math.round((pos.x - x) * scale + x));
      yellowGroup.y(Math.round((pos.y - y) * scale + y));
    }
  });

  const blueText = new Konva.Text({
    fontSize: 26,
    fontFamily: "Calibri",
    text: "bound below",
    fill: "black",
    padding: 10,
    width: 150,
    align: "center",
  });

  const blueRect = new Konva.Rect({
    width: 150,
    height: 72,
    fill: "#aaf",
    stroke: "black",
    strokeWidth: 4,
  });

  const yellowText = new Konva.Text({
    fontSize: 26,
    fontFamily: "Calibri",
    text: "bound in circle",
    fill: "black",
    padding: 10,
    width: 150,
    align: "center",
  });

  const yellowRect = new Konva.Rect({
    width: 150,
    height: 72,
    fill: "yellow",
    stroke: "black",
    strokeWidth: 4,
  });

  blueGroup.add(blueRect).add(blueText);
  yellowGroup.add(yellowRect).add(yellowText);

  layer.add(blueGroup);
  layer.add(yellowGroup);
}
