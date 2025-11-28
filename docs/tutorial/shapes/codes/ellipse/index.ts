import { createShapeCodesData } from "@docs/types";
export * from "./demo";

export const codesData = createShapeCodesData();

codesData.vanilla.js = `import Konva from 'konva';

const stage = new Konva.Stage({
  container: 'container',
  width: window.innerWidth,
  height: window.innerHeight
});

const layer = new Konva.Layer();
stage.add(layer);

const ellipse = new Konva.Ellipse({
  x: stage.width() / 2, // 椭圆中心点的 x 坐标
  y: stage.height() / 2, // 椭圆中心点的 y 坐标
  radiusX: 100, // 横轴半径
  radiusY: 50, // 纵轴半径
  fill: 'yellow', // 填充色
  stroke: 'black', // 描边色
  strokeWidth: 4 // 描边宽度
});

layer.add(ellipse);`;

codesData.react = `import { Stage, Layer, Ellipse } from 'react-konva';

const App = () => {
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Ellipse
          x={window.innerWidth / 2}
          y={window.innerHeight / 2}
          radiusX={100}
          radiusY={50}
          fill="yellow"
          stroke="black"
          strokeWidth={4}
        />
      </Layer>
    </Stage>
  );
};

export default App;`;

codesData.vue.app = `<template>
  <v-stage :config="stageSize">
    <v-layer>
      <v-ellipse :config="ellipseConfig" />
    </v-layer>
  </v-stage>
</template>

<script setup>
const stageSize = {
  width: window.innerWidth,
  height: window.innerHeight
};

const ellipseConfig = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
  radiusX: 100,
  radiusY: 50,
  fill: 'yellow',
  stroke: 'black',
  strokeWidth: 4
};
</script>`;
