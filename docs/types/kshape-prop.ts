import Konva from "konva";

/**
 * Shape 节点容器默认的属性
 */
export interface KShapeContainerProp {
  width?: number;
  height?: number;
  bgColor?: string;
}

export interface KShapeProps extends KShapeContainerProp {
  afterMounted?: (stage: Konva.Stage) => void;
}

export interface KShapeBaseProp extends KShapeContainerProp {
  // 填充色
  fill?: string;
  // 线条色
  stroke?: string;
  // 线条宽度
  strokeWidth?: number;
}
