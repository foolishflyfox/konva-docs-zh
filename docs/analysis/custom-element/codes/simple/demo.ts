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

export function multiBeginPathDemo(stage: Konva.Stage) {
  const layer = createLayer(stage);

  const rectW = 50, rectH = 60, gap = 25, circleR = 28;
  const shapeY = 75;
  const circleRelX = rectW + gap + circleR; // 103，相对于 shape 原点

  const statusText = new Konva.Text({
    x: 10, y: 10, fontSize: 13, fill: '#333',
    text: '将鼠标悬停到图形上',
  });

  // ── 情况一：两次 beginPath，末尾一次 fillStrokeShape ──
  const label1 = new Konva.Text({
    x: 20, y: 48, fontSize: 12, fill: '#888',
    text: '情况一：末尾一次 fillStrokeShape',
  });
  // 虚线矩形：仅作视觉参考，listening:false 不参与命中检测
  const ghostRect = new Konva.Rect({
    x: 20, y: shapeY, width: rectW, height: rectH,
    stroke: '#bbb', strokeWidth: 1, dash: [5, 4],
    listening: false,
  });
  const shapeA = new Konva.Shape({
    x: 20, y: shapeY,
    fill: '#4ECDC4', stroke: '#2C3E50', strokeWidth: 2,
    sceneFunc(context, shape) {
      context.beginPath();
      context.rect(0, 0, rectW, rectH);   // 路径 A（矩形）
      context.beginPath();                 // ← 清除路径 A
      context.arc(circleRelX, rectH / 2, circleR, 0, Math.PI * 2);
      context.closePath();
      context.fillStrokeShape(shape);      // 只有圆形被绘制和命中
    },
  });
  shapeA.on('mouseenter', () => {
    shapeA.fill('#FF9800');
    layer.batchDraw();
    statusText.text('情况一命中：只有圆形有效（虚线矩形区域悬停不触发）');
  });
  shapeA.on('mouseleave', () => {
    shapeA.fill('#4ECDC4');
    layer.batchDraw();
    statusText.text('将鼠标悬停到图形上');
  });

  // ── 情况二：每段路径各自 fillStrokeShape ──
  const col2X = 20 + circleRelX + circleR + 35; // ≈ 206
  const label2 = new Konva.Text({
    x: col2X, y: 48, fontSize: 12, fill: '#888',
    text: '情况二：每段路径各自 fillStrokeShape',
  });
  const shapeB = new Konva.Shape({
    x: col2X, y: shapeY,
    fill: '#4ECDC4', stroke: '#2C3E50', strokeWidth: 2,
    sceneFunc(context, shape) {
      context.beginPath();
      context.rect(0, 0, rectW, rectH);
      context.closePath();
      context.fillStrokeShape(shape); // 矩形提交到 hit canvas

      context.beginPath();
      context.arc(circleRelX, rectH / 2, circleR, 0, Math.PI * 2);
      context.closePath();
      context.fillStrokeShape(shape); // 圆形也提交到 hit canvas
    },
  });
  shapeB.on('mouseenter', () => {
    shapeB.fill('#FF9800');
    layer.batchDraw();
    statusText.text('情况二命中：矩形和圆形区域均有效（两段路径都调用了 fillStrokeShape）');
  });
  shapeB.on('mouseleave', () => {
    shapeB.fill('#4ECDC4');
    layer.batchDraw();
    statusText.text('将鼠标悬停到图形上');
  });

  layer.add(statusText, label1, ghostRect, shapeA, label2, shapeB);
}

