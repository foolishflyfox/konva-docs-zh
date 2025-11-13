/**
 * Shape 节点容器默认的属性
 */
export interface KShapeContainerProp {
  width?: number;
  height?: number;
  bgColor?: string;
}

export interface KShapeProp extends KShapeContainerProp {
  // 填充色
  fill?: string;
  // 线条色
  stroke?: string;
  // 线条宽度
  strokeWidth?: number;
}
