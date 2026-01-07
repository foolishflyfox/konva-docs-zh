import { createLayer } from "@docs/utils";
import Konva from "konva";

export function fireEventsDemo(stage: Konva.Stage) {
  const layer = createLayer(stage);
  const circle = new Konva.Circle({
    x: stage.width() / 2 - 35,
    y: stage.height() / 2 - 35,
    radius: 70,
    fill: "red",
    stroke: "black",
    strokeWidth: 4,
  });

  // add shape event listener
  circle.on("customEvent", function (evt) {
    alert("custom event fired");
  });

  // add button to trigger custom event
  const button = document.createElement("button");
  button.classList.add("raw-style");
  button.innerHTML = "Fire Custom Event";
  button.style.top = "10px";
  button.style.left = "10px";
  button.style.zIndex = "1";
  stage.container().prepend(button);
  button.addEventListener("click", () => {
    // fire custom event
    circle.fire("customEvent", {
      bubbles: true,
    });
  });

  layer.add(circle);
}
