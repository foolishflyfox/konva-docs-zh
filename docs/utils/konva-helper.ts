import Konva from "konva";
import { ref, Ref } from "vue";

export function createLayer(stage: Konva.Stage, config?: Konva.LayerConfig) {
  const layer = new Konva.Layer(config);
  if (stage) {
    // 将图层添加到 stage 中
    stage.add(layer);
  }
  return layer;
}

interface ButtonsInfo {
  buttonTitles: string[];
  align?: "left" | "right";
}

export function addButtons(stage: Konva.Stage, buttonsInfo: ButtonsInfo) {
  const buttons: HTMLButtonElement[] = [];
  if (!stage || !buttonsInfo.buttonTitles.length) return buttons;
  const btnContainer = document.createElement("div") as HTMLDivElement;
  btnContainer.classList.add("absolute-lt", "w-full");
  if (buttonsInfo.align === "right") {
    btnContainer.classList.add("flex", "justify-end");
  }
  stage.container().classList.add("relative");
  stage.container().append(btnContainer);
  for (const title of buttonsInfo.buttonTitles) {
    const button = document.createElement("button");
    button.classList.add("raw-style", "mr-1em");
    button.innerText = title;
    btnContainer.append(button);
    buttons.push(button);
  }
  return buttons;
}

interface RangeInfo {
  label?: string;
  min: number;
  max: number;
  defaultValue?: number;
  step?: number;
  precision?: number;
}

export function addRanges(stage: Konva.Stage, rangeInfos: RangeInfo[]) {
  const rangeValues: Ref<number>[] = [];
  if (!stage || !rangeInfos.length) return rangeValues;
  const rangeContainer = document.createElement("div") as HTMLDivElement;
  rangeContainer.classList.add("absolute-lt", "w-full", "flex");
  stage.container().classList.add("relative");
  stage.container().append(rangeContainer);
  for (const rangeInfo of rangeInfos) {
    const range = document.createElement("input") as HTMLInputElement;
    range.type = "range";
    range.min = `${rangeInfo.min}`;
    range.max = `${rangeInfo.max}`;
    range.step = `${rangeInfo.step || 1}`;
    range.value = `${rangeInfo.defaultValue ?? 0}`;
    const rangeValue = ref(rangeInfo.defaultValue ?? 0);
    rangeValues.push(rangeValue);
    range.addEventListener("input", (e) => {
      const v = parseFloat((e.target as HTMLInputElement).value);
      rangeValue.value = v;
    });
    rangeContainer.append(range);
  }
  return rangeValues;
}
