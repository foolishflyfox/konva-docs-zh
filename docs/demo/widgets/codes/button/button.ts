import { DrawArgs, ShapeHelper } from "@docs/utils/shape-helper";
import { ICustomShape } from "@docs/types";
import { RegisterWidget } from "@docs/utils/register-widget";
import Konva from "konva";

type ButtonConfig = Konva.ShapeConfig & {
  label?: string;
  bgColor?: string;
  labelColor?: string;
  borderRadius?: number;
  fontSize?: number;
};

/** 将 hex 颜色按比例加深，factor < 1 时变暗。 */
function darken(hex: string, factor: number): string {
  let h = hex.slice(1);
  if (h.length === 3) {
    h = h
      .split("")
      .map((c) => c + c)
      .join("");
  }
  const n = parseInt(h, 16);
  const r = Math.min(255, Math.round(((n >> 16) & 0xff) * factor));
  const g = Math.min(255, Math.round(((n >> 8) & 0xff) * factor));
  const b = Math.min(255, Math.round((n & 0xff) * factor));
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

const AREA = "button";
const HOVER_FACTOR = 0.85;
const CLICK_FACTOR = 0.7;

@RegisterWidget("fenghuabin/Button")
export class Button extends Konva.Shape implements ICustomShape {
  private _isHover = false;
  private _isPressed = false;
  private _label: string;
  private _bgColor: string;
  private _labelColor: string;
  private _borderRadius: number;
  private _fontSize: number;
  private readonly _helper: ShapeHelper;

  constructor({
    width = 120,
    height = 40,
    label = "按钮",
    bgColor = "#4a90d9",
    labelColor = "#ffffff",
    borderRadius = 6,
    fontSize = 14,
    ...config
  }: ButtonConfig = {}) {
    super({ ...config, width, height });

    this._label = label;
    this._bgColor = bgColor;
    this._labelColor = labelColor;
    this._borderRadius = borderRadius;
    this._fontSize = fontSize;

    this._helper = new ShapeHelper(this, { width, height });
    this._buildShape(width, height);

    this.on(`${AREA}/mouseenter`, () => {
      this._isHover = true;
      this.fire("hoverchange", { hover: true }, true);
      this.getLayer()?.batchDraw();
    });
    this.on(`${AREA}/mouseleave`, () => {
      this._isHover = false;
      if (this._isPressed) {
        this._isPressed = false;
        this.fire("presschange", { pressed: false }, true);
      }
      this.fire("hoverchange", { hover: false }, true);
      this.getLayer()?.batchDraw();
    });
    this.on(`${AREA}/mousedown`, () => {
      this._isPressed = true;
      this.fire("presschange", { pressed: true }, true);
      this.getLayer()?.batchDraw();
    });
    this.on(`${AREA}/click`, () => {
      this.fire("buttonclick", {}, true);
    });

    this.on("mouseup", () => {
      if (this._isPressed) {
        this._isPressed = false;
        this.fire("presschange", { pressed: false }, true);
        this.getLayer()?.batchDraw();
      }
    });

    this.on("mouseenter", () => {
      this.getStage()!.container().style.cursor = "pointer";
    });
    this.on("mouseleave", () => {
      this.getStage()!.container().style.cursor = "default";
    });
  }

  exportConfigData(): {
    className: string;
    data: {
      width: number;
      height: number;
      label: string;
      bgColor: string;
      labelColor: string;
      borderRadius: number;
      fontSize: number;
    };
  } {
    return {
      className: this.getClassName(),
      data: {
        width: this.width(),
        height: this.height(),
        label: this._label,
        bgColor: this._bgColor,
        labelColor: this._labelColor,
        borderRadius: this._borderRadius,
        fontSize: this._fontSize,
      },
    };
  }

  resize(width: number, height: number): void {
    this.setAttrs({ width, height });
    this._helper.reset(width, height);
    this._buildShape(width, height);
    this.getLayer()?.batchDraw();
  }

  setLabel(label: string): void {
    this._label = label;
    this.getLayer()?.batchDraw();
  }

  setFontSize(size: number): void {
    this._fontSize = size;
    this.getLayer()?.batchDraw();
  }

  setBgColor(color: string): void {
    this._bgColor = color;
    this.getLayer()?.batchDraw();
  }

  setLabelColor(color: string): void {
    this._labelColor = color;
    this.getLayer()?.batchDraw();
  }

  private _buildShape(width: number, height: number): void {
    const bgArgs: DrawArgs = {
      draw: [
        {
          funcName: "roundRect" as const,
          args: [0, 0, width, height, this._borderRadius] as [
            number,
            number,
            number,
            number,
            number,
          ],
        },
      ],
      options: {
        fillStyle: () => {
          if (this._isPressed) return darken(this._bgColor, CLICK_FACTOR);
          if (this._isHover) return darken(this._bgColor, HOVER_FACTOR);
          return this._bgColor;
        },
        area: { name: AREA, label: AREA },
      },
    };

    const labelArgs: DrawArgs = {
      draw: (ctx) => {
        const c = ctx as unknown as CanvasRenderingContext2D;
        c.font = `${this._fontSize}px sans-serif`;
        c.textAlign = "center";
        c.textBaseline = "middle";
        c.fillStyle = this._labelColor;
        c.fillText(this._label, width / 2, height / 2);
      },
      options: { hitTarget: false },
    };

    this._helper.drawShape([bgArgs, labelArgs]);
  }
}
