import { createLayer } from "@docs/utils";
import Konva from "konva";

export function multiEventDemo(stage: Konva.Stage) {
  const layer = createLayer(stage);
  const text = new Konva.Text({
    x: 10,
    y: 10,
    fontFamily: "Calibri",
    fontSize: 24,
    text: "",
    fill: "black",
  });
  layer.add(text);

  const circle = new Konva.Circle({
    x: stage.width() / 2,
    y: stage.height() / 2,
    radius: 70,
    fill: "red",
    stroke: "black",
    strokeWidth: 4,
  });

  function writeMessage(message: string) {
    text.text(message);
  }

  circle.on("mouseover mousedown mouseup", function (evt) {
    writeMessage("event: " + evt.type);
  });

  layer.add(circle);
}
