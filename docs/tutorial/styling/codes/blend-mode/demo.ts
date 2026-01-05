import { createLayer } from "@docs/utils";
import Konva from "konva";

export function blendModeDemo(stage: Konva.Stage) {
  const layer = createLayer(stage);
  const text = new Konva.Text({
    text: "Text Shadow!",
    fontFamily: "Calibri",
    fontSize: 40,
    x: 20,
    y: 20,
    fill: "green",
    shadowColor: "white",
    shadowOffset: { x: 10, y: 10 },
  });
  const rect = new Konva.Rect({
    x: 50,
    y: 50,
    width: 100,
    height: 100,
    fill: "red",
    draggable: true,
    globalCompositeOperation: "xor",
  });
  layer.add(text, rect);
}
