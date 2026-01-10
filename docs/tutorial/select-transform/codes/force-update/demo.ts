import { createLayer } from "@docs/utils";
import Konva from "konva";

export function forceUpdateDemo(stage: Konva.Stage) {
  const layer = createLayer(stage);
  const group = new Konva.Group({
    x: 50,
    y: 100,
    draggable: true,
  });
  layer.add(group);

  const text = new Konva.Text({
    text: "Some text here",
    fontSize: 24,
  });
  group.add(text);

  const rect = new Konva.Rect({
    width: text.width(),
    height: text.height(),
    fill: "yellow",
  });
  group.add(rect);

  // add the shape to the layer
  rect.moveToBottom();

  const tr = new Konva.Transformer({
    nodes: [group],
    padding: 5,
    // enable only one anchor
    enabledAnchors: ["middle-left", "middle-right"],
  });
  layer.add(tr);

  const button = document.createElement("button");
  button.classList.add("raw-style", "absolute-lt");
  button.innerHTML = "改变文本";
  stage.container().classList.add("relative");
  stage.container().append(button);
  button.addEventListener("click", () => {
    text.text("Something else is here");
    rect.width(text.width());
    // we need to update transformer manually
    tr.forceUpdate();
  });
}
