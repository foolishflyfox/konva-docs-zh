import { createShapeCodesData } from "@docs/types";

export * from "./demo";
export const layeringCodes = createShapeCodesData();
layeringCodes.vanilla.js = `import Konva from 'konva';

const width = window.innerWidth;
const height = window.innerHeight;

const stage = new Konva.Stage({
container: 'container',
width: width,
height: height,
});

const layer = new Konva.Layer();

const yellowBox = new Konva.Rect({
x: 50,
y: 50,
width: 100,
height: 100,
fill: 'yellow',
stroke: 'black',
strokeWidth: 4,
draggable: true,
});

const redBox = new Konva.Rect({
x: 100,
y: 100,
width: 100,
height: 100,
fill: 'red',
stroke: 'black',
strokeWidth: 4,
draggable: true,
});

layer.add(yellowBox);
layer.add(redBox);
stage.add(layer);

// create buttons
const toTopBtn = document.createElement('button');
toTopBtn.textContent = 'Move yellow box to top';
toTopBtn.addEventListener('click', () => {
yellowBox.moveToTop();
});

const toBottomBtn = document.createElement('button');
toBottomBtn.textContent = 'Move yellow box to bottom';
toBottomBtn.addEventListener('click', () => {
yellowBox.moveToBottom();
});

document.body.prepend(toTopBtn);
document.body.prepend(toBottomBtn);
`;

layeringCodes.react = `import { Stage, Layer, Rect } from 'react-konva';
import { useState } from 'react';

const App = () => {
  const [yellowOnTop, setYellowOnTop] = useState(false);

  return (
    <>
      <button onClick={() => setYellowOnTop(true)}>
        Move yellow box to top
      </button>
      <button onClick={() => setYellowOnTop(false)}>
        Move yellow box to bottom
      </button>
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          {!yellowOnTop && (
            <Rect
              x={100}
              y={100}
              width={100}
              height={100}
              fill="red"
              stroke="black"
              strokeWidth={4}
              draggable
            />
          )}
          <Rect
            x={50}
            y={50}
            width={100}
            height={100}
            fill="yellow"
            stroke="black"
            strokeWidth={4}
            draggable
          />
          {yellowOnTop && (
            <Rect
              x={100}
              y={100}
              width={100}
              height={100}
              fill="red"
              stroke="black"
              strokeWidth={4}
              draggable
            />
          )}
        </Layer>
      </Stage>
    </>
  );
};

export default App;
`;

layeringCodes.vue.app = `<template>
  <div>
    <button @click="moveYellowToTop">Move yellow box to top</button>
    <button @click="moveYellowToBottom">Move yellow box to bottom</button>
    <v-stage :config="stageSize">
      <v-layer>
        <template v-if="!yellowOnTop">
          <v-rect :config="redBoxConfig" />
        </template>
        <v-rect :config="yellowBoxConfig" />
        <template v-if="yellowOnTop">
          <v-rect :config="redBoxConfig" />
        </template>
      </v-layer>
    </v-stage>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const stageSize = {
  width: window.innerWidth,
  height: window.innerHeight
};

const yellowOnTop = ref(false);

const yellowBoxConfig = {
  x: 50,
  y: 50,
  width: 100,
  height: 100,
  fill: 'yellow',
  stroke: 'black',
  strokeWidth: 4,
  draggable: true
};

const redBoxConfig = {
  x: 100,
  y: 100,
  width: 100,
  height: 100,
  fill: 'red',
  stroke: 'black',
  strokeWidth: 4,
  draggable: true
};

const moveYellowToTop = () => {
  yellowOnTop.value = true;
};

const moveYellowToBottom = () => {
  yellowOnTop.value = false;
};
</script>
`;
