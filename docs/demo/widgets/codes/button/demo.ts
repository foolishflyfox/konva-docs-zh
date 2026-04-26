import { createLayer } from "@docs/utils";
import { loadWidgetConfigData } from "@docs/utils/register-widget";
import { Button } from "./button";
import Konva from "konva";

const DEFAULT_W = 160;
const DEFAULT_H = 50;

export function buttonDemo(stage: Konva.Stage) {
  const layer = createLayer(stage);

  const statusText = new Konva.Text({
    x: 5,
    y: 8,
    width: stage.width(),
    text: "点击按钮",
    fontSize: 13,
    fill: "#555",
  });
  const hoverText = new Konva.Text({
    x: 5,
    y: 26,
    width: stage.width(),
    text: "",
    fontSize: 13,
    fill: "#888",
  });
  const pressText = new Konva.Text({
    x: 5,
    y: 44,
    width: stage.width(),
    text: "",
    fontSize: 13,
    fill: "#c00",
  });

  const btn = new Button({ x: 20, y: 72, width: DEFAULT_W, height: DEFAULT_H });

  btn.on("buttonclick", () => {
    statusText.text("已点击！");
    layer.batchDraw();
    setTimeout(() => {
      statusText.text("点击按钮");
      layer.batchDraw();
    }, 800);
  });
  btn.on("hoverchange", (e: any) => {
    hoverText.text(e.hover ? `悬停：${btn.getClassName()}` : "");
    layer.batchDraw();
  });
  btn.on("presschange", (e: any) => {
    pressText.text(e.pressed ? "按下中" : "");
    layer.batchDraw();
  });

  layer.add(statusText, hoverText, pressText, btn);

  // ── 控件区 ──────────────────────────────────────────
  const container = stage.container();
  container.style.position = "relative";

  function makeColorPicker(
    label: string,
    value: string,
    onChange: (v: string) => void,
  ) {
    const wrap = document.createElement("div");
    wrap.style.cssText = "display:flex;align-items:center;gap:2px;";
    const lbl = document.createElement("span");
    lbl.textContent = label;
    lbl.style.cssText = "font-size:12px;color:#555;white-space:nowrap;";
    const input = document.createElement("input");
    input.type = "color";
    input.value = value;
    input.style.cssText =
      "width:28px;height:20px;padding:1px 2px;cursor:pointer;";
    input.addEventListener("input", () => onChange(input.value));
    wrap.append(lbl, input);
    return wrap;
  }

  function makeNumberInput(
    label: string,
    value: number,
    min: number,
    max: number,
    onChange: (v: number) => void,
  ) {
    const wrap = document.createElement("div");
    wrap.style.cssText = "display:flex;align-items:center;gap:2px;";
    const lbl = document.createElement("span");
    lbl.textContent = label;
    lbl.style.cssText = "font-size:12px;color:#555;white-space:nowrap;";
    const input = document.createElement("input");
    input.type = "number";
    input.min = `${min}`;
    input.max = `${max}`;
    input.value = `${value}`;
    input.classList.add("raw-style");
    input.style.width = "54px";
    input.addEventListener("input", () => {
      const v = parseInt(input.value, 10);
      if (!isNaN(v) && v >= min && v <= max) onChange(v);
    });
    wrap.append(lbl, input);
    return wrap;
  }

  const ctrlDiv = document.createElement("div");
  ctrlDiv.style.cssText =
    "position:absolute;top:4px;right:8px;display:flex;flex-direction:column;align-items:flex-end;gap:4px;";

  // 行 1：尺寸 + 标签 + 字号 + 导出
  const row1 = document.createElement("div");
  row1.style.cssText = "display:flex;align-items:center;gap:4px;";

  const labelInput = document.createElement("input");
  labelInput.type = "text";
  labelInput.value = "按钮";
  labelInput.classList.add("raw-style");
  labelInput.style.width = "60px";
  labelInput.addEventListener("input", () => btn.setLabel(labelInput.value));

  const labelLbl = document.createElement("span");
  labelLbl.textContent = "标签：";
  labelLbl.style.cssText = "font-size:12px;color:#555;";

  const exportBtn = document.createElement("button");
  exportBtn.textContent = "导出配置";
  exportBtn.classList.add("raw-style");

  const outputPre = document.createElement("pre");
  outputPre.style.cssText =
    "position:absolute;bottom:6px;left:8px;margin:0;font-size:11px;" +
    "color:#333;background:#f5f5f5;border:1px solid #ddd;border-radius:4px;" +
    "padding:4px 8px;display:none;";
  exportBtn.addEventListener("click", () => {
    outputPre.textContent = JSON.stringify(btn.exportConfigData(), null, 2);
    outputPre.style.display = "block";
  });

  row1.append(
    makeNumberInput("宽：", DEFAULT_W, 60, 400, (v) =>
      btn.resize(v, btn.height()),
    ),
    makeNumberInput("高：", DEFAULT_H, 24, 120, (v) =>
      btn.resize(btn.width(), v),
    ),
    makeNumberInput("字号：", 14, 8, 32, (v) => btn.setFontSize(v)),
    labelLbl,
    labelInput,
    exportBtn,
  );

  // 行 2：背景色三态
  const row2 = document.createElement("div");
  row2.style.cssText = "display:flex;align-items:center;gap:6px;";
  row2.append(
    makeColorPicker("背景：", "#4a90d9", (v) => btn.setBgColor(v)),
    makeColorPicker("悬停：", "#357abd", (v) => btn.setHoverColor(v)),
    makeColorPicker("点击：", "#2868a7", (v) => btn.setClickColor(v)),
  );

  // 行 3：标签色三态
  const row3 = document.createElement("div");
  row3.style.cssText = "display:flex;align-items:center;gap:6px;";
  row3.append(
    makeColorPicker("标签：", "#ffffff", (v) => btn.setLabelColor(v)),
    makeColorPicker("标签悬停：", "#ffffff", (v) => btn.setLabelHoverColor(v)),
    makeColorPicker("标签点击：", "#c8dcf8", (v) => btn.setLabelClickColor(v)),
  );

  ctrlDiv.append(row1, row2, row3);
  container.append(ctrlDiv, outputPre);
}

const DEFAULT_CONFIG = JSON.stringify(
  {
    className: "fenghuabin/Button",
    data: {
      width: 160,
      height: 50,
      label: "按钮",
      bgColor: "#4a90d9",
      hoverColor: "#357abd",
      clickColor: "#2868a7",
      labelColor: "#ffffff",
      labelHoverColor: "#ffffff",
      labelClickColor: "#c8dcf8",
      borderRadius: 6,
      fontSize: 14,
    },
  },
  null,
  2,
);

export function loadButtonDemo(stage: Konva.Stage) {
  void Button;

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
    widget.setAttrs({ x: 8, y: 96 });
    layer.add(widget);
    layer.batchDraw();
  });
}
