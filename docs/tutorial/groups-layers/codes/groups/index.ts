import { createShapeCodesData } from "@docs/types";

export * from "./demo";

export const groupsCodes = createShapeCodesData();
groupsCodes.vanilla.js = `import Konva from 'konva';

const width = window.innerWidth;
const height = window.innerHeight;

const stage = new Konva.Stage({
container: 'container',
width: width,
height: height,
});

const layer = new Konva.Layer();

const group = new Konva.Group({
x: 50,
y: 50,
draggable: true,
});

const circle = new Konva.Circle({
x: 40,
y: 40,
radius: 30,
fill: 'red',
stroke: 'black',
strokeWidth: 4,
});

const rect = new Konva.Rect({
x: 80,
y: 20,
width: 100,
height: 50,
fill: 'green',
stroke: 'black',
strokeWidth: 4,
});

group.add(circle);
group.add(rect);
layer.add(group);
stage.add(layer);
`;

groupsCodes.react = `import { Stage, Layer, Group, Circle, Rect } from 'react-konva';

const App = () => {
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Group x={50} y={50} draggable>
          <Circle
            x={40}
            y={40}
            radius={30}
            fill="red"
            stroke="black"
            strokeWidth={4}
          />
          <Rect
            x={80}
            y={20}
            width={100}
            height={50}
            fill="green"
            stroke="black"
            strokeWidth={4}
          />
        </Group>
      </Layer>
    </Stage>
  );
};

export default App;
`;

groupsCodes.vue.app = `<template>
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
  x: 40,
  y: 40,
  radius: 30,
  fill: 'red',
  stroke: 'black',
  strokeWidth: 4
};

const rectConfig = {
  x: 80,
  y: 20,
  width: 100,
  height: 50,
  fill: 'green',
  stroke: 'black',
  strokeWidth: 4
};
</script>
`;
