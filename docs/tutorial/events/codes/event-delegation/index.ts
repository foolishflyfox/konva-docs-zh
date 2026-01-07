import { createShapeCodesData } from "@docs/types";

export * from "./demo";
export const eventDelegationCodes = createShapeCodesData();
eventDelegationCodes.vanilla.js = `import Konva from 'konva';

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

const star = new Konva.Star({
  x: stage.width() / 2,
  y: stage.height() / 2,
  numPoints: 5,
  innerRadius: 40,
  outerRadius: 70,
  fill: 'red',
  stroke: 'black',
  strokeWidth: 4,
});
layer.add(star);

// add event delegation
layer.on('click', function (evt) {
  const shape = evt.target;
  text.text('click on ' + shape.getClassName());
});
`;

eventDelegationCodes.react = `import { Stage, Layer, Star, Text } from 'react-konva';
import { useState } from 'react';

const App = () => {
  const [message, setMessage] = useState('');

  const handleLayerClick = (e) => {
    const shape = e.target;
    setMessage('click on ' + shape.getClassName());
  };

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer onClick={handleLayerClick}>
        <Text
          x={10}
          y={10}
          fontFamily="Calibri"
          fontSize={24}
          text={message}
          fill="black"
        />
        <Star
          x={window.innerWidth / 2}
          y={window.innerHeight / 2}
          numPoints={5}
          innerRadius={40}
          outerRadius={70}
          fill="red"
          stroke="black"
          strokeWidth={4}
        />
      </Layer>
    </Stage>
  );
};

export default App;
`;

eventDelegationCodes.vue.app = `<template>
  <v-stage :config="stageSize">
    <v-layer @click="handleLayerClick">
      <v-text :config="textConfig" />
      <v-star :config="starConfig" />
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

const starConfig = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
  numPoints: 5,
  innerRadius: 40,
  outerRadius: 70,
  fill: 'red',
  stroke: 'black',
  strokeWidth: 4
};

const handleLayerClick = (e) => {
  const shape = e.target;
  message.value = 'click on ' + shape.getClassName();
};
</script>
`;
