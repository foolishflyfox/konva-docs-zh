# AI 工具

原文地址: https://konvajs.org/docs/ai_tools.html

## 借助 Konva 和 AI 代理进行开发

我们提供了多个 AI 工具来帮助您创建更好的 konva 应用，它们都由强大的 [crawlchat](https://crawlchat.app/) 提供支持。

:::tip
CrawlChat 是一个 AI 平台，专门将技术文档转成互动式聊天机器人(chatbot)，让用户可以通过对话方式查询文档内容。
:::

## AI 聊天机器人

点击页面的 “Ask AI” 按钮，可以向 AI 询问问题。

:::info
官网的左下角有 “Ask AI” 按钮，但本翻译版本没有该按钮，想使用 AI 聊天机器人功能，请访问官方文档。
:::

你可以将加入你的 [Discord 社区](https://discord.com/invite/6VzzNDwUwV)，这里你可以询问 `@AiBot-CrawlChat`。

## MCP

MCP（Model Context Protocol）是一个实现大语言模型应用（如 Claude 应用、Corsor、Windsurf 及更多类似功能的应用）之间互联的标准协议。

### Cursor MCP 命令

Cursor 需要将一段 JSON 片段添加到 Cursor 设置中。请复制并粘贴以下的片段：

```json
"konva-documentation": {
  "command": "npx",
  "args": [
    "crawl-chat-mcp",
    "--id=67d221efb4b9de65095a2579",
    "--name=konva_documentation"
  ]
}
```

### MCP 命令

```sh
npx crawl-chat-mcp --id=67d221efb4b9de65095a2579 --name=konva_documentation
```
