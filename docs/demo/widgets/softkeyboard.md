# 软键盘

基于 `SoftKeyboardHelper` 实现的软键盘控件演示。鼠标悬停到键上时，对应键背景变绿，同时触发 `keychange` 事件。

<script setup>
import { softKeyboardDemo, loadWidgetDemo } from "./codes/softkeyboard";
</script>

<KShape :afterMounted="softKeyboardDemo" :width="600" :height="500" />

## 从配置数据恢复组件

将 `exportConfigData()` 的输出粘贴到输入框，点击"创建组件"在下方 canvas 中恢复对应组件。

<KShape :afterMounted="loadWidgetDemo" :width="600" :height="300" />

## 使用方式

```ts
import { SoftKeyboard } from "@docs/demo/widgets/codes/softkeyboard/soft-keyboard";

const keyboard = new SoftKeyboard({ x: 4, y: 28 });

keyboard.on("keychange", (e) => {
  console.log(e.key); // 当前悬停键标签，离开时为空字符串
});

layer.add(keyboard);
```

`SoftKeyboardHelper` 继承自 `Konva.Shape`，`(x, y)` 对应键盘包围盒左上角在父坐标系中的位置，可像普通 Shape 一样添加到 Layer 或 Group。