export function rainbowDemo(stage: Konva.Stage) {
  const layer = createLayer(stage);

  const cx = stage.width() / 2;
  const cy = stage.height();
  const bandWidth = 25;
  const baseRadius = 35;

  // 从外到内：红橙黄绿蓝靛紫
  const colors = [
    "#FF0000",
    "#FF7F00",
    "#FFFF00",
    "#00AA00",
    "#0000FF",
    "#4B0082",
    "#9400D3",
  ];

  colors.forEach((color, i) => {
    const outerRadius = baseRadius + (colors.length - i) * bandWidth;
    const innerRadius = baseRadius + (colors.length - i - 1) * bandWidth;

    const band = new Konva.Shape({
      x: cx,
      y: cy,
      fill: color,
      opacity: 0.75,
      sceneFunc(context, shape) {
        context.beginPath();
        context.arc(0, 0, outerRadius, Math.PI, 0, false);
        context.arc(0, 0, innerRadius, 0, Math.PI, true);
        context.closePath();
        context.fillStrokeShape(shape);
      },
    });

    band.on("mouseenter", () => {
      band.opacity(1);
      layer.batchDraw();
    });
    band.on("mouseleave", () => {
      band.opacity(0.75);
      layer.batchDraw();
    });

    layer.add(band);
  });
}

export function numericInputDemo(stage: Konva.Stage) {
  const layer = createLayer(stage);

  let value = 0;
  const btnW = 26;
  const totalH = 26;
  const displayW = 72;
  const totalW = btnW + displayW;
  const r = 5;
  const shapeX = Math.round((stage.width() - totalW) / 2);
  const shapeY = Math.round((stage.height() - totalH) / 2);

  const hint = new Konva.Text({
    x: 0,
    y: 10,
    width: stage.width(),
    text: "点击左侧按钮调整数值",
    fontSize: 13,
    fill: "#666",
    align: "center",
  });

  const numInput = new Konva.Shape({
    x: shapeX,
    y: shapeY,
    sceneFunc(context, _shape) {
      // ── 按钮区（圆角左矩形 + 3D 斜面效果）──
      context.beginPath();
      context.moveTo(r, 0);
      context.lineTo(btnW, 0);
      context.lineTo(btnW, totalH);
      context.lineTo(r, totalH);
      context.arc(r, totalH - r, r, Math.PI / 2, Math.PI, false); // 左下圆角
      context.lineTo(0, r);
      context.arc(r, r, r, Math.PI, (Math.PI * 3) / 2, false); // 左上圆角
      context.closePath();
      context.setAttr("fillStyle", "#b8b8b8");
      context.fill();

      // 顶部高亮（斜面亮边）
      context.setAttr("strokeStyle", "#e0e0e0");
      context.setAttr("lineWidth", 1.5);
      context.beginPath();
      context.moveTo(r, 1.5);
      context.lineTo(btnW - 1, 1.5);
      context.stroke();
      // 左侧高亮
      context.beginPath();
      context.moveTo(1.5, r);
      context.lineTo(1.5, totalH - r);
      context.stroke();

      // 底部阴影（斜面暗边）
      context.setAttr("strokeStyle", "#707070");
      context.setAttr("lineWidth", 1);
      context.beginPath();
      context.moveTo(r, totalH - 1.5);
      context.lineTo(btnW - 1, totalH - 1.5);
      context.stroke();

      // 上下按钮分割线
      context.setAttr("strokeStyle", "#909090");
      context.setAttr("lineWidth", 0.5);
      context.beginPath();
      context.moveTo(4, totalH / 2);
      context.lineTo(btnW - 4, totalH / 2);
      context.stroke();

      // 上箭头（▲）
      const acx = btnW / 2;
      const aw = 5;
      const ah = 4;
      context.setAttr("fillStyle", "#1a1a1a");
      context.beginPath();
      context.moveTo(acx, totalH / 4 - ah / 2);
      context.lineTo(acx + aw, totalH / 4 + ah / 2);
      context.lineTo(acx - aw, totalH / 4 + ah / 2);
      context.closePath();
      context.fill();

      // 下箭头（▼）
      context.beginPath();
      context.moveTo(acx, (totalH * 3) / 4 + ah / 2);
      context.lineTo(acx + aw, (totalH * 3) / 4 - ah / 2);
      context.lineTo(acx - aw, (totalH * 3) / 4 - ah / 2);
      context.closePath();
      context.fill();

      // ── 显示区（白色矩形 + 数字文本）──
      context.beginPath();
      context.rect(btnW, 0, displayW, totalH);
      context.setAttr("fillStyle", "white");
      context.fill();
      context.setAttr("strokeStyle", "#888");
      context.setAttr("lineWidth", 1);
      context.stroke();

      context.setAttr("font", "14px sans-serif");
      context.setAttr("textAlign", "right");
      context.setAttr("textBaseline", "middle");
      context.setAttr("fillStyle", "#000");
      context.fillText(String(value), btnW + displayW - 6, totalH / 2);
    },
    hitFunc(context, shape) {
      // sceneFunc 全程使用原生 fill()/stroke()，绕过了 colorKey 替换机制，
      // 必须显式定义 hitFunc，否则点击事件完全失效
      context.beginPath();
      context.rect(0, 0, totalW, totalH);
      context.closePath();
      context.fillStrokeShape(shape);
    },
  });

  numInput.on("click", () => {
    const pos = stage.getPointerPosition()!;
    const relX = pos.x - shapeX;
    const relY = pos.y - shapeY;
    if (relX >= 0 && relX < btnW) {
      if (relY < totalH / 2) value++;
      else value--;
      layer.batchDraw();
    }
  });

  numInput.on("mousemove", () => {
    const pos = stage.getPointerPosition()!;
    stage.container().style.cursor =
      pos.x - shapeX < btnW ? "pointer" : "default";
  });

  numInput.on("mouseleave", () => {
    stage.container().style.cursor = "default";
  });

  layer.add(hint, numInput);
}

