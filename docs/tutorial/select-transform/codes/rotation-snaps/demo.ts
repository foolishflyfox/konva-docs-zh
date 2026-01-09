import { createLayer } from "@docs/utils";
import Konva from "konva";

export function rotationSnapsDemo(stage: Konva.Stage) {
  const layer = createLayer(stage);
  const rect = new Konva.Rect({
    x: 50,
    y: 50,
    width: 100,
    height: 50,
    fill: "yellow",
    stroke: "black",
    draggable: true,
  });
  layer.add(rect);

  const tr = new Konva.Transformer({
    nodes: [rect],
    rotationSnaps: [0, 90, 180, 270],
    rotationSnapTolerance: 30,
  });
  layer.add(tr);
}
