import { addButtons, createLayer } from "@docs/utils";
import Konva from "konva";

export function layeringDemo(stage: Konva.Stage) {
  const layer = createLayer(stage);
  const yellowBox = new Konva.Rect({
    x: 50,
    y: 50,
    width: 100,
    height: 100,
    fill: "yellow",
    stroke: "black",
    strokeWidth: 4,
    draggable: true,
  });

  const redBox = new Konva.Rect({
    x: 100,
    y: 100,
    width: 100,
    height: 100,
    fill: "red",
    stroke: "black",
    strokeWidth: 4,
    draggable: true,
  });

  layer.add(yellowBox);
  layer.add(redBox);

  // create buttons
  const [toTopBtn, toBottomBtn] = addButtons(stage, {
    buttonTitles: ["黄色矩形移至顶层", "黄色矩形移至底层"],
  });

  toTopBtn.addEventListener("click", () => {
    yellowBox.moveToTop();
  });

  toBottomBtn.addEventListener("click", () => {
    yellowBox.moveToBottom();
  });
}
