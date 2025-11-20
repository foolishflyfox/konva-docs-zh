# addGetterSetter 源码解析

在看 `Node` 类的时候，发现有很多属性方法都是只定义了类型，而没有实现，也没有声明为 `abstract`，如下所示：

```ts {3-6}
export abstract class Node<Config extends NodeConfig = NodeConfig> {
  ... ...
  filters: GetSet<Filters, this>;
  position: GetSet<Vector2d, this>;
  absolutePosition: GetSet<Vector2d, this>;
  size: GetSet<{ width: number; height: number }, this>;
  .... ...
}
```

这是怎么做到的？
