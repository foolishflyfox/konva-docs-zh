import { defineConfig, DefaultTheme } from "vitepress";
import { posix } from "path";
import { fileURLToPath } from "url";

type SidebarItemX = DefaultTheme.SidebarItem & {
  prefix?: string;
};

/**
 * 添加路径前缀
 */
function addLinkPrefix(
  item: SidebarItemX,
  prefix = ""
): DefaultTheme.SidebarItem {
  if (item.link !== undefined) {
    item.link = posix.join(prefix, item.link);
  } else {
    let newPrefix = prefix;
    if (item.prefix) {
      newPrefix = posix.join(newPrefix, item.prefix);
      delete item.prefix;
    }
    if (item.items?.length) {
      item.items.forEach((e) => addLinkPrefix(e, newPrefix));
    }
  }
  return item;
}

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
      { text: "教程", link: "/tutorial/intro" },
      { text: "API", link: "/api/konva" },
      { text: "演示", link: "/demo/overview" },
      { text: "源码分析", link: "/analysis/overview" },
    ],
    sidebar: {
      "/tutorial/": [
        {
          text: "教程",
          items: [
            { text: "介绍", link: "intro" },
            { text: "概览", link: "overview" },
            {
              text: "形状",
              collapsed: true,
              prefix: "shapes",
              items: [
                { text: "弧形", link: "arc" },
                { text: "箭头", link: "arrow" },
                { text: "圆形", link: "circle" },
              ],
            },
          ],
        },
      ].map((e) => addLinkPrefix(e, "/tutorial")),
      "/api/": [
        { text: "Konva", link: "konva" },
        { text: "动画", link: "animation" },
      ].map((e) => addLinkPrefix(e, "/api")),
      "/demo/": [
        { text: "总览", link: "overview" },
        { text: "画布编辑器", link: "canvas-editor" },
      ].map((e) => addLinkPrefix(e, "/demo")),
      "/analysis/": [
        { text: "概览", link: "overview" },
        { text: "示例", link: "demo" },
      ].map((e) => addLinkPrefix(e, "/analysis")),
    },
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/foolishflyfox/konva-docs-zh",
      },
    ],
  },
  markdown: {
    // true: 全部显示; false: 全部不显示; number: 只有代码行数 ≥ 该值时才显示
    lineNumbers: true,
  },
  vite: {
    server: {
      // 设置服务端口号
      port: 6001,
      // 允许局域网访问
      host: true,
    },
    resolve: {
      alias: {
        // 指定 docs 表示的根目录为 docs
        "@docs": fileURLToPath(new URL("../", import.meta.url)),
      },
    },
  },
});
