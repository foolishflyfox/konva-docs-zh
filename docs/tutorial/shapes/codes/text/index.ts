import { createShapeCodesData } from "@docs/types";
export * from "./demo";
export const textCodes = createShapeCodesData();
textCodes.vanilla.js = `import Konva from 'konva';

const stage = new Konva.Stage({
  container: 'container',
  width: window.innerWidth,
  height: window.innerHeight
});

const layer = new Konva.Layer();
stage.add(layer);

// 简单文本
const simpleText = new Konva.Text({
  x: stage.width() / 2,
  y: 15,
  text: 'Simple Text',
  fontSize: 30,
  fontFamily: 'Calibri',
  fill: 'green'
});

simpleText.offsetX(simpleText.width() / 2);

// Complex text with background
const complexText = new Konva.Text({
  x: 20,
  y: 60,
  text: "COMPLEX TEXT\n\nAll the world's a stage, and all the men and women merely players. They have their exits and their entrances.",
  fontSize: 18,
  fontFamily: 'Calibri',
  fill: '#555',
  width: 300,
  padding: 20,
  align: 'center'
});

const rect = new Konva.Rect({
  x: 20,
  y: 60,
  stroke: '#555',
  strokeWidth: 5,
  fill: '#ddd',
  width: 300,
  height: complexText.height(),
  shadowColor: 'black',
  shadowBlur: 10,
  shadowOffsetX: 10,
  shadowOffsetY: 10,
  shadowOpacity: 0.2,
  cornerRadius: 10
});

layer.add(rect);
layer.add(simpleText);
layer.add(complexText);
`;

textCodes.react = `import { Stage, Layer, Text, Rect } from 'react-konva';

const text = \`COMPLEX TEXT

All the world's a stage, and all the men and women merely players. They have their exits and their entrances.\`;
const App = () => {
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Text
          x={window.innerWidth / 2}
          y={15}
          text="Simple Text"
          fontSize={30}
          fontFamily="Calibri"
          fill="green"
          offsetX={60} // Approximate half width
        />
        <Rect
          x={20}
          y={60}
          stroke="#555"
          strokeWidth={5}
          fill="#ddd"
          width={300}
          height={200} // Approximate height
          shadowColor="black"
          shadowBlur={10}
          shadowOffsetX={10}
          shadowOffsetY={10}
          shadowOpacity={0.2}
          cornerRadius={10}
        />
        <Text
          x={20}
          y={60}
          text={text}
          fontSize={18}
          fontFamily="Calibri"
          fill="#555"
          width={300}
          padding={20}
          align="center"
        />
      </Layer>
    </Stage>
  );
};

export default App;
`;

textCodes.vue.app = `<template>
  <v-stage :config="stageSize">
    <v-layer>
      <v-rect :config="rectConfig" />
      <v-text :config="simpleTextConfig" />
      <v-text :config="complexTextConfig" />
    </v-layer>
  </v-stage>
</template>

<script setup>
const stageSize = {
  width: window.innerWidth,
  height: window.innerHeight
};

const simpleTextConfig = {
  x: window.innerWidth / 2,
  y: 15,
  text: 'Simple Text',
  fontSize: 30,
  fontFamily: 'Calibri',
  fill: 'green',
  offsetX: 60 // Approximate half width
};

const complexTextConfig = {
  x: 20,
  y: 60,
  text: "COMPLEX TEXT\n\nAll the world's a stage, and all the men and women merely players. They have their exits and their entrances.",
  fontSize: 18,
  fontFamily: 'Calibri',
  fill: '#555',
  width: 300,
  padding: 20,
  align: 'center'
};

const rectConfig = {
  x: 20,
  y: 60,
  stroke: '#555',
  strokeWidth: 5,
  fill: '#ddd',
  width: 300,
  height: 200, // Approximate height
  shadowColor: 'black',
  shadowBlur: 10,
  shadowOffsetX: 10,
  shadowOffsetY: 10,
  shadowOpacity: 0.2,
  cornerRadius: 10
};
</script>
`;
