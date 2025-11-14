<template>
  <div>
    <div
      :style="{
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: bgColor,
      }"
      ref="shapeContainerRef"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, useTemplateRef } from "vue";
import { KShapeProps } from "@docs/types";
import Konva from "konva";

const props = withDefaults(defineProps<KShapeProps>(), {
  width: 150,
  height: 150,
  bgColor: "#ddd",
});

const container = useTemplateRef("shapeContainerRef");
const getContainerData = () => {
  return {
    container: container.value!,
    width: props.width,
    height: props.height,
  };
};

onMounted(() => {
  const containerData = getContainerData();
  if (props.afterMounted) {
    const stage = new Konva.Stage({
      ...containerData,
    });
    props.afterMounted?.(stage);
  }
});
</script>

<style scoped></style>
