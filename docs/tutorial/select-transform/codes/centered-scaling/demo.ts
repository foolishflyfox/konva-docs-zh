import { createLayer } from "@docs/utils";
import Konva from "konva";

export function centeredScalingDemo(stage: Konva.Stage) {
  const layer = createLayer(stage);
  const text = new Konva.Text({
    x: 50,
    y: 80,
    text: "Simple text",
    fontSize: 30,
    draggable: true,
    width: 200,
  });
  layer.add(text);
  const text2 = new Konva.Text({
    x: 50,
    y: 180,
    text: "Simple text",
    fontSize: 30,
    draggable: true,
    width: 200,
  });
  layer.add(text2);
  const tr = new Konva.Transformer({
    nodes: [text],
    centeredScaling: true,
  });
  layer.add(tr);
  const tr2 = new Konva.Transformer({
    nodes: [text2],
  });
  layer.add(tr2);
}
