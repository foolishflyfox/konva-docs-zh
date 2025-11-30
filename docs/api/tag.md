# Tag 标签背景

::: info 类信息

- [类关系图](../analysis/inheritance-diagram.md)
- 父类：[Shape](./shape)
- 子类: 无

:::

`Tag` 类是 Konva 中用于绘制带可选指针的背景形状的组件，通常作为 `Label` 标签的背景元素。

`Tag` 类专门用于创建标签的背景，可以绘制：

- 带圆角的矩形背景
- 可选的指针（指向上下左右四个方向）
- 支持填充、描边、阴影等样式

## 核心功能

### 1. 指针方向控制

支持五个方向的指针：

- `up`: 向上指针
- `down`: 向下指针
- `left`: 向左指针
- `right`: 向右指针
- `none`: 无指针

### 2. 指针尺寸控制

- `pointerWidth`: 指针宽度
- `pointerHeight`: 指针高度

### 3. 圆角控制

- `cornerRadius`: 支持单个数值或数组设置四个角的圆角

### Note

- `Tag` 继承自 `Shape`，是一个独立的可绘制组件
- `Tag` 主要用于创建工具提示、对话框等 UI 组件的背景
- `Tag` 可以单独使用，但通常与 `Label` 和 `Text` 组合使用
- `Tag` 的 `getSelfRect()` 方法会根据指针方向调整边界框计算

## 构造函数

| 字段名                    | 类型     | 描述                                                                                              |
| ------------------------- | -------- | ------------------------------------------------------------------------------------------------- |
| `pointerDirection` (可选) | `String` | 指针方向，可取 up/right/down/left/none，默认 none，指定了方向后，label 的定位将相对于指针尖端进行 |
| `pointerWidth` (可选)     | `Number` | 指针尖端宽度                                                                                      |
| `pointerHeight` (可选)    | `Number` | 指针尖端高度                                                                                      |
| `cornerRadius` (可选)     | `Number` | 圆角半径                                                                                          |

## 自带方法

### pointerDirection(pointerDirection)

获取/设置指针方向。

**参数：**

- `pointerDirection`: `String`，可取 `up`/`right`/`down`/`left`/`none`，默认值为 `none`

**例子：**

```js
tag.pointerDirection("right");
```

### pointerWidth(pointerWidth)

获取/设置指针宽度。

**参数：**

- `pointerWidth`: `Number`，指针宽度

**例子：**

```js
tag.pointerWidth(20);
```

### pointerHeight(pointerHeight)

获取/设置指针宽度。

**参数：**

- `pointerHeight`: `Number`，指针高度

**例子：**

```js
tag.pointerHeight(20);
```

### cornerRadius(cornerRadius)

获取/设置圆角半径。

**参数：**

- `cornerRadius`: `Number`，圆角半径

**例子：**

```js
// 设置4个角的圆角半径都为 20
tag.cornerRadius(20);
// 设置不同的圆角半径值，分别为：
// 左上 top-left，右上 top-right，右下 bottom-right，左下 bottom-left
tag.cornerRadius([0, 10, 20, 30]);
```
