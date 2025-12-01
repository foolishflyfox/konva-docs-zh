import { createLayer } from "@docs/utils";
import Konva from "konva";

export function wedgeDemo(stage: Konva.Stage) {
  const wedge = new Konva.Wedge({
    x: stage.width() / 2,
    y: stage.height() / 2,
    radius: 70,
    angle: 60,
    fill: "red",
    stroke: "black",
    strokeWidth: 4,
    rotation: -120,
  });
  createLayer(stage).add(wedge);
}
