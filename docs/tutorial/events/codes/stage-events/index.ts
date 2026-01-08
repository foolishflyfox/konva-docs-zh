import { createShapeCodesData } from "@docs/types";

export * from "./demo";

export const stageEventsCodes = createShapeCodesData();
stageEventsCodes.vanilla.js = `import Konva from 'konva';

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

// handle stage click
stage.on('click', function (e) {
  if (e.target === stage) {
    writeMessage('clicked on stage');
    return;
  }
  writeMessage('clicked on ' + e.target.name());
});

// add shape
circle.name('circle');
layer.add(circle);
`;

stageEventsCodes.react = `import { Stage, Layer, Circle, Text } from 'react-konva';
import { useState } from 'react';

const App = () => {
  const [message, setMessage] = useState('');

  const handleStageClick = (e) => {
    if (e.target === e.target.getStage()) {
      setMessage('clicked on stage');
      return;
    }
    setMessage('clicked on ' + e.target.name());
  };

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      onClick={handleStageClick}
    >
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
          name="circle"
        />
      </Layer>
    </Stage>
  );
};

export default App;
`;

stageEventsCodes.vue.app = `<template>
  <v-stage :config="stageSize" @click="handleStageClick">
    <v-layer>
      <v-text :config="textConfig" />
      <v-circle :config="circleConfig" />
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
  strokeWidth: 4,
  name: 'circle'
};

const handleStageClick = (e) => {
  if (e.target === e.target.getStage()) {
    message.value = 'clicked on stage';
    return;
  }
  message.value = 'clicked on ' + e.target.name();
};
</script>
`;
