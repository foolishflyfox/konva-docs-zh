import { createShapeCodesData } from "@docs/types";

export const blobCodes = createShapeCodesData();
blobCodes.vanilla.js = `import Konva from 'konva';

const stage = new Konva.Stage({
  container: 'container',
  width: window.innerWidth,
  height: window.innerHeight
});

const layer = new Konva.Layer();
stage.add(layer);

const blob = new Konva.Line({
  points: [23, 20, 23, 160, 70, 93, 150, 109, 290, 139, 270, 93],
  fill: '#00D2FF',
  stroke: 'black',
  strokeWidth: 5,
  closed: true,
  tension: 0.3
});

layer.add(blob);`;

blobCodes.react = `import { Stage, Layer, Line } from 'react-konva';

const App = () => {
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Line
          points={[23, 20, 23, 160, 70, 93, 150, 109, 290, 139, 270, 93]}
          fill="#00D2FF"
          stroke="black"
          strokeWidth={5}
          closed
          tension={0.3}
        />
      </Layer>
    </Stage>
  );
};

export default App;`;

blobCodes.vue.app = `<template>
  <v-stage :config="stageSize">
    <v-layer>
      <v-line :config="blobConfig" />
    </v-layer>
  </v-stage>
</template>

<script setup>
const stageSize = {
  width: window.innerWidth,
  height: window.innerHeight
};

const blobConfig = {
  points: [23, 20, 23, 160, 70, 93, 150, 109, 290, 139, 270, 93],
  fill: '#00D2FF',
  stroke: 'black',
  strokeWidth: 5,
  closed: true,
  tension: 0.3
};
</script>`;
