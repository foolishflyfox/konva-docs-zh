import { createLayer } from "@docs/utils";
import { SoftKeyboard } from "./soft-keyboard";
import Konva from "konva";

export function softKeyboardDemo(stage: Konva.Stage) {
  const layer = createLayer(stage);

  const statusText = new Konva.Text({
    x: 0,
    y: 12,
    width: stage.width(),
    text: "移动鼠标到按键上",
    fontSize: 13,
    fill: "#555",
    align: "center",
  });

  const keyboard = new SoftKeyboard({ x: 4, y: 28 });

  keyboard.on("keychange", (e: any) => {
    statusText.text(e.key ? `当前按键：${e.key}` : "移动鼠标到按键上");
    layer.batchDraw();
  });

  layer.add(statusText, keyboard);
}
