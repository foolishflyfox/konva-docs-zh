import { createShapeCodesData } from "@docs/types";

export const splineCodes = createShapeCodesData();

splineCodes.vanilla.js = `import Konva from 'konva';

const stage = new Konva.Stage({
  container: 'container',
  width: window.innerWidth,
  height: window.innerHeight
});

const layer = new Konva.Layer();
stage.add(layer);

const line = new Konva.Line({
  points: [5, 70, 140, 23, 250, 60, 300, 20],
  stroke: 'red',
  strokeWidth: 15,
  lineCap: 'round',
  lineJoin: 'round',
  tension: 1
});

layer.add(line);
`;

splineCodes.react = `import { Stage, Layer, Line } from 'react-konva';

const App = () => {
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Line
          points={[5, 70, 140, 23, 250, 60, 300, 20]}
          stroke="red"
          strokeWidth={15}
          lineCap="round"
          lineJoin="round"
          tension={1}
        />
      </Layer>
    </Stage>
  );
};

export default App;
`;

splineCodes.vue.app = `<template>
  <v-stage :config="stageSize">
    <v-layer>
      <v-line :config="lineConfig" />
    </v-layer>
  </v-stage>
</template>

<script setup>
const stageSize = {
  width: window.innerWidth,
  height: window.innerHeight
};

const lineConfig = {
  points: [5, 70, 140, 23, 250, 60, 300, 20],
  stroke: 'red',
  strokeWidth: 15,
  lineCap: 'round',
  lineJoin: 'round',
  tension: 1
};
</script>`;
