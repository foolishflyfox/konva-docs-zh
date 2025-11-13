<template>
  <div>
    <VPButton @click="count++">count is: {{ count }}</VPButton>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { VPButton } from "vitepress/theme";

const count = ref(0);
</script>

<style scoped></style>
