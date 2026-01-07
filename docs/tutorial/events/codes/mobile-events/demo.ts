import { createLayer } from "@docs/utils";
import Konva from "konva";

export function mobileEventsDemo(stage: Konva.Stage) {
  const layer = createLayer(stage);
  const text = new Konva.Text({
    x: 10,
    y: 10,
    fontFamily: "Calibri",
    fontSize: 24,
    text: "",
    fill: "black",
  });

  const triangle = new Konva.RegularPolygon({
    x: 80,
    y: 120,
    sides: 3,
    radius: 80,
    fill: "#00D2FF",
    stroke: "black",
    strokeWidth: 4,
  });

  const circle = new Konva.Circle({
    x: 230,
    y: 100,
    radius: 60,
    fill: "red",
    stroke: "black",
    strokeWidth: 4,
  });

  function writeMessage(message: string) {
    text.text(message);
  }

  triangle.on("touchmove", function () {
    const touchPos = stage.getPointerPosition()!;
    const x = touchPos.x;
    const y = touchPos.y;
    writeMessage("x: " + x + ", y: " + y);
  });

  circle.on("touchstart", function () {
    writeMessage("touchstart circle");
  });
  circle.on("touchend", function () {
    writeMessage("touchend circle");
  });

  layer.add(triangle);
  layer.add(circle);
  layer.add(text);
}
