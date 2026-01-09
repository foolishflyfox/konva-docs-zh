import { createLayer } from "@docs/utils";
import Konva from "konva";

export function dragEventsDemo(stage: Konva.Stage) {
  const layer = createLayer(stage);
  const text = new Konva.Text({
    x: 40,
    y: 40,
    text: "Draggable Text",
    fontSize: 20,
    draggable: true,
    width: 200,
  });
  layer.add(text);

  const status = new Konva.Text({
    x: 40,
    y: 100,
    text: "",
    fontSize: 16,
    width: 200,
  });
  layer.add(status);

  text.on("dragstart", () => {
    status.text("drag started");
  });

  text.on("dragend", () => {
    status.text("drag ended");
  });

  text.on("dragmove", () => {
    status.text("dragging");
  });
}
