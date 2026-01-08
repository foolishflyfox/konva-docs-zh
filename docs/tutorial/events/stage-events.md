<script setup>
import { stageEventsDemo, stageEventsCodes } from './codes/stage-events'
    </script>

# Stage 事件

所有事件都是从图形元素触发的。因此，如果点击画布中的空白区域，图层不会触发点击事件，而舞台对象会触发该事件。

操作说明：请分别点击空白区域和图形元素，以观察不同的事件触发行为。

<KShape :afterMounted="stageEventsDemo" :width="500" :height="300" />

<ShapeCode v-bind="stageEventsCodes" />
