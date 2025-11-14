import Konva from "konva";

export function createLayer(stage: Konva.Stage, config?: Konva.LayerConfig) {
  const layer = new Konva.Layer(config);
  if (stage) {
    // 将图层添加到 stage 中
    stage.add(layer);
  }
  return layer;
}
