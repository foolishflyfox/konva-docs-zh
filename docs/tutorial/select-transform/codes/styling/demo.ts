import { createLayer } from "@docs/utils";
import Konva from "konva";

export function stylingDemo(stage: Konva.Stage) {
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
    // add border
    borderStroke: "#000",
    borderStrokeWidth: 3,
    // add anchors
    anchorFill: "#fff",
    anchorStroke: "#000",
    anchorStrokeWidth: 2,
    anchorSize: 20,
    // make all anchors look like circles
    anchorCornerRadius: 50,
  });
  layer.add(tr);
}
