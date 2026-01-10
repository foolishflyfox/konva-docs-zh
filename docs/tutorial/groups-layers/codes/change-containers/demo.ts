import { createLayer } from "@docs/utils";
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

  // create buttons
  const btnContainer = document.createElement("div") as HTMLDivElement;
  btnContainer.classList.add("absolute-lt");
  stage.container().classList.add("relative");
  stage.container().append(btnContainer);
  const moveToGroup1Btn = document.createElement("button");
  moveToGroup1Btn.textContent = "Move to yellow group";
  moveToGroup1Btn.classList.add("raw-style");
  moveToGroup1Btn.addEventListener("click", () => {
    redBox.moveTo(group1);
  });
  btnContainer.append(moveToGroup1Btn);

  const moveToGroup2Btn = document.createElement("button");
  moveToGroup2Btn.textContent = "Move to blue group";
  moveToGroup2Btn.style.setProperty("margin-left", "1em");
  moveToGroup2Btn.classList.add("raw-style");
  moveToGroup2Btn.addEventListener("click", () => {
    redBox.moveTo(group2);
  });
  btnContainer.append(moveToGroup2Btn);
}
