import { DefaultTheme, defineConfig } from "vitepress";
import { posix } from "path";
import { fileURLToPath } from "url";
// 使用 vitepress-plugin-mermaid，需要安装依赖的几个库，否则不能正常显示
// pnpm add -D @braintree/sanitize-url dayjs debug cytoscape-cose-bilkent cytoscape
import { withMermaid } from "vitepress-plugin-mermaid";
import { Transformer } from "markmap-lib";
import { renderMermaidGraphsPlugin } from "./mermaid";

type SidebarItemX = DefaultTheme.SidebarItem & {
  prefix?: string;
};

// 思维导图支持步骤一
const transformer = new Transformer();
function escapeHtml(unsafe: any) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

////结束思维导图设置/////

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
  // mermaid: {
  // mermaid 插件的相关配置
  // },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    // 导航栏上显示的 Logo，位于站点标题前
    logo: "/favicon.svg",
    // 可以自定义此项以替换导航中的默认站点标题 (应用配置中的 title)
    siteTitle: "Konva 文档",
    // 导航菜单项的配置
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
    outline: {
      level: "deep", // 显示所有级别标题
      label: "页面导航",
    },
    // 侧边栏菜单项配置
    sidebar: {
      "/tutorial/": [
        {
          text: "教程",
          items: [
            { text: "介绍", link: "intro" },
            { text: "概览", link: "overview" },
            { text: "AI 工具", link: "ai-tools" },
            { text: "支持", link: "support" },
            { text: "捐赠", link: "donate" },
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
            {
              text: "性能",
              collapsed: true,
              prefix: "performance",
              items: [
                { text: "性能优化技巧", link: "all-performance-tips" },
                { text: "避免内存泄漏", link: "avoid-memory-leaks" },
                { text: "批量绘制", link: "batch-draw" },
                { text: "禁用完美绘制", link: "disable-perfect-draw" },
                { text: "图层管理", link: "layer-management" },
                { text: "关闭监听", link: "listening-false" },
                { text: "动画优化", link: "optimize-animation" },
                { text: "描边优化", link: "optimize-strokes" },
                { text: "图形缓存", link: "shape-caching" },
              ],
            },
          ],
        },
      ].map((e) => addLinkPrefix(e, "/tutorial")),
      "/api/": [
        {
          text: "API",
          items: [
            { text: "Konva", link: "konva" },
            { text: "Animation 动画", link: "animation" },
            { text: "Arrow 箭头", link: "arrow" },
            { text: "Canvas 画布", link: "canvas" },
            { text: "Arc 圆弧", link: "arc" },
            { text: "Circle 圆", link: "circle" },
            { text: "Container 容器", link: "container" },
            { text: "Context 上下文", link: "context" },
            { text: "Easings 缓动函数集", link: "easings" },
            { text: "Ellipse 椭圆", link: "ellipse" },
            { text: "FastLayer 快图层(废弃)", link: "fast-layer" },
            { text: "Filters 滤镜集", link: "filters" },
            { text: "Group 组", link: "group" },
            { text: "Image 图片", link: "image" },
            { text: "Label 标签", link: "label" },
            { text: "Layer 图层", link: "layer" },
            { text: "Line 线", link: "line" },
            { text: "Node 节点", link: "node" },
            { text: "Path 路径", link: "path" },
            { text: "Rect 矩形", link: "rect" },
            { text: "RegularPolygon 正多边形", link: "regular-polygon" },
            { text: "Ring 环", link: "ring" },
            { text: "Shape 图形", link: "shape" },
            { text: "Sprite 精灵图", link: "sprite" },
            { text: "Stage 舞台", link: "stage" },
            { text: "Star 星形", link: "star" },
            { text: "Tag 标签背景", link: "tag" },
            { text: "Text 文本", link: "text" },
            { text: "TextPath 文本路径", link: "text-path" },
            { text: "Transform 变换", link: "transform" },
            { text: "Transformer 变换器", link: "transformer" },
            { text: "Tween 补间动画", link: "tween" },
            { text: "Util 工具集", link: "util" },
            { text: "Wedge 楔形", link: "wedge" },
          ],
        },
      ].map((e) => addLinkPrefix(e, "/api")),
      "/demo/": [
        {
          text: "演示",
          items: [
            { text: "总览", link: "overview" },
            { text: "画布编辑器", link: "canvas-editor" },
          ],
        },
      ].map((e) => addLinkPrefix(e, "/demo")),
      "/analysis/": [
        {
          text: "源码分析",
          items: [
            { text: "概览", link: "overview" },
            { text: "类继承图", link: "inheritance-diagram" },
            { text: "示例", link: "demo" },
          ],
        },
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
    // 全局设置自定义标题
    container: {
      tipLabel: "提示",
      warningLabel: "警告",
      dangerLabel: "危险",
      infoLabel: "信息",
      detailsLabel: "详细信息",
    },
    config: (md) => {
      // 思维导图支持步骤二
      const temp = md.renderer.rules.fence?.bind(md.renderer.rules)!;
      md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
        const token = tokens[idx];
        if (token.info === "mindmap") {
          try {
            const { root } = transformer.transform(token.content.trim());
            return `<svg class="markmap-svg" data-json='${escapeHtml(
              JSON.stringify(root)
            )}'></svg>`;
          } catch (ex) {
            return `<pre>${ex}</pre>`;
          }
        }
        return temp(tokens, idx, options, env, slf);
      };
      ////结束思维导图设置////
    },
  },
  vite: {
    server: {
      // 设置服务端口号
      port: 6001,
      // 允许局域网访问
      host: true,
    },
    plugins: [renderMermaidGraphsPlugin()],
    resolve: {
      alias: {
        // 指定 docs 表示的根目录为 docs
        "@docs": fileURLToPath(new URL("../", import.meta.url)),
      },
    },
  },
});
