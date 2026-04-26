# 按钮

基于 `ShapeHelper` 实现的按钮控件演示。支持普通、悬停、点击三态颜色，触发 `hoverchange`、`presschange`、`buttonclick` 事件。

<script setup>
import { buttonDemo, loadButtonDemo } from "./codes/button";
</script>

<KShape :afterMounted="buttonDemo" :width="600" :height="300" />

## 从配置数据恢复组件

将 `exportConfigData()` 的输出粘贴到输入框，点击"创建组件"在下方 canvas 中恢复对应组件。

<KShape :afterMounted="loadButtonDemo" :width="600" :height="300" />

## 使用方式

```ts
import { Button } from "@docs/demo/widgets/codes/button/button";

const btn = new Button({ x: 20, y: 20, width: 120, height: 40, label: "确认" });

btn.on("buttonclick", () => {
  console.log("按钮已点击");
});
btn.on("hoverchange", (e) => {
  console.log("悬停状态：", e.hover);
});
btn.on("presschange", (e) => {
  console.log("按下状态：", e.pressed);
});

layer.add(btn);
```

`Button` 继承自 `Konva.Shape`，`(x, y)` 对应按钮包围盒左上角，可像普通 Shape 一样添加到 Layer 或 Group。
