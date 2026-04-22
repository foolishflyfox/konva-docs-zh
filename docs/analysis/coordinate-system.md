<script setup>
import { coordinateSpaceDemo, pointerConversionDemo } from "./codes/coordinate-system";
</script>

# Konva 的坐标系

## 坐标系层级

Konva 的坐标系以树状结构组织，与节点树完全对应：

```
Stage（舞台坐标系）
  └── Layer（图层坐标系）
        └── Group（组坐标系）
              └── Shape（形状本地坐标系）
```

每个容器（Stage、Layer、Group）都建立了自己的坐标空间。子节点的 `x`、`y` 始终相对于**直接父节点**的坐标系，而非相对于舞台。当父容器带有旋转、缩放等变换时，它会为子节点建立一个新的局部坐标空间。

## 舞台坐标系

舞台坐标系是整棵树的根坐标系：

- 原点位于画布元素左上角
- X 轴向右为正，Y 轴向下为正，单位为像素
- `stage.getPointerPosition()` 始终返回相对于舞台的坐标

## 节点的位置属性

节点的 `x`、`y` 描述该节点在其**父坐标系**中的位置：

| 节点类型 | `(x, y)` 相对于 |
|----------|----------------|
| `Layer`  | `Stage` 坐标系 |
| `Group`  | 父 `Layer` 或父 `Group` 坐标系 |
| `Shape`  | 父 `Group` 或父 `Layer` 坐标系 |

这意味着，若父节点带有旋转，子节点的屏幕实际位置并不是简单的 `parent.x + child.x`——父节点的旋转会同样作用于子节点的坐标。

**示例**：一个 `Shape` 的 `x=50, y=30`，放置在 `rotation=45°` 的 `Group`（位于 Stage 中心）内。该 Shape 在屏幕上的实际位置不是 `(group.x + 50, group.y + 30)`，而是经过 45° 旋转后的对应位置。

## sceneFunc 中的坐标

在 `sceneFunc` 中，坐标原点始终是 `(0, 0)`，即节点自身的逻辑原点。Konva 在调用 `sceneFunc` 之前，会将 canvas 上下文的变换矩阵配置好，使得：

- `(0, 0)` 对应该节点经过所有祖先变换后在屏幕上的位置
- 路径坐标是相对于节点自身原点的局部坐标，无需手动加上 `x`、`y` 偏移

```ts
const shape = new Konva.Shape({
  x: 200,
  y: 150,
  sceneFunc(context: Konva.Context, shape: Konva.Shape) {
    // (0, 0) 即该节点的位置，直接在此绘制
    context.beginPath();
    context.rect(0, 0, 80, 50);   // 不需要写 rect(200, 150, 80, 50)
    context.fillStrokeShape(shape);
  },
});
```

无论节点的 `x`、`y` 如何变化，`sceneFunc` 中的绘制逻辑始终从 `(0, 0)` 出发，保持不变。

## 坐标转换方法

Konva 提供了在各层坐标系之间转换的工具方法：

| 方法 | 作用 |
|------|------|
| `stage.getPointerPosition()` | 鼠标相对于 Stage 的绝对坐标 |
| `node.getAbsolutePosition()` | 将节点局部原点 `(0, 0)` 转换为 Stage 坐标 |
| `node.getAbsolutePosition(ancestor)` | 转换为相对于指定祖先节点的坐标 |
| `container.getRelativePointerPosition()` | 鼠标在该容器局部坐标系中的位置 |
| `node.getAbsoluteTransform()` | 返回从 Stage 根到该节点的完整变换矩阵 |
| `node.getTransform()` | 返回节点自身的局部变换矩阵（不含祖先） |

`getRelativePointerPosition()` 的内部逻辑是：取 `getAbsoluteTransform()` 的逆矩阵，将鼠标的 Stage 坐标变换回该容器的局部坐标：

```ts
// Node.js — getRelativePointerPosition() 核心逻辑（已简化）
getRelativePointerPosition() {
  const transform = this.getAbsoluteTransform().copy();
  transform.invert();                        // 绝对变换的逆：Stage → 局部
  const pos = this.getStage().getPointerPosition();
  return transform.point(pos);              // 将鼠标坐标映射到局部坐标系
}
```

这是 Konva 坐标转换的核心模式：**正向用绝对变换（局部 → Stage），逆向用逆矩阵（Stage → 局部）**。变换矩阵的实现细节详见[形变（Transform）的实现](./custom-element/transform)。

