import { createLayer } from "@docs/utils";
import Konva from "konva";

export function hideShowDemo(stage: Konva.Stage) {
  const rect = new Konva.Rect({
    x: stage.width() / 2 - 50,
    y: stage.height() / 2 - 25,
    width: 100,
    height: 50,
    fill: "green",
    stroke: "black",
    strokeWidth: 4,
  });
  const layer = createLayer(stage);
  layer.add(rect);
  stage.container().style.setProperty("position", "relative");
  const cs = "position: absolute;  top: 5px; width: 60px; height: 25px;";
  const showBtn = document.createElement("button");
  showBtn.textContent = "显示";
  showBtn.style = cs + "left: 10px;";
  showBtn.classList.add("raw-style");
  showBtn.onclick = () => rect.show();
  stage.container().appendChild(showBtn);
  const hideBtn = document.createElement("button");
  hideBtn.textContent = "隐藏";
  hideBtn.style = cs + "left: 80px;";
  hideBtn.classList.add("raw-style");
  hideBtn.onclick = () => rect.hide();
  stage.container().appendChild(hideBtn);
}
