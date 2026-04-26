import { DrawArgs, ShapeHelper } from "@docs/utils/shape-helper";
import { ICustomShape } from "@docs/types";
import { RegisterWidget } from "@docs/utils/register-widget";
import Konva from "konva";

type ButtonConfig = Konva.ShapeConfig & {
  label?: string;
  bgColor?: string;
  hoverColor?: string;
  clickColor?: string;
  labelColor?: string;
  labelHoverColor?: string;
  labelClickColor?: string;
  borderRadius?: number;
  fontSize?: number;
};

const AREA = "button";

@RegisterWidget("fenghuabin/Button")
export class Button extends Konva.Shape implements ICustomShape {
  private _isHover = false;
  private _isPressed = false;
  private _label: string;
  private _bgColor: string;
  private _hoverColor: string;
  private _clickColor: string;
  private _labelColor: string;
  private _labelHoverColor: string;
  private _labelClickColor: string;
  private _borderRadius: number;
  private _fontSize: number;
  private readonly _helper: ShapeHelper;

  constructor({
    width = 120,
    height = 40,
    label = "按钮",
    bgColor = "#4a90d9",
    hoverColor = "#357abd",
    clickColor = "#2868a7",
    labelColor = "#ffffff",
    labelHoverColor = "#ffffff",
    labelClickColor = "#c8dcf8",
    borderRadius = 6,
    fontSize = 14,
    ...config
  }: ButtonConfig = {}) {
    super({ ...config, width, height });

    this._label = label;
    this._bgColor = bgColor;
    this._hoverColor = hoverColor;
    this._clickColor = clickColor;
    this._labelColor = labelColor;
    this._labelHoverColor = labelHoverColor;
    this._labelClickColor = labelClickColor;
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
      hoverColor: string;
      clickColor: string;
      labelColor: string;
      labelHoverColor: string;
      labelClickColor: string;
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
        hoverColor: this._hoverColor,
        clickColor: this._clickColor,
        labelColor: this._labelColor,
        labelHoverColor: this._labelHoverColor,
        labelClickColor: this._labelClickColor,
        borderRadius: this._borderRadius,
        fontSize: this._fontSize,
      },
    };
  }

  /** 修改按钮尺寸，重建绘制路径。 */
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

  setHoverColor(color: string): void {
    this._hoverColor = color;
    this.getLayer()?.batchDraw();
  }

  setClickColor(color: string): void {
    this._clickColor = color;
    this.getLayer()?.batchDraw();
  }

  setLabelColor(color: string): void {
    this._labelColor = color;
    this.getLayer()?.batchDraw();
  }

  setLabelHoverColor(color: string): void {
    this._labelHoverColor = color;
    this.getLayer()?.batchDraw();
  }

  setLabelClickColor(color: string): void {
    this._labelClickColor = color;
    this.getLayer()?.batchDraw();
  }

  private _buildShape(width: number, height: number): void {
    const r = this._borderRadius;

    const bgArgs: DrawArgs = {
      draw: [
        {
          funcName: "roundRect" as const,
          args: [0, 0, width, height, r] as [
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
          if (this._isPressed) return this._clickColor;
          if (this._isHover) return this._hoverColor;
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
        if (this._isPressed) c.fillStyle = this._labelClickColor;
        else if (this._isHover) c.fillStyle = this._labelHoverColor;
        else c.fillStyle = this._labelColor;
        c.fillText(this._label, width / 2, height / 2);
      },
      options: { hitTarget: false },
    };

    this._helper.drawShape([bgArgs, labelArgs]);
  }
}
