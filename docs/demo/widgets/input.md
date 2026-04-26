# 输入框

基于 `ShapeHelper` 实现的输入框控件演示。支持键盘输入、光标闪烁、占位符、文本溢出滚动，触发 `valuechange`、`inputfocus`、`inputblur`、`submit` 事件。

点击输入框聚焦后可直接键入内容，按 `Enter` 触发 `submit`，按 `Escape` 取消聚焦。

<script setup>
import { inputDemo, loadInputDemo } from "./codes/input";
</script>

<KShape :afterMounted="inputDemo" :width="600" :height="300" />

## 从配置数据恢复组件

将 `exportConfigData()` 的输出粘贴到输入框，点击"创建组件"在下方 canvas 中恢复对应组件。

<KShape :afterMounted="loadInputDemo" :width="600" :height="300" />

## 使用方式

```ts
import { Input } from "@docs/demo/widgets/codes/input/input";

const input = new Input({ x: 20, y: 20, width: 200, height: 36 });

input.on("valuechange", (e) => {
  console.log("当前值：", e.value);
});
input.on("submit", (e) => {
  console.log("提交：", e.value);
});
input.on("inputfocus", () => {
  console.log("聚焦");
});
input.on("inputblur", () => {
  console.log("失焦");
});

layer.add(input);
```

`Input` 继承自 `Konva.Shape`，`(x, y)` 对应输入框包围盒左上角，可像普通 Shape 一样添加到 Layer 或 Group。
