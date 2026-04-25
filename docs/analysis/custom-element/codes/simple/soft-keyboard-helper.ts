import { DrawAction, DrawArgs, ShapeHelper } from "@docs/utils/shape-helper";
import Konva from "konva";

type KeyInfo = { label: string; x: number; y: number; index: number };

// x0：该行第一个键的左边缘 x 坐标（第一行为 0，绘制时加上 pad 对齐 hitCanvas）
// y ：该行所有键的上边缘 y 坐标（第一行为 0，同上）
const ROWS = [
  { keys: "QWERTYUIOP".split(""), x0: 0, y: 0 },
  { keys: "ASDFGHJKL".split(""), x0: 20, y: 47 },
  { keys: "ZXCVBNM".split(""), x0: 60, y: 94 },
];

const KEY_W = 36;    // 键宽
const KEY_H = 36;    // 键高
const KEY_R = 4;     // 键圆角半径
const KEY_STEP = 40; // 相邻键左边缘间距（= KEY_W + 4px 间隙）
const pad = 8;       // 键盘背景相对按键区域的外边距

const rowBounds = ROWS.map((row) => ({
  left: row.x0 - pad,
  right: row.x0 + (row.keys.length - 1) * KEY_STEP + KEY_W + pad,
  top: row.y - pad,
  bottom: row.y + KEY_H + pad,
}));

const width = Math.max(...rowBounds.map((b) => b.right)) + pad;
const height = Math.max(...rowBounds.map((b) => b.bottom)) + pad;

// 相邻两行之间的 y 切割线：取上行底边与下行顶边的中点，用于背景轮廓在行间的水平过渡
const yCuts = ROWS.slice(0, -1).map(
  (row, i) => (row.y + KEY_H + ROWS[i + 1].y) / 2,
);
// 背景色的轮廓
const bgPts: [number, number][] = [
  [rowBounds[0].left, rowBounds[0].top],
  [rowBounds[0].right, rowBounds[0].top],
];
for (let i = 0; i < ROWS.length - 1; i++) {
  bgPts.push([rowBounds[i].right, yCuts[i]]);
  bgPts.push([rowBounds[i + 1].right, yCuts[i]]);
}
bgPts.push([
  rowBounds[ROWS.length - 1].right,
  rowBounds[ROWS.length - 1].bottom,
]);
bgPts.push([
  rowBounds[ROWS.length - 1].left,
  rowBounds[ROWS.length - 1].bottom,
]);
for (let i = ROWS.length - 2; i >= 0; i--) {
  bgPts.push([rowBounds[i + 1].left, yCuts[i]]);
  bgPts.push([rowBounds[i].left, yCuts[i]]);
}

/**
 * 继承 Konva.Shape，通过 ShapeHelper 实现多路径绘制与子区域事件。
 * 悬停键背景色动态切换为绿色，逻辑封装在类内部，对外只暴露 keychange 事件（{ key: string }）。
 * shape 的 (x, y) 对应键盘包围盒左上角在父坐标系中的位置。
 */
export class SoftKeyboardHelper extends Konva.Shape {
  private _activeKey: string | null = null;

  constructor(config: Konva.ShapeConfig = {}) {
    super(config);

    const keyList: KeyInfo[] = [];
    let idx = 0;
    for (const row of ROWS) {
      for (let i = 0; i < row.keys.length; i++) {
        keyList.push({ label: row.keys[i], x: row.x0 + i * KEY_STEP, y: row.y, index: idx++ });
      }
    }

    const helper = new ShapeHelper(this, { width, height });
    this._init(helper, keyList);

    for (const key of keyList) {
      this.on(`${key.label}/mouseenter`, () => {
        this._activeKey = key.label;
        this.fire("keychange", { key: key.label }, true);
        this.getLayer()?.batchDraw();
      });
      this.on(`${key.label}/mouseleave`, () => {
        this._activeKey = null;
        this.fire("keychange", { key: "" }, true);
        this.getLayer()?.batchDraw();
      });
    }

    this.on("mouseenter", () => { this.getStage()!.container().style.cursor = "pointer"; });
    this.on("mouseleave", () => { this.getStage()!.container().style.cursor = "default"; });
  }

  // 所有路径坐标加上 pad，对齐 hitCanvas 局部坐标系（原点在 ROWS 原点左上方 pad 处）
  private _init(helper: ShapeHelper, keyList: KeyInfo[]): void {
    const n = bgPts.length;

    // 背景绘制 Args
    const bgArgs: DrawArgs = {
      draw: [
        { funcName: "moveTo", args: [(bgPts[n - 1][0] + bgPts[0][0]) / 2 + pad, (bgPts[n - 1][1] + bgPts[0][1]) / 2 + pad] },
        ...Array.from({ length: n }, (_, i) => ({
          funcName: "arcTo" as const,
          args: [bgPts[i][0] + pad, bgPts[i][1] + pad, bgPts[(i + 1) % n][0] + pad, bgPts[(i + 1) % n][1] + pad, 6] as [number, number, number, number, number],
        })),
      ],
      options: { fillStyle: "#ddeeff" },
    };

    // 键绘制 Args
    const keyArgsList: DrawArgs[] = keyList.map((key) => ({
      draw: [{ funcName: "roundRect" as const, args: [key.x + pad, key.y + pad, KEY_W, KEY_H, KEY_R] as [number, number, number, number, number] }],
      options: {
        fillStyle: () => (this._activeKey === key.label ? "#4caf50" : "#e8e8e8"),
        strokeStyle: "#aaa",
        area: { name: key.label, label: key.label },
      },
    }));

    // 键文本绘制 Args（使用 DrawFn，因 fillText 等方法不在 PathContext 内）
    const labelArgs: DrawArgs = {
      draw: (ctx) => {
        const c = ctx as unknown as CanvasRenderingContext2D;
        c.font = "bold 14px sans-serif";
        c.textAlign = "center";
        c.textBaseline = "middle";
        c.fillStyle = "#444";
        for (const k of keyList) {
          c.fillText(k.label, k.x + pad + KEY_W / 2, k.y + pad + KEY_H / 2 + 1);
        }
      },
      options: { hitTarget: false },
    };

    helper.drawShape([bgArgs, ...keyArgsList, labelArgs]);
  }
}
