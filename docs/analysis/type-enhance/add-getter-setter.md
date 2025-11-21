# addGetterSetter 源码解析

## 内容总结

- 构造函数定义: `type Constructor = abstract new (...args: any) => any;`
- 类含义：
  - 在 **运行上下文** 中表示类的构造函数；
  - 在 **类型注解上下文** 中表示类型；
  - `typeof 类名` 表示的是类的构造函数的类型；
  - `InstanceType<typeof 类名>` 表示的是类的类型；
  - `Attr<类名>` 表示指定类的属性名组成的字符串组合类型；

## 引言

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

下面逐条解释上述代码含义。

### 类型定义：构造器

```ts
type Constructor = abstract new (...args: any) => any;
```

上述代码定义了一个抽象构造函数类型，该类型可以接受任意的参数，返回任意类型的实例，主要用于表示 “可被继承的类” 的构造函数类型，作为类型时表示一个类。

### 类型定义：获取字符串类型

```ts
type EnforceString<T> = T extends string ? T : never;
```

上述代码定义了一个类型约束工具类型，用于强制类型参数 T 必须是 string 类型（提取 T 中 string 相关的部分），例如

```ts
type A = EnforceString<"a" | "b">; // 结果 A = "a" | "b"
type B = EnforceString<"a" | 2>; // 结果 B = "a"
type C = EnforceString<`age-${number}`>; // 结果 C = `age-${number}`
const c1: C = "xxx"; // ❌ 类型报错: 不能将类型“"xxx"”分配给类型“`age-${number}`”
const c2: C = "age-a"; // ❌ 类型报错: 不能将类型“"age-a"”分配给类型“`age-${number}`”
const c3: C = "age-1"; // ✅ 正确
type D = EnforceString<number>; // 结果 D = never
type E = EnforceString<boolean>; // 结果 E = never
type F = EnforceString<string | number>; // 结果 F = string
type G = EnforceString<any>; // 结果 G = any
type H = EnforceString<unknown>; // 结果 H = never
```

`EnforceString` 的主要用途为：

1. 泛型约束

```ts
function processString<T>(value: T & EnforceString<T>): void {
  console.log(value.toUpperCase());
}
processString("hello"); // ✅ 正确
processString(123); // ❌ 类型报错: 类型“123”的参数不能赋给类型“never”的参数
processString(true); // ❌ 类型报错: 类型“true”的参数不能赋给类型“never”的参数
```

2. 类型安全的 API 设计

```ts
// 确保配置对象中的特定属性必须是字符串
interface Config<T> {
  // name 必须是字符串类型
  name: EnforceString<T>;
}

type ValidConfigA = Config<"abc" | "xxx">; // ✅ 正确，{ name: "abc" | "xxx" }
type ValidConfigB = Config<string>; // ✅ 正确
type InvalidConfig = Config<number>; // { name: never }，即 name 字段因为类型问题不能使用
```

### 类型定义：类属性名对应字符串组合类

```ts
type Attr<T extends Constructor> = EnforceString<keyof InstanceType<T>>;
```

上述代码定义了一个组合工具类型，用于提取类的实例属性名称，并确保它们是字符串类型。这里用到了 `InstanceType` 类型，该类型是 TypeScript 中的一个内置工具类型，用于从构造函数类型中提取其实例类型。其定义为：

```ts
type InstanceType<T extends abstract new (...args: any) => any> =
  T extends abstract new (...args: any) => infer R ? R : any;
```

这里又用到了 TypeScript 中的一个类型推断关键字 `infer`，用于在条件类型中声明一个待推断的类型变量。

基本语法为：`T extends infer U ? U : never` 。核心用途是在条件类型中提取和重用部分类型。下面是提取函数返回类型的一个例子：

```ts
type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

function getUser() {
  return { name: "John", age: 30 };
}
// 获取 getUser 函数的返回结果
type User = MyReturnType<typeof getUser>; // { name: string, age: number }
```

在 TypeScript 中，一个类即可表示类型，也可以表示值。例如有下面的一个类定义：

```ts
class Fruit {
  weight: number;
  constructor(w: number) {
    this.weight = w;
  }
}
```

在 **运行时上下文** 中使用时，`Fruit` 是一个值，即 `Fruit` 的构造函数本身：

```ts
// Fruit 作为值使用
const apple = new Fruit(10); // 构造函数调用
const FruitClass = Fruit; // 赋值给变量
console.log(Fruit.prototype); // 访问原型
```

在 **类型注解上下文** 中使用时，`Fruit` 是一个类型：

```ts
// Fruit 作为类型使用
const apple: Fruit = new Fruit(10); // 类型注解
function processFruit(fruit: Fruit) {} // 参数类型
type FruitArray = Fruit[]; // 类型定义
```

通过 `typeof 类名` 获取的是类的构造函数类型，因此下面的代码是正确的：

```ts
// typeof 后面必须跟一个值，因此 A 类型代表的是 Fruit 类的构造函数类型
type A = typeof Fruit;
// 赋值语句后的 Fruit 作为值，就是 Fruit 类的构造函数，因此下面的语句不会报错
const a: A = Fruit;
// InstanceType 获取的是一个构造函数的返回值类型，即 type B = Fruit
type B = InstanceType<typeof Fruit>;
// b 也是 Fruit 类的实例
const b: B = new Fruit(10);
```

`keyof` 是 TypeScript 在类型注解上下文中是一个关键字，获取一个类型所有的键，例如：

```ts
interface School {
  studentCount: number;
  location: string;
}
// SchoolKey 是 'studentCount' | 'location' 类型
type SchoolKey = keyof School;
```

因此 `Attr<Fruit>` 的含义就很好解释了：

1. `InstanceType<T>`: 得到 `Fruit` 类的类型
2. `keyof InstanceType<T>`: 得到 `Fruit` 类的所有 `key`，组成 `'k1' | 'k2' | 'k3' ...` 的类型
3. `EnforceString<keyof InstanceType<T>>`: 从 `Fruit` 类型中抽取类型为字符串的 `key`

即 `Attr<Fruit>` 的含义就是取出 Fruit 类中所有字符串类型的 key 组成新的字符串组合类型。
