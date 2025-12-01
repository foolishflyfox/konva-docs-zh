import { createShapeCodesData } from "@docs/types";
export * from "./demo";

export const wedgeCodes = createShapeCodesData();

wedgeCodes.vanilla.js = `import Konva from 'konva';

const stage = new Konva.Stage({
  container: 'container',
  width: window.innerWidth,
  height: window.innerHeight
});

const layer = new Konva.Layer();
stage.add(layer);

const wedge = new Konva.Wedge({
  x: stage.width() / 2,
  y: stage.height() / 2,
  radius: 70,
  angle: 60,
  fill: 'red',
  stroke: 'black',
  strokeWidth: 4,
  rotation: -120
});

layer.add(wedge);
`;

wedgeCodes.react = `import { Stage, Layer, Wedge } from 'react-konva';

const App = () => {
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Wedge
          x={window.innerWidth / 2}
          y={window.innerHeight / 2}
          radius={70}
          angle={60}
          fill="red"
          stroke="black"
          strokeWidth={4}
          rotation={-120}
        />
      </Layer>
    </Stage>
  );
};

export default App;
`;

wedgeCodes.vue.app = `<template>
  <v-stage :config="stageSize">
    <v-layer>
      <v-wedge :config="wedgeConfig" />
    </v-layer>
  </v-stage>
</template>

<script setup>
const stageSize = {
  width: window.innerWidth,
  height: window.innerHeight
};

const wedgeConfig = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
  radius: 70,
  angle: 60,
  fill: 'red',
  stroke: 'black',
  strokeWidth: 4,
  rotation: -120
};
</script>
`;
