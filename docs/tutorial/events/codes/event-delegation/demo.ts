import { createLayer } from "@docs/utils";
import Konva from "konva";

export function eventDelegationDemo(stage: Konva.Stage) {
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

  const star = new Konva.Star({
    x: stage.width() / 2,
    y: stage.height() / 2,
    numPoints: 5,
    innerRadius: 40,
    outerRadius: 70,
    fill: "red",
    stroke: "black",
    strokeWidth: 4,
  });
  layer.add(star);

  // add event delegation
  layer.on("click", function (evt) {
    const shape = evt.target;
    text.text("click on " + shape.getClassName());
  });
}
