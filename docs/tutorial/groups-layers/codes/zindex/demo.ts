import { addButtons, createLayer } from "@docs/utils";
import Konva from "konva";

export function zindexDemo(stage: Konva.Stage) {
  const layer = createLayer(stage);
  // first group
  const group1 = new Konva.Group();
  layer.add(group1);

  const blackRect = new Konva.Rect({
    x: 10,
    y: 10,
    width: 100,
    height: 100,
    fill: "black",
  });
  group1.add(blackRect);

  const redCircle = new Konva.Circle({
    x: 80,
    y: 80,
    radius: 40,
    fill: "red",
  });
  group1.add(redCircle);

  // second group
  const group2 = new Konva.Group();
  layer.add(group2);

  const greenRect = new Konva.Rect({
    x: 50,
    y: 50,
    width: 100,
    height: 100,
    fill: "green",
  });
  group2.add(greenRect);

  const [btn1, btn2] = addButtons(stage, {
    buttonTitles: ["红色圆移至组2", "红色圆移至组1"],
    align: "right",
  });
  btn1.addEventListener("click", () => {
    redCircle.moveTo(group2);
  });

  btn2.addEventListener("click", () => {
    redCircle.moveTo(group1);
  });
}
