// 保证 import 资源时，TypeScript 不会报错

declare module "*?url" {
  const src: string;
  export default src;
}
