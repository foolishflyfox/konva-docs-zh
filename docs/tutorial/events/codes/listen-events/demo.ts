import { createLayer } from "@docs/utils";
import Konva from "konva";

export function listenEventsDemo(stage: Konva.Stage) {
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

  const oval = new Konva.Ellipse({
    x: stage.width() / 2,
    y: stage.height() / 2,
    radiusX: 100,
    radiusY: 50,
    fill: "yellow",
    stroke: "black",
    strokeWidth: 4,
    listening: false,
  });

  oval.on("mouseover", function () {
    writeMessage("Mouseover oval");
  });
  oval.on("mouseout", function () {
    writeMessage("");
  });

  function writeMessage(message: string) {
    text.text(message);
  }

  layer.add(oval);

  // add button to toggle listening
  const button = document.createElement("button");
  button.classList.add("raw-style", "absolute-lt");
  button.innerHTML = "开始监听";
  // stag
  button.addEventListener("click", () => {
    const listening = !oval.listening();
    oval.listening(listening);
    button.innerHTML = listening ? "停止监听" : "开始监听";
    layer.drawHit();
  });
  stage.container().classList.add("relative");
  stage.container().append(button);
}
