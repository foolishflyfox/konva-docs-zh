import { createLayer } from "@docs/utils";
import { SoftKeyboard } from "./soft-keyboard";
import Konva from "konva";

const DEFAULT_WIDTH = 500;
const MIN_WIDTH = 200;
const MAX_WIDTH = 580;

export function softKeyboardDemo(stage: Konva.Stage) {
  const layer = createLayer(stage);

  const statusText = new Konva.Text({
    x: 5,
    y: 8,
    width: stage.width(),
    text: "移动鼠标到按键上",
    fontSize: 13,
    fill: "#555",
    // align: "center",
  });

  const keyboard = new SoftKeyboard({ x: 4, y: 28, width: DEFAULT_WIDTH });
  keyboard.on("keychange", (e: any) => {
    statusText.text(e.key ? `当前按键：${e.key}` : "移动鼠标到按键上");
    layer.batchDraw();
  });

  layer.add(statusText, keyboard);

  // Width number input overlay
  const container = stage.container();
  container.style.position = "relative";
  const ctrlDiv = document.createElement("div");
  ctrlDiv.style.cssText =
    "position:absolute;top:4px;right:8px;display:flex;align-items:center;gap:4px;";

  const lbl = document.createElement("span");
  lbl.textContent = "宽度：";
  lbl.style.cssText = "font-size:12px;color:#555;";

  const numInput = document.createElement("input");
  numInput.type = "number";
  numInput.min = `${MIN_WIDTH}`;
  numInput.max = `${MAX_WIDTH}`;
  numInput.step = "10";
  numInput.value = `${DEFAULT_WIDTH}`;
  numInput.classList.add("raw-style");
  numInput.style.width = "64px";

  numInput.addEventListener("input", () => {
    const w = parseInt(numInput.value, 10);
    if (isNaN(w) || w < MIN_WIDTH || w > MAX_WIDTH) return;
    keyboard.resize(w);
  });

  ctrlDiv.append(lbl, numInput);
  container.append(ctrlDiv);
}
