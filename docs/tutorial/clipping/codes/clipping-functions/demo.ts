import { createLayer } from "@docs/utils";
import Konva from "konva";

export function clippingFunctionsDemo(stage: Konva.Stage) {
  const layer = createLayer(stage);
  const group = new Konva.Group({
    clipFunc: function (ctx) {
      ctx.beginPath();
      ctx.arc(200, 120, 50, 0, Math.PI * 2, false);
      ctx.arc(280, 120, 50, 0, Math.PI * 2, false);
    },
  });
  // group.add(
  //   new Konva.Rect({
  //     x: 0,
  //     y: 0,
  //     width: 500,
  //     height: 300,
  //     fill: "#00bfff80",
  //   })
  // );

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
