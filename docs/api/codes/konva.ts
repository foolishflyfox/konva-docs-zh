import { createLayer } from "@docs/utils";
import Konva from "konva";

// 自动重绘示例
export function autoDrawEnabledDemo(stage: Konva.Stage) {
  const layer = createLayer(stage);
  const circle = new Konva.Circle({
    x: 50,
    y: 50,
    radius: 45,
    fill: "green",
  });
  layer.add(circle);
  circle.radius(35);
  circle.fill("#0b0");
}

// 禁用自动重绘示例
export function closeAutoDrawEnabledDemo(stage: Konva.Stage) {
  Konva.autoDrawEnabled = false;
  const layer = createLayer(stage);
  const circle = new Konva.Circle({
    x: 50,
    y: 50,
    radius: 45,
    fill: "green",
  });
  layer.add(circle);

  circle.radius(35);
  circle.fill("#0bf");
  Konva.autoDrawEnabled = true;
}
