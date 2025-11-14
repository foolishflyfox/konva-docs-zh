export interface ShapeCodesData {
  vanilla: {
    html?: string;
    js?: string;
  };
  react: string;
  vue: {
    app?: string;
    main?: string;
  };
}

export function createShapeCodesData(): ShapeCodesData {
  return {
    vanilla: {},
    react: "",
    vue: {},
  };
}
