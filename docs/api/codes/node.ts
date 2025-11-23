import { createLayer } from "@docs/utils";
import Konva from "konva";
import { FilterFunction } from "konva/lib/Node";

export function getClientRectDemo() {
  const rect = new Konva.Rect({
    width: 100,
    height: 100,
    x: 50,
    y: 50,
    strokeWidth: 4,
    stroke: "black",
    offsetX: 50,
    scaleY: 2,
  });
  console.log("=====测试rect.getClientRect=====");
  // 输出 {width: 104, height: 104, x: -2, y: -2}
  console.log(
    `参数为 { skipTransform: true }: `,
    rect.getClientRect({ skipTransform: true })
  );
  // 输出为 {x: -2, y: 46, width: 104, height: 208}
  console.log(`无参数: `, rect.getClientRect());
  // 输出为 { x: 0, y: 50, width: 100, height: 200 }
  console.log(
    `参数为 {skipStroke: true}: `,
    rect.getClientRect({ skipStroke: true })
  );
}

interface CompositeOperationOption {
  x: number;
  y: number;
  type: string;
}

function showSingleCompositeOperation(
  layer: Konva.Layer,
  option: CompositeOperationOption
) {
  const { x, y, type } = option;
  const group = new Konva.Group({ x, y });
  layer.add(group);

  const text = new Konva.Text({ x: 0, y: 5, text: type });
  // 先画一个矩形
  const rect = new Konva.Rect({
    x: 0,
    y: 20,
    fill: "#f00",
    width: 50,
    height: 50,
  });
  group.add(rect);
  // 创建遮罩 group
  // const maskGroup = new Konva.Group({});
  // group.add(maskGroup);
  const circle = new Konva.Circle({
    x: 50,
    y: 70,
    radius: 25,
    fill: "#00f",
    globalCompositeOperation: type as any,
  });

  group.add(circle);
  group.add(text);
  group.cache();
  // layer.add(group);
}

function showBatchCompositeOperation(stage: Konva.Stage, types: string[]) {
  const layer = createLayer(stage);
  for (let i = 0; i < types.length; i++) {
    const xi = i % 5;
    const yi = Math.floor(i / 5);
    showSingleCompositeOperation(layer, {
      x: 20 + xi * 120,
      y: 105 * yi,
      type: types[i],
    });
  }
}
// 显示基础混合模式效果
export function showBaseCompositeOperationType(stage: Konva.Stage) {
  // const layer = createLayer(stage);
  const types = [
    "source-over",
    "source-in",
    "source-out",
    "source-atop",
    "destination-over",
    "destination-in",
    "destination-out",
    "destination-atop",
  ];
  showBatchCompositeOperation(stage, types);
}

export function showSpecialCompositeOperationType(stage: Konva.Stage) {
  const types = ["lighter", "copy", "xor"];
  showBatchCompositeOperation(stage, types);
}

export function showColorCompositeOperationType(stage: Konva.Stage) {
  const types = [
    "multiply",
    "screen",
    "overlay",
    "darken",
    "lighten",
    "color-dodge",
    "color-burn",
    "hard-light",
    "soft-light",
    "difference",
    "exclusion",
  ];
  showBatchCompositeOperation(stage, types);
}

export function showHslColorCompositeOperationType(stage: Konva.Stage) {
  showBatchCompositeOperation(stage, [
    "hue",
    "saturation",
    "color",
    "luminosity",
  ]);
}

export function offsetDemo(stage: Konva.Stage) {
  const layer = createLayer(stage);
  const rect1 = new Konva.Rect({
    x: 50,
    y: 50,
    width: 100,
    height: 100,
    fill: "blue",
    opacity: 0.5,
  });
  const rect2 = (rect1.clone() as Konva.Rect)
    .fill("green")
    .offset({ x: 25, y: 45 });
  layer.add(rect1, rect2);
}

function addFilteredNodes(
  layer: Konva.Layer,
  node: Konva.Node,
  filters: (FilterFunction | string)[],
  rowIndex: number,
  withCache: boolean
) {
  const y = rowIndex * 80 + 10;
  const x0 = 10;
  for (let i = 0; i < filters.length + 1; i++) {
    const x = x0 + i * 90;
    const tmpNode = node.clone({ x, y });
    const tmpFilters = filters.slice(0, i);
    if (tmpFilters.length) {
      if (withCache) {
        tmpNode.cache();
        tmpNode.fill("green");
        // 直接再度调用 cache 就行，不需要先 clearCache 就能刷新缓存
        // tmpNode.cache();
      }
      tmpNode.filters(tmpFilters);
    }
    layer.add(tmpNode);
  }
}

export function filtersDemo(stage: Konva.Stage) {
  const layer = createLayer(stage);
  const node = new Konva.Rect({ width: 60, height: 60, fill: "#0bf" });
  addFilteredNodes(
    layer,
    node,
    ["blur(5px)", "brightness(1.2)", "contrast(1.5)"],
    0,
    true
  );

  addFilteredNodes(
    layer,
    node,
    [Konva.Filters.Blur, Konva.Filters.Sepia, Konva.Filters.Invert],
    1,
    true
  );

  addFilteredNodes(
    layer,
    node,
    [
      "blur(3px)", // CSS filter
      Konva.Filters.Invert, // function filter
      "brightness(1.5)", // CSS filter
    ],
    2,
    true
  );
}
