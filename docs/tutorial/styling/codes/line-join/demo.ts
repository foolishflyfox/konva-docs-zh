import { createLayer } from "@docs/utils";
import Konva from "konva";
import { LineJoin } from "konva/lib/Shape";

export function lineJoinDemo(stage: Konva.Stage) {
  const layer = createLayer(stage);
  const triangle = new Konva.RegularPolygon({
    x: stage.width() / 2,
    y: stage.height() / 2,
    sides: 3,
    radius: 70,
    fill: "#00D2FF",
    stroke: "black",
    strokeWidth: 20,
    lineJoin: "miter",
  });
  layer.add(triangle);
  let index = 2;
  triangle.on("mouseenter", () => {
    const lineJoins: LineJoin[] = ["round", "bevel", "miter"];
    index = (index + 1) % lineJoins.length;
    triangle.lineJoin(lineJoins[index]);
  });
}
