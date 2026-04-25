# Todo

# 优化 Mermaid 绘图 (已完成)

目前使用的 vitepress-plugin-mermaid 存在以下问题：

1. 性能问题，对比 https://cn.rollupjs.org/plugin-development/ 中关于构建钩子的服务器端渲染，vitepress-plugin-mermaid 在浏览器端渲染显得太过缓慢，可以借鉴 [rollup](https://github.com/rollup/rollup) 的 renderMermaidGraphsPlugin 实现，如果有时间也研究一下 rollup 的源码；
2. 兼容性问题，使用 vitepress-plugin-mermaid 还要额外显式安装 @braintree/sanitize-url、dayjs、debug、cytoscape-cose-bilkent、cytoscape 这 5 个库，替换 vitepress-plugin-mermaid 后，移除对这 5 个库的依赖；
3. 代码优雅程度，为了使用 mermaid，config.mts 中的 defineConfig 被替换为了 withMermaid，不够优雅；

创建这样一个 ShapeHelper 类，其参数为 Konva.Shape 等，其使用为：

```ts
class CustomShape extends Konva.Shape {
  private _shapeHelper: ShapeHelper; // ShapeHelper 内部有 _hitCanvas 用于局部区域的监测
  construct(config: CustomShapeConfig) {
    this._shapeHelper = new ShapeHelper(this,
      {
        width: 200, // 指定
      }
    );
    // 调用下面的函数，会自动为本Shape的 _sceneFunc 和 _HitFunc 添加调用函数
    this._shapeHelper.draw((ctx) => {
        // 绘制图形的过程
        ctx.beginPath();
        ....
    }, {
        strokeStyle: '#f00', // 指定图形的 stroke 颜色，如果不指定则不描边，在 _sceneFunc 中使用
        fillStyle: '#0f0', // 指定图形的 fill 颜色，如果不指定则不填充，在 _sceneFunc 中使用
        xxx: true, // 请修改字段名，该字段表示是否为自定义图形的一部分，即是否将第一个参数的图形添加到 _hitFunc 中，如果不指定默认为 true，为 false 后，因为不是该图形的一部分，不会响应鼠标事件
        area: { // 如果需要单独监测该图形，则需要指定 area 字段，通过 _hitCanvas 监测该图形区域的事件，如果有鼠标或屏幕发生，则该 shape fire 对应的事件，其 eventType 为 “areaName/eventName”，例如该图形，在鼠标移入时fire的事件为 "startBtn/mouseenter"
          name: "startBtn", // 表示该区域的名称，编程时使用
          label: "启动按钮", // 表示该区域的含义，为用户解释含义
        }
    })
  }
}
```

该 ShapeHelper 在一个单独的 shape-helper.ts 中定义
