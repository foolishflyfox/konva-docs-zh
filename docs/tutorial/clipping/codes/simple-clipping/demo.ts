import { createLayer } from "@docs/utils";
import Konva from "konva";

export function simpleClippingDemo(stage: Konva.Stage) {
  const layer = createLayer(stage);
  const group = new Konva.Group({
    clip: {
      x: 100,
      y: 20,
      width: 200,
      height: 200,
    },
  });

  for (let i = 0; i < 20; i++) {
    const blob = new Konva.Circle({
      x: Math.random() * stage.width(),
      y: Math.random() * stage.height(),
      radius: Math.random() * 50,
      fill: "green",
      opacity: 0.8,
    });
    group.add(blob);
  }

  // add the shape to the layer
  layer.add(group);
}
