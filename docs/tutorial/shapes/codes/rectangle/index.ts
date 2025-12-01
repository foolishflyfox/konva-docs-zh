import { createShapeCodesData } from "@docs/types";
export * from "./demo";
export const rectangleCodes = createShapeCodesData();

rectangleCodes.vanilla.js = `import Konva from 'konva';

const stage = new Konva.Stage({
container: 'container', // id of container <div>
width: window.innerWidth,
height: window.innerHeight
});

const layer = new Konva.Layer();
stage.add(layer);

const rect1 = new Konva.Rect({
x: 20,
y: 20,
width: 100,
height: 50,
fill: 'green',
stroke: 'black',
strokeWidth: 4
});
layer.add(rect1);

const rect2 = new Konva.Rect({
x: 150,
y: 40,
width: 100,
height: 50,
fill: 'red',
shadowBlur: 10,
cornerRadius: 10
});
layer.add(rect2);

const rect3 = new Konva.Rect({
x: 50,
y: 120,
width: 100,
height: 100,
fill: 'blue',
cornerRadius: [0, 10, 20, 30]
});
layer.add(rect3);

stage.add(layer);`;

rectangleCodes.react = `import { Stage, Layer, Rect } from 'react-konva';

const App = () => {
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Rect
          x={20}
          y={20}
          width={100}
          height={50}
          fill="green"
          stroke="black"
          strokeWidth={4}
        />
        <Rect
          x={150}
          y={40}
          width={100}
          height={50}
          fill="red"
          shadowBlur={10}
          cornerRadius={10}
        />
        <Rect
          x={50}
          y={120}
          width={100}
          height={100}
          fill="blue"
          cornerRadius={[0, 10, 20, 30]}
        />
      </Layer>
    </Stage>
  );
};

export default App;`;

rectangleCodes.vue.app = `<template>
  <v-stage :config="stageSize">
    <v-layer>
      <v-rect :config="rect1Config" />
      <v-rect :config="rect2Config" />
      <v-rect :config="rect3Config" />
    </v-layer>
  </v-stage>
</template>

<script setup>
const stageSize = {
  width: window.innerWidth,
  height: window.innerHeight
};

const rect1Config = {
  x: 20,
  y: 20,
  width: 100,
  height: 50,
  fill: 'green',
  stroke: 'black',
  strokeWidth: 4
};

const rect2Config = {
  x: 150,
  y: 40,
  width: 100,
  height: 50,
  fill: 'red',
  shadowBlur: 10,
  cornerRadius: 10
};

const rect3Config = {
  x: 50,
  y: 120,
  width: 100,
  height: 100,
  fill: 'blue',
  cornerRadius: [0, 10, 20, 30]
};
</script>`;
