import { createShapeCodesData } from "@docs/types";

export * from "./demo";
export const bindingEventsCodes = createShapeCodesData();
bindingEventsCodes.vanilla.js = `import Konva from 'konva';
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

const triangle = new Konva.RegularPolygon({
x: 80,
y: 120,
sides: 3,
radius: 80,
fill: '#00D2FF',
stroke: 'black',
strokeWidth: 4,
});

const circle = new Konva.Circle({
x: 230,
y: 100,
radius: 60,
fill: 'red',
stroke: 'black',
strokeWidth: 4,
});

function writeMessage(message) {
text.text(message);
}

triangle.on('mouseout', () => {
writeMessage('Mouseout triangle');
});

triangle.on('mousemove', () => {
const mousePos = stage.getPointerPosition();
writeMessage('x: ' + mousePos.x + ', y: ' + mousePos.y);
});

circle.on('mouseover', () => {
writeMessage('Mouseover circle');
});
circle.on('mouseout', () => {
writeMessage('Mouseout circle');
});
circle.on('mousedown', () => {
writeMessage('Mousedown circle');
});
circle.on('mouseup', () => {
writeMessage('Mouseup circle');
});

layer.add(triangle);
layer.add(circle);
layer.add(text);
stage.add(layer);
`;

bindingEventsCodes.react = `import { Stage, Layer, RegularPolygon, Circle, Text } from 'react-konva';
import { useRef, useState } from 'react';

const App = () => {
  const [message, setMessage] = useState('');
  const stageRef = useRef();

  const writeMessage = (text) => {
    setMessage(text);
  };

  return (
    <Stage width={window.innerWidth} height={window.innerHeight} ref={stageRef}>
      <Layer>
        <Text
          x={10}
          y={10}
          fontFamily="Calibri"
          fontSize={24}
          text={message}
          fill="black"
        />
        <RegularPolygon
          x={80}
          y={120}
          sides={3}
          radius={80}
          fill="#00D2FF"
          stroke="black"
          strokeWidth={4}
          onMouseout={() => writeMessage('Mouseout triangle')}
          onMousemove={() => {
            const mousePos = stageRef.current.getPointerPosition();
            writeMessage('x: ' + mousePos.x + ', y: ' + mousePos.y);
          }}
        />
        <Circle
          x={230}
          y={100}
          radius={60}
          fill="red"
          stroke="black"
          strokeWidth={4}
          onMouseover={() => writeMessage('Mouseover circle')}
          onMouseout={() => writeMessage('Mouseout circle')}
          onMousedown={() => writeMessage('Mousedown circle')}
          onMouseup={() => writeMessage('Mouseup circle')}
        />
      </Layer>
    </Stage>
  );
};

export default App;
`;

bindingEventsCodes.vue.app = `<template>
  <v-stage :config="stageSize" ref="stageRef">
    <v-layer>
      <v-text :config="textConfig" />
      <v-regular-polygon
        :config="triangleConfig"
        @mouseout="writeMessage('Mouseout triangle')"
        @mousemove="handleTriangleMouseMove"
      />
      <v-circle
        :config="circleConfig"
        @mouseover="writeMessage('Mouseover circle')"
        @mouseout="writeMessage('Mouseout circle')"
        @mousedown="writeMessage('Mousedown circle')"
        @mouseup="writeMessage('Mouseup circle')"
      />
    </v-layer>
  </v-stage>
</template>

<script setup>
import { ref } from 'vue';

const stageRef = ref(null);
const message = ref('');

const stageSize = {
  width: window.innerWidth,
  height: window.innerHeight
};

const textConfig = {
  x: 10,
  y: 10,
  fontFamily: 'Calibri',
  fontSize: 24,
  text: message,
  fill: 'black'
};

const triangleConfig = {
  x: 80,
  y: 120,
  sides: 3,
  radius: 80,
  fill: '#00D2FF',
  stroke: 'black',
  strokeWidth: 4
};

const circleConfig = {
  x: 230,
  y: 100,
  radius: 60,
  fill: 'red',
  stroke: 'black',
  strokeWidth: 4
};

const writeMessage = (text) => {
  message.value = text;
};

const handleTriangleMouseMove = () => {
  const mousePos = stageRef.value.getNode().getPointerPosition();
  writeMessage('x: ' + mousePos.x + ', y: ' + mousePos.y);
};
</script>
`;
