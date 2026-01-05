import { createLayer } from "@docs/utils";
import Konva from "konva";

export function fillStrokeOrderDemo(stage: Konva.Stage) {
  const layer = createLayer(stage);
  const text1 = new Konva.Text({
    text: "Default shape rendering.\nfillAfterStrokeEnabled = false",
    x: 50,
    y: 50,
    fontSize: 40,
    stroke: "green",
    fill: "yellow",
    strokeWidth: 3,
  });
  layer.add(text1);

  const text2 = new Konva.Text({
    text: "Reversed rendering order.\nfillAfterStrokeEnabled = true",
    x: 50,
    y: 150,
    fontSize: 40,
    stroke: "green",
    fill: "yellow",
    strokeWidth: 3,
    fillAfterStrokeEnabled: true,
  });
  layer.add(text2);
}
