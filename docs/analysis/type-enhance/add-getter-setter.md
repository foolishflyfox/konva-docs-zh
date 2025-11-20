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

## 为什么 TypeScript 能够编译通过？

在 Konva 的 tsconfig.json 中，有一行配置 `"strict": true`，表示开启严格模式，此时，如果类中的一个成员只声明，没有初始化，就会报错，例如：

```ts
interface Fruit {
  weight: number;
}

abstract class A {
  apple: Fruit;
}
```

上述代码会报错：`属性“apple”没有初始化表达式，且未在构造函数中明确赋值。`

那为什么 Konva 中就不会报错呢？

这是因为 tsconfig.json 还有另一行配置 `"strictPropertyInitialization": false`。这个配置表示**禁用类属性初始化的严格检查**，即 TypeScript 不会检查类属性是否在声明时或构造函数中被初始化，因此抑制了上述报错。

## GetSet 是什么

既然在 Node 类中
