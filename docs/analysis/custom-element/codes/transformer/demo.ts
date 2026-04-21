import { createLayer, addRanges } from "@docs/utils";
import Konva from "konva";

// Demo 1: getClientRect() 包围盒可视化
export function getClientRectDemo(stage: Konva.Stage) {
  const layer = createLayer(stage);

  const [rotRef] = addRanges(stage, [
    { label: " rotation（旋转角度）", min: 0, max: 360, defaultValue: 0, step: 1 },
  ]);

  const rect = new Konva.Rect({
    x: stage.width() / 2,
    y: stage.height() / 2 + 20,
    width: 160,
    height: 100,
    offsetX: 80,
    offsetY: 50,
    fill: "#4ECDC4",
    stroke: "#2C3E50",
    strokeWidth: 2,
  });

  // 红色虚线矩形：表示轴对齐包围盒
  const bboxRect = new Konva.Rect({
    stroke: "#E74C3C",
    strokeWidth: 1.5,
    dash: [5, 4],
    fill: "rgba(231,76,60,0.05)",
    listening: false,
  });

  // 旋转中心点
  const centerDot = new Konva.Circle({
    x: stage.width() / 2,
    y: stage.height() / 2 + 20,
    radius: 4,
    fill: "#E74C3C",
    listening: false,
  });

  const infoText = new Konva.Text({
    x: 10,
    y: stage.height() - 32,
    fontSize: 11,
    fill: "#333",
    fontFamily: "monospace",
    text: "",
  });

  const anim = new Konva.Animation(() => {
    rect.rotation(rotRef.value);
    const cr = rect.getClientRect();
    bboxRect.setAttrs({ x: cr.x, y: cr.y, width: cr.width, height: cr.height });
    infoText.text(
      `getClientRect():  x=${cr.x.toFixed(0)}, y=${cr.y.toFixed(0)}, ` +
        `width=${cr.width.toFixed(0)}, height=${cr.height.toFixed(0)}`
    );
    bboxRect.moveToTop();
    centerDot.moveToTop();
    infoText.moveToTop();
  }, layer);
  anim.start();

  layer.add(rect, bboxRect, centerDot, infoText);
}

// Demo 2: 手动实现四角调整尺寸
export function manualResizeDemo(stage: Konva.Stage) {
  const layer = createLayer(stage);

  const ORIG_W = 200,
    ORIG_H = 120;

  const rect = new Konva.Rect({
    x: 120,
    y: 75,
    width: ORIG_W,
    height: ORIG_H,
    fill: "#4ECDC4",
    stroke: "#2C3E50",
    strokeWidth: 2,
  });
  layer.add(rect);

  // 当前视觉四角坐标
  function corners() {
    const x = rect.x(),
      y = rect.y();
    const w = rect.width() * rect.scaleX();
    const h = rect.height() * rect.scaleY();
    return {
      nw: { x, y },
      ne: { x: x + w, y },
      se: { x: x + w, y: y + h },
      sw: { x, y: y + h },
    };
  }

  const oppMap = { nw: "se", ne: "sw", se: "nw", sw: "ne" } as const;
  type CornerKey = keyof typeof oppMap;

  const handleMap = {} as Record<CornerKey, Konva.Circle>;

  function syncHandles(skip?: CornerKey) {
    const c = corners();
    for (const [k, h] of Object.entries(handleMap) as [
      CornerKey,
      Konva.Circle,
    ][]) {
      if (k !== skip) h.position(c[k]);
    }
  }

  const infoText = new Konva.Text({
    x: 10,
    y: stage.height() - 30,
    fontSize: 11,
    fill: "#333",
    fontFamily: "monospace",
    text: "",
  });
  layer.add(infoText);

  (Object.keys(oppMap) as CornerKey[]).forEach((name) => {
    const handle = new Konva.Circle({
      ...corners()[name],
      radius: 7,
      fill: "white",
      stroke: "#2C3E50",
      strokeWidth: 2,
      draggable: true,
    });

    let anchX = 0,
      anchY = 0;

    handle.on("dragstart", () => {
      // 记录对角位置，拖拽过程中保持不动
      const c = corners();
      const opp = oppMap[name];
      anchX = c[opp].x;
      anchY = c[opp].y;
    });

    handle.on("dragmove", () => {
      // 新的视觉尺寸 = 当前手柄位置 - 对角位置
      let newW = handle.x() - anchX;
      let newH = handle.y() - anchY;

      // newW/newH 的符号决定矩形左上角的位置
      const newX = newW >= 0 ? anchX : handle.x();
      const newY = newH >= 0 ? anchY : handle.y();
      newW = Math.abs(newW);
      newH = Math.abs(newH);

      if (newW > 20 && newH > 20) {
        // 不改变 width/height，只调整 scaleX/scaleY
        rect.setAttrs({
          x: newX,
          y: newY,
          scaleX: newW / ORIG_W,
          scaleY: newH / ORIG_H,
        });
      }
      syncHandles(name);

      infoText.text(
        `scaleX=${rect.scaleX().toFixed(2)},  scaleY=${rect.scaleY().toFixed(2)}` +
          `   →  视觉宽=${Math.round(ORIG_W * rect.scaleX())},  视觉高=${Math.round(ORIG_H * rect.scaleY())}`
      );
      infoText.moveToTop();
    });

    handleMap[name] = handle;
    layer.add(handle);
  });

  syncHandles();
}

