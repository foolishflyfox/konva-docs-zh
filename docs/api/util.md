# Util 工具集

## 方法

### getRandomColor()

返回十六进制表示的颜色值。

**例子：**

```js
shape.fill(Konva.Util.getRandomColor());
```

### getRGB(color)

获取一个颜色的 R/G/B 各部分的值。

- 参数
  - `color`: string
- 返回一个对象，包含 3 个字段
  - `r`: number，红色部分的值
  - `g`: number，绿色部分的值
  - `b`: number，蓝色部分的值

**例子：**

```js
// 下面的例子都返回 {r:0, g:0, b:255}
var rgb = Konva.Util.getRGB("blue");
var rgb = Konva.Util.getRGB("#0000ff");
var rgb = Konva.Util.getRGB("rgb(0,0,255)");
```

### haveIntersection(r1, r2)

判断两个客户端矩形是否相交。

- 参数
  - r1: 对象，`{x, y, width, height}` 客户端矩形
  - r2: 对象，`{x, y, width, height}` 客户端矩形

**例子：**

```js
const overlapping = Konva.Util.haveIntersection(
  shape1.getClientRect(),
  shape2.getClientRect()
);
```
