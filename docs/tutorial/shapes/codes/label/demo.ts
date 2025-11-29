import { createLayer } from "@docs/utils";
import Konva from "konva";

export function labelDemo(stage: Konva.Stage) {
  const layer = createLayer(stage);
  const tooltip = new Konva.Label({
    x: 170,
    y: 75,
    opacity: 0.75,
  });
  tooltip.add(
    new Konva.Tag({
      fill: "black",
      pointerDirection: "down",
      pointerWidth: 10,
      pointerHeight: 10,
      lineJoin: "round",
      shadowColor: "black",
      shadowBlur: 10,
      shadowOffsetX: 10,
      shadowOffsetY: 10,
      shadowOpacity: 0.5,
    })
  );
  tooltip.add(
    new Konva.Text({
      text: "Tooltip pointing down",
      fontFamily: "Calibri",
      fontSize: 18,
      padding: 5,
      fill: "white",
    })
  );

  layer.add(tooltip);
}
