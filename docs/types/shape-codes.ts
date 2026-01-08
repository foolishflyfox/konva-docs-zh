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
  hideReact?: boolean;
  hideVue?: boolean;
}

export function createShapeCodesData(): ShapeCodesData {
  return {
    vanilla: {},
    react: "",
    vue: {},
  };
}
