<script setup>
import { multiEventDemo, multiEventCodes } from './codes/multi-event'
</script>

# 多事件

在使用 Konva 将多个事件绑定到单个处理程序时，我们可以使用 `on()` 方法并传入一个包含多个事件类型的空格分隔字符串。

```js
shape.on("mouseover mousedown mouseup", function (e) {
  console.log("事件类型: " + e.type);
});
```

操作说明：将鼠标悬停在圆形上、按下鼠标和释放鼠标，观察绑定到圆形的函数是否针对每个事件执行。

<KShape :afterMounted="multiEventDemo" :width="400" :height="300" />

<ShapeCode v-bind="multiEventCodes" />
