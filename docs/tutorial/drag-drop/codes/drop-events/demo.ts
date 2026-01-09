import { createLayer } from "@docs/utils";
import Konva from "konva";

export function dropEventsDemo(stage: Konva.Stage) {
  const layer = createLayer(stage);
  const tempLayer = new Konva.Layer();
  stage.add(tempLayer);

  const text = new Konva.Text({
    fill: "black",
  });
  layer.add(text);

  let previousShape: Konva.Node | undefined;

  // create multiple stars
  for (let i = 0; i < 10; i++) {
    const star = new Konva.Star({
      x: stage.width() * Math.random(),
      y: stage.height() * Math.random(),
      fill: "blue",
      numPoints: 10,
      innerRadius: 20,
      outerRadius: 25,
      draggable: true,
      name: "star " + i,
      shadowOffsetX: 5,
      shadowOffsetY: 5,
    });

    star.on("dragstart", () => {
      star.moveTo(tempLayer);
      text.text("Moving " + star.name());
      layer.draw();
    });

    star.on("dragmove", (e) => {
      const pos = stage.getPointerPosition()!;
      const shape = layer.getIntersection(pos);

      if (previousShape && shape) {
        if (previousShape !== shape) {
          // leave from old target
          previousShape.fire("dragleave", { evt: e.evt }, true);
          // enter new target
          shape.fire("dragenter", { evt: e.evt }, true);
          previousShape = shape;
        } else {
          previousShape.fire("dragover", { evt: e.evt }, true);
        }
      } else if (!previousShape && shape) {
        previousShape = shape;
        shape.fire("dragenter", { evt: e.evt }, true);
      } else if (previousShape && !shape) {
        previousShape.fire("dragleave", { evt: e.evt }, true);
        previousShape = undefined;
      }
      layer.draw();
    });

    star.on("dragend", (e) => {
      const pos = stage.getPointerPosition()!;
      const shape = layer.getIntersection(pos);
      if (shape) {
        previousShape?.fire("drop", { evt: e.evt }, true);
      }
      previousShape = undefined;
      star.moveTo(layer);
      layer.draw();
    });

    star.on("dragenter", () => {
      star.fill("green");
      text.text("dragenter " + star.name());
      layer.draw();
    });

    star.on("dragleave", () => {
      star.fill("blue");
      text.text("dragleave " + star.name());
      layer.draw();
    });

    star.on("dragover", () => {
      text.text("dragover " + star.name());
      layer.draw();
    });

    star.on("drop", () => {
      star.fill("red");
      text.text("drop " + star.name());
      layer.draw();
    });

    layer.add(star);
  }

  layer.draw();
}
