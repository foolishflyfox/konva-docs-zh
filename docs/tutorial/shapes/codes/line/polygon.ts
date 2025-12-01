import { createShapeCodesData } from "@docs/types";

export const polygonCodes = createShapeCodesData();
polygonCodes.vanilla.js = `import Konva from 'konva';

const stage = new Konva.Stage({
  container: 'container',
  width: window.innerWidth,
  height: window.innerHeight
});

const layer = new Konva.Layer();
stage.add(layer);

const polygon = new Konva.Line({
  points: [73, 192, 73, 160, 340, 23, 500, 109, 499, 139, 342, 93],
  fill: '#00D2FF',
  stroke: 'black',
  strokeWidth: 5,
  closed: true
});

layer.add(polygon);`;

polygonCodes.react = `import { Stage, Layer, Line } from 'react-konva';

const App = () => {
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Line
          points={[73, 192, 73, 160, 340, 23, 500, 109, 499, 139, 342, 93]}
          fill="#00D2FF"
          stroke="black"
          strokeWidth={5}
          closed
        />
      </Layer>
    </Stage>
  );
};

export default App;`;

polygonCodes.vue.app = `<template>
  <v-stage :config="stageSize">
    <v-layer>
      <v-line :config="polygonConfig" />
    </v-layer>
  </v-stage>
</template>

<script setup>
const stageSize = {
  width: window.innerWidth,
  height: window.innerHeight
};

const polygonConfig = {
  points: [73, 192, 73, 160, 340, 23, 500, 109, 499, 139, 342, 93],
  fill: '#00D2FF',
  stroke: 'black',
  strokeWidth: 5,
  closed: true
};
</script>`;
