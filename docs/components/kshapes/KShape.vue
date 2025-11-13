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
import { useTemplateRef } from "vue";
import { KShapeContainerProp } from "../../types";

const props = withDefaults(defineProps<KShapeContainerProp>(), {
  width: 150,
  height: 150,
  bgColor: "#ddd",
});

const container = useTemplateRef("shapeContainerRef");

defineExpose({
  getContainerData: () => {
    return {
      container: container.value!,
      width: props.width,
      height: props.height,
    };
  },
});
</script>

<style scoped></style>
