import { createShapeCodesData } from "@docs/types";

export * from "./demo";

export const mobileScrollingCodes = createShapeCodesData();
mobileScrollingCodes.vanilla.js = `import Konva from 'konva';

const stage = new Konva.Stage({
  container: 'container',
  width: window.innerWidth,
  height: window.innerHeight,
});

const layer = new Konva.Layer();
stage.add(layer);

// green rectangle - will prevent scrolling
const greenRect = new Konva.Rect({
  x: 50,
  y: 50,
  width: 100,
  height: 600,
  fill: 'green',
  stroke: 'black',
  strokeWidth: 4,
});
layer.add(greenRect);

// red rectangle - will NOT prevent scrolling
const redRect = new Konva.Rect({
  x: 200,
  y: 50,
  width: 100,
  height: 600,
  fill: 'red',
  stroke: 'black',
  strokeWidth: 4,
  preventDefault: false,
});
layer.add(redRect);
`;

mobileScrollingCodes.react = `import { Stage, Layer, Rect } from 'react-konva';

const App = () => {
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Rect
          x={50}
          y={50}
          width={100}
          height={600}
          fill="green"
          stroke="black"
          strokeWidth={4}
        />
        <Rect
          x={200}
          y={50}
          width={100}
          height={600}
          fill="red"
          stroke="black"
          strokeWidth={4}
          preventDefault={false}
        />
      </Layer>
    </Stage>
  );
};

export default App;
`;

mobileScrollingCodes.vue.app = `<template>
  <v-stage :config="stageSize">
    <v-layer>
      <v-rect :config="greenRectConfig" />
      <v-rect :config="redRectConfig" />
    </v-layer>
  </v-stage>
</template>

<script setup>
const stageSize = {
  width: window.innerWidth,
  height: window.innerHeight
};

const greenRectConfig = {
  x: 50,
  y: 50,
  width: 100,
  height: 600,
  fill: 'green',
  stroke: 'black',
  strokeWidth: 4
};

const redRectConfig = {
  x: 200,
  y: 50,
  width: 100,
  height: 600,
  fill: 'red',
  stroke: 'black',
  strokeWidth: 4,
  preventDefault: false
};
</script>
`;
