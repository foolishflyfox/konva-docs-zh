# Todo

# 优化 Mermaid 绘图 (已完成)

目前使用的 vitepress-plugin-mermaid 存在以下问题：

1. 性能问题，对比 https://cn.rollupjs.org/plugin-development/ 中关于构建钩子的服务器端渲染，vitepress-plugin-mermaid 在浏览器端渲染显得太过缓慢，可以借鉴 [rollup](https://github.com/rollup/rollup) 的 renderMermaidGraphsPlugin 实现，如果有时间也研究一下 rollup 的源码；
2. 兼容性问题，使用 vitepress-plugin-mermaid 还要额外显式安装 @braintree/sanitize-url、dayjs、debug、cytoscape-cose-bilkent、cytoscape 这 5 个库，替换 vitepress-plugin-mermaid 后，移除对这 5 个库的依赖；
3. 代码优雅程度，为了使用 mermaid，config.mts 中的 defineConfig 被替换为了 withMermaid，不够优雅；
