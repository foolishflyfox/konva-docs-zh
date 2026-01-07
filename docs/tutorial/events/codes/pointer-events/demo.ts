import { createLayer } from "@docs/utils";
import Konva from "konva";

export function pointerEventsDemo(stage: Konva.Stage) {
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
    x: stage.width() / 2,
    y: stage.height() / 2,
    sides: 3,
    radius: 80,
    fill: "#00D2FF",
    stroke: "black",
    strokeWidth: 4,
  });

  function writeMessage(message: string) {
    text.text(message);
  }

  triangle.on("pointermove", function () {
    const pos = stage.getPointerPosition()!;
    writeMessage("x: " + pos.x + ", y: " + pos.y);
  });

  triangle.on("pointerout", function () {
    writeMessage("");
  });

  layer.add(triangle);
  layer.add(text);
  stage.add(layer);
}
