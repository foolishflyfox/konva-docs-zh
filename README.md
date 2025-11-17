# Konva 文档

<p align="center">
  <img src="docs/public/konva.svg" />
</p>

这是一个关于 Konva 的使用手册与源码分析的基于 VitePress 的仓库。

## 初始化项目

在下载本项目后，需要初始化如下内容：

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
