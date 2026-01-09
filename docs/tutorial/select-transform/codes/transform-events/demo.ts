import { createLayer } from "@docs/utils";
import Konva from "konva";

export function transformEventsDemo(stage: Konva.Stage) {
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

  tr.on("transformstart", () => {
    console.log("transform start");
  });

  tr.on("transform", () => {
    console.log("transforming");
  });

  tr.on("transformend", () => {
    console.log("transform end");
  });

  rect.on("transformstart", () => {
    console.log("rect transform start");
  });

  rect.on("transform", () => {
    console.log("rect transforming");
  });

  rect.on("transformend", () => {
    console.log("rect transform end");
  });
}
