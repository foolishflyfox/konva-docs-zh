import { createLayer } from "@docs/utils";
import { loadWidgetConfigData } from "@docs/utils/register-widget";
import { Input } from "./input";
import Konva from "konva";

const DEFAULT_W = 220;
const DEFAULT_H = 36;

export function inputDemo(stage: Konva.Stage) {
  const layer = createLayer(stage);

  const valueText = new Konva.Text({
    x: 5,
    y: 8,
    width: stage.width(),
    text: "当前值：",
    fontSize: 13,
    fill: "#555",
  });
  const focusText = new Konva.Text({
    x: 5,
    y: 26,
    width: stage.width(),
    text: "",
    fontSize: 13,
    fill: "#4a90d9",
  });
  const submitText = new Konva.Text({
    x: 5,
    y: 44,
    width: stage.width(),
    text: "",
    fontSize: 13,
    fill: "#080",
  });

  const input = new Input({ x: 20, y: 68, width: DEFAULT_W, height: DEFAULT_H });

  input.on("valuechange", (e: any) => {
    valueText.text(`当前值：${e.value}`);
    layer.batchDraw();
  });
  input.on("inputfocus", () => {
    focusText.text("已聚焦");
    layer.batchDraw();
  });
  input.on("inputblur", () => {
    focusText.text("");
    layer.batchDraw();
  });
  input.on("submit", (e: any) => {
    submitText.text(`已提交：${e.value}`);
    layer.batchDraw();
    setTimeout(() => {
      submitText.text("");
      layer.batchDraw();
    }, 1200);
  });

  layer.add(valueText, focusText, submitText, input);

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
    const inp = document.createElement("input");
    inp.type = "color";
    inp.value = value;
    inp.style.cssText = "width:28px;height:20px;padding:1px 2px;cursor:pointer;";
    inp.addEventListener("input", () => onChange(inp.value));
    wrap.append(lbl, inp);
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
    const inp = document.createElement("input");
    inp.type = "number";
    inp.min = `${min}`;
    inp.max = `${max}`;
    inp.value = `${value}`;
    inp.classList.add("raw-style");
    inp.style.width = "54px";
    inp.addEventListener("input", () => {
      const v = parseInt(inp.value, 10);
      if (!isNaN(v) && v >= min && v <= max) onChange(v);
    });
    wrap.append(lbl, inp);
    return wrap;
  }

  const ctrlDiv = document.createElement("div");
  ctrlDiv.style.cssText =
    "position:absolute;top:4px;right:8px;display:flex;flex-direction:column;align-items:flex-end;gap:4px;";

  // 行 1：尺寸 + 字号 + 导出
  const row1 = document.createElement("div");
  row1.style.cssText = "display:flex;align-items:center;gap:4px;";

  const exportBtn = document.createElement("button");
  exportBtn.textContent = "导出配置";
  exportBtn.classList.add("raw-style");

  const outputPre = document.createElement("pre");
  outputPre.style.cssText =
    "position:absolute;bottom:6px;left:8px;margin:0;font-size:11px;" +
    "color:#333;background:#f5f5f5;border:1px solid #ddd;border-radius:4px;" +
    "padding:4px 8px;display:none;";
  exportBtn.addEventListener("click", () => {
    outputPre.textContent = JSON.stringify(input.exportConfigData(), null, 2);
    outputPre.style.display = "block";
  });

  row1.append(
    makeNumberInput("宽：", DEFAULT_W, 80, 500, (v) =>
      input.resize(v, input.height()),
    ),
    makeNumberInput("高：", DEFAULT_H, 24, 80, (v) =>
      input.resize(input.width(), v),
    ),
    makeNumberInput("字号：", 14, 8, 28, (v) => input.setFontSize(v)),
    exportBtn,
  );

  // 行 2：颜色选项
  const row2 = document.createElement("div");
  row2.style.cssText = "display:flex;align-items:center;gap:6px;";
  row2.append(
    makeColorPicker("背景：", "#ffffff", (v) => input.setBgColor(v)),
    makeColorPicker("边框：", "#cccccc", (v) => input.setBorderColor(v)),
    makeColorPicker("聚焦边框：", "#4a90d9", (v) => input.setFocusBorderColor(v)),
    makeColorPicker("文字：", "#333333", (v) => input.setTextColor(v)),
  );

  ctrlDiv.append(row1, row2);
  container.append(ctrlDiv, outputPre);
}

const DEFAULT_CONFIG = JSON.stringify(
  {
    className: "fenghuabin/Input",
    data: {
      width: 220,
      height: 36,
      value: "",
      placeholder: "请输入...",
      bgColor: "#ffffff",
      borderColor: "#cccccc",
      focusBorderColor: "#4a90d9",
      textColor: "#333333",
      placeholderColor: "#aaaaaa",
      fontSize: 14,
      borderRadius: 4,
      padding: 8,
    },
  },
  null,
  2,
);

export function loadInputDemo(stage: Konva.Stage) {
  void Input;

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
    "flex:1;height:96px;font-size:11px;font-family:monospace;resize:vertical;";

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
    widget.setAttrs({ x: 8, y: 116 });
    layer.add(widget);
    layer.batchDraw();
  });
}
