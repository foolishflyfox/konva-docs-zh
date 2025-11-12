---
# 本区域是 YAML Frontmatter，用于为 Markdown 页面指定元数据和页面布局
# https://vitepress.dev/reference/default-theme-home-page
# 此页面使用 VitePress 的首页布局 home
layout: home

# 主视觉区域 Hero Section 定义
hero:
  # 项目名称，显示在页面主标题处
  name: "Konva 文档"
  # 简短的说明文字或副标题，通常在标题下方
  text: "关于 Konva 的使用手册与源码分析"
  # 标语或简短的说明，显示在更小字号的位置
  tagline: 包括对 Konva 官网手册的翻译、自我总结的博客以及源码分析
  image:
    src: /images/konva.svg
    alt: Konva Logo
  # 一组操作按钮，可以引导访问其他页面
  actions:
    # 按钮样式，官方提供两种：brand 表示主色调按钮，alt 表示次要按钮
    - theme: brand
      # 按钮文字
      text: Markdown Examples
      # 按钮点击后的跳转路径
      link: /markdown-examples
    - theme: alt
      text: API Examples
      link: /api-examples

# 特性介绍区块，展示项目的几个主要功能点
features:
  # 每个特性的标题
  - title: 通俗易懂
    icon: 🔰
    # 特性的简要说明文字
    details: 争取让每个小白都能读懂，如果有所收获，请记得 Star 哦 ❤️❤️❤️
  - title: 深入浅出
    icon: 💡
    details: 从功能到源码层层递进，深度剖析，图文并茂讲解，在学会了API的使用后，也能提升编程内功 💪💪💪
  - title: 注重实战
    icon: 🛠️
    details: 每个功能都以实际的例子进行演示，拒绝纸上谈兵，实现是检验真理的唯一标准 🔥🔥🔥
---
