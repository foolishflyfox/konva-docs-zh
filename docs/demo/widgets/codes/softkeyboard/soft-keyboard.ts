import { DrawArgs, ShapeHelper } from "@docs/utils/shape-helper";
import Konva from "konva";

type KeyInfo = { label: string; x: number; y: number; index: number };

interface KeyboardLayout {
  KEY_W: number;
  KEY_H: number;
  KEY_R: number;
  pad: number;
  bgPts: [number, number][];
}

// ── 基准布局（width = BASE_KB_WIDTH 时的像素值）──
// x0：该行第一个键的左边缘 x 坐标（第一行为 0）
// y ：该行所有键的上边缘 y 坐标（第一行为 0）
const KEY_ROWS = [
  { keys: "QWERTYUIOP".split(""), x0: 0, y: 0 },
  { keys: "ASDFGHJKL".split(""), x0: 20, y: 47 },
  { keys: "ZXCVBNM".split(""), x0: 60, y: 94 },
];
const BASE_KEY_W = 36; // 键宽
const BASE_KEY_H = 36; // 键高
const BASE_KEY_R = 4; // 键圆角半径
const BASE_KEY_STEP = 40; // 相邻键左边缘间距（= KEY_W + 4px 间隙）
const BASE_PAD = 8; // 键盘背景相对按键区域的外边距

// 基准键盘宽度：最宽行（第 0 行，10 键）的右边界加右侧 pad
const BASE_KB_WIDTH =
  KEY_ROWS[0].x0 +
  (KEY_ROWS[0].keys.length - 1) * BASE_KEY_STEP +
  BASE_KEY_W +
  BASE_PAD * 2; // = 412

// 基准键盘高度：最后一行底边界加下侧 pad
const BASE_KB_HEIGHT =
  KEY_ROWS[KEY_ROWS.length - 1].y + BASE_KEY_H + BASE_PAD * 2; // = 146

const ALL_KEY_LABELS = KEY_ROWS.flatMap((r) => r.keys);

/**
 * 继承 Konva.Shape，通过 ShapeHelper 实现多路径绘制与子区域事件。
 * 悬停键背景色动态切换为绿色，逻辑封装在类内部，对外只暴露 keychange 事件（{ key: string }）。
 * shape 的 (x, y) 对应键盘包围盒左上角在父坐标系中的位置。
 */
export class SoftKeyboard extends Konva.Shape {
  private _activeKey: string | null = null;
  private readonly _helper: ShapeHelper;

  constructor({ width = BASE_KB_WIDTH, ...config }: Konva.ShapeConfig = {}) {
    const scale = width / BASE_KB_WIDTH;
    const height = BASE_KB_HEIGHT * scale;
    super({ ...config, width, height });

    this._helper = new ShapeHelper(this, { width, height });
    this._buildLayout(width);

    for (const label of ALL_KEY_LABELS) {
      this.on(`${label}/mouseenter`, () => {
        this._activeKey = label;
        this.fire("keychange", { key: label }, true);
        this.getLayer()?.batchDraw();
      });
      this.on(`${label}/mouseleave`, () => {
        this._activeKey = null;
        this.fire("keychange", { key: "" }, true);
        this.getLayer()?.batchDraw();
      });
    }

    this.on("mouseenter", () => {
      this.getStage()!.container().style.cursor = "pointer";
    });
    this.on("mouseleave", () => {
      this.getStage()!.container().style.cursor = "default";
    });
  }

  /** 等比缩放键盘到新宽度，无需销毁重建。 */
  resize(width: number): void {
    const scale = width / BASE_KB_WIDTH;
    const height = BASE_KB_HEIGHT * scale;
    this.setAttrs({ width, height });
    this._helper.reset(width, height);
    this._buildLayout(width);
    this.getLayer()?.batchDraw();
  }

