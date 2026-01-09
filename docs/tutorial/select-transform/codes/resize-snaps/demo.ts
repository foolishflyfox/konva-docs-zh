import { createLayer } from "@docs/utils";
import Konva from "konva";

export function resizeSnapsDemo(stage: Konva.Stage) {
  const layer = createLayer(stage);
  const width = stage.width();
  const height = stage.height();
  // create guides
  const horizontalLine = new Konva.Line({
    points: [0, height / 2, width, height / 2],
    stroke: "#000",
    strokeWidth: 1,
    dash: [4, 4],
  });
  layer.add(horizontalLine);

  const verticalLine = new Konva.Line({
    points: [width / 2, 0, width / 2, height],
    stroke: "#000",
    strokeWidth: 1,
    dash: [4, 4],
  });
  layer.add(verticalLine);

  const rect = new Konva.Rect({
    x: 60,
    y: 60,
    width: 100,
    height: 100,
    fill: "red",
    draggable: true,
  });
  layer.add(rect);

  const tr = new Konva.Transformer({
    nodes: [rect],
    anchorDragBoundFunc: function (oldPos, newPos) {
      const dist = Math.sqrt(Math.pow(newPos.x - width / 2, 2));
      if (dist < 10) {
        return {
          ...newPos,
          x: width / 2,
        };
      }
      return newPos;
    },
  });
  layer.add(tr);
}
