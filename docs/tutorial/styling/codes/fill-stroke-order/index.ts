import { createShapeCodesData } from "@docs/types";

export * from "./demo";
export const fillStrokeOrderCodes = createShapeCodesData();
fillStrokeOrderCodes.vanilla.js = `import Konva from 'konva';

const stage = new Konva.Stage({
  container: 'container',
  width: window.innerWidth,
  height: window.innerHeight,
});

const layer = new Konva.Layer();
stage.add(layer);

const text1 = new Konva.Text({
  text: 'Default shape rendering.\nfillAfterStrokeEnabled = false',
  x: 50,
  y: 50,
  fontSize: 40,
  stroke: 'green',
  fill: 'yellow',
  strokeWidth: 3,
});
layer.add(text1);

const text2 = new Konva.Text({
  text: 'Reversed rendering order.\nfillAfterStrokeEnabled = true',
  x: 50,
  y: 150,
  fontSize: 40,
  stroke: 'green',
  fill: 'yellow',
  strokeWidth: 3,
  fillAfterStrokeEnabled: true,
});
layer.add(text2);
`;

fillStrokeOrderCodes.react = `import { Stage, Layer, Text } from 'react-konva';

const App = () => {
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Text
          text="Default shape rendering.\nfillAfterStrokeEnabled = false"
          x={50}
          y={50}
          fontSize={40}
          stroke="green"
          fill="yellow"
          strokeWidth={3}
        />
        <Text
          text="Reversed rendering order.\nfillAfterStrokeEnabled = true"
          x={50}
          y={150}
          fontSize={40}
          stroke="green"
          fill="yellow"
          strokeWidth={3}
          fillAfterStrokeEnabled={true}
        />
      </Layer>
    </Stage>
  );
};

export default App;
`;

fillStrokeOrderCodes.vue.app = `<template>
  <v-stage :config="stageSize">
    <v-layer>
      <v-text :config="textConfig1" />
      <v-text :config="textConfig2" />
    </v-layer>
  </v-stage>
</template>

<script setup>
const stageSize = {
  width: window.innerWidth,
  height: window.innerHeight
};

const textConfig1 = {
  text: 'Default shape rendering.\nfillAfterStrokeEnabled = false',
  x: 50,
  y: 50,
  fontSize: 40,
  stroke: 'green',
  fill: 'yellow',
  strokeWidth: 3
};

const textConfig2 = {
  text: 'Reversed rendering order.\nfillAfterStrokeEnabled = true',
  x: 50,
  y: 150,
  fontSize: 40,
  stroke: 'green',
  fill: 'yellow',
  strokeWidth: 3,
  fillAfterStrokeEnabled: true
};
</script>
`;
