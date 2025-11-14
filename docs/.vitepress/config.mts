import { defineConfig, DefaultTheme } from "vitepress";
import { posix } from "path";
import { fileURLToPath } from "url";
import { link } from "fs";

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
    search: {
      provider: "local",
    },
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
                { text: "Arc 弧形", link: "arc" },
                { text: "Arrow 箭头", link: "arrow" },
                { text: "Circle 圆形", link: "circle" },
                { text: "Custom Shape 自定义", link: "custom" },
                { text: "Ellipse 椭圆", link: "ellipse" },
                { text: "Group 组", link: "group" },
                { text: "Image 图片", link: "image" },
                { text: "Label 标签", link: "label" },
                { text: "Line 线", link: "line" },
                { text: "Line - Blob 不规则图形", link: "line_blob" },
                { text: "Line - Polygon 多边形", link: "line_polygon" },
                { text: "Line - Simple Line 线", link: "line_simple_line" },
                { text: "Line - Spline 曲线", link: "line_spline" },
                { text: "Path 路径", link: "path" },
                { text: "Rectangle 矩形", link: "rectangle" },
                { text: "Regular Polygon 正多边形", link: "regular-polygon" },
                { text: "Ring 圆环", link: "ring" },
                { text: "Sprite 精灵图", link: "sprite" },
                { text: "Star 星形", link: "star" },
                { text: "Text 文本", link: "text" },
                { text: "TextPath 文本路径", link: "text-path" },
                { text: "Wedge 楔形", link: "wedge" },
              ],
            },
            {
              text: "事件",
              collapsed: true,
              prefix: "events",
              items: [
                { text: "事件绑定", link: "binding-events" },
                { text: "取消事件传递", link: "cancel-propagation" },
                { text: "自定义命中区", link: "custom-hit-region" },
                { text: "桌面端与移动端", link: "desktop-and-mobile" },
                { text: "事件代理", link: "event-delegation" },
                { text: "触发事件", link: "fire-events" },
                { text: "图片事件", link: "image-events" },
                { text: "键盘事件", link: "keyboard-events" },
                { text: "事件监听", link: "listen-events" },
                { text: "移动端事件", link: "mobile-events" },
                { text: "移动端滚动", link: "mobile-scrolling" },
                { text: "多事件", link: "multi-event" },
                { text: "指针事件", link: "pointer-events" },
                { text: "移除事件", link: "remove-event" },
                { text: "按名称移除事件", link: "remove-by-name" },
                { text: "Stage 事件", link: "stage-events" },
              ],
            },
            {
              text: "拖放",
              collapsed: true,
              prefix: "drag-drop",
              items: [
                { text: "拖放基础", link: "basic-drag-drop" },
                { text: "图片拖拽", link: "drag-image" },
                { text: "组拖拽", link: "drag-group" },
                { text: "线拖拽", link: "drag-line" },
                { text: "stage 拖拽", link: "drag-stage" },
                { text: "拖拽事件", link: "drag-event" },
                { text: "简单拖拽边界", link: "simple-drag-bounds" },
                { text: "复杂拖放", link: "complex-drag-drop" },
                { text: "放置事件", link: "drop-events" },
              ],
            },
            {
              text: "补间",
              collapsed: true,
              prefix: "tweens",
              items: [
                { text: "所有控制", link: "all-controls" },
                { text: "所有缓动", link: "all-easing" },
                { text: "一般缓动", link: "common-easings" },
                { text: "复杂补间", link: "complex-tweening" },
                { text: "完成事件", link: "finish-event" },
                { text: "线性缓动", link: "linear-easing" },
                { text: "滤镜补间", link: "filter-tweening" },
              ],
            },
            {
              text: "动画",
              collapsed: true,
              prefix: "animations",
              items: [
                { text: "创建动画", link: "create-animation" },
                { text: "运动", link: "moving" },
                { text: "旋转", link: "rotation" },
                { text: "缩放", link: "scaling" },
                { text: "停止动画", link: "stop-animation" },
                { text: "文本动画", link: "text-animations" },
              ],
            },
          ],
        },
      ].map((e) => addLinkPrefix(e, "/tutorial")),
      "/api/": [
        { text: "Konva", link: "konva" },
        { text: "动画", link: "animation" },
        { text: "滤镜", link: "filters" },
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
