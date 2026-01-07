import { createLayer } from "@docs/utils";
import Konva from "konva";

export function keyboardEventsDemo(stage: Konva.Stage) {
  const layer = createLayer(stage);
  const circle = new Konva.Circle({
    x: stage.width() / 2,
    y: stage.height() / 2,
    radius: 50,
    fill: "red",
    stroke: "black",
    strokeWidth: 4,
  });
  layer.add(circle);

  // make stage container focusable
  stage.container().tabIndex = 1;
  // focus it
  // also stage will be in focus on its click
  stage.container().focus();

  const DELTA = 4;

  // add keyboard events
  stage.container().addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      circle.x(circle.x() - DELTA);
    } else if (e.key === "ArrowUp") {
      circle.y(circle.y() - DELTA);
    } else if (e.key === "ArrowRight") {
      circle.x(circle.x() + DELTA);
    } else if (e.key === "ArrowDown") {
      circle.y(circle.y() + DELTA);
    } else {
      return;
    }
    e.preventDefault();
  });
}
