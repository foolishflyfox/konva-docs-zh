<template>
  <div class="shape-code-tab">
    <div class="langbar">
      <button
        v-for="v of ['vanilla', 'react', 'vue']"
        @click="switchTab(v)"
        :class="getLangbarCssClass(v)"
      >
        {{ capitalize(v) }}
      </button>
    </div>

    <div class="code-container">
      <template v-if="tabName === 'vanilla'">
        <div>
          <div class="filebar">
            <button
              @click="switchFile('html')"
              :class="getFilebarCssClass('html')"
            >
              index.html
            </button>
            <button @click="switchFile('js')" :class="getFilebarCssClass('js')">
              index.js
            </button>
          </div>
          <slot v-if="file === 'html'" name="vanilla$html" />
          <slot v-else name="vanilla$js" />
        </div>
      </template>
      <slot v-else-if="tabName === 'react'" name="react" />
      <template v-else-if="tabName === 'vue'">
        <div>
          <div class="filebar">
            <button
              @click="switchFile('App')"
              :class="getFilebarCssClass('App')"
            >
              App.vue
            </button>
            <button
              @click="switchFile('main')"
              :class="getFilebarCssClass('main')"
            >
              main.js
            </button>
          </div>
          <slot v-if="file === 'App'" name="vue$App" />
          <slot v-else name="vue$main" />
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { capitalize, useBorderColor } from "../../../utils";
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

function getLangbarCssClass(targetTabName: string) {
  const result = [];
  if (tabName.value === targetTabName) {
    result.push("active");
  }
  return result;
}

function getFilebarCssClass(targetFile: string) {
  const result = [];
  if (file.value === targetFile) {
    result.push("active");
  }
  return result;
}

const borderColor = useBorderColor();
</script>

<style scoped>
.code-container {
  margin: 2px 0;
  padding: 3px;
  border: 1px solid v-bind(borderColor);
}
.shape-code-tab {
  --active-color: #0584ce;
}
.langbar > button {
  padding: 12px 16px;
  font-weight: 700;
  font-size: 18px;
}
.filebar {
  margin: 8px 3px 0px 3px;
  padding: 0 0 5px 10px;
  border-bottom: 1px solid v-bind(borderColor);
}
.filebar > button {
  padding-right: 26px;
  font-size: 14px;
}
button.active {
  color: var(--active-color);
}
.langbar > button.active {
  border-bottom: 3px solid var(--active-color);
}
</style>