// Demo 3: 手动实现旋转手柄
export function manualRotateDemo(stage: Konva.Stage) {
  const layer = createLayer(stage);

  const rect = new Konva.Rect({
    x: stage.width() / 2,
    y: stage.height() / 2,
    width: 160,
    height: 100,
    offsetX: 80,
    offsetY: 50,
    fill: "#FF6B6B",
    stroke: "#2C3E50",
    strokeWidth: 2,
    draggable: true,
  });
  layer.add(rect);

  const HANDLE_DIST = 52; // 旋转手柄到旋转中心的距离（px）

  // 根据矩形当前旋转角，计算旋转手柄的世界坐标
  // 手柄固定在矩形局部坐标系的 (0, -HANDLE_DIST) 方向（正上方）
  function calcHandlePos() {
    const rad = (rect.rotation() * Math.PI) / 180;
    const cx = rect.x(),
      cy = rect.y();
    // 局部点 (lx, ly) → 世界点：
    //   wx = cx + cos(rad)·lx - sin(rad)·ly
    //   wy = cy + sin(rad)·lx + cos(rad)·ly
    // 代入 (lx=0, ly=-HANDLE_DIST)：
    return {
      x: cx + Math.sin(rad) * HANDLE_DIST,
      y: cy - Math.cos(rad) * HANDLE_DIST,
    };
  }

  // 连线：旋转中心 → 旋转手柄
  const rotLine = new Konva.Line({
    stroke: "#E74C3C",
    strokeWidth: 1.5,
    dash: [4, 3],
    listening: false,
  });
  const rotHandle = new Konva.Circle({
    ...calcHandlePos(),
    radius: 8,
    fill: "white",
    stroke: "#E74C3C",
    strokeWidth: 2,
    draggable: true,
  });

  const infoText = new Konva.Text({
    x: 10,
    y: stage.height() - 30,
    fontSize: 11,
    fill: "#333",
    fontFamily: "monospace",
    text: "",
  });

  layer.add(rotLine, rotHandle, infoText);

  function syncRotHandle() {
    const pos = calcHandlePos();
    rotHandle.position(pos);
    rotLine.points([rect.x(), rect.y(), pos.x, pos.y]);
  }
  syncRotHandle();

  rotHandle.on("dragmove", () => {
    const cx = rect.x(),
      cy = rect.y();
    const hx = rotHandle.x(),
      hy = rotHandle.y();

    // 从中心 (cx, cy) 到手柄 (hx, hy) 的向量确定旋转角：
    // sin(θ) = (hx-cx)/R,  cos(θ) = -(hy-cy)/R
    // θ = atan2(hx-cx, -(hy-cy))  （"正上方"对应 0°）
    const angle = (Math.atan2(hx - cx, -(hy - cy)) * 180) / Math.PI;
    rect.rotation(angle);

    // 拖拽期间只更新连线，手柄位置由 Konva 拖拽系统控制
    rotLine.points([cx, cy, hx, hy]);

    infoText.text(`rotation = ${angle.toFixed(1)}°`);
    infoText.moveToTop();
  });

  // 拖拽结束后将手柄吸附回正确距离
  rotHandle.on("dragend", () => {
    syncRotHandle();
    layer.batchDraw();
  });

  // 矩形被拖动时同步手柄位置
  rect.on("dragmove", syncRotHandle);
}
