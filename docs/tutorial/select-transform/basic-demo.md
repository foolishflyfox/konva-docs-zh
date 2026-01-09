<script setup>
import { basicDemoDemo, basicDemoCodes } from './codes/basic-demo';
    </script>

# 基本演示

Transformer 是一种特殊的 `Konva.Group`。它允许您轻松调整和旋转任意节点或节点集。

启用该功能需要以下步骤：

1. 通过 `new Konva.Transformer()` 创建新实例

2. 将其添加到图层

3. `通过 transformer.nodes([shape])` 绑定至节点

注意：调整尺寸时，变换工具不会改变节点的宽度（`width`）和高度（`height`）属性，而是改变其缩放属性 `scaleX` 和 `scaleY`。

操作说明：尝试缩放和旋转图形。点击空白区域可取消选择。使用 SHIFT 或 CTRL 键可向选择集中添加/移除图形。可尝试在画布上进行区域框选。

<KShape :afterMounted="basicDemoDemo" :width="500" :height="300" />

<ShapeCode v-bind="basicDemoCodes" />
