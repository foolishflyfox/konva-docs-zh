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

  const labelLeft = new Konva.Label({
    x: 20,
    y: 130,
    opacity: 0.75,
  });
  labelLeft.add(
    new Konva.Tag({
      fill: "green",
      pointerDirection: "left",
      pointerWidth: 20,
      pointerHeight: 28,
      lineJoin: "round",
    })
  );
  labelLeft.add(
    new Konva.Text({
      text: "Label pointing left",
      fontFamily: "Calibri",
      fontSize: 18,
      padding: 5,
      fill: "white",
    })
  );

  const simpleLabel = new Konva.Label({
    x: 180,
    y: 150,
    opacity: 0.75,
  });
  simpleLabel.add(
    new Konva.Tag({
      fill: "yellow",
    })
  );
  simpleLabel.add(
    new Konva.Text({
      text: "Simple label",
      fontFamily: "Calibri",
      fontSize: 18,
      padding: 5,
      fill: "black",
    })
  );

  layer.add(tooltip, labelLeft, simpleLabel);
}