export function rainbowSingleDemo(stage: Konva.Stage) {
  const layer = createLayer(stage);

  const cx = stage.width() / 2;
  const cy = stage.height();
  const bandWidth = 25;
  const baseRadius = 35;
  const colors = [
    "#FF0000",
    "#FF7F00",
    "#FFFF00",
    "#00AA00",
    "#0000FF",
    "#4B0082",
    "#9400D3",
  ];
  let activeIndex = -1;

  const rainbow = new Konva.Shape({
    x: cx,
    y: cy,
    sceneFunc(context, _shape) {
      colors.forEach((color, i) => {
        const outerRadius = baseRadius + (colors.length - i) * bandWidth;
        const innerRadius = baseRadius + (colors.length - i - 1) * bandWidth;
        context.beginPath();
        context.arc(0, 0, outerRadius, Math.PI, 0, false);
        context.arc(0, 0, innerRadius, 0, Math.PI, true);
        context.closePath();
        context.setAttr("globalAlpha", i === activeIndex ? 1 : 0.75);
        context.setAttr("fillStyle", color);
        context.fill();
      });
      context.setAttr("globalAlpha", 1);
    },
    hitFunc(context, shape) {
      const outerRadius = baseRadius + colors.length * bandWidth;
      context.beginPath();
      context.arc(0, 0, outerRadius, Math.PI, 0, false);
      context.moveTo(baseRadius, 0);
      context.arc(0, 0, baseRadius, 0, Math.PI, true);
      context.closePath();
      context.fillStrokeShape(shape);
    },
  });

  rainbow.on("mousemove", () => {
    const pos = stage.getPointerPosition()!;
    const dx = pos.x - cx;
    const dy = pos.y - cy;
    const r = Math.sqrt(dx * dx + dy * dy);
    const bandFromInner = Math.floor((r - baseRadius) / bandWidth);
    const colorIdx = colors.length - 1 - bandFromInner;
    const newIndex = colorIdx >= 0 && colorIdx < colors.length ? colorIdx : -1;
    if (newIndex !== activeIndex) {
      activeIndex = newIndex;
      layer.batchDraw();
    }
  });

  rainbow.on("mouseleave", () => {
    activeIndex = -1;
    layer.batchDraw();
  });

  layer.add(rainbow);
}
