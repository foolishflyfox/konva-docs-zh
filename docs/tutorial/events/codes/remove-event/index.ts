import { createShapeCodesData } from "@docs/types";

export * from "./demo";
export const removeEventCodes = createShapeCodesData();
removeEventCodes.vanilla.js = `import Konva from 'konva';

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

// add click listener
circle.on('click', function () {
  alert('you clicked the circle');
});

layer.add(circle);

// add button to remove listener
const button = document.createElement('button');
button.style.position = 'absolute';
button.style.top = '10px';
button.style.left = '10px';
button.innerHTML = 'Remove click listener';
document.body.appendChild(button);
button.addEventListener('click', () => {
  // remove click listener
  circle.off('click');
});
`;

removeEventCodes.react = `import { Stage, Layer, Circle } from 'react-konva';
import { useState } from 'react';

const App = () => {
  const [hasListener, setHasListener] = useState(true);

  return (
    <>
      <button onClick={() => setHasListener(false)}>
        Remove click listener
      </button>
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Circle
            x={window.innerWidth / 2}
            y={window.innerHeight / 2}
            radius={70}
            fill="red"
            stroke="black"
            strokeWidth={4}
            onClick={hasListener ? () => alert('you clicked the circle') : null}
          />
        </Layer>
      </Stage>
    </>
  );
};

export default App;
`;

removeEventCodes.vue.app = `<template>
  <div>
    <button @click="removeListener">Remove click listener</button>
    <v-stage :config="stageSize">
      <v-layer>
        <!-- 
          Note: Vue-Konva doesn't support conditional event binding like @click="condition ? handler : null"
          Instead, we keep the click handler attached and check the condition inside the handler function
        -->
        <v-circle
          :config="circleConfig"
          @click="handleClick"
        />
      </v-layer>
    </v-stage>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const hasListener = ref(true);

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

const handleClick = () => {
  if (hasListener.value) {
    alert('you clicked the circle');
  }
};

const removeListener = () => {
  hasListener.value = false;
};
</script>
`;
