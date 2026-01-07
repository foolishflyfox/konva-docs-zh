import { createShapeCodesData } from "@docs/types";

export * from "./demo";
export const fireEventsCodes = createShapeCodesData();
fireEventsCodes.vanilla.js = `import Konva from 'konva';

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

// add shape event listener
circle.on('customEvent', function (evt) {
  alert('custom event fired');
});

// add button to trigger custom event
const button = document.createElement('button');
button.innerHTML = 'Fire Custom Event';
button.style.position = 'absolute';
button.style.top = '10px';
button.style.left = '10px';
button.style.zIndex = '1';
document.body.appendChild(button);
button.addEventListener('click', () => {
  // fire custom event
  circle.fire('customEvent', {
    bubbles: true,
  });
});

layer.add(circle);
`;

fireEventsCodes.react = `import { Stage, Layer, Circle } from 'react-konva';
import { useRef } from 'react';

const App = () => {
  const circleRef = useRef();

  const handleCustomEvent = () => {
    alert('custom event fired');
  };

  const fireCustomEvent = () => {
    circleRef.current.fire('customevent', {
      bubbles: true,
    });
  };

  return (
    <>
      <button 
        onClick={fireCustomEvent}
        style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          zIndex: 1
        }}
      >
        Fire Custom Event
      </button>
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Circle
            ref={circleRef}
            x={window.innerWidth / 2}
            y={window.innerHeight / 2}
            radius={70}
            fill="red"
            stroke="black"
            strokeWidth={4}
            onCustomevent={handleCustomEvent}
          />
        </Layer>
      </Stage>
    </>
  );
};

export default App;
`;

fireEventsCodes.vue.app = `<template>
  <div>
    <button 
      @click="fireCustomEvent"
      style="position: absolute; top: 10px; left: 10px; z-index: 1"
    >
      Fire Custom Event
    </button>
    <v-stage :config="stageSize">
      <v-layer>
        <v-circle
          ref="circleRef"
          :config="circleConfig"
          @customEvent="handleCustomEvent"
        />
      </v-layer>
    </v-stage>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const circleRef = ref(null);

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

const handleCustomEvent = () => {
  alert('custom event fired');
};

const fireCustomEvent = () => {
  circleRef.value.getNode().fire('customevent', {
    bubbles: true,
  });
};
</script>
`;
