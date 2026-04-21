import { createLayer, addRanges } from "@docs/utils";
import Konva from "konva";

// Demo 1: offset 对旋转锚点的影响（动画演示）
export function rotationOriginDemo(stage: Konva.Stage) {
  const layer = createLayer(stage);
  const w = stage.width();
  const h = stage.height();

  const x1 = Math.round(w * 0.27);
  const x2 = Math.round(w * 0.73);
  const y0 = Math.round(h * 0.62);

  // 左侧：无 offset，旋转中心为 (x, y) — 矩形左上角
  const rect1 = new Konva.Rect({
    x: x1, y: y0,
    width: 90, height: 56,
    fill: '#4ECDC4', stroke: '#2C3E50', strokeWidth: 2,
  });
  const dot1 = new Konva.Circle({ x: x1, y: y0, radius: 5, fill: '#E74C3C', listening: false });
  const lbl1 = new Konva.Text({
    x: x1 - 65, y: 14,
    width: 130, align: 'center',
    text: 'offsetX=0, offsetY=0\n旋转中心 = 左上角 (x,y)',
    fontSize: 11, fill: '#444',
  });

  // 右侧：offsetX=45, offsetY=28，旋转中心为矩形几何中心
  const rect2 = new Konva.Rect({
    x: x2, y: y0,
    width: 90, height: 56,
    offsetX: 45, offsetY: 28,
    fill: '#FF6B6B', stroke: '#2C3E50', strokeWidth: 2,
  });
  const dot2 = new Konva.Circle({ x: x2, y: y0, radius: 5, fill: '#E74C3C', listening: false });
  const lbl2 = new Konva.Text({
    x: x2 - 65, y: 14,
    width: 130, align: 'center',
    text: 'offsetX=45, offsetY=28\n旋转中心 = 矩形中心',
    fontSize: 11, fill: '#444',
  });

  const anim = new Konva.Animation((frame) => {
    const angle = ((frame?.time ?? 0) / 20) % 360;
    rect1.rotation(angle);
    rect2.rotation(angle);
    // 保持圆点始终在最顶层
    dot1.moveToTop();
    dot2.moveToTop();
  }, layer);
  anim.start();

  layer.add(lbl1, lbl2, rect1, dot1, rect2, dot2);
}

// Demo 2: 交互式变换属性与矩阵实时展示
export function matrixDisplayDemo(stage: Konva.Stage) {
  const layer = createLayer(stage);
  const cx = stage.width() / 2;

  const [rotRef, scaleXRef, skewXRef] = addRanges(stage, [
    { label: ' rotation（旋转度数）', min: -180, max: 180, defaultValue: 0, step: 1 },
    { label: ' scaleX（水平缩放）', min: 0.2, max: 3, defaultValue: 1, step: 0.1 },
    { label: ' skewX（水平斜切）', min: -1.5, max: 1.5, defaultValue: 0, step: 0.05 },
  ]);

  // 留出顶部滑块区域
  const cy = stage.height() - 95;

  const rect = new Konva.Rect({
    x: cx, y: cy,
    width: 120, height: 80,
    offsetX: 60, offsetY: 40,
    fill: '#4ECDC4', stroke: '#2C3E50', strokeWidth: 2,
  });

  // 参考十字线
  const hLine = new Konva.Line({
    points: [cx - 90, cy, cx + 90, cy],
    stroke: '#bbb', strokeWidth: 1, dash: [4, 4], listening: false,
  });
  const vLine = new Konva.Line({
    points: [cx, cy - 65, cx, cy + 65],
    stroke: '#bbb', strokeWidth: 1, dash: [4, 4], listening: false,
  });
  const anchorDot = new Konva.Circle({
    x: cx, y: cy, radius: 4, fill: '#E74C3C', listening: false,
  });

  const matrixText = new Konva.Text({
    x: 10, y: stage.height() - 50,
    fontSize: 11, fill: '#333',
    fontFamily: 'monospace',
    text: '',
  });
  const formulaText = new Konva.Text({
    x: 10, y: stage.height() - 32,
    fontSize: 11, fill: '#888',
    fontFamily: 'monospace',
    text: "x' = a·x + c·y + e,   y' = b·x + d·y + f",
  });

  const anim = new Konva.Animation(() => {
    rect.rotation(rotRef.value);
    rect.scaleX(scaleXRef.value);
    rect.skewX(skewXRef.value);
    const m = rect.getTransform().getMatrix();
    matrixText.text(
      `矩阵 [a=${m[0].toFixed(3)}, b=${m[1].toFixed(3)}, c=${m[2].toFixed(3)}, d=${m[3].toFixed(3)}, e=${m[4].toFixed(1)}, f=${m[5].toFixed(1)}]`
    );
    anchorDot.moveToTop();
  }, layer);
  anim.start();

  layer.add(hLine, vLine, rect, anchorDot, matrixText, formulaText);
}

