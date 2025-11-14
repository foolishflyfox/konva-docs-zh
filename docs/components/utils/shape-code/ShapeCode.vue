<template>
  <ShapeCodeTab>
    <template #vanilla$html>
      <HighLighterCode :code="vanilla.html ?? defaultVanillaHtml" lang="html" />
    </template>
    <template #vanilla$js>
      <HighLighterCode :code="vanilla.js ?? ''" lang="js" />
    </template>
    <template #react>
      <HighLighterCode :code="react ?? ''" lang="js" />
    </template>
    <template #vue$App>
      <HighLighterCode :code="vue.app ?? ''" lang="vue" />
    </template>
    <template #vue$main>
      <HighLighterCode :code="vue.main ?? defaultVueMain" lang="js" />
    </template>
  </ShapeCodeTab>
</template>

<script setup lang="ts">
import ShapeCodeTab from "./ShapeCodeTab.vue";
import HighLighterCode from "../HighLighterCode.vue";
import { ShapeCodesData } from "@docs/types";

defineProps<ShapeCodesData>();

const defaultVanillaHtml = `<style>body, html { margin: 0; padding: 0; }</style>
<div id='container'></div>`;
const defaultVueMain = `import { createApp } from 'vue'
import App from './App.vue'
import VueKonva from 'vue-konva';
import './styles.css';

createApp(App).use(VueKonva).mount('#app')`;
</script>

<style scoped></style>
