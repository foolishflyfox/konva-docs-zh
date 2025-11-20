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

## GetSet 是什么?

`GetSet` 的定义如下：

```ts
export interface GetSet<Type, This> {
  (): Type;
  (v: Type | null | undefined): This;
}
```

这个范型接口定义了一个 **具有重载功能的通用函数类型**，既可以作为 getter，也可以作为 setter。其有两个范型参数：

- `Type`: 要获取或设置的值类型
- `This`: 设置值时返回的类型（通常是链式调用，返回自身）

作为 getter 时，是无参数的调用，用法为：`const value = obj.getSet()`。

作为 setter 时，时带参调用，用法为 `obj.getSet(newValue)`。

## 如何实现类中属性的 GetSet 声明？

在 Node.ts 中有这么一行：`addGetterSetter(Node, 'absolutePosition')`，该函数就是对 `absolutePosition` 字段的实现。

有代码：`const addGetterSetter = Factory.addGetterSetter`，我们要看一下 `Factory.addGetterSetter` 函数的实现。

## Factory.addGetterSetter 的实现

`Factory.addGetterSetter` 的定义如下：

```ts
// 定义了一个抽象构造函数类型，该类型可以接受任意的参数，返回任意类型的实例
// 主要用于表示 “可被继承的类” 的构造函数类型
type Constructor = abstract new (...args: any) => any;

type EnforceString<T> = T extends string ? T : never;
type Attr<T extends Constructor> = EnforceString<keyof InstanceType<T>>;

export const Factory = {
  addGetterSetter<T extends Constructor, U extends Attr<T>>(
    constructor: T,
    attr: U,
    def?: Value<T, U>,
    validator?: ValidatorFunc<Value<T, U>>,
    after?: AfterFunc<T>
  ): void {
    Factory.addGetter(constructor, attr, def);
    Factory.addSetter(constructor, attr, validator, after);
    Factory.addOverloadedGetterSetter(constructor, attr);
  },
};
```
