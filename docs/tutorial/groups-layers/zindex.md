<script setup>
import { zindexDemo, zindexCodes } from './codes/zindex';
</script>

# zIndex

什么是节点的 zIndex？
节点的 zIndex 表示该节点在其父节点子元素数组中的索引位置。获取/设置节点 zIndex 的方法如下：

```javascript
// 获取
const zIndex = shape.zIndex();

// 设置
shape.zIndex(1);
```

请注意：Konva 中的 zIndex 与 CSS 中的 z-index 完全不同。它仅反映节点在父级子元素列表中的顺序索引。

```javascript
const group = new Konva.Group();
const circle = new Konva.Circle({});
group.add(circle);

// 输出 0（因为圆是组中的第一个子元素）
console.log(circle.zIndex());

// 以下设置无效，因为当前组只有一个子元素
circle.zIndex(1);

// 仍然输出 0
console.log(circle.zIndex());

// 对任何节点，以下等式恒成立：
console.log(circle.zIndex() === circle.getParent().children.indexOf(circle));
```

重要说明：
不能像 CSS 那样使用 zIndex 来设置节点的绝对层级位置。Konva 严格依据节点在节点树中的定义顺序进行绘制。

操作提示：尝试使用按钮调整形状的 zIndex 值，观察形状层叠顺序的变化。

<KShape :afterMounted="zindexDemo" :width="500" :height="300" />

<ShapeCode v-bind="zindexCodes" />
