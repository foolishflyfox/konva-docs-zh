import Konva from "konva";

export interface ShapeHelperConfig {
  width: number;
  height: number;
}

export interface AreaConfig {
  /** 区域标识，fire 事件时作为前缀，如 "startBtn/mouseenter" */
  name: string;
  /** 区域含义，供开发者阅读 */
  label: string;
}

export interface DrawOptions {
  /** 填充色；不指定则不填充。支持传入函数以实现动态颜色，每次渲染时求值 */
  fillStyle?: string | (() => string);
  /** 描边色；不指定则不描边 */
  strokeStyle?: string;
  /**
   * 是否作为 Shape 命中区域的一部分，纳入 hitFunc 的 colorKey 路径。
   * 默认 true。设为 false 后，该路径仅作视觉装饰，不响应鼠标事件。
   */
  hitTarget?: boolean;
  /**
   * 若需要对该路径单独监测鼠标事件，指定此字段。
   * ShapeHelper 会在内部 hitCanvas 上用唯一颜色标记该区域，
   * 鼠标进入/离开/点击时 fire 形如 "areaName/eventType" 的事件。
   */
  area?: AreaConfig;
  /**
   * 仅当 draw 第一个参数为 DrawAction[] 时有效：
   * 是否在所有指令执行完毕后自动调用 closePath()，默认 true。
   */
  closePath?: boolean;
}

/**
 * 路径绘制回调仅需要这些基础 Canvas 路径方法。
 * Konva.Context 与原生 CanvasRenderingContext2D 均满足此接口。
 */
export interface PathContext {
  beginPath(): void;
  closePath(): void;
  moveTo(x: number, y: number): void;
  lineTo(x: number, y: number): void;
  arc(x: number, y: number, radius: number, startAngle: number, endAngle: number, counterclockwise?: boolean): void;
  arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): void;
  quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): void;
  bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): void;
  rect(x: number, y: number, w: number, h: number): void;
  roundRect(x: number, y: number, w: number, h: number, radii?: number | DOMPointInit | (number | DOMPointInit)[]): void;
  ellipse(x: number, y: number, rx: number, ry: number, rotation: number, startAngle: number, endAngle: number, ccw?: boolean): void;
}

export type DrawFn = (ctx: PathContext) => void;

/** PathContext 中可出现在 DrawAction 里的方法名（不含 beginPath / closePath，由 ShapeHelper 自动处理） */
type PathCommandName = keyof Omit<PathContext, "beginPath" | "closePath">;

/**
 * 单条路径指令，对应 PathContext 中一个方法调用。
 * 使用映射类型确保 funcName 与 args 类型严格匹配。
 */
export type DrawAction = {
  [K in PathCommandName]: { funcName: K; args: Parameters<PathContext[K]> };
}[PathCommandName];

export interface DrawArgs {
  draw: DrawFn | DrawAction[];
  options?: DrawOptions;
}

interface DrawCall {
  fn: DrawFn;
  hitTarget: boolean;
  fillStyle?: string | (() => string);
  strokeStyle?: string;
  areaIndex?: number;
}

interface AreaEntry {
  name: string;
  label: string;
}

/**
 * ShapeHelper：为 Konva.Shape 子类提供结构化的多路径绘制与子区域事件监测。
 *
 * 用法：
 * 1. 在构造函数中实例化：`this._helper = new ShapeHelper(this, { width, height })`
 * 2. 调用 `draw()` 声明各路径；ShapeHelper 自动接管 sceneFunc / hitFunc。
 * 3. 对带 `area` 的路径，通过 `shape.on("areaName/mouseenter", ...)` 监听区域事件。
 */
export class ShapeHelper {
  private readonly _shape: Konva.Shape;
  /** 子区域命中检测画布（尺寸 = config.width × config.height，坐标系与 shape 局部坐标系一致） */
  readonly hitCanvas: HTMLCanvasElement;
  private readonly _hitCtx: CanvasRenderingContext2D;
  private readonly _drawCalls: DrawCall[] = [];
  private readonly _areas = new Map<number, AreaEntry>();
  private _areaCounter = 0;
  private _currentAreaIndex = -1;

  constructor(shape: Konva.Shape, config: ShapeHelperConfig) {
    this._shape = shape;

    this.hitCanvas = document.createElement("canvas");
    this.hitCanvas.width = config.width;
    this.hitCanvas.height = config.height;
    this._hitCtx = this.hitCanvas.getContext("2d")!;

    // 接管 shape 的 sceneFunc 和 hitFunc
    shape.setAttr("sceneFunc", (ctx: Konva.Context) => this._renderScene(ctx));
    shape.setAttr("hitFunc", (ctx: Konva.Context) => this._renderHit(ctx));

    // 子区域事件监测：用命名空间避免与外部监听器冲突
    shape.on("mousemove.shapeHelper", () => this._onMouseMove());
    shape.on("mouseleave.shapeHelper", () => this._onMouseLeave());
    shape.on("click.shapeHelper", () => this._onMouseClick());
  }

