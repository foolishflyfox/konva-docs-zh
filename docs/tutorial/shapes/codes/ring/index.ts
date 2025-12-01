import { createShapeCodesData } from "@docs/types";
export * from "./demo";
export const ringCodes = createShapeCodesData();
ringCodes.vanilla.js = `import Konva from 'konva';

const stage = new Konva.Stage({
  container: 'container',
  width: window.innerWidth,
  height: window.innerHeight
});

const layer = new Konva.Layer();
stage.add(layer);

const ring = new Konva.Ring({
  x: stage.width() / 2,
  y: stage.height() / 2,
  innerRadius: 40,
  outerRadius: 70,
  fill: 'yellow',
  stroke: 'black',
  strokeWidth: 4
});

layer.add(ring);`;

ringCodes.react = `import { Stage, Layer, Ring } from 'react-konva';

const App = () => {
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Ring
          x={window.innerWidth / 2}
          y={window.innerHeight / 2}
          innerRadius={40}
          outerRadius={70}
          fill="yellow"
          stroke="black"
          strokeWidth={4}
        />
      </Layer>
    </Stage>
  );
};

export default App;`;

ringCodes.vue.app = `<template>
  <v-stage :config="stageSize">
    <v-layer>
      <v-ring :config="ringConfig" />
    </v-layer>
  </v-stage>
</template>

<script setup>
const stageSize = {
  width: window.innerWidth,
  height: window.innerHeight
};

const ringConfig = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
  innerRadius: 40,
  outerRadius: 70,
  fill: 'yellow',
  stroke: 'black',
  strokeWidth: 4
};
</script>`;
