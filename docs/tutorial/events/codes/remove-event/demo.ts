import { createLayer } from "@docs/utils";
import Konva from "konva";

export function removeEventDemo(stage: Konva.Stage) {
  const layer = createLayer(stage);
  const circle = new Konva.Circle({
    x: stage.width() / 2,
    y: stage.height() / 2,
    radius: 70,
    fill: "red",
    stroke: "black",
    strokeWidth: 4,
  });

  // add click listener
  circle.on("click", function () {
    alert("you clicked the circle");
  });

  layer.add(circle);

  // add button to remove listener
  const button = document.createElement("button");
  button.classList.add("raw-style", "absolute-lt");

  button.innerHTML = "移除对 click 事件监听";
  stage.container().classList.add("relative");
  stage.container().append(button);
  button.addEventListener("click", () => {
    // remove click listener
    circle.off("click");
  });
}
