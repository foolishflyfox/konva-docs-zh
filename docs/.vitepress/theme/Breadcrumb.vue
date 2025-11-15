<template>
  <div>
    <span> 首页 </span>
    <span v-for="text of breadcrumbTexts"> {{ text }} &nbsp; </span>
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

<style scoped></style>
