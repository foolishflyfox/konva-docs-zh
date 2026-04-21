import { createLayer } from "@docs/utils";
import Konva from "konva";

// 根据鼠标到旋转中心的弧度，生成指向正确方向的旋转光标 SVG
function getRotateCursor(radian: number): string {
  const deg = (((radian * 180) / Math.PI) + 90 + 360) % 360;
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32">` +
    `<g transform="rotate(${deg.toFixed(0)},16,16)">` +
    `<path d="M16 4 A12 12 0 0 1 28 16" stroke="%23222" stroke-width="2.5" fill="none" stroke-linecap="round"/>` +
    `<polygon points="16,4 11,11 21,11" fill="%23222"/>` +
    `</g></svg>`;
  return `url("data:image/svg+xml,${svg}") 16 16, grab`;
}

// 8 个锚点的局部比例坐标 (lx/ly ∈ [0,1]) 及各自的名称
const ANCHOR_CFGS = [
  { name: "nw", lx: 0,   ly: 0   },
  { name: "n",  lx: 0.5, ly: 0   },
  { name: "ne", lx: 1,   ly: 0   },
  { name: "e",  lx: 1,   ly: 0.5 },
  { name: "se", lx: 1,   ly: 1   },
  { name: "s",  lx: 0.5, ly: 1   },
  { name: "sw", lx: 0,   ly: 1   },
  { name: "w",  lx: 0,   ly: 0.5 },
] as const;

// 缩放手柄对应的 CSS 双向箭头光标
const RESIZE_CURSORS: Record<string, string> = {
  nw: "nwse-resize",
  n:  "ns-resize",
  ne: "nesw-resize",
  e:  "ew-resize",
  se: "nwse-resize",
  s:  "ns-resize",
  sw: "nesw-resize",
  w:  "ew-resize",
};

// 对角锚点的对应关系（用于缩放时固定对角）
const OPP: Record<string, string> = {
  nw: "se", n: "s", ne: "sw",
  w:  "e",          e:  "w",
  sw: "ne", s: "n", se: "nw",
};

