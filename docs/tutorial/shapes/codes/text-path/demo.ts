import { createLayer } from "@docs/utils";
import Konva from "konva";

export function textPathDemo(stage: Konva.Stage) {
  const layer = createLayer(stage);
  const textPath = new Konva.TextPath({
    x: 0,
    y: 50,
    fill: "#333",
    fontSize: 16,
    fontFamily: "Arial",
    text: "All the world's a stage, and all the men and women merely players.",
    data: "M10,10 C0,0 10,150 100,100 S300,150 400,50",
  });
  layer.add(textPath);
}
