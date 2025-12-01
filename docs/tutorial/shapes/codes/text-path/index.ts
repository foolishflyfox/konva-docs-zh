import { createShapeCodesData } from "@docs/types";

export * from "./demo";
export const textPathCodes = createShapeCodesData();

textPathCodes.vanilla.js = `import Konva from 'konva';

const stage = new Konva.Stage({
  container: 'container',
  width: window.innerWidth,
  height: window.innerHeight
});

const layer = new Konva.Layer();
stage.add(layer);

const textPath = new Konva.TextPath({
  x: 0,
  y: 50,
  fill: '#333',
  fontSize: 16,
  fontFamily: 'Arial',
  text: 'All the world\\'s a stage, and all the men and women merely players.',
  data: 'M10,10 C0,0 10,150 100,100 S300,150 400,50',
});

layer.add(textPath);
`;

textPathCodes.react = `import { Stage, Layer, TextPath } from 'react-konva';

const App = () => {
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <TextPath
          x={0}
          y={50}
          fill="#333"
          fontSize={16}
          fontFamily="Arial"
          text="All the world's a stage, and all the men and women merely players."
          data="M10,10 C0,0 10,150 100,100 S300,150 400,50"
        />
      </Layer>
    </Stage>
  );
};

export default App;
`;

textPathCodes.vue.app = `<template>
  <v-stage :config="stageSize">
    <v-layer>
      <v-text-path :config="textPathConfig" />
    </v-layer>
  </v-stage>
</template>

<script setup>
const stageSize = {
  width: window.innerWidth,
  height: window.innerHeight
};

const textPathConfig = {
  x: 0,
  y: 50,
  fill: '#333',
  fontSize: 16,
  fontFamily: 'Arial',
  text: "All the world's a stage, and all the men and women merely players.",
  data: 'M10,10 C0,0 10,150 100,100 S300,150 400,50'
};
</script>
`;
