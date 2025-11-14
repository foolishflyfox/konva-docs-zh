<template>
  <!-- 如果想保留行号、高亮行等能力，可自己拼 class -->
  <div :style="{ height: `${height}px`, overflow: 'auto' }">
    <div v-if="codeHtml" v-html="codeHtml" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, inject, watch, computed } from "vue";
import type { Highlighter } from "shiki";
import { useData } from "vitepress";
import { useBorderColor } from "@docs/utils";

const props = withDefaults(
  defineProps<{
    code: string; // 纯代码字符串
    lang?: string; // 语言，默认 ts
    height?: number; // 代码容器高度
  }>(),
  {
    height: 350,
  }
);

const highlighter = inject<Highlighter>("highlighter");

const codeHtml = ref("");
const { isDark } = useData();
const lineNumberBorderColor = useBorderColor();

function updateCodeHtml(isDarkTheme: boolean) {
  if (highlighter) {
    const html = highlighter.codeToHtml(props.code, {
      lang: props.lang || "ts",
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
      defaultColor: isDarkTheme ? "dark" : "light",
    });
    codeHtml.value = html;
  }
}

onMounted(async () => {
  watch(
    isDark,
    (v) => {
      updateCodeHtml(v);
    },
    { immediate: true }
  );
});
</script>

<style scoped>
/* 设置行号显示 */
:deep(pre) {
  padding: 0.5em 0;
  counter-reset: line;
  background-color: var(--vp-code-block-bg) !important;
  overflow: auto;
}

:deep(pre > code) {
  line-height: var(--vp-code-line-height);
}

:deep(.line) {
  counter-increment: line;
  position: relative;
  padding-left: 3.2em;
}

:deep(.line::before) {
  content: counter(line);
  position: absolute;
  left: 0;
  width: 2em;
  text-align: right;
  color: #6e7681;
  border-right: 1px solid v-bind(lineNumberBorderColor);
  padding-right: 0.5em;
  margin-right: 0.5em;
}
</style>
