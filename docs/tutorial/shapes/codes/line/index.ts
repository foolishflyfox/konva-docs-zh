import { createShapeCodesData } from "@docs/types";
export * from "./demos";
export const codesData = createShapeCodesData();

codesData.vanilla.js = `import Konva from 'konva';

const stage = new Konva.Stage({
  container: 'container',
  width: window.innerWidth,
  height: window.innerHeight
});

const layer = new Konva.Layer();
stage.add(layer);

const redLine = new Konva.Line({
  points: [5, 70, 140, 23, 250, 60, 300, 20],
  stroke: 'red',
  strokeWidth: 15,
  lineCap: 'round',
  lineJoin: 'round'
});

// 虚线绘制
const greenLine = new Konva.Line({
  points: [5, 70, 140, 23, 250, 60, 300, 20],
  stroke: 'green',
  strokeWidth: 2,
  lineJoin: 'round',
  dash: [33, 10] // 虚线模式
});

greenLine.y(50);
layer.add(redLine, greenLine);`;

codesData.react = `import { Stage, Layer, Line } from 'react-konva';

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
        />
        <Line
          points={[5, 70, 140, 23, 250, 60, 300, 20]}
          stroke="green"
          strokeWidth={2}
          lineJoin="round"
          dash={[33, 10]}
          y={50}
        />
      </Layer>
    </Stage>
  );
};

export default App;`;

codesData.vue.app = `<template>
  <v-stage :config="stageSize">
    <v-layer>
      <v-line :config="redLineConfig" />
      <v-line :config="greenLineConfig" />
    </v-layer>
  </v-stage>
</template>

<script setup>
const stageSize = {
  width: window.innerWidth,
  height: window.innerHeight
};

const redLineConfig = {
  points: [5, 70, 140, 23, 250, 60, 300, 20],
  stroke: 'red',
  strokeWidth: 15,
  lineCap: 'round',
  lineJoin: 'round'
};

const greenLineConfig = {
  points: [5, 70, 140, 23, 250, 60, 300, 20],
  stroke: 'green',
  strokeWidth: 2,
  lineJoin: 'round',
  dash: [33, 10],
  y: 50
};
</script>`;
