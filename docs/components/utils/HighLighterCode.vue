<template>
  <!-- 如果想保留行号、高亮行等能力，可自己拼 class -->
  <pre
    v-if="codeHtml"
    class="shiki"
    style="background-color: #2d2d2d"
    v-html="codeHtml"
  />
</template>

<script setup lang="ts">
import { ref, onMounted, inject } from "vue";
import type { Highlighter } from "shiki";

const props = defineProps<{
  code: string; // 纯代码字符串
  lang?: string; // 语言，默认 ts
}>();

const highlighter = inject<Highlighter>("highlighter");

const codeHtml = ref("");

onMounted(async () => {
  // 取 Markdown 阶段缓存的 highlighter
  if (highlighter) {
    const html = highlighter.codeToHtml(props.code, {
      lang: props.lang || "ts",
      theme: "github-light", // 与 VitePress 全局主题保持一致
    });
    codeHtml.value = html;
  }
});
</script>

<style scoped>
/* 让行高亮颜色与 VitePress 默认同色 */
:deep(.highlighted) {
  background: var(--vp-code-line-highlight-color);
}
</style>
