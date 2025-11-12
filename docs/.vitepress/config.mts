import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Konva",
  description: "关于 Konva 的文档(中文版)",
  head: [
    // 设置 favicon
    ["link", { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }],
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    // 设置左上角 title 旁边的图标
    logo: "/favicon.svg",
    nav: [
      { text: "首页", link: "/" },
      { text: "教程", link: "/tutorial" },
      { text: "API", link: "/api" },
      { text: "演示", link: "/demo" },
      { text: "源码分析", link: "/analysis" },
    ],
    sidebar: {
      "/tutorial/": [
        {
          text: "基础",
          items: [
            { text: "介绍", link: "/tutorial/" },
            { text: "概览", link: "/tutorial/overview" },
          ],
        },
        {
          text: "形状",
          collapsed: true,
          items: [
            { text: "弧形", link: "/tutorial/shape/arc" },
            { text: "箭头", link: "/tutorial/shape/arrow" },
          ],
        },
      ],
      "/api/": [
        { text: "Konva", link: "/api/" },
        { text: "动画", link: "/api/animation" },
      ],
      "/demo/": [
        { text: "总览", link: "/demo/" },
        { text: "画布编辑器", link: "/demo/canvas-editor" },
      ],
      "/analysis/": [
        { text: "概览", link: "/analysis/" },
        { text: "示例", link: "/analysis/demo" },
      ],
    },
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/foolishflyfox/konva-docs-zh",
      },
    ],
  },
  vite: {
    server: {
      // 设置服务端口号
      port: 6001,
      // 允许局域网访问
      host: true,
    },
  },
});
