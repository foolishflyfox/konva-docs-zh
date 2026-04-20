import { createLayer } from "@docs/utils";
import Konva from "konva";

function drawHexPath(context: Konva.Context, radius: number) {
  context.beginPath();
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i - Math.PI / 6;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    if (i === 0) {
      context.moveTo(x, y);
    } else {
      context.lineTo(x, y);
    }
  }
  context.closePath();
}

export function simpleCustomDemo(stage: Konva.Stage) {
  const layer = createLayer(stage);

  const hexagon = new Konva.Shape({
    x: stage.width() / 2,
    y: stage.height() / 2,
    fill: "#4ECDC4",
    stroke: "#2C3E50",
    strokeWidth: 3,
    sceneFunc: function (context, shape) {
      drawHexPath(context, 60);
      context.fillStrokeShape(shape);
    },
  });

  layer.add(hexagon);
}

export function hitFuncDemo(stage: Konva.Stage) {
  const layer = createLayer(stage);

  const statusText = new Konva.Text({
    x: 10,
    y: 10,
    fontSize: 14,
    fill: "#333",
    text: "将鼠标悬停在图形上",
  });

  // 左侧：默认命中区域（跟随 sceneFunc 路径）
  const leftLabel = new Konva.Text({
    x: 30,
    y: 165,
    fontSize: 12,
    fill: "#555",
    text: "默认命中区域",
  });
  const leftShape = new Konva.Shape({
    x: 90,
    y: 110,
    fill: "#4ECDC4",
    stroke: "#2C3E50",
    strokeWidth: 2,
    sceneFunc: function (context, shape) {
      drawHexPath(context, 50);
      context.fillStrokeShape(shape);
    },
  });

  // 右侧：自定义圆形命中区域（比图形本身更大）
  const rightLabel = new Konva.Text({
    x: 175,
    y: 165,
    fontSize: 12,
    fill: "#555",
    text: "自定义命中区域（圆形）",
  });
  const rightShape = new Konva.Shape({
    x: 230,
    y: 110,
    fill: "#FF6B6B",
    stroke: "#2C3E50",
    strokeWidth: 2,
    sceneFunc: function (context, shape) {
      drawHexPath(context, 50);
      context.fillStrokeShape(shape);
    },
    hitFunc: function (context, shape) {
      context.beginPath();
      context.arc(0, 0, 75, 0, Math.PI * 2);
      context.closePath();
      context.fillStrokeShape(shape);
    },
  });

  leftShape.on("mouseenter", () => {
    statusText.text("左侧触发：命中区域 = 六边形本身");
  });
  leftShape.on("mouseleave", () => {
    statusText.text("将鼠标悬停在图形上");
  });
  rightShape.on("mouseenter", () => {
    statusText.text("右侧触发：命中区域 = 半径 75px 的圆（比六边形更大）");
  });
  rightShape.on("mouseleave", () => {
    statusText.text("将鼠标悬停在图形上");
  });

  layer.add(statusText, leftLabel, leftShape, rightLabel, rightShape);
}

export function ringDemo(stage: Konva.Stage) {
  const layer = createLayer(stage);

  const outerRadius = 75;
  const innerRadius = 35;

  const statusText = new Konva.Text({
    x: 10,
    y: 10,
    fontSize: 14,
    fill: "#333",
    text: "移入圆环区域触发，中心空洞不触发",
  });

  const ring = new Konva.Shape({
    x: stage.width() / 2,
    y: stage.height() / 2,
    fill: "#4CAF50",
    stroke: "#2C3E50",
    strokeWidth: 2,
    sceneFunc: function (context, shape) {
      // 先填充内圆（天蓝色）
      context.beginPath();
      context.arc(0, 0, innerRadius, 0, Math.PI * 2);
      context.closePath();
      context.setAttr("fillStyle", "rgb(135, 206, 235)");
      context.fill();
      // 再绘制圆环，应用 shape 的 fill/stroke
      context.beginPath();
      context.arc(0, 0, outerRadius, 0, Math.PI * 2, false);
      context.moveTo(innerRadius, 0);
      context.arc(0, 0, innerRadius, 0, Math.PI * 2, true);
      context.closePath();
      context.fillStrokeShape(shape);
    },
    // hitFunc: function (context, shape) {
    //   context.beginPath();
    //   context.arc(0, 0, outerRadius, 0, Math.PI * 2, false);
    //   context.moveTo(innerRadius, 0);
    //   context.arc(0, 0, innerRadius, 0, Math.PI * 2, true);
    //   context.closePath();
    //   context.fillStrokeShape(shape);
    // },
  });

  ring.on("mouseenter", () => {
    ring.fill("#FF9800");
    layer.batchDraw();
    statusText.text("鼠标进入圆环 → 变为橘黄色");
  });
  ring.on("mouseleave", () => {
    ring.fill("#4CAF50");
    layer.batchDraw();
    statusText.text("鼠标离开圆环 → 恢复绿色");
  });

  layer.add(statusText, ring);
}

export function pixelTextDemo(stage: Konva.Stage) {
  const layer = createLayer(stage);

  const fontSize = 72;
  const strokeWidth = 8;
  const text = "Konva";

  const shape = new Konva.Shape({
    x: stage.width() / 2,
    y: stage.height() / 2,
    fill: "#4CAF50",
    stroke: "#4CAF50",
    strokeWidth,
    sceneFunc(context, shape) {
      context.setAttr("font", `bold ${fontSize}px Arial`);
      context.setAttr("textAlign", "center");
      context.setAttr("textBaseline", "middle");
      context.setAttr("lineWidth", shape.getAttr("strokeWidth"));
      context.setAttr("fillStyle", shape.getAttr("fill"));
      context.setAttr("strokeStyle", shape.getAttr("stroke"));
      context.fillText(text, 0, 0);
      context.strokeText(text, 0, 0);
    },
    hitFunc(context, shape) {
      // 使用 shape.colorKey 作为命中色，仅文字像素会被涂上该颜色
      const hitColor = shape.colorKey;
      context.setAttr("font", `bold ${fontSize}px Arial`);
      context.setAttr("textAlign", "center");
      context.setAttr("textBaseline", "middle");
      context.setAttr("lineWidth", shape.getAttr("strokeWidth"));
      console.log("@@@", hitColor);
      context.setAttr("fillStyle", hitColor);
      context.setAttr("strokeStyle", hitColor);
      context.fillText(text, 0, 0);
      context.strokeText(text, 0, 0);
    },
  });

  shape.on("mouseenter", () => {
    shape.fill("#FF9800");
    shape.stroke("#FF9800");
    layer.batchDraw();
  });
  shape.on("mouseleave", () => {
    shape.fill("#4CAF50");
    shape.stroke("#4CAF50");
    layer.batchDraw();
  });

  layer.add(shape);
}