  /**
   * 声明一段路径及其绘制选项。可多次调用，每次调用对应 sceneFunc/hitFunc 中的一段独立路径。
   *
   * 第一个参数支持两种形式：
   * - `DrawFn`：手动调用 ctx 方法，完全自主控制路径（需自行调用 beginPath / closePath）。
   * - `DrawAction[]`：路径指令数组，ShapeHelper 自动调用 beginPath，并根据 `closePath` 选项决定是否调用 closePath（默认 true）。
   */
  draw(input: DrawFn | DrawAction[], options: DrawOptions = {}): void {
    const { fillStyle, strokeStyle, hitTarget = true, area, closePath = true } = options;

    const fn: DrawFn = Array.isArray(input)
      ? (ctx) => {
          ctx.beginPath();
          for (const action of input) {
            (ctx as any)[action.funcName](...action.args);
          }
          if (closePath) ctx.closePath();
        }
      : input;
    let areaIndex: number | undefined;

    if (area) {
      this._areaCounter++;
      areaIndex = this._areaCounter;
      this._areas.set(areaIndex, { name: area.name, label: area.label });

      // 将该路径以唯一颜色绘制到子区域 hitCanvas（红色通道 = colorIndex）
      this._hitCtx.save();
      this._hitCtx.fillStyle = `rgb(${areaIndex}, 0, 0)`;
      fn(this._hitCtx);
      this._hitCtx.fill();
      this._hitCtx.restore();
    }

    this._drawCalls.push({ fn, hitTarget, fillStyle, strokeStyle, areaIndex });
  }

  /** 批量声明路径，等价于依次调用 draw()。 */
  drawShape(drawArgsList: DrawArgs[]): void {
    for (const { draw, options } of drawArgsList) {
      this.draw(draw, options);
    }
  }

  private _renderScene(ctx: Konva.Context): void {
    // 通过 _context 访问底层原生 CanvasRenderingContext2D，
    // 此时 Konva 已将 shape 变换矩阵写入原生 context，坐标系正确
    const nativeCtx = (ctx as any)._context as CanvasRenderingContext2D;
    for (const call of this._drawCalls) {
      nativeCtx.save();
      call.fn(nativeCtx);
      if (call.fillStyle !== undefined) {
        nativeCtx.fillStyle = typeof call.fillStyle === "function" ? call.fillStyle() : call.fillStyle;
        nativeCtx.fill();
      }
      if (call.strokeStyle !== undefined) {
        nativeCtx.strokeStyle = call.strokeStyle;
        nativeCtx.stroke();
      }
      nativeCtx.restore();
    }
  }

  private _renderHit(ctx: Konva.Context): void {
    for (const call of this._drawCalls) {
      if (!call.hitTarget) continue;
      // Konva.Context 代理了所有原生路径方法，运行时兼容 PathContext
      call.fn(ctx as unknown as PathContext);
      ctx.fillStrokeShape(this._shape);
    }
  }

  private _getAreaAtPointer(): (AreaEntry & { colorIndex: number }) | null {
    const pos = this._shape.getRelativePointerPosition();
    if (!pos) return null;
    const x = Math.round(pos.x);
    const y = Math.round(pos.y);
    if (x < 0 || y < 0 || x >= this.hitCanvas.width || y >= this.hitCanvas.height) {
      return null;
    }
    const d = this._hitCtx.getImageData(x, y, 1, 1).data;
    // alpha=255 且红色通道非零时为有效区域
    if (d[3] !== 255 || d[0] === 0) return null;
    const entry = this._areas.get(d[0]);
    return entry ? { ...entry, colorIndex: d[0] } : null;
  }

  private _onMouseMove(): void {
    const area = this._getAreaAtPointer();
    const newIndex = area?.colorIndex ?? -1;

    if (newIndex !== this._currentAreaIndex) {
      // 离开上一个区域
      if (this._currentAreaIndex !== -1) {
        const prev = this._areas.get(this._currentAreaIndex)!;
        this._shape.fire(`${prev.name}/mouseleave`, {}, true);
      }
      this._currentAreaIndex = newIndex;
      // 进入新区域
      if (newIndex !== -1) {
        this._shape.fire(`${area!.name}/mouseenter`, {}, true);
      }
    }

    if (newIndex !== -1) {
      this._shape.fire(`${area!.name}/mousemove`, {}, true);
    }
  }

  private _onMouseLeave(): void {
    if (this._currentAreaIndex !== -1) {
      const prev = this._areas.get(this._currentAreaIndex)!;
      this._shape.fire(`${prev.name}/mouseleave`, {}, true);
      this._currentAreaIndex = -1;
    }
  }

  private _onMouseClick(): void {
    const area = this._getAreaAtPointer();
    if (area) this._shape.fire(`${area.name}/click`, {}, true);
  }
}
