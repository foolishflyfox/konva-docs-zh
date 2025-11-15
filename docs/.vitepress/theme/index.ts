// .vitepress/theme/index.ts
import DefaultTheme from "vitepress/theme";
import { createHighlighter } from "shiki";
import type { Theme } from "vitepress";
import { h } from "vue";
import Breadcrumb from "./Breadcrumb.vue";

export default {
  extends: DefaultTheme,
  /**
   * 增强 Vue 实例
   */
  async enhanceApp({ app }) {
    // 创建一个全局的 Shiki 实例
    const highlighter = await createHighlighter({
      themes: ["github-dark", "github-light"],
      langs: ["js", "ts", "vue", "json", "html"],
    });
    // 注入到 Vue app 实例
    app.provide("highlighter", highlighter);
  },
  /**
   * 自定义布局: 添加面包屑
   */
  Layout() {
    return h(DefaultTheme.Layout, null, {
      "doc-before": () => h(Breadcrumb),
    });
  },
} satisfies Theme;
