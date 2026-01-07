<script setup>
import { listenEventsDemo, listenEventsCodes } from './codes/listen-events';
</script>

# 事件监听

在使用 Konva 时，要监听或不监听事件，我们可以在实例化形状时将配置对象的 `listening` 属性设置为 `true` 或 `false，或者使用` `setListening()` 方法来设置 `listening` 属性。一旦我们为一个或多个节点设置了 `listening` 属性，还需要使用 `drawHit()` 方法为每个受影响的图层重绘命中图。

操作说明：将鼠标悬停在椭圆上，观察事件处理程序未执行。点击"Listen"开始监听事件，观察事件处理程序现在已执行。

<KShape :afterMounted="listenEventsDemo" :width="500" :height="300" />

<ShapeCode v-bind="listenEventsCodes" />
