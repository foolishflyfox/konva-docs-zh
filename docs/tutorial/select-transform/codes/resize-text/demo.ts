import { createLayer } from "@docs/utils";
import Konva from "konva";

export function resizeTextDemo(stage: Konva.Stage) {
  const layer = createLayer(stage);
  const text = new Konva.Text({
    x: 50,
    y: 50,
    text: "Hello from Konva! Try to resize me.",
    fontSize: 24,
    draggable: true,
    width: 200,
  });
  layer.add(text);

  const tr = new Konva.Transformer({
    nodes: [text],
    // enable only one anchor to see better what is happening
    // we are changing width only
    enabledAnchors: ["middle-left", "middle-right"],
  });
  layer.add(tr);

  text.on("transform", function () {
    // reset scale on transform
    text.setAttrs({
      width: text.width() * text.scaleX(),
      scaleX: 1,
    });
  });
}
