<template>
  <!-- 如果想保留行号、高亮行等能力，可自己拼 class -->
  <div>
    <pre v-if="codeHtml" class="shiki" v-html="codeHtml" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, inject, watch } from "vue";
import type { Highlighter } from "shiki";
import { useData } from "vitepress";

const props = defineProps<{
  code: string; // 纯代码字符串
  lang?: string; // 语言，默认 ts
}>();

const highlighter = inject<Highlighter>("highlighter");

const codeHtml = ref("");
const { isDark } = useData();

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
/* 让行高亮颜色与 VitePress 默认同色 */
:deep(.highlighted) {
  background: var(--vp-code-line-highlight-color);
}
:deep(pre.shiki.github-dark) {
  padding: 6px 10px;
}
:deep(pre.shiki.github-light) {
  padding: 6px 10px;
}
</style>
