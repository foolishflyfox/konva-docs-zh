export interface ICustomShape {
  /** 导出当前 shape 的配置数据，可用于序列化或状态恢复。 */
  exportConfigData(): { className: string; data: object };
}
