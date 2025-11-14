<template>
  <ShapeCodeTab>
    <template #vanilla$html>
      <HighLighterCode :code="vanilla.html || ''" lang="html" />
    </template>
    <template #vanilla$js>
      <HighLighterCode :code="vanilla.js || ''" lang="js" />
    </template>
    <template #react>
      <HighLighterCode :code="react || ''" lang="js" />
    </template>
    <template #vue$App>
      <HighLighterCode :code="vue.app || ''" lang="vue" />
    </template>
    <template #vue$main>
      <HighLighterCode :code="vue.main || ''" lang="js" />
    </template>
  </ShapeCodeTab>
</template>

<script setup lang="ts">
import ShapeCodeTab from "./ShapeCodeTab.vue";
import HighLighterCode from "../HighLighterCode.vue";
import { ShapeCodesData } from "../../../types";

defineProps<ShapeCodesData>();
</script>

<style scoped></style>
