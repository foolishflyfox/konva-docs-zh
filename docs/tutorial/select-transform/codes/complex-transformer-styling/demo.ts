import { createLayer } from "@docs/utils";
import Konva from "konva";

export function complexTransformerStylingDemo(stage: Konva.Stage) {
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
    anchorStyleFunc: (anchor) => {
      // make all anchors circles
      anchor.cornerRadius(50);
      // make all anchors red
      anchor.fill("red");

      // make right-middle bigger
      if (anchor.hasName("middle-right")) {
        anchor.scale({ x: 2, y: 2 });
      }
      // make top-left invisible
      if (anchor.hasName("top-left")) {
        anchor.scale({ x: 0, y: 0 });
      }
    },
  });
  layer.add(tr);
}
