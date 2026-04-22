import Konva from "konva";
import { createLayer } from "@docs/utils";

// Demo 1: 可视化 Stage / Group 两级坐标系，点击查看坐标值
export function coordinateSpaceDemo(stage: Konva.Stage) {
  const layer = createLayer(stage);
  const w = stage.width();
  const h = stage.height();
  const cx = w / 2;
  const cy = Math.round(h * 0.52);

  const addArrow = (
    parent: Konva.Layer | Konva.Group,
    points: number[],
    color: string,
  ) => {
    parent.add(
      new Konva.Arrow({
        points,
        stroke: color,
        strokeWidth: 1.5,
        fill: color,
        pointerLength: 7,
        pointerWidth: 6,
        listening: false,
      }),
    );
  };

  // Stage 坐标轴（左上角）
  addArrow(layer, [10, 24, 78, 24], "#E74C3C");
  addArrow(layer, [10, 24, 10, 92], "#E74C3C");
  layer.add(
    new Konva.Text({
      x: 14,
      y: 12,
      text: "Stage (0, 0)",
      fontSize: 10,
      fill: "#E74C3C",
    }),
  );

  // 旋转的 Group，位于画布中心
  const group = new Konva.Group({ x: cx, y: cy, rotation: 35 });

  // Group 坐标轴
  addArrow(group, [0, 0, 95, 0], "#3498DB");
  addArrow(group, [0, 0, 0, -95], "#3498DB");
  group.add(new Konva.Circle({ radius: 4, fill: "#3498DB", listening: false }));
  group.add(
    new Konva.Text({
      x: 5,
      y: -90,
      text: "Group (0,0)\nrotation = 35°",
      fontSize: 10,
      fill: "#3498DB",
      lineHeight: 1.4,
    }),
  );

  // Group 内的矩形
  const rect = new Konva.Rect({
    x: 10,
    y: -40,
    width: 90,
    height: 60,
    fill: "#4ECDC4",
    stroke: "#2C3E50",
    strokeWidth: 2,
    cornerRadius: 4,
  });
  group.add(rect);
  group.add(
    new Konva.Text({
      x: 10,
      y: -40,
      width: 90,
      height: 60,
      text: "Shape\nx=10, y=−40",
      fontSize: 9,
      fill: "#2C3E50",
      align: "center",
      verticalAlign: "middle",
      listening: false,
    }),
  );

  layer.add(group);

  // 辅助十字线 + 点击标记
  const crossH = new Konva.Line({
    stroke: "#E74C3C",
    strokeWidth: 0.8,
    dash: [4, 3],
    opacity: 0.5,
    visible: false,
    listening: false,
  });
  const crossV = new Konva.Line({
    stroke: "#E74C3C",
    strokeWidth: 0.8,
    dash: [4, 3],
    opacity: 0.5,
    visible: false,
    listening: false,
  });
  const dot = new Konva.Circle({
    radius: 5,
    fill: "#E74C3C",
    stroke: "white",
    strokeWidth: 1.5,
    visible: false,
    listening: false,
  });

  const infoText = new Konva.Text({
    x: 10,
    y: h - 46,
    fontSize: 11,
    fill: "#333",
    fontFamily: "monospace",
    lineHeight: 1.7,
    text: "← 点击画布，观察 Stage 与 Group 坐标系的差异",
  });

  layer.add(crossH, crossV, dot, infoText);

  stage.on("click", () => {
    const sp = stage.getPointerPosition()!;
    const gp = group.getRelativePointerPosition()!;

    dot.position(sp);
    dot.visible(true);
    crossH.points([0, sp.y, w, sp.y]);
    crossV.points([sp.x, 0, sp.x, h]);
    crossH.visible(true);
    crossV.visible(true);
    dot.moveToTop();

    infoText.text(
      `Stage 坐标:      (${sp.x.toFixed(0)}, ${sp.y.toFixed(0)})   ←  stage.getPointerPosition()\n` +
        `Group 局部坐标:  (${gp.x.toFixed(1)}, ${gp.y.toFixed(1)})   ←  group.getRelativePointerPosition()`,
    );
    layer.batchDraw();
  });
}

// Demo 2: 在旋转 Group 内定位——对比错误做法与正确做法
export function pointerConversionDemo(stage: Konva.Stage) {
  const layer = createLayer(stage);
  const w = stage.width();
  const h = stage.height();
  const gy = Math.round(h * 0.55);
  const ANGLE = -28;

  const lx = Math.round(w * 0.27);
  const rx = Math.round(w * 0.73);

  const leftGroup = new Konva.Group({ x: lx, y: gy, rotation: ANGLE });
  const rightGroup = new Konva.Group({ x: rx, y: gy, rotation: ANGLE });

  const makeGroupBg = (color: string) =>
    new Konva.Rect({
      x: -88,
      y: -68,
      width: 176,
      height: 136,
      fill: "rgba(200,200,200,0.1)",
      stroke: color,
      strokeWidth: 1.5,
      dash: [5, 3],
      cornerRadius: 4,
    });

  leftGroup.add(makeGroupBg("#E74C3C"));
  rightGroup.add(makeGroupBg("#27AE60"));
  layer.add(leftGroup, rightGroup);

  // 标题
  layer.add(
    new Konva.Text({
      x: lx - 95,
      y: 10,
      width: 190,
      align: "center",
      text: "❌  只减 group.x / group.y",
      fontSize: 12,
      fill: "#E74C3C",
    }),
  );
  layer.add(
    new Konva.Text({
      x: rx - 95,
      y: 10,
      width: 190,
      align: "center",
      text: "✓  getRelativePointerPosition()",
      fontSize: 12,
      fill: "#27AE60",
    }),
  );

  const hint = new Konva.Text({
    x: 10,
    y: h - 28,
    fontSize: 11,
    fill: "#555",
    fontFamily: "monospace",
    text: "点击旋转框内的任意位置",
  });
  layer.add(hint);

  const leftDots: Konva.Circle[] = [];
  const rightDots: Konva.Circle[] = [];
  const MAX_DOTS = 8;

  stage.on("click", () => {
    const sp = stage.getPointerPosition()!;
    const rp = rightGroup.getRelativePointerPosition()!;
    // const rp = leftGroup.getRelativePointerPosition()!;

    // 错误：仅减去平移分量，未处理旋转 —— 落点会偏移
    const wrongX = sp.x - leftGroup.x();
    const wrongY = sp.y - leftGroup.y();

    if (leftDots.length >= MAX_DOTS) leftDots.shift()!.destroy();
    if (rightDots.length >= MAX_DOTS) rightDots.shift()!.destroy();

    const ld = new Konva.Circle({
      x: wrongX,
      y: wrongY,
      radius: 5,
      fill: "#E74C3C",
    });
    const rd = new Konva.Circle({
      x: rp.x,
      y: rp.y,
      radius: 5,
      fill: "#27AE60",
    });

    leftGroup.add(ld);
    rightGroup.add(rd);
    leftDots.push(ld);
    rightDots.push(rd);

    hint.text(
      `Stage (${sp.x.toFixed(0)}, ${sp.y.toFixed(0)})   ` +
        `❌ 偏移后 (${wrongX.toFixed(0)}, ${wrongY.toFixed(0)})   ` +
        `✓ 相对坐标 (${rp.x.toFixed(1)}, ${rp.y.toFixed(1)})`,
    );
    layer.batchDraw();
  });
}
