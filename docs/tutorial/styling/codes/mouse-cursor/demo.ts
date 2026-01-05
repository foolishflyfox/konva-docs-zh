import { createLayer } from "@docs/utils";
import Konva from "konva";

interface PentagonInfo {
  x: number;
  fill: string;
  cursor: string;
}

export function mouseCursorDemo(stage: Konva.Stage) {
  const layer = createLayer(stage);
  const infos: PentagonInfo[] = [
    {
      x: 80,
      fill: "red",
      cursor: "pointer",
    },
    {
      x: 180,
      fill: "green",
      cursor: "crosshair",
    },
    {
      x: 280,
      fill: "blue",
      cursor: "move",
    },
  ];
  for (const info of infos) {
    const pentagon = new Konva.RegularPolygon({
      x: info.x,
      y: stage.height() / 2,
      sides: 5,
      radius: 30,
      fill: info.fill,
      stroke: "black",
      strokeWidth: 4,
    });
    pentagon.on("mouseenter", (e) => {
      e.target.getStage()!.container().style.cursor = info.cursor;
    });
    pentagon.on("mouseout", (e) => {
      e.target.getStage()!.container().style.cursor = "default";
    });
    layer.add(pentagon);
  }
}
