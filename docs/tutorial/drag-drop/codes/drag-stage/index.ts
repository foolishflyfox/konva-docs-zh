import { createShapeCodesData } from "@docs/types";

export * from "./demo";

export const dragStageCodes = createShapeCodesData();
dragStageCodes.vanilla.js = `import Konva from 'konva';

const stage = new Konva.Stage({
  container: 'container',
  width: window.innerWidth,
  height: window.innerHeight,
  draggable: true
});

const layer = new Konva.Layer();
stage.add(layer);

// create circle
const circle = new Konva.Circle({
  x: stage.width() / 2,
  y: stage.height() / 2,
  radius: 70,
  fill: 'red',
  stroke: 'black',
  strokeWidth: 4
});

// create text
const text = new Konva.Text({
  x: 10,
  y: 10,
  text: 'Drag the stage anywhere',
  fontSize: 20,
  fontFamily: 'Calibri',
  fill: 'black'
});

layer.add(circle);
layer.add(text);
`;

dragStageCodes.react = `import { Stage, Layer, Circle, Text } from 'react-konva';

const App = () => {
  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      draggable
    >
      <Layer>
        <Circle
          x={window.innerWidth / 2}
          y={window.innerHeight / 2}
          radius={70}
          fill="red"
          stroke="black"
          strokeWidth={4}
        />
        <Text
          x={10}
          y={10}
          text="Drag the stage anywhere"
          fontSize={20}
          fontFamily="Calibri"
          fill="black"
        />
      </Layer>
    </Stage>
  );
};

export default App;
`;

dragStageCodes.vue.app = `<template>
  <v-stage :config="stageConfig">
    <v-layer>
      <v-circle :config="circleConfig" />
      <v-text :config="textConfig" />
    </v-layer>
  </v-stage>
</template>

<script setup>
const stageConfig = {
  width: window.innerWidth,
  height: window.innerHeight,
  draggable: true
};

const circleConfig = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
  radius: 70,
  fill: 'red',
  stroke: 'black',
  strokeWidth: 4
};

const textConfig = {
  x: 10,
  y: 10,
  text: 'Drag the stage anywhere',
  fontSize: 20,
  fontFamily: 'Calibri',
  fill: 'black'
};
</script>
`;