// Demo 3: 父子节点的绝对变换级联
export function absoluteTransformDemo(stage: Konva.Stage) {
  const layer = createLayer(stage);
  const cx = stage.width() / 2;
  const cy = stage.height() / 2;

  // 父 Group，位于 stage 中心
  const group = new Konva.Group({ x: cx, y: cy });

  // 父组的虚线参考圆
  const groupCircle = new Konva.Circle({
    radius: 88,
    stroke: '#3498DB', strokeWidth: 1.5, dash: [5, 4],
    fill: 'rgba(52,152,219,0.06)', listening: false,
  });

  // 子矩形：局部坐标 (75, 0)，offset 在中心
  const child = new Konva.Rect({
    x: 75, y: 0,
    width: 64, height: 44,
    offsetX: 32, offsetY: 22,
    fill: '#FF6B6B', stroke: '#2C3E50', strokeWidth: 2,
  });

  group.add(groupCircle, child);
  layer.add(group);

  // 跟踪子矩形绝对位置的红点（在 layer 层，不在 group 内）
  const absDot = new Konva.Circle({ radius: 5, fill: '#E74C3C', listening: false });
  // 组原点蓝点
  const groupDot = new Konva.Circle({ x: cx, y: cy, radius: 5, fill: '#3498DB', listening: false });
  // 组原点到子矩形绝对位置的连线
  const connLine = new Konva.Line({
    points: [cx, cy, cx, cy],
    stroke: '#3498DB', strokeWidth: 1, dash: [4, 4], listening: false,
  });

  const infoText = new Konva.Text({
    x: 8, y: 8,
    fontSize: 10.5, fill: '#333', fontFamily: 'monospace',
    text: '', lineHeight: 1.6,
  });

  layer.add(connLine, absDot, groupDot, infoText);

  const anim = new Konva.Animation((frame) => {
    const t = frame?.time ?? 0;
    const groupAngle = (t / 30) % 360;
    const childAngle = (t / 15) % 360;

    group.rotation(groupAngle);
    child.rotation(childAngle);

    const absPos = child.getAbsolutePosition();
    absDot.position(absPos);
    connLine.points([cx, cy, absPos.x, absPos.y]);

    const lm = child.getTransform().getMatrix();
    const am = child.getAbsoluteTransform().getMatrix();

    infoText.text(
      `group.rotation = ${groupAngle.toFixed(1)}°   child.rotation = ${childAngle.toFixed(1)}°\n` +
      `child 局部矩阵:  [a=${lm[0].toFixed(2)}, b=${lm[1].toFixed(2)}, e=${lm[4].toFixed(0)}, f=${lm[5].toFixed(0)}]\n` +
      `child 绝对矩阵:  [a=${am[0].toFixed(2)}, b=${am[1].toFixed(2)}, e=${am[4].toFixed(0)}, f=${am[5].toFixed(0)}]`
    );

    infoText.moveToTop();
    absDot.moveToTop();
    groupDot.moveToTop();
  }, layer);
  anim.start();
}
