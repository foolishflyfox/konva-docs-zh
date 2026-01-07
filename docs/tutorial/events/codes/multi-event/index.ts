import { createShapeCodesData } from "@docs/types";

export * from "./demo";

export const multiEventCodes = createShapeCodesData();
multiEventCodes.vanilla.js = `import Konva from 'konva';

const stage = new Konva.Stage({
  container: 'container',
  width: window.innerWidth,
  height: window.innerHeight,
});

const layer = new Konva.Layer();
stage.add(layer);

const text = new Konva.Text({
  x: 10,
  y: 10,
  fontFamily: 'Calibri',
  fontSize: 24,
  text: '',
  fill: 'black',
});
layer.add(text);

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

circle.on('mouseover mousedown mouseup', function (evt) {
  writeMessage('event: ' + evt.type);
});

layer.add(circle);
`;

multiEventCodes.react = `import { Stage, Layer, Circle, Text } from 'react-konva';
import { useState } from 'react';

const App = () => {
  const [message, setMessage] = useState('');

  const handleMultiEvent = (e) => {
    setMessage('event: ' + e.type);
  };

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
          onMouseover={handleMultiEvent}
          onMousedown={handleMultiEvent}
          onMouseup={handleMultiEvent}
        />
      </Layer>
    </Stage>
  );
};

export default App;
`;

multiEventCodes.vue.app = `<template>
  <v-stage :config="stageSize">
    <v-layer>
      <v-text :config="textConfig" />
      <v-circle
        :config="circleConfig"
        @mouseover="handleMultiEvent"
        @mousedown="handleMultiEvent"
        @mouseup="handleMultiEvent"
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

const handleMultiEvent = (e) => {
  message.value = 'event: ' + e.type;
};
</script>
`;
