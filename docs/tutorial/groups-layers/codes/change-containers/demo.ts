import { addButtons, createLayer } from "@docs/utils";
import Konva from "konva";

export function changeContainersDemo(stage: Konva.Stage) {
  const layer = createLayer(stage);
  // yellow group
  const group1 = new Konva.Group({
    x: 50,
    y: 50,
    draggable: true,
  });

  const yellow = new Konva.Rect({
    width: 100,
    height: 100,
    fill: "yellow",
    stroke: "black",
    strokeWidth: 4,
  });
  group1.add(yellow);

  // blue group
  const group2 = new Konva.Group({
    x: 200,
    y: 50,
    draggable: true,
  });

  const blue = new Konva.Rect({
    width: 100,
    height: 100,
    fill: "blue",
    stroke: "black",
    strokeWidth: 4,
  });
  group2.add(blue);

  // red box
  const redBox = new Konva.Rect({
    x: 10,
    y: 10,
    width: 30,
    height: 30,
    fill: "red",
  });
  group1.add(redBox);

  layer.add(group1);
  layer.add(group2);

  const [moveToGroup1Btn, moveToGroup2Btn] = addButtons(stage, {
    buttonTitles: ["移至黄色组", "移至蓝色组"],
  });
  moveToGroup1Btn.addEventListener("click", () => {
    redBox.moveTo(group1);
  });
  moveToGroup2Btn.addEventListener("click", () => {
    redBox.moveTo(group2);
  });
}
