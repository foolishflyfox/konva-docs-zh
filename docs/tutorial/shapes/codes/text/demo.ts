import { createLayer } from "@docs/utils";
import Konva from "konva";

export function textDemo(stage: Konva.Stage) {
  const layer = createLayer(stage);
  const simpleText = new Konva.Text({
    x: stage.width() / 2,
    y: 15,
    text: "Simple Text",
    fontSize: 30,
    fontFamily: "Calibri",
    fill: "green",
  });
  simpleText.offsetX(simpleText.width() / 2);

  const complexText = new Konva.Text({
    x: 20,
    y: 60,
    text: "COMPLEX TEXT\n\nAll the world's a stage, and all the men and women merely players. They have their exits and their entrances.",
    fontSize: 18,
    fontFamily: "Calibri",
    fill: "#555",
    width: 300,
    padding: 20,
    align: "center",
  });

  const rect = new Konva.Rect({
    x: 20,
    y: 60,
    stroke: "#555",
    strokeWidth: 5,
    fill: "#ddd",
    width: 300,
    height: complexText.height(),
    shadowColor: "black",
    shadowBlur: 10,
    shadowOffsetX: 10,
    shadowOffsetY: 10,
    shadowOpacity: 0.2,
    cornerRadius: 10,
  });
  layer.add(rect);
  layer.add(simpleText, complexText);
}
