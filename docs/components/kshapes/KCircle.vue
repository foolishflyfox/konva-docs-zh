<template>
  <div>Hello, KCircle, w = {{ width + 1 }}, h = {{ height }}</div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    width?: number;
    height?: number;
  }>(),
  {
    width: 100,
    height: 100,
  }
);
</script>

<style scoped></style>
