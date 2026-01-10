import { createLayer } from "@docs/utils";
import Konva from "konva";

export function removeByNameDemo(stage: Konva.Stage) {
  const layer = createLayer(stage);
  const circle = new Konva.Circle({
    x: stage.width() / 2,
    y: stage.height() / 2,
    radius: 70,
    fill: "red",
    stroke: "black",
    strokeWidth: 4,
  });

  // add click listeners
  circle.on("click.event1", function () {
    alert("first click listener");
  });

  circle.on("click.event2", function () {
    alert("second click listener");
  });

  layer.add(circle);

  // add buttons to remove listeners
  const btnContainer = document.createElement("div");
  btnContainer.classList.add("absolute-lt");
  const button1 = document.createElement("button");
  button1.classList.add("raw-style");
  button1.innerHTML = "移除第一个监听";
  button1.onclick = function () {
    circle.off("click.event1");
  };

  const button2 = document.createElement("button");
  button2.classList.add("raw-style");
  button2.innerHTML = "移除第二个监听";
  button2.onclick = function () {
    circle.off("click.event2");
  };
  btnContainer.append(button1);
  btnContainer.append(button2);
  stage.container().append(btnContainer);
  stage.container().classList.add("relative");
}
