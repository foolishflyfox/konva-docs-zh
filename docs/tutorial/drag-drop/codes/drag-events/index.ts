import { createShapeCodesData } from "@docs/types";

export * from "./demo";

export const dragEventsCodes = createShapeCodesData();
dragEventsCodes.vanilla.js = `import Konva from 'konva';

const stage = new Konva.Stage({
  container: 'container',
  width: window.innerWidth,
  height: window.innerHeight,
});

const layer = new Konva.Layer();
stage.add(layer);

const text = new Konva.Text({
  x: 40,
  y: 40,
  text: 'Draggable Text',
  fontSize: 20,
  draggable: true,
  width: 200,
});
layer.add(text);

const status = new Konva.Text({
  x: 40,
  y: 100,
  text: '',
  fontSize: 16,
  width: 200,
});
layer.add(status);

text.on('dragstart', () => {
  status.text('drag started');
});

text.on('dragend', () => {
  status.text('drag ended');
});

text.on('dragmove', () => {
  status.text('dragging');
});
`;

dragEventsCodes.react = `import { Stage, Layer, Text } from 'react-konva';
import { useState } from 'react';

const App = () => {
  const [status, setStatus] = useState('');

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Text
          x={40}
          y={40}
          text="Draggable Text"
          fontSize={20}
          draggable
          width={200}
          onDragStart={() => setStatus('drag started')}
          onDragEnd={() => setStatus('drag ended')}
          onDragMove={() => setStatus('dragging')}
        />
        <Text
          x={40}
          y={100}
          text={status}
          fontSize={16}
          width={200}
        />
      </Layer>
    </Stage>
  );
};

export default App;
`;

dragEventsCodes.vue.app = `<template>
  <v-stage :config="stageSize">
    <v-layer>
      <v-text
        :config="textConfig"
        @dragstart="handleDragStart"
        @dragend="handleDragEnd"
        @dragmove="handleDragMove"
      />
      <v-text :config="statusConfig" />
    </v-layer>
  </v-stage>
</template>

<script setup>
import { ref } from 'vue';

const stageSize = {
  width: window.innerWidth,
  height: window.innerHeight
};

const textConfig = {
  x: 40,
  y: 40,
  text: 'Draggable Text',
  fontSize: 20,
  draggable: true,
  width: 200
};

const status = ref('');

const statusConfig = {
  x: 40,
  y: 100,
  text: status,
  fontSize: 16,
  width: 200
};

const handleDragStart = () => {
  status.value = 'drag started';
};

const handleDragEnd = () => {
  status.value = 'drag ended';
};

const handleDragMove = () => {
  status.value = 'dragging';
};
</script>
`;
