import { createShapeCodesData } from "@docs/types";

export * from "./demo";
export const listenEventsCodes = createShapeCodesData();
listenEventsCodes.vanilla.js = `import Konva from 'konva';

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

const oval = new Konva.Ellipse({
  x: stage.width() / 2,
  y: stage.height() / 2,
  radiusX: 100,
  radiusY: 50,
  fill: 'yellow',
  stroke: 'black',
  strokeWidth: 4,
  listening: false,
});

oval.on('mouseover', function () {
  writeMessage('Mouseover oval');
});
oval.on('mouseout', function () {
  writeMessage('');
});

function writeMessage(message) {
  text.text(message);
}

layer.add(oval);

// add button to toggle listening
const button = document.createElement('button');
button.innerHTML = 'Listen';
document.body.appendChild(button);
button.addEventListener('click', () => {
  const listening = !oval.listening();
  oval.listening(listening);
  button.innerHTML = listening ? 'Stop listening' : 'Listen';
  layer.drawHit();
});
`;

listenEventsCodes.react = `import { Stage, Layer, Ellipse, Text } from 'react-konva';
import { useState } from 'react';

const App = () => {
  const [message, setMessage] = useState('');
  const [listening, setListening] = useState(false);

  return (
    <>
      <button onClick={() => setListening(!listening)}>
        {listening ? 'Stop listening' : 'Listen'}
      </button>
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
          <Ellipse
            x={window.innerWidth / 2}
            y={window.innerHeight / 2}
            radiusX={100}
            radiusY={50}
            fill="yellow"
            stroke="black"
            strokeWidth={4}
            listening={listening}
            onMouseover={() => setMessage('Mouseover oval')}
            onMouseout={() => setMessage('')}
          />
        </Layer>
      </Stage>
    </>
  );
};

export default App;
`;

listenEventsCodes.vue.app = `<template>
  <div>
    <button @click="toggleListening">
      {{ listening ? 'Stop listening' : 'Listen' }}
    </button>
    <v-stage :config="stageSize">
      <v-layer>
        <v-text :config="textConfig" />
        <v-ellipse
          :config="ovalConfig"
          @mouseover="handleMouseover"
          @mouseout="handleMouseout"
        />
      </v-layer>
    </v-stage>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const message = ref('');
const listening = ref(false);

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

const ovalConfig = computed(() => ({
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
  radiusX: 100,
  radiusY: 50,
  fill: 'yellow',
  stroke: 'black',
  strokeWidth: 4,
  listening: listening.value
}));

const handleMouseover = () => {
  message.value = 'Mouseover oval';
};

const handleMouseout = () => {
  message.value = '';
};

const toggleListening = () => {
  listening.value = !listening.value;
};
</script>
`;
