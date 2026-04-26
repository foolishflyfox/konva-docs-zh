import { createLayer } from "@docs/utils";
import { loadWidgetConfigData } from "@docs/utils/register-widget";
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

  const keyboard = new SoftKeyboard({ x: 4, y: 68, width: DEFAULT_WIDTH });
  keyboard.on("keychange", (e: any) => {
    statusText.text(e.key ? `当前按键：${e.key}` : "移动鼠标到按键上");
    layer.batchDraw();
  });

  layer.add(statusText, keyboard);

  const container = stage.container();
  container.style.position = "relative";

  // 工具函数：创建"标签 + 颜色选择器"组合
  function makeColorPicker(
    label: string,
    defaultValue: string,
    onChange: (v: string) => void,
  ) {
    const wrap = document.createElement("div");
    wrap.style.cssText = "display:flex;align-items:center;gap:2px;";
    const lbl = document.createElement("span");
    lbl.textContent = label;
    lbl.style.cssText = "font-size:12px;color:#555;white-space:nowrap;";
    const input = document.createElement("input");
    input.type = "color";
    input.value = defaultValue;
    input.style.cssText =
      "width:28px;height:20px;padding:1px 2px;cursor:pointer;";
    input.addEventListener("input", () => onChange(input.value));
    wrap.append(lbl, input);
    return wrap;
  }

  // 控件容器：两行，右对齐
  const ctrlDiv = document.createElement("div");
  ctrlDiv.style.cssText =
    "position:absolute;top:4px;right:8px;display:flex;flex-direction:column;align-items:flex-end;gap:4px;";

  // 第一行：宽度 + 背景色 + 导出配置
  const row1 = document.createElement("div");
  row1.style.cssText = "display:flex;align-items:center;gap:4px;";

  const widthLbl = document.createElement("span");
  widthLbl.textContent = "宽度：";
  widthLbl.style.cssText = "font-size:12px;color:#555;";

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

  const exportBtn = document.createElement("button");
  exportBtn.textContent = "导出配置";
  exportBtn.classList.add("raw-style");

  const outputPre = document.createElement("pre");
  outputPre.style.cssText =
    "position:absolute;bottom:6px;left:8px;margin:0;font-size:11px;" +
    "color:#333;background:#f5f5f5;border:1px solid #ddd;border-radius:4px;" +
    "padding:4px 8px;display:none;";
  exportBtn.addEventListener("click", () => {
    outputPre.textContent = JSON.stringify(
      keyboard.exportConfigData(),
      null,
      2,
    );
    outputPre.style.display = "block";
  });

  row1.append(
    widthLbl,
    numInput,
    makeColorPicker("背景色：", "#ddeeff", (v) => keyboard.setBgColor(v)),
    exportBtn,
  );

  // 第二行：4 个键颜色选择器
  const row2 = document.createElement("div");
  row2.style.cssText = "display:flex;align-items:center;gap:6px;";

  row2.append(
    makeColorPicker("键色：", "#e8e8e8", (v) => keyboard.setKeyColor(v)),
    makeColorPicker("键悬停：", "#4caf50", (v) => keyboard.setKeyHoverColor(v)),
    makeColorPicker("标签色：", "#444444", (v) => keyboard.setKeyLabelColor(v)),
    makeColorPicker("标签悬停：", "#444444", (v) =>
      keyboard.setKeyLabelHoverColor(v),
    ),
  );

  ctrlDiv.append(row1, row2);
  container.append(ctrlDiv, outputPre);
}

const DEFAULT_CONFIG = JSON.stringify({
  className: "fenghuabin/SoftKeyboard",
  data: {
    width: 500,
    bgColor: "#8bbaea",
  },
});

export function loadWidgetDemo(stage: Konva.Stage) {
  // 引用 SoftKeyboard 确保其装饰器已执行、类已注册
  void SoftKeyboard;

  const layer = createLayer(stage);
  const container = stage.container();
  container.style.position = "relative";

  const ctrlDiv = document.createElement("div");
  ctrlDiv.style.cssText =
    "position:absolute;top:6px;left:8px;right:8px;display:flex;gap:6px;align-items:flex-start;";

  const textarea = document.createElement("textarea");
  textarea.value = DEFAULT_CONFIG;
  textarea.classList.add("raw-style");
  textarea.style.cssText =
    "flex:1;height:80px;font-size:11px;font-family:monospace;resize:vertical;";

  const rightCol = document.createElement("div");
  rightCol.style.cssText = "display:flex;flex-direction:column;gap:4px;";

  const createBtn = document.createElement("button");
  createBtn.textContent = "创建组件";
  createBtn.classList.add("raw-style");

  const errMsg = document.createElement("span");
  errMsg.style.cssText =
    "font-size:11px;color:#c00;display:none;max-width:80px;word-break:break-all;";

  rightCol.append(createBtn, errMsg);
  ctrlDiv.append(textarea, rightCol);
  container.append(ctrlDiv);

  let currentWidget: Konva.Shape | null = null;

  createBtn.addEventListener("click", () => {
    let config: { className: string; data: object };
    try {
      config = JSON.parse(textarea.value);
    } catch {
      errMsg.textContent = "JSON 格式错误";
      errMsg.style.display = "block";
      return;
    }

    const widget = loadWidgetConfigData(config);
    if (!widget) {
      errMsg.textContent = `未找到组件：${(config as any).className}`;
      errMsg.style.display = "block";
      return;
    }

    errMsg.style.display = "none";
    if (currentWidget) currentWidget.destroy();
    currentWidget = widget;
    widget.setAttrs({ x: 4, y: 96 });
    layer.add(widget);
    layer.batchDraw();
  });
}
