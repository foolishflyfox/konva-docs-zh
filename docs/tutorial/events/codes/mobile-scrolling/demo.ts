import { createLayer } from "@docs/utils";
import Konva from "konva";

export function mobileScrollingDemo(stage: Konva.Stage) {
  const layer = createLayer(stage);
  // green rectangle - will prevent scrolling
  const greenRect = new Konva.Rect({
    x: 50,
    y: 50,
    width: 100,
    height: 600,
    fill: "green",
    stroke: "black",
    strokeWidth: 4,
  });
  layer.add(greenRect);

  // red rectangle - will NOT prevent scrolling
  const redRect = new Konva.Rect({
    x: 200,
    y: 50,
    width: 100,
    height: 600,
    fill: "red",
    stroke: "black",
    strokeWidth: 4,
    preventDefault: false,
  });
  layer.add(redRect);
}
