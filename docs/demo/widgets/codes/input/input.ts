import { DrawArgs, ShapeHelper } from "@docs/utils/shape-helper";
import { ICustomShape } from "@docs/types";
import { RegisterWidget } from "@docs/utils/register-widget";
import Konva from "konva";

type InputConfig = Konva.ShapeConfig & {
  value?: string;
  placeholder?: string;
  bgColor?: string;
  borderColor?: string;
  focusBorderColor?: string;
  textColor?: string;
  placeholderColor?: string;
  fontSize?: number;
  borderRadius?: number;
  padding?: number;
};

const AREA = "input";

@RegisterWidget("fenghuabin/Input")
export class Input extends Konva.Shape implements ICustomShape {
  private _value: string;
  private _placeholder: string;
  private _bgColor: string;
  private _borderColor: string;
  private _focusBorderColor: string;
  private _textColor: string;
  private _placeholderColor: string;
  private _fontSize: number;
  private _borderRadius: number;
  private _padding: number;

  private _isFocused = false;
  private _cursorVisible = false;
  private _cursorTimer: ReturnType<typeof setInterval> | null = null;
  private readonly _blurNs: string;
  private readonly _helper: ShapeHelper;

  constructor({
    width = 200,
    height = 36,
    value = "",
    placeholder = "请输入...",
    bgColor = "#ffffff",
    borderColor = "#cccccc",
    focusBorderColor = "#4a90d9",
    textColor = "#333333",
    placeholderColor = "#aaaaaa",
    fontSize = 14,
    borderRadius = 4,
    padding = 8,
    ...config
  }: InputConfig = {}) {
    super({ ...config, width, height });

    this._value = value;
    this._placeholder = placeholder;
    this._bgColor = bgColor;
    this._borderColor = borderColor;
    this._focusBorderColor = focusBorderColor;
    this._textColor = textColor;
    this._placeholderColor = placeholderColor;
    this._fontSize = fontSize;
    this._borderRadius = borderRadius;
    this._padding = padding;
    this._blurNs = `inputBlur_${Math.random().toString(36).slice(2)}`;

    this._helper = new ShapeHelper(this, { width, height });
    this._buildShape(width, height);

    this.on(`${AREA}/click`, () => this._focus());

    this.on("mouseenter", () => {
      this.getStage()!.container().style.cursor = "text";
    });
    this.on("mouseleave", () => {
      this.getStage()!.container().style.cursor = "default";
    });
  }

  // ── 公开 API ────────────────────────────────────────

  getValue(): string { return this._value; }

  setValue(value: string): void {
    this._value = value;
    this.fire("valuechange", { value }, true);
    this.getLayer()?.batchDraw();
  }

  focus(): void { this._focus(); }
  blur(): void { this._blur(); }

  setFontSize(size: number): void { this._fontSize = size; this.getLayer()?.batchDraw(); }
  setBgColor(color: string): void { this._bgColor = color; this.getLayer()?.batchDraw(); }
  setBorderColor(color: string): void { this._borderColor = color; this.getLayer()?.batchDraw(); }
  setFocusBorderColor(color: string): void { this._focusBorderColor = color; this.getLayer()?.batchDraw(); }
  setTextColor(color: string): void { this._textColor = color; this.getLayer()?.batchDraw(); }

  resize(width: number, height: number): void {
    this.setAttrs({ width, height });
    this._helper.reset(width, height);
    this._buildShape(width, height);
    this.getLayer()?.batchDraw();
  }

  exportConfigData(): {
    className: string;
    data: {
      width: number; height: number; value: string; placeholder: string;
      bgColor: string; borderColor: string; focusBorderColor: string;
      textColor: string; placeholderColor: string; fontSize: number;
      borderRadius: number; padding: number;
    };
  } {
    return {
      className: this.getClassName(),
      data: {
        width: this.width(), height: this.height(),
        value: this._value, placeholder: this._placeholder,
        bgColor: this._bgColor, borderColor: this._borderColor,
        focusBorderColor: this._focusBorderColor,
        textColor: this._textColor, placeholderColor: this._placeholderColor,
        fontSize: this._fontSize, borderRadius: this._borderRadius,
        padding: this._padding,
      },
    };
  }

  destroy(): this {
    this._blur();
    return super.destroy();
  }

  // ── 内部实现 ────────────────────────────────────────

