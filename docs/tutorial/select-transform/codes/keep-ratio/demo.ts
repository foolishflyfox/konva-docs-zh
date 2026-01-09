import { createLayer } from "@docs/utils";
import Konva from "konva";

export function keepRatioDemo(stage: Konva.Stage) {
  const layer = createLayer(stage);
  const text = new Konva.Text({
    x: 50,
    y: 50,
    text: "keep ratio by default",
    fontSize: 20,
    draggable: true,
    width: 200,
  });
  layer.add(text);

  const text2 = new Konva.Text({
    x: 50,
    y: 150,
    text: "no ratio, but hold shift to keep ratio",
    fontSize: 20,
    draggable: true,
    width: 200,
  });
  layer.add(text2);

  const tr = new Konva.Transformer({
    nodes: [text],
  });
  layer.add(tr);

  const tr2 = new Konva.Transformer({
    nodes: [text2],
    keepRatio: false,
  });
  layer.add(tr2);
}
