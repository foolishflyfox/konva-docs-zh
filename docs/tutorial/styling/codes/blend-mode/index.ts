import { createShapeCodesData } from "@docs/types";

export * from "./demo";

export const blendModeCodes = createShapeCodesData();
blendModeCodes.vanilla.js = `import Konva from 'konva';

const stage = new Konva.Stage({
  container: 'container',
  width: window.innerWidth,
  height: window.innerHeight
});

const layer = new Konva.Layer();

const text = new Konva.Text({
  text: 'Text Shadow!',
  fontFamily: 'Calibri',
  fontSize: 40,
  x: 20,
  y: 20,
  fill: 'green',
  shadowColor: 'white',
  shadowOffset: { x: 10, y: 10 }
});
layer.add(text);

const rect = new Konva.Rect({
  x: 50,
  y: 50,
  width: 100,
  height: 100,
  fill: 'red',
  draggable: true,
  globalCompositeOperation: 'xor'
});

layer.add(rect);
stage.add(layer);
`;

blendModeCodes.react = `import { Stage, Layer, Text, Rect } from 'react-konva';

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
          fill="green"
          shadowColor="white"
          shadowOffset={{ x: 10, y: 10 }}
        />
        <Rect
          x={50}
          y={50}
          width={100}
          height={100}
          fill="red"
          draggable={true}
          globalCompositeOperation="xor"
        />
      </Layer>
    </Stage>
  );
};

export default App;
`;

blendModeCodes.vue.app = `<template>
  <v-stage :config="stageSize">
    <v-layer>
      <v-text :config="textConfig" />
      <v-rect :config="rectConfig" />
    </v-layer>
  </v-stage>
</template>

<script setup>
const stageSize = {
  width: window.innerWidth,
  height: window.innerHeight
};

const textConfig = {
  text: 'Text Shadow!',
  fontFamily: 'Calibri',
  fontSize: 40,
  x: 20,
  y: 20,
  fill: 'green',
  shadowColor: 'white',
  shadowOffset: { x: 10, y: 10 }
};

const rectConfig = {
  x: 50,
  y: 50,
  width: 100,
  height: 100,
  fill: 'red',
  draggable: true,
  globalCompositeOperation: 'xor'
};
</script>
`;
