import { createLayer } from "@docs/utils";
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

  const btnContainer = document.createElement("div");
  btnContainer.classList.add("absolute-lt");
  btnContainer.style.setProperty("display", "flex");
  btnContainer.style.setProperty("justify-content", "flex-end");
  btnContainer.style.setProperty("width", "100%");
  stage.container().classList.add("relative");
  stage.container().append(btnContainer);
  // create buttons
  const btn1 = document.createElement("button");
  btn1.classList.add("raw-style");
  btn1.textContent = "Move red circle to group2";
  btn1.addEventListener("click", () => {
    redCircle.moveTo(group2);
  });

  const btn2 = document.createElement("button");
  btn2.classList.add("raw-style");
  btn2.textContent = "Move red circle to group1";
  btn2.addEventListener("click", () => {
    redCircle.moveTo(group1);
  });
  btnContainer.append(btn1, btn2);
}
