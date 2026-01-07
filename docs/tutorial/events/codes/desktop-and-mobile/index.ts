import { createShapeCodesData } from "@docs/types";

export * from "./demo";
export const desktopAndMobileCodes = createShapeCodesData();
desktopAndMobileCodes.vanilla.js = `import Konva from 'konva';

const stage = new Konva.Stage({
  container: 'container',
  width: window.innerWidth,
  height: window.innerHeight,
});

const layer = new Konva.Layer();

const text = new Konva.Text({
  x: 10,
  y: 10,
  fontFamily: 'Calibri',
  fontSize: 24,
  text: '',
  fill: 'black',
});

const circle = new Konva.Circle({
  x: stage.width() / 2,
  y: stage.height() / 2,
  radius: 70,
  fill: 'red',
  stroke: 'black',
  strokeWidth: 4,
});

function writeMessage(message) {
  text.text(message);
}

// desktop and mobile events
circle.on('mousedown touchstart', function () {
  writeMessage('Mousedown or touchstart');
});

circle.on('mouseup touchend', function () {
  writeMessage('Mouseup or touchend');
});

layer.add(circle);
layer.add(text);
stage.add(layer);
`;

desktopAndMobileCodes.react = `import { Stage, Layer, Circle, Text } from 'react-konva';
import { useState } from 'react';

const App = () => {
  const [message, setMessage] = useState('');

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Text
          x={10}
          y={10}
          fontFamily="Calibri"
          fontSize={24}
          text={message}
          fill="black"
        />
        <Circle
          x={window.innerWidth / 2}
          y={window.innerHeight / 2}
          radius={70}
          fill="red"
          stroke="black"
          strokeWidth={4}
          onMousedown={() => setMessage('Mousedown or touchstart')}
          onTouchstart={() => setMessage('Mousedown or touchstart')}
          onMouseup={() => setMessage('Mouseup or touchend')}
          onTouchend={() => setMessage('Mouseup or touchend')}
        />
      </Layer>
    </Stage>
  );
};

export default App;
`;

desktopAndMobileCodes.vue.app = `<template>
  <v-stage :config="stageSize">
    <v-layer>
      <v-text :config="textConfig" />
      <v-circle
        :config="circleConfig"
        @mousedown="handleStart"
        @touchstart="handleStart"
        @mouseup="handleEnd"
        @touchend="handleEnd"
      />
    </v-layer>
  </v-stage>
</template>

<script setup>
import { ref, computed } from 'vue';

const message = ref('');

const stageSize = {
  width: window.innerWidth,
  height: window.innerHeight
};

const textConfig = computed(() => ({
  x: 10,
  y: 10,
  fontFamily: 'Calibri',
  fontSize: 24,
  text: message.value,
  fill: 'black'
}));

const circleConfig = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
  radius: 70,
  fill: 'red',
  stroke: 'black',
  strokeWidth: 4
};

const handleStart = () => {
  message.value = 'Mousedown or touchstart';
};

const handleEnd = () => {
  message.value = 'Mouseup or touchend';
};
</script>
`;
