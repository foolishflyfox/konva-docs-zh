import { createShapeCodesData } from "@docs/types";

export * from "./demo";

export const shadowCodes = createShapeCodesData();

shadowCodes.vanilla.js = `import Konva from 'konva';

var width = window.innerWidth;
var height = window.innerHeight;

var stage = new Konva.Stage({
    container: 'container',
    width: width,
    height: height,
});

var layer = new Konva.Layer();

var text = new Konva.Text({
    text: 'Text Shadow!',
    fontFamily: 'Calibri',
    fontSize: 40,
    x: 20,
    y: 20,
    stroke: 'red',
    strokeWidth: 2,
    shadowColor: 'black',
    shadowBlur: 0,
    shadowOffset: { x: 10, y: 10 },
    shadowOpacity: 0.5,
});

var line = new Konva.Line({
    stroke: 'green',
    strokeWidth: 10,
    lineJoin: 'round',
    lineCap: 'round',
    points: [50, 140, 250, 160],
    shadowColor: 'black',
    shadowBlur: 10,
    shadowOffset: { x: 10, y: 10 },
    shadowOpacity: 0.5,
});

var rect = new Konva.Rect({
    x: 100,
    y: 120,
    width: 100,
    height: 50,
    fill: '#00D2FF',
    stroke: 'black',
    strokeWidth: 4,
    shadowColor: 'black',
    shadowBlur: 10,
    shadowOffset: { x: 10, y: 10 },
    shadowOpacity: 0.5,
});

layer.add(text);
layer.add(line);
layer.add(rect);
stage.add(layer);
`;

shadowCodes.react = `import React from 'react';
import { Stage, Layer, Text, Line, Rect } from 'react-konva';

const App = () => {
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Text
          text="Text Shadow!"
          fontFamily="Calibri"
          fontSize={40}
          x={20}
          y={20}
          stroke="red"
          strokeWidth={2}
          shadowColor="black"
          shadowBlur={0}
          shadowOffset={{ x: 10, y: 10 }}
          shadowOpacity={0.5}
        />
        <Line
          stroke="green"
          strokeWidth={10}
          lineJoin="round"
          lineCap="round"
          points={[50, 140, 250, 160]}
          shadowColor="black"
          shadowBlur={10}
          shadowOffset={{ x: 10, y: 10 }}
          shadowOpacity={0.5}
        />
        <Rect
          x={100}
          y={120}
          width={100}
          height={50}
          fill="#00D2FF"
          stroke="black"
          strokeWidth={4}
          shadowColor="black"
          shadowBlur={10}
          shadowOffset={{ x: 10, y: 10 }}
          shadowOpacity={0.5}
        />
      </Layer>
    </Stage>
  );
};

export default App;
`;

shadowCodes.vue.app = `<template>
  <v-stage :config="stageSize">
    <v-layer>
      <v-text
        :config="{
          text: 'Text Shadow!',
          fontFamily: 'Calibri',
          fontSize: 40,
          x: 20,
          y: 20,
          stroke: 'red',
          strokeWidth: 2,
          shadowColor: 'black',
          shadowBlur: 0,
          shadowOffset: { x: 10, y: 10 },
          shadowOpacity: 0.5,
        }"
      />
      <v-line
        :config="{
          stroke: 'green',
          strokeWidth: 10,
          lineJoin: 'round',
          lineCap: 'round',
          points: [50, 140, 250, 160],
          shadowColor: 'black',
          shadowBlur: 10,
          shadowOffset: { x: 10, y: 10 },
          shadowOpacity: 0.5,
        }"
      />
      <v-rect
        :config="{
          x: 100,
          y: 120,
          width: 100,
          height: 50,
          fill: '#00D2FF',
          stroke: 'black',
          strokeWidth: 4,
          shadowColor: 'black',
          shadowBlur: 10,
          shadowOffset: { x: 10, y: 10 },
          shadowOpacity: 0.5,
        }"
      />
    </v-layer>
  </v-stage>
</template>

<script>
export default {
  data() {
    return {
      stageSize: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
    };
  },
};
</script>
`;
