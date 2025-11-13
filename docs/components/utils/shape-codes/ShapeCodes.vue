<template>
  <div>
    <div>
      <button @click="switchTab('vanilla')">Vanilla</button>
      <button @click="switchTab('react')">React</button>
      <button @click="switchTab('vue')">Vue</button>
    </div>
    <div>
      <div>
        <template v-if="tabName === 'vanilla'">
          <div>
            <div>
              <button @click="switchFile('html')">index.html</button>
              <button @click="switchFile('js')">index.js</button>
            </div>
            <slot v-if="file === 'html'" name="vanilla$html" />
            <slot v-else name="vanilla$js" />
          </div>
        </template>
        <slot v-else-if="tabName === 'react'" name="react" />
        <template v-else-if="tabName === 'vue'">
          <div>
            <div>
              <div>
                <button @click="switchFile('App')">App.vue</button>
                <button @click="switchFile('main')">main.js</button>
              </div>
            </div>
            <slot v-if="file === 'App'" name="vue$App" />
            <slot v-else name="vue$main" />
          </div>
        </template>
      </div>
      <div id="result">效果显示</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const tabName = ref("vanilla");
const file = ref("html");

function switchTab(newTabName: string) {
  if (tabName.value === newTabName) return;
  tabName.value = newTabName;
  if (tabName.value === "vanilla") file.value = "html";
  else if (tabName.value === "react") file.value = "";
  else if (tabName.value === "vue") file.value = "App";
}

function switchFile(newFile: string) {
  file.value = newFile;
}
</script>

<style scoped>
div#result {
  background-color: aquamarine;
}
</style>
