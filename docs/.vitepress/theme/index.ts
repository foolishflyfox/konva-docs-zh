// .vitepress/theme/index.ts
import DefaultTheme from "vitepress/theme";
import { createHighlighter } from "shiki";
import type { Theme } from "vitepress";

export default {
  ...DefaultTheme,
  async enhanceApp({ app }) {
    // 创建一个全局的 Shiki 实例
    const highlighter = await createHighlighter({
      themes: ["github-dark", "github-light"],
      langs: ["js", "ts", "vue", "json", "html"],
    });

    // 注入到 Vue app 实例
    app.provide("highlighter", highlighter);
  },
} satisfies Theme;
