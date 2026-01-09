import { createLayer } from "@docs/utils";
import Konva from "konva";

export function dragStageDemo(stage: Konva.Stage) {
  stage.draggable(true);
  const layer = createLayer(stage);

  // create circle
  const circle = new Konva.Circle({
    x: stage.width() / 2,
    y: stage.height() / 2,
    radius: 70,
    fill: "red",
    stroke: "black",
    strokeWidth: 4,
  });

  // create text
  const text = new Konva.Text({
    x: 10,
    y: 10,
    text: "Drag the stage anywhere",
    fontSize: 20,
    fontFamily: "Calibri",
    fill: "black",
  });

  layer.add(circle);
  layer.add(text);
}
