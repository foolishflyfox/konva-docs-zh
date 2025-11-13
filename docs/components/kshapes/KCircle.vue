<template>
  <KShape v-bind="props" ref="kShape" />
</template>

<script setup lang="ts">
import { onMounted, useTemplateRef } from "vue";
import { KShapeProp } from "../../types";
import KShape from "./KShape.vue";
import Konva from "konva";
const props = defineProps<KShapeProp>();
const kShape = useTemplateRef("kShape");
onMounted(() => {
  const containerData = kShape.value?.getContainerData()!;
  const stage = new Konva.Stage({
    ...containerData,
  });
  // 创建图层
  const layer = new Konva.Layer();

  // 创建圆形节点
  const circle = new Konva.Circle({
    x: stage.width() / 2,
    y: stage.height() / 2,
    radius: 70,
    fill: "red",
    stroke: "black",
    strokeWidth: 4,
  });

  // 将节点添加到图层中
  layer.add(circle);

  // 将图层添加到 stage 中
  stage.add(layer);
});
</script>

<style scoped></style>
