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

const group = new Konva.Group({
  x: 50,
  y: 50,
  draggable: true
});

const circle = new Konva.Circle({
  x: 0,
  y: 0,
  radius: 30,
  fill: 'red'
});

const rect = new Konva.Rect({
  x: 20,
  y: 20,
  width: 100,
  height: 50,
  fill: 'green'
});

group.add(circle);
group.add(rect);
layer.add(group);`;

codesData.react = `import { Stage, Layer, Group, Circle, Rect } from 'react-konva';

const App = () => {
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Group x={50} y={50} draggable>
          <Circle x={0} y={0} radius={30} fill="red" />
          <Rect x={20} y={20} width={100} height={50} fill="green" />
        </Group>
      </Layer>
    </Stage>
  );
};

export default App;`;

codesData.vue.app = `<template>
  <v-stage :config="stageSize">
    <v-layer>
      <v-group :config="groupConfig">
        <v-circle :config="circleConfig" />
        <v-rect :config="rectConfig" />
      </v-group>
    </v-layer>
  </v-stage>
</template>

<script setup>
const stageSize = {
  width: window.innerWidth,
  height: window.innerHeight
};

const groupConfig = {
  x: 50,
  y: 50,
  draggable: true
};

const circleConfig = {
  x: 0,
  y: 0,
  radius: 30,
  fill: 'red'
};

const rectConfig = {
  x: 20,
  y: 20,
  width: 100,
  height: 50,
  fill: 'green'
};
</script>`;
