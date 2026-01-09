import { createLayer } from "@docs/utils";
import Konva from "konva";

export function resizeLimitsDemo(stage: Konva.Stage) {
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
    boundBoxFunc: (oldBox, newBox) => {
      // limit resize
      if (newBox.width > 200) {
        return oldBox;
      }
      return newBox;
    },
  });
  layer.add(tr);
}