  private readonly _onKeyDown = (e: KeyboardEvent): void => {
    if (!this._isFocused) return;
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.key === "Escape") { this._blur(); return; }
    if (e.key === "Enter") { this.fire("submit", { value: this._value }, true); return; }
    if (e.key === "Backspace") {
      this._value = this._value.slice(0, -1);
    } else if (e.key.length === 1) {
      this._value += e.key;
    } else {
      return;
    }
    e.preventDefault();
    this.fire("valuechange", { value: this._value }, true);
    this._cursorVisible = true;
    this.getLayer()?.batchDraw();
  };

  private _focus(): void {
    if (this._isFocused) return;
    this._isFocused = true;
    document.addEventListener("keydown", this._onKeyDown);
    this._startCursorBlink();

    const stage = this.getStage();
    if (stage) {
      stage.on(`mousedown.${this._blurNs}`, (e: Konva.KonvaEventObject<MouseEvent>) => {
        if (e.target !== this) this._blur();
      });
    }

    this.fire("inputfocus", {}, true);
    this.getLayer()?.batchDraw();
  }

  private _blur(): void {
    if (!this._isFocused) return;
    this._isFocused = false;
    document.removeEventListener("keydown", this._onKeyDown);
    this._stopCursorBlink();
    this.getStage()?.off(`mousedown.${this._blurNs}`);
    this.fire("inputblur", {}, true);
    this.getLayer()?.batchDraw();
  }

  private _startCursorBlink(): void {
    this._cursorVisible = true;
    this._cursorTimer = setInterval(() => {
      this._cursorVisible = !this._cursorVisible;
      this.getLayer()?.batchDraw();
    }, 530);
  }

  private _stopCursorBlink(): void {
    if (this._cursorTimer !== null) {
      clearInterval(this._cursorTimer);
      this._cursorTimer = null;
    }
    this._cursorVisible = false;
  }

  private _buildShape(width: number, height: number): void {
    const r = this._borderRadius;
    const pad = this._padding;

    // 背景 + 命中区域
    const bgArgs: DrawArgs = {
      draw: [
        {
          funcName: "roundRect" as const,
          args: [0, 0, width, height, r] as [number, number, number, number, number],
        },
      ],
      options: {
        fillStyle: () => this._bgColor,
        area: { name: AREA, label: AREA },
      },
    };

    // 边框 + 文字 + 光标（统一在一个 DrawFn 中，需要 measureText 等原生 API）
    const overlayArgs: DrawArgs = {
      draw: (ctx) => {
        const c = ctx as unknown as CanvasRenderingContext2D;

        // 边框
        c.save();
        c.beginPath();
        (c as any).roundRect(0, 0, width, height, r);
        c.strokeStyle = this._isFocused ? this._focusBorderColor : this._borderColor;
        c.lineWidth = this._isFocused ? 2 : 1;
        c.stroke();
        c.restore();

        // 裁剪文字区域
        c.save();
        c.beginPath();
        c.rect(pad, 1, width - 2 * pad, height - 2);
        c.clip();

        c.font = `${this._fontSize}px sans-serif`;
        c.textBaseline = "middle";
        const textY = height / 2;

        if (this._value.length > 0) {
          const textWidth = c.measureText(this._value).width;
          // 溢出时右对齐，始终显示末尾内容
          const textX = textWidth > width - 2 * pad
            ? width - pad - textWidth
            : pad;

          c.fillStyle = this._textColor;
          c.fillText(this._value, textX, textY);

          if (this._isFocused && this._cursorVisible) {
            const cx = textX + textWidth + 1;
            c.strokeStyle = this._textColor;
            c.lineWidth = 1.5;
            c.beginPath();
            c.moveTo(cx, height * 0.18);
            c.lineTo(cx, height * 0.82);
            c.stroke();
          }
        } else {
          c.fillStyle = this._placeholderColor;
          c.fillText(this._placeholder, pad, textY);

          if (this._isFocused && this._cursorVisible) {
            c.strokeStyle = this._textColor;
            c.lineWidth = 1.5;
            c.beginPath();
            c.moveTo(pad, height * 0.18);
            c.lineTo(pad, height * 0.82);
            c.stroke();
          }
        }

        c.restore();
      },
      options: { hitTarget: false },
    };

    this._helper.drawShape([bgArgs, overlayArgs]);
  }
}
