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

const circle = new Konva.Circle({
  x: stage.width() / 2,
  y: stage.height() / 2,
  radius: 70,
  fill: 'red',
  stroke: 'black',
  strokeWidth: 4
});

layer.add(circle);`;

codesData.react = `import { Stage, Layer, Circle } from 'react-konva';

const App = () => {
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Circle
          x={window.innerWidth / 2}
          y={window.innerHeight / 2}
          radius={70}
          fill="red"
          stroke="black"
          strokeWidth={4}
        />
      </Layer>
    </Stage>
  );
};`;

codesData.vue.app = `<template>
  <v-stage :config="stageSize">
    <v-layer>
      <v-circle :config="circleConfig" />
    </v-layer>
  </v-stage>
</template>

<script setup>
const stageSize = {
  width: window.innerWidth,
  height: window.innerHeight
};

const circleConfig = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
  radius: 70,
  fill: 'red',
  stroke: 'black',
  strokeWidth: 4
};
</script>`;
