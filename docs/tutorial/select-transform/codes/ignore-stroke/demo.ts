import { createLayer } from "@docs/utils";
import Konva from "konva";

export function ignoreStrokeDemo(stage: Konva.Stage) {
  const layer = createLayer(stage);
  // first way - reset scale on transform end
  const rect1 = new Konva.Rect({
    x: 50,
    y: 50,
    width: 100,
    height: 100,
    fill: "#00ff00",
    stroke: "black",
    strokeWidth: 5,
    draggable: true,
  });
  layer.add(rect1);

  const tr1 = new Konva.Transformer({
    nodes: [rect1],
  });
  layer.add(tr1);

  rect1.on("transformend", () => {
    // and increase width and height manually
    rect1.width(rect1.width() * rect1.scaleX());
    rect1.height(rect1.height() * rect1.scaleY());
    // after transform we need to reset scale
    rect1.scaleX(1);
    rect1.scaleY(1);
  });

  // second way - disable stroke scaling
  const rect2 = new Konva.Rect({
    x: 200,
    y: 50,
    width: 100,
    height: 100,
    fill: "#ff0000",
    stroke: "black",
    strokeWidth: 5,
    draggable: true,
    strokeScaleEnabled: false,
  });
  layer.add(rect2);

  const tr2 = new Konva.Transformer({
    nodes: [rect2],
    ignoreStroke: true,
  });
  layer.add(tr2);
}
