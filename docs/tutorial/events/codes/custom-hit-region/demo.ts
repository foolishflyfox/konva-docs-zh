import { createLayer } from "@docs/utils";
import Konva from "konva";

export function customHitRegion(stage: Konva.Stage) {
  const layer = createLayer(stage);
  const text = new Konva.Text({
    x: 10,
    y: 10,
    text: "",
    fontSize: 24,
  });
  layer.add(text);

  const star = new Konva.Star({
    x: stage.width() / 4,
    y: stage.height() / 2,
    numPoints: 5,
    innerRadius: 40,
    outerRadius: 70,
    fill: "red",
    stroke: "black",
    strokeWidth: 4,
  });

  // custom hit function
  star.hitFunc(function (this: Konva.Star, context: Konva.Context) {
    context.beginPath();
    context.arc(0, 0, 70, 0, Math.PI * 2, true);
    context.closePath();
    context.fillStrokeShape(this);
  });

  const line = new Konva.Line({
    x: stage.width() * 0.6,
    y: stage.height() / 2,
    points: [-50, -50, 50, 50],
    stroke: "black",
    strokeWidth: 2,
    hitStrokeWidth: 20,
  });

  function writeMessage(message: string) {
    text.text(message);
  }

  star.on("mouseover mouseout mousedown mouseup", function (evt) {
    writeMessage(evt.type + " star");
  });

  line.on("mouseover mouseout mousedown mouseup", function (evt) {
    writeMessage(evt.type + " line");
  });

  layer.add(star);
  layer.add(line);
}