export function fullTransformerDemo(stage: Konva.Stage) {
  const layer = createLayer(stage);

  const INIT_W = 180, INIT_H = 110;

  // ── 目标矩形：offsetX/Y 设为中心，旋转中心默认在矩形中心 ──────────────
  const rect = new Konva.Rect({
    x: stage.width() / 2,
    y: stage.height() / 2,
    width: INIT_W,
    height: INIT_H,
    offsetX: INIT_W / 2,
    offsetY: INIT_H / 2,
    fill: "#4ECDC4",
    stroke: "#2C3E50",
    strokeWidth: 2,
    draggable: true,
  });
  layer.add(rect);

  // ── 8 个缩放手柄（白色圆角小方块） ────────────────────────────────────
  const scaleHandles = new Map<string, Konva.Rect>();

  ANCHOR_CFGS.forEach(({ name }) => {
    const isEdge = name.length === 1 || name === "nw" || name === "ne" || name === "sw" || name === "se"
      ? false : true; // n/s/e/w 是边中点，稍扁
    const hw = name === "n" || name === "s" ? 14 : 9;
    const hh = name === "e" || name === "w" ? 14 : 9;

    const handle = new Konva.Rect({
      width: hw, height: hh,
      offsetX: hw / 2, offsetY: hh / 2,
      fill: "white",
      stroke: "#005BB8",
      strokeWidth: 1.5,
      cornerRadius: 2,
      draggable: true,
    });

    handle.on("mouseenter", () => {
      // 将光标旋转到与矩形当前旋转对齐（方向已由 Konva 内部处理）
      const rad = rect.rotation() * Math.PI / 180;
      // 根据手柄方位 + 矩形旋转角决定光标（简化：直接用原始方位光标）
      stage.container().style.cursor = RESIZE_CURSORS[name];
    });
    handle.on("mouseleave", () => { stage.container().style.cursor = ""; });

    // 缩放逻辑 ────────────────────────────────────────────────────────────
    let anchWorld = { x: 0, y: 0 }; // 对角在世界坐标中的固定位置
    let origW = 0, origH = 0;       // 拖动开始时矩形原始尺寸

    handle.on("dragstart", () => {
      const opp = OPP[name];
      const oppCfg = ANCHOR_CFGS.find(c => c.name === opp)!;
      anchWorld = rect.getAbsoluteTransform().point({
        x: oppCfg.lx * rect.width(),
        y: oppCfg.ly * rect.height(),
      });
      origW = rect.width();
      origH = rect.height();
    });

    handle.on("dragmove", () => {
      // 当前手柄的世界坐标（由拖拽系统更新）
      const hWorld = handle.getAbsolutePosition();

      // 将手柄和固定对角的世界坐标都变换到矩形局部坐标系（仅含旋转，不含 offset/scale）
      const rad = (rect.rotation() * Math.PI) / 180;
      const cos = Math.cos(rad), sin = Math.sin(rad);

      // 向量：固定对角 → 当前手柄（世界空间）
      const vx = hWorld.x - anchWorld.x;
      const vy = hWorld.y - anchWorld.y;

      // 旋转到矩形局部坐标系（相当于乘以 R^{-1}）
      const localVx =  vx * cos + vy * sin;
      const localVy = -vx * sin + vy * cos;

      // localVx / localVy 即为新的视觉宽高（带符号）
      const newVW = localVx; // visual width  = origW * scaleX
      const newVH = localVy; // visual height = origH * scaleY

      if (Math.abs(newVW) < 10 || Math.abs(newVH) < 10) return;

      const newScaleX = Math.abs(newVW) / origW;
      const newScaleY = Math.abs(newVH) / origH;

      // 固定对角的世界坐标在修改 scale 后要保持不变
      // 新的 (cx, cy) 使得固定对角对应的本地点变换后仍在 anchWorld
      // 固定对角本地坐标（对角的 lx/ly 在局部空间中，乘以 origW/H）
      const oppCfg = ANCHOR_CFGS.find(c => c.name === OPP[name])!;
      const oppLx = oppCfg.lx * origW;
      const oppLy = oppCfg.ly * origH;
      const newOffX = rect.offsetX(); // offsetX 不随 scale 变化
      const newOffY = rect.offsetY();

      // T(-offset) → S → R → T(cx,cy) 应用于 (oppLx, oppLy) = anchWorld
      const sx = newScaleX * (newVW < 0 ? -1 : 1);
      const sy = newScaleY * (newVH < 0 ? -1 : 1);
      const sLx = (oppLx - newOffX) * sx;
      const sLy = (oppLy - newOffY) * sy;
      const newCx = anchWorld.x - (sLx * cos - sLy * sin);
      const newCy = anchWorld.y - (sLx * sin + sLy * cos);

      rect.setAttrs({
        x: newCx,
        y: newCy,
        scaleX: newScaleX,
        scaleY: newScaleY,
      });

      syncAll();
      layer.batchDraw();
    });

    handle.on("dragend", () => {
      syncAll();
      stage.container().style.cursor = "";
    });

    scaleHandles.set(name, handle);
    layer.add(handle);
  });

  // 边框线（跟随矩形变换）
  const border = new Konva.Line({
    stroke: "#0095FF",
    strokeWidth: 1.5,
    closed: true,
    listening: false,
  });
  layer.add(border);

  // ── 8 个旋转区域（透明圆，贴在缩放手柄外侧） ──────────────────────────
  const ROTATE_DIST = 16;
  const rotateZones = ANCHOR_CFGS.map(({ name, lx, ly }) => {
    const zone = new Konva.Circle({
      radius: 12,
      fill: "transparent",
      stroke: "transparent",
      draggable: true,
      name: `rz-${name}`,
    });

    zone.on("mouseenter mousemove", () => {
      const pos = stage.getPointerPosition()!;
      const radian = Math.atan2(pos.y - rect.y(), pos.x - rect.x());
      stage.container().style.cursor = getRotateCursor(radian);
    });
    zone.on("mouseleave", () => { stage.container().style.cursor = ""; });

    let prevPos = { x: 0, y: 0 };

    zone.on("dragstart", () => {
      prevPos = stage.getPointerPosition()!;
    });

    zone.on("dragmove", () => {
      const pos = stage.getPointerPosition()!;
      const cx = rect.x(), cy = rect.y();
      const prevRad = Math.atan2(prevPos.y - cy, prevPos.x - cx);
      const curRad  = Math.atan2(pos.y  - cy, pos.x  - cx);
      rect.rotate((curRad - prevRad) * 180 / Math.PI);
      prevPos = pos;
      syncAll();
      layer.batchDraw();
      stage.container().style.cursor = getRotateCursor(curRad);
    });

    zone.on("dragend", () => {
      syncAll();
      stage.container().style.cursor = "";
    });

    layer.add(zone);
    return { zone, lx, ly };
  });

  // ── 旋转中心锚点（可拖动的十字圆） ────────────────────────────────────
  const originAnchor = new Konva.Shape({
    draggable: true,
    sceneFunc(ctx, shape) {
      const r = 9;
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.fillStrokeShape(shape);
      // 十字线
      ctx.beginPath();
      ctx.moveTo(-r * 1.7, 0); ctx.lineTo(r * 1.7, 0);
      ctx.moveTo(0, -r * 1.7); ctx.lineTo(0, r * 1.7);
      ctx.strokeShape(shape);
    },
    hitFunc(ctx, shape) {
      ctx.beginPath();
      ctx.arc(0, 0, 14, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fillStrokeShape(shape);
    },
    fill: "rgba(255,255,255,0.88)",
    stroke: "#3397FF",
    strokeWidth: 2,
  });

  originAnchor.on("mouseenter", () => { stage.container().style.cursor = "move"; });
  originAnchor.on("mouseleave", () => { stage.container().style.cursor = ""; });

  originAnchor.on("dragmove", () => {
    // 锚点当前世界坐标 = 用户拖到的位置
    const worldPos = originAnchor.getAbsolutePosition();

    // 转换到矩形局部坐标系（得到新的 offsetX/Y）
    const invT = rect.getAbsoluteTransform().copy().invert();
    const newLocal = invT.point(worldPos);

    const dx = newLocal.x - rect.offsetX();
    const dy = newLocal.y - rect.offsetY();
    const rad = (rect.rotation() * Math.PI) / 180;
    const sx = rect.scaleX(), sy = rect.scaleY();

    // 修改 offset 后，保持视觉形状不动：补偿 rect.x/y
    // Δworld = R( S(Δlocal) ) where Δlocal = (dx, dy) in pre-scale local
    rect.offsetX(newLocal.x);
    rect.offsetY(newLocal.y);
    rect.x(rect.x() + sx * dx * Math.cos(rad) - sy * dy * Math.sin(rad));
    rect.y(rect.y() + sx * dx * Math.sin(rad) + sy * dy * Math.cos(rad));

    syncAll();
    layer.batchDraw();
  });

  layer.add(originAnchor);

  // ── 位置同步 ────────────────────────────────────────────────────────────
  function getAnchorWorld(lx: number, ly: number) {
    return rect.getAbsoluteTransform().point({
      x: lx * rect.width(),
      y: ly * rect.height(),
    });
  }

  function syncAll() {
    const cx = rect.x(), cy = rect.y();
    const rad = (rect.rotation() * Math.PI) / 180;

    // 更新矩形边框
    const corners = ANCHOR_CFGS.filter(c => c.lx !== 0.5 && c.ly !== 0.5);
    const pts: number[] = [];
    [
      { lx: 0, ly: 0 }, { lx: 1, ly: 0 },
      { lx: 1, ly: 1 }, { lx: 0, ly: 1 },
    ].forEach(({ lx, ly }) => {
      const p = getAnchorWorld(lx, ly);
      pts.push(p.x, p.y);
    });
    border.points(pts);

    // 更新缩放手柄
    ANCHOR_CFGS.forEach(({ name, lx, ly }) => {
      const h = scaleHandles.get(name)!;
      if (h.isDragging()) return;
      const wp = getAnchorWorld(lx, ly);
      h.position(wp);
      // 使手柄跟随矩形旋转（仅用于视觉对齐，实际命中区由 hitFunc 决定）
      h.rotation(rect.rotation());
    });

    // 更新旋转区域
    rotateZones.forEach(({ zone, lx, ly }) => {
      if (zone.isDragging()) return;
      const sp = getAnchorWorld(lx, ly);
      // 外推方向：从旋转中心到缩放手柄
      const dx = sp.x - cx, dy = sp.y - cy;
      const len = Math.sqrt(dx * dx + dy * dy) || 1;
      zone.position({
        x: sp.x + (dx / len) * ROTATE_DIST,
        y: sp.y + (dy / len) * ROTATE_DIST,
      });
    });

    // 更新旋转中心锚点
    if (!originAnchor.isDragging()) {
      originAnchor.position({ x: cx, y: cy });
    }
  }

  rect.on("dragmove", syncAll);
  syncAll();
}
