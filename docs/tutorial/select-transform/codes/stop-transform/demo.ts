import { createLayer } from "@docs/utils";
import Konva from "konva";

export function stopTransformDemo(stage: Konva.Stage) {
  const layer = createLayer(stage);
  const rect = new Konva.Rect({
    x: 50,
    y: 50,
    width: 100,
    height: 100,
    fill: "yellow",
    stroke: "black",
    draggable: true,
  });
  layer.add(rect);

  const tr = new Konva.Transformer({
    nodes: [rect],
  });
  layer.add(tr);

  rect.on("transform", function () {
    const width = rect.width() * rect.scaleX();
    if (width > 200) {
      tr.stopTransform();
    }
  });
}
