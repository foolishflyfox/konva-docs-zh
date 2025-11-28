import { createShapeCodesData } from "@docs/types";

export const codesData = createShapeCodesData();

codesData.vanilla.js = `import Konva from 'konva';

const stage = new Konva.Stage({
  container: 'container',
  width: window.innerWidth,
  height: window.innerHeight
});

const layer = new Konva.Layer();
stage.add(layer);

const arrow = new Konva.Arrow({
  x: stage.width() / 4, // 箭头位置的 x 坐标
  y: stage.height() / 4, // 箭头位置的 y 坐标
  points: [0, 0, 100, 100], // 坐标点坐标，可以多个点
  pointerLength: 30, // 箭头长度
  pointerWidth: 15, // 箭头宽度
  fill: 'green', // 填充色
  stroke: 'orange', // 描边色
  strokeWidth: 4 // 描边宽度
});

layer.add(arrow);
`;

codesData.vue.app = `<template>
  <v-stage :config="stageSize">
    <v-layer>
      <v-arrow :config="arrowConfig" />
    </v-layer>
  </v-stage>
</template>

<script setup>
const stageSize = {
  width: window.innerWidth,
  height: window.innerHeight
};

const arrowConfig = {
  x: window.innerWidth / 4,
  y: window.innerHeight / 4,
  points: [0, 0, 100, 100],
  pointerLength: 30,
  pointerWidth: 15,
  fill: 'green',
  stroke: 'orange',
  strokeWidth: 4
};
</script>
`;

codesData.react = `import { Stage, Layer, Arrow } from 'react-konva';

const App = () => {
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Arrow
          x={window.innerWidth / 4}
          y={window.innerHeight / 4}
          points={[0, 0, 100, 100]}
          pointerLength={30}
          pointerWidth={15}
          fill="green"
          stroke="orange"
          strokeWidth={4}
        />
      </Layer>
    </Stage>
  );
};

export default App;
`;

export * from "./demos";
