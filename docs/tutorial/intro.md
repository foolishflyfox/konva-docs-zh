---
outline: deep
---

# 开启 Konva 之旅

英文原文链接

- https://konvajs.org/
- https://konvajs.org/docs/index.html

## 什么是 Konva?

Konva 是一个 HTML5 的 Canvas JavaScript 框架，增强了原生 2D Context 的交互功能，可用于桌面和移动应用。

Konva 让桌面与移动应用都能拥有高性能动画、平滑过渡、节点嵌套、分层、滤镜、缓存、事件处理等丰富功能，并且远不止于此。

你能在 Stage 上绘制图形，为它们添加事件监听，并独立地对它们进行移动、缩放和旋转，即使应用中包含成千上万个图形，也能实现高性能的动画。

Konva 项目从 [KineticJS](https://github.com/ericdrowell/KineticJS) 分叉(fork)而来。

## 使用用户

Konva 是基于 React / Vue / Angular / Svelte / Vanilla JS 框架的应用程序与 canvas 图形化的终极桥梁。已获得世界范围内的团队的信任，成为 npm 下载的最流行的 2D canvas 框架。使用本框架的公司：

- Meta: Facebook 的母公司。
- Microsoft: 微软团队。
- Polotno: 一款现代而强大的 Web 画布编辑器，旨在为用户提供直观、灵活且可定制的图形设计和编辑工具。
- Labelbox: “标注工具 + 自动化模型 + 人力外包 + 质量系统” 一站式数据工厂，适合需要快速获得高质量训练数据、又不想自己搭整套标注流程的 AI 团队。
- Zazzle: 一个让用户自定义并购买个性化商品（如衣服、杯子、海报等）的在线印制平台。

## 特点

- 面向对象的 API: Konva 提供了面向对象的 API，支持多种形状，允许符合直观的、灵活的 canvas 操作。
- 跨平台支持：Konva 提供了对桌面和移动设备的无缝支持，确保跨平台体验的一致性。
- 动画过渡: 使用 Konva 内置的动画过渡功能，创建丝滑且灵活的动画交互体验。
- 高级节点管理: Konva 支持节点嵌套、分组以及事件冒泡，支持复杂的继承结构和高效的事件处理。
- 高质量导出: 将你的 Canvas 作品导出为高质量的数据 URL、图像数据或图像对象，以便在各种应用中灵活使用。
- 预置滤镜: 使用 Konva 提供的预构建滤镜合集增强你的画布，轻松为其添加视觉效果和变换。
- 框架集成: 将 Konva 与 React、Vue、Svelte 等主流 Web 框架无缝集成，以优化开发流程。
- 拖拽支持: 借助 Konva 的内置支持，轻松实现交互式拖放功能，提升用户体验。

## 安装 Konva

如果你使用包管理：

```sh
npm install konva
```

或者使用脚本标签：

```html
<script src="https://unpkg.com/konva@10/konva.min.js"></script>
```

或者直接从 CDN 获取：

- [完整版本 konva.js](https://unpkg.com/konva@10/konva.js)
- [最小版本 konva.min.js](https://unpkg.com/konva@10/konva.min.js)

## 应用例子

- [Polotno](https://polotno.dev/?utm_source=konvajs): Web 端用于制作设计编辑器的 SDK。
- [SMMplanner](https://smmplanner.com/home/auth/signin): 用于在定时发布中创建 Instagram 故事的构造器。
- [SpreadSheet Grid](https://www.rowsncolumns.app/): 使用 React 写的类 Excel 的数据表格组件。
- [Windoor craft (中国)](https://windowcc.com/home): 中文名叫画门窗，是一个门窗设计器。
- [Pixteller](https://pixteller.com/): 一款可在数秒内创建或自定义任何图像的设计工具。
- [BoardOS (中国)](https://boardos.online/): 为超级团队打造的超级白板协作系统。
- [Vokal](https://app.vokal.co/editor): 为社交媒体创建播客视频片段。
- [facetache](https://www.facetache.com/): 为图片人物添加胡须。
- [ScriptureMark](https://www.scripturemark.org/canvas): 在画布中为文档添加注脚。
- [Let's Role](https://lets-role.com/): 在虚拟环境中进行桌面角色扮演游戏（TableTop RPG）。
- [csgoboard](https://csgoboard.com/board/new): 为 Valve 的游戏《反恐精英》（Counter-Strike）打造的互动棋盘/面板。
- [brainzilla](https://www.brainzilla.com/puzzles/jigsaw/): 在线拼图游戏。
- [react-avatar](https://github.com/kirill3333/react-avatar): 载入、裁剪与预览头像制作。
- [Color wars game](https://mcalus3.github.io/color-wars-web/): 颜色战争，本地轮流多人模式街机游戏，注重竞技性。
- [Opdome](https://www.opdome.com/): 在线图片字典，可作为小儿识字工具。
- [E-cards](https://e-cards.shop/de/cards/create/2/1): 企业电子贺卡的在线商店。
- [Mystikaze](https://mystikaze.com/): 一款在线回合制六边形战棋策略游戏。

更多应用可参见 https://github.com/konvajs/konva/discussions/1169 。
