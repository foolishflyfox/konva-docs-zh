# Markdown Extension Examples

## mermaid 演示

```mermaid
graph TD;
A-->B;
A-->C;
B-->D;
C-->D;
```

```mermaid
flowchart TB
    classDef default fill:transparent, color:#000;
    classDef hook-parallel fill:#ffb3b3,stroke:#000;
    classDef hook-sequential fill:#ffd2b3,stroke:#000;
    classDef hook-first fill:#fff2b3,stroke:#000;
    classDef hook-sequential-sync fill:#ffd2b3,stroke:#f00;
    classDef hook-first-sync fill:#fff2b3,stroke:#f00;

	watchchange("watchChange"):::hook-parallel
	click watchchange "#watchchange" _parent

    closewatcher("closeWatcher"):::hook-parallel
	click closewatcher "#closewatcher" _parent

	buildend("buildEnd"):::hook-parallel
	click buildend "#buildend" _parent

    buildstart("buildStart"):::hook-parallel
	click buildstart "#buildstart" _parent

	load("load"):::hook-first
	click load "#load" _parent

	moduleparsed("moduleParsed"):::hook-parallel
	click moduleparsed "#moduleparsed" _parent

	options("options"):::hook-sequential
	click options "#options" _parent

	resolvedynamicimport("resolveDynamicImport"):::hook-first
	click resolvedynamicimport "#resolvedynamicimport" _parent

	resolveid("resolveId"):::hook-first
	click resolveid "#resolveid" _parent

	shouldtransformcachedmodule("shouldTransformCachedModule"):::hook-first
	click shouldtransformcachedmodule "#shouldtransformcachedmodule" _parent

	transform("transform"):::hook-sequential
	click transform "#transform" _parent

    options
    --> buildstart
    --> |each entry|resolveid
    .-> |external|buildend

    resolveid
    --> |non-external|load
    --> |not cached|transform
    --> moduleparsed
    .-> |no imports|buildend

    load
    --> |cached|shouldtransformcachedmodule
    --> |false|moduleparsed

    shouldtransformcachedmodule
    --> |true|transform

    moduleparsed
    --> |"each import()"|resolvedynamicimport
    --> |non-external|load

    moduleparsed
    --> |"each import\n(cached)"|load

    moduleparsed
    --> |"each import\n(not cached)"|resolveid

    resolvedynamicimport
    .-> |external|buildend

    resolvedynamicimport
    --> |unresolved|resolveid
```

## 思维导图演示

```mindmap
# root
## child1
- child3
## child2
- child3
```

This page demonstrates some of the built-in markdown extensions provided by VitePress.

## Syntax Highlighting

VitePress provides Syntax Highlighting powered by [Shiki](https://github.com/shikijs/shiki), with additional features like line-highlighting:

**Input**

````md
```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```
````

**Output**

```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```

## Custom Containers

**Input**

```md
::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::
```

**Output**

::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::

## More

Check out the documentation for the [full list of markdown extensions](https://vitepress.dev/guide/markdown).
