import { useData } from "vitepress";
import { computed } from "vue";

export function useBorderColor() {
  const { isDark } = useData();
  return computed(() => (isDark.value ? "#555" : "#e8e8e8"));
}
