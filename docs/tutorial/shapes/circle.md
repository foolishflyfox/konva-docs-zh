# HTML5 canvas 圆形教程

<script setup>
import { ShapeCodeTab, HighLighterCode } from "@/components/utils";
import { vanillaHtml } from "./codes/circle";
</script>
<ShapeCodeTab>
  <template #vanilla$html>
  <HighLighterCode :code="vanillaHtml" lang="html" />
  </template>
  <template #vanilla$js>
    <pre>
      bbb
    </pre>
  </template>
  <template #react>
    <pre>
      ccc
    </pre>
  </template>
  <template #vue$App>
    <pre>
      ddd
    </pre>
  </template>
  <template #vue$main>
    <pre>
      eee
    </pre>
  </template>
</ShapeCodeTab>