## 演示：两级坐标系的差异

下面的演示中，蓝色坐标轴是旋转了 35° 的 Group 坐标系，红色坐标轴是 Stage 坐标系。点击画布任意位置，可以同时看到该点在两套坐标系中的不同表示：

<KShape :afterMounted="coordinateSpaceDemo" :width="480" :height="260" />

注意：同一个点，Stage 坐标和 Group 局部坐标的数值完全不同——这正是坐标系变换的体现。

## 在变换容器内定位

**最常见的陷阱**：在带变换（旋转、缩放等）的 Group 内，用 Stage 坐标来定位子节点。

错误做法：只减去 Group 的平移，忽略旋转：

```ts
const group = new Konva.Group({ x: 200, y: 150, rotation: 30 });
layer.add(group);

// ❌ 错误：没有处理 Group 的旋转，落点会偏移
stage.on('click', () => {
  const sp = stage.getPointerPosition()!;
  const dot = new Konva.Circle({
    x: sp.x - group.x(),   // 仅减平移，未处理旋转
    y: sp.y - group.y(),
    radius: 5, fill: 'red',
  });
  group.add(dot);
});
```

正确做法：使用 `getRelativePointerPosition()`：

```ts
const group = new Konva.Group({ x: 200, y: 150, rotation: 30 });
layer.add(group);

// ✓ 正确：自动处理所有变换（旋转、缩放、斜切等）
stage.on('click', () => {
  const rp = group.getRelativePointerPosition()!;
  const dot = new Konva.Circle({
    x: rp.x, y: rp.y,
    radius: 5, fill: 'green',
  });
  group.add(dot);
});
```

### 为什么 getRelativePointerPosition() 是正确的

**错误做法的问题**在于它把"将 Stage 坐标转换为 Group 局部坐标"等同于"减去平移量"，这只在 Group 没有旋转时才成立。

当 Group 带有旋转 θ 时，其绝对变换矩阵为：

```
M = T(tx, ty) · R(θ)     （先旋转，再平移到目标位置）
```

要把 Stage 坐标 `sp` 转换为 Group 局部坐标，必须求 M 的逆矩阵并作用于 `sp`：

```
M⁻¹ = R(−θ) · T(−tx, −ty)   （先反平移，再反旋转）

局部坐标 = M⁻¹ · sp
```

错误做法只执行了 `T(−tx, −ty)` 这一步（减去平移量），**完全跳过了反旋转 R(−θ)**，结果自然偏离实际点击位置。

`getRelativePointerPosition()` 的实现（见[坐标转换方法](#坐标转换方法)一节）正是先调用 `getAbsoluteTransform()` 拿到完整的 M，再对其求逆、作用于鼠标坐标，从而同时处理了平移、旋转、缩放、斜切所有变换分量。

下面的演示直观展示了两种做法的差异。两个框都带有相同的旋转，点击任意位置：左侧（红色）使用错误做法，圆点落在偏移的位置；右侧（绿色）使用正确做法，圆点精确落在点击处：

<KShape :afterMounted="pointerConversionDemo" :width="480" :height="240" />

## Layer 的特殊性

`Layer` 是 Stage 的直接子节点，也是一个容器，同样可以设置 `x`、`y`、`rotation` 等变换属性。但在实践中，通常不会对 Layer 施加变换——Layer 的主要职责是管理独立的 canvas 元素和脏区重绘，变换嵌套一般在 Group 层面完成。

若需要对画布内容整体平移缩放（如实现画布拖拽、缩放功能），推荐的做法是对 Layer 内的顶层 Group 施加变换，而不是对 Layer 本身。

## absolutePosition 与局部 position 的区别

`node.x()` / `node.y()` 返回节点在**父坐标系**中的位置；`node.getAbsolutePosition()` 才是节点原点在 Stage 上的实际像素坐标：

```ts
const group = new Konva.Group({ x: 100, y: 100, rotation: 45 });
const rect = new Konva.Rect({ x: 50, y: 0, width: 60, height: 40 });
group.add(rect);
layer.add(group);

// rect.x() == 50    （在 Group 坐标系中）
// rect.getAbsolutePosition() 返回经过 Group 旋转后的 Stage 坐标
//   → 约 (100 + 50·cos45°, 100 + 50·sin45°) ≈ (135, 135)
```

在需要将节点与其他 Stage 级别的元素对齐时，应始终使用 `getAbsolutePosition()`，而非直接读取 `x()`、`y()`。
