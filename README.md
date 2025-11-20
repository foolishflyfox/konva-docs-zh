# Konva 中文文档

<p align="center">
  <img src="docs/public/konva.svg" />
</p>

这是一个包含 Konva 的使用与源码分析的基于 VitePress 的仓库，包括对 Konva 官网手册的翻译、自我总结的博客以及源码分析。

## 特点

- 🔰 通俗易懂：争取让每个小白都能读懂，如果有所收获，请记得 Star 哦 ❤️❤️❤️
- 💡 深入浅出：从功能到源码层层递进，深度剖析，图文并茂讲解，在学会了 API 的使用后，也能提升编程内功 💪💪💪
- 🛠️ 注重实战：每个功能都以实际的例子进行演示，拒绝纸上谈兵，实践是检验真理的唯一标准 🔥🔥🔥

## 项目使用

- 安装依赖：`pnpm install`
- 开发：`pnpm docs:dev`
- 编译：`pnpm docs:build`
- 预览：`pnpm docs:preview`

**注意：在下载本项目后，需要修改如下内容：**

1. 修改 `docs/.vitepress/puppeteer-config.json` 文件中的 `executablePath` 字段，将其修改为你电脑上的 Chrome 浏览器的路径，用于 mermaid 的渲染。通常路径如下：
   - Windows: 可以优先查看以下路径是否有 chrome.exe
     - `C:\\Users\\用户名\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe`
     - `C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe`
     - `C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe`，
   - Linux: 可以优先查看以下路径
     - `/usr/bin/google-chrome`
     - `/usr/bin/chromium-browser`
     - `/home/用户名/.local/share/google/chrome/chrome`
     - `/snap/bin/chromium`；
   - macOS: 可以优先查看以下路径
     - `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`
     - `/usr/local/Caskroom/chrome/latest/Google Chrome.app/Contents/MacOS/Google Chrome`；
