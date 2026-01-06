import { createShapeCodesData } from "@docs/types";

export * from "./demo";

export const cancelPropagationCodes = createShapeCodesData();
cancelPropagationCodes.vanilla.js = `import Konva from 'konva';

const stage = new Konva.Stage({
  container: 'container',
  width: window.innerWidth,
  height: window.innerHeight,
});

const layer = new Konva.Layer();
stage.add(layer);

const circle = new Konva.Circle({
  x: stage.width() / 2,
  y: stage.height() / 2,
  radius: 70,
  fill: 'red',
  stroke: 'black',
  strokeWidth: 4,
});

circle.on('click', function (evt) {
  alert('You clicked on the circle');
  // stop event bubble
  evt.cancelBubble = true;
});

layer.on('click', function () {
  alert('You clicked on the layer');
});

layer.add(circle);
`;

cancelPropagationCodes.react = `import { Stage, Layer, Circle } from 'react-konva';

const App = () => {
  const handleCircleClick = (e) => {
    alert('You clicked on the circle');
    // stop event bubble
    e.cancelBubble = true;
  };

  const handleLayerClick = () => {
    alert('You clicked on the layer');
  };

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer onClick={handleLayerClick}>
        <Circle
          x={window.innerWidth / 2}
          y={window.innerHeight / 2}
          radius={70}
          fill="red"
          stroke="black"
          strokeWidth={4}
          onClick={handleCircleClick}
        />
      </Layer>
    </Stage>
  );
};

export default App;
`;

cancelPropagationCodes.vue.app = `<template>
  <v-stage :config="stageSize">
    <v-layer @click="handleLayerClick">
      <v-circle
        :config="circleConfig"
        @click="handleCircleClick"
      />
    </v-layer>
  </v-stage>
</template>

<script setup>
const stageSize = {
  width: window.innerWidth,
  height: window.innerHeight
};

const circleConfig = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
  radius: 70,
  fill: 'red',
  stroke: 'black',
  strokeWidth: 4
};

const handleCircleClick = (e) => {
  alert('You clicked on the circle');
  // stop event bubble
  e.cancelBubble = true;
};

const handleLayerClick = () => {
  alert('You clicked on the layer');
};
</script>
`;
