import { createLayer } from "@docs/utils";
import Konva from "konva";

export function stageEventsDemo(stage: Konva.Stage) {
  const layer = createLayer(stage);
  stage.add(layer);

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

  // handle stage click
  stage.on("click", function (e) {
    if (e.target === stage) {
      writeMessage("clicked on stage");
      return;
    }
    writeMessage("clicked on " + e.target.name());
  });

  // add shape
  circle.name("circle");
  layer.add(circle);
}
