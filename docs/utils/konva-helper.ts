import Konva from "konva";

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