  // 根据 width 计算全部布局并注册到 helper（constructor 和 resize 共用）
  private _buildLayout(width: number): void {
    const scale = width / BASE_KB_WIDTH;
    const KEY_W = BASE_KEY_W * scale;
    const KEY_H = BASE_KEY_H * scale;
    const KEY_R = BASE_KEY_R * scale;
    const KEY_STEP = BASE_KEY_STEP * scale;
    const pad = BASE_PAD * scale;

    const ROWS = KEY_ROWS.map((row) => ({
      ...row,
      x0: row.x0 * scale,
      y: row.y * scale,
    }));

    const rowBounds = ROWS.map((row) => ({
      left: row.x0 - pad,
      right: row.x0 + (row.keys.length - 1) * KEY_STEP + KEY_W + pad,
      top: row.y - pad,
      bottom: row.y + KEY_H + pad,
    }));

    // 相邻两行之间的 y 切割线：取上行底边与下行顶边的中点，用于背景轮廓在行间的水平过渡
    const yCuts = ROWS.slice(0, -1).map(
      (row, i) => (row.y + KEY_H + ROWS[i + 1].y) / 2,
    );

    // 背景轮廓顶点序列
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

    const keyList: KeyInfo[] = [];
    let idx = 0;
    for (const row of ROWS) {
      for (let i = 0; i < row.keys.length; i++) {
        keyList.push({
          label: row.keys[i],
          x: row.x0 + i * KEY_STEP,
          y: row.y,
          index: idx++,
        });
      }
    }

    this._init(keyList, { KEY_W, KEY_H, KEY_R, pad, bgPts });
  }

  // 所有路径坐标加上 pad，对齐 hitCanvas 局部坐标系（原点在 ROWS 原点左上方 pad 处）
  private _init(keyList: KeyInfo[], layout: KeyboardLayout): void {
    const { KEY_W, KEY_H, KEY_R, pad, bgPts } = layout;
    const n = bgPts.length;

    // 背景绘制 Args
    const bgArgs: DrawArgs = {
      draw: [
        {
          funcName: "moveTo",
          args: [
            (bgPts[n - 1][0] + bgPts[0][0]) / 2 + pad,
            (bgPts[n - 1][1] + bgPts[0][1]) / 2 + pad,
          ],
        },
        ...Array.from({ length: n }, (_, i) => ({
          funcName: "arcTo" as const,
          args: [
            bgPts[i][0] + pad,
            bgPts[i][1] + pad,
            bgPts[(i + 1) % n][0] + pad,
            bgPts[(i + 1) % n][1] + pad,
            6,
          ] as [number, number, number, number, number],
        })),
      ],
      options: { fillStyle: "#ddeeff" },
    };

    // 键绘制 Args
    const keyArgsList: DrawArgs[] = keyList.map((key) => ({
      draw: [
        {
          funcName: "roundRect" as const,
          args: [key.x + pad, key.y + pad, KEY_W, KEY_H, KEY_R] as [
            number,
            number,
            number,
            number,
            number,
          ],
        },
      ],
      options: {
        fillStyle: () =>
          this._activeKey === key.label ? "#4caf50" : "#e8e8e8",
        strokeStyle: "#aaa",
        area: { name: key.label, label: key.label },
      },
    }));

    // 键文本绘制 Args（使用 DrawFn，因 fillText 等方法不在 PathContext 内）
    const labelArgs: DrawArgs = {
      draw: (ctx) => {
        const c = ctx as unknown as CanvasRenderingContext2D;
        c.font = `bold ${KEY_H * 0.39}px sans-serif`;
        c.textAlign = "center";
        c.textBaseline = "middle";
        c.fillStyle = "#444";
        for (const k of keyList) {
          c.fillText(
            k.label,
            k.x + pad + KEY_W / 2,
            k.y + pad + KEY_H / 2 + KEY_H * 0.03,
          );
        }
      },
      options: { hitTarget: false },
    };

    this._helper.drawShape([bgArgs, ...keyArgsList, labelArgs]);
  }
}
