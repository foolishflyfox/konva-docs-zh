<template>
  <div class="breadcurmb-container">
    <span v-for="text of breadcrumbTexts"> {{ text }} </span>
  </div>
</template>

<script setup lang="ts">
import { DefaultTheme, useData } from "vitepress";
import { useLayout } from "vitepress/theme";
import { computed } from "vue";

const layout = useLayout();
const { sidebar } = layout;
const data = useData();
// 除了 page 外，还可以获取 frontmatter 信息
const { page } = data;
function resolveSidebarItems(
  sidebarItem: DefaultTheme.SidebarItem,
  filePath: string
): DefaultTheme.SidebarItem[] | undefined {
  if (!sidebarItem) return undefined;
  if (sidebarItem.link === filePath) return [sidebarItem];
  for (const subItem of sidebarItem.items || []) {
    const subResult = resolveSidebarItems(subItem, filePath);
    if (subResult?.length) {
      return [sidebarItem, ...subResult];
    }
  }
  return undefined;
}

function convertToLink(filePath: string) {
  let result = filePath;
  if (!result.startsWith("/")) result = "/" + result;
  if (result.endsWith(".md")) {
    result = result.substring(0, result.length - 3);
  }
  return result;
}

const breadcrumbTexts = computed(() => {
  for (const sidebarItem of sidebar.value) {
    const tmpResult = resolveSidebarItems(
      sidebarItem,
      convertToLink(page.value.filePath)
    );
    if (tmpResult) {
      return tmpResult.map((e) => e.text!);
    }
  }
  return [];
});
</script>

<style scoped>
.breadcurmb-container {
  margin-bottom: 12px;
  padding-bottom: 3px;
  border-bottom: 1px solid #8886;
}
.breadcurmb-container > span {
  font-weight: bold;
  font-size: small;
  opacity: 0.6;
}
.breadcurmb-container > span:not(:last-child):after {
  content: " ";
  display: inline-block;
  background: url("./next-symbol.svg") center;
  width: 10px;
  height: 10px;
  opacity: 0.8;
  margin: 0 1em;
}
</style>
