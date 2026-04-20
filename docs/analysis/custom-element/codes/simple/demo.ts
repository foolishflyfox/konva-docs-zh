import { createLayer } from "@docs/utils";
import Konva from "konva";

export function simpleCustomDemo(stage: Konva.Stage) {
  const layer = createLayer(stage);

  const hexagon = new Konva.Shape({
    x: stage.width() / 2,
    y: stage.height() / 2,
    fill: "#4ECDC4",
    stroke: "#2C3E50",
    strokeWidth: 3,
    sceneFunc: function (context, shape) {
      const radius = 60;
      context.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 6;
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);
        if (i === 0) {
          context.moveTo(x, y);
        } else {
          context.lineTo(x, y);
        }
      }
      context.closePath();
      context.fillStrokeShape(shape);
    },
  });

  layer.add(hexagon);
}
