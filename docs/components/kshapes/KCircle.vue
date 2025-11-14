<template>
  <KShape v-bind="props" :after-mounted="afterMounted" />
</template>

<script setup lang="ts">
import { KShapeProp } from "@docs/types";
import KShape from "./KShape.vue";
import Konva from "konva";
import { createLayer } from "@docs/utils";
const props = withDefaults(
  defineProps<
    KShapeProp & {
      radius?: number;
    }
  >(),
  {
    fill: "#00bfff",
    stroke: "black",
    radius: 60,
    strokeWidth: 4,
  }
);

function afterMounted(stage: Konva.Stage) {
  // 创建图层
  const layer = createLayer(stage);

  // 创建圆形节点
  const circle = new Konva.Circle({
    x: stage.width() / 2,
    y: stage.height() / 2,
    radius: props.radius,
    fill: props.fill,
    stroke: props.stroke,
    strokeWidth: props.strokeWidth,
  });

  // 将节点添加到图层中
  layer.add(circle);
}
</script>

<style scoped></style>
