# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm install        # install dependencies
pnpm docs:dev       # dev server at http://localhost:6001
pnpm docs:build     # production build
pnpm docs:preview   # preview production build
```

## Konva source code

The Konva.js source code is available locally at `~/Code/GitDownload/konva`. When analyzing Konva internals or verifying implementation details, read the source directly from this path rather than relying on memory.

Key source files:
- `src/Layer.ts` — `getIntersection`, `_getIntersection`, hit canvas logic
- `src/Shape.ts` — `colorKey`, `drawHit`, `sceneFunc`, `hitFunc`
- `src/Node.ts` — `_getTransform`, `getAbsoluteTransform`, `getRelativePointerPosition`
- `src/Stage.ts` — pointer event handling, `_pointerMove` / `_pointerDown`

## Architecture

This is a VitePress-based Chinese documentation site for Konva.js. `docs/` is the VitePress source root.

### Key directories

- `docs/.vitepress/config.mts` — site config and sidebar navigation
- `docs/.vitepress/theme/` — custom theme; registers `KShape` and `ShapeCode` as global Vue components
- `docs/components/kshapes/KShape.vue` — renders a Konva Stage in the page; accepts an `afterMounted(stage)` callback
- `docs/components/utils/ShapeCode.vue` — tabbed code viewer for vanilla JS / React / Vue variants
- `docs/types/` — shared TypeScript types (`KShapeProps`, `ShapeCodesData`, `createShapeCodesData()`)
- `docs/utils/` — Konva helpers (`createLayer`, `addButtons`, `addRanges`, `addSelectableRanges`)

### Path alias

`@docs` resolves to the `docs/` directory (configured in both `tsconfig.json` and the Vite alias in `config.mts`).

### Content sections

- `docs/tutorial/` — usage tutorials (shapes, events, filters, etc.)
- `docs/analysis/` — source code analysis articles
- `docs/api/` — API reference pages

### Authoring pattern for demo articles

Each article that uses a live demo follows this structure:

```
docs/<section>/<category>/
  <article>.md            ← imports demo function, uses <KShape> and optionally <ShapeCode>
  codes/
    <article>/
      demo.ts             ← exports demo function(s) receiving Konva.Stage
      index.ts            ← re-exports demo.ts; also exports codesData if ShapeCode is used
```

Example `.md` header (demo only, no ShapeCode):
```md
<script setup>
import { myDemo } from "./codes/my-article";
</script>

<KShape :afterMounted="myDemo" :width="300" :height="200" />
```

Example `index.ts` when ShapeCode is also needed:
```ts
import { createShapeCodesData } from "@docs/types";
export * from "./demo";
export const codesData = createShapeCodesData();
codesData.vanilla.js = `...`;
codesData.react = `...`;
codesData.vue.app = `...`;
```

### Sidebar navigation

Sidebar entries are defined in `config.mts` using a custom `prefix` field on group items. The `addLinkPrefix` helper recursively prepends path segments so individual items only need relative `link` values.

To add a new category group under a section:
```ts
{
  text: "分类名",
  collapsed: true,
  prefix: "folder-name",
  items: [
    { text: "文章标题", link: "article-name" },
  ],
}
```

### Mermaid rendering

Mermaid diagrams require a local Chrome binary. Configure the path in `docs/.vitepress/puppeteer-config.json` → `executablePath`.
