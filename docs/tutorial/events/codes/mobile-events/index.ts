import { createShapeCodesData } from "@docs/types";

export * from "./demo";

export const mobileEventsCodes = createShapeCodesData();
mobileEventsCodes.vanilla.js = `import Konva from 'konva';

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

triangle.on('touchmove', function () {
  const touchPos = stage.getPointerPosition();
  const x = touchPos.x;
  const y = touchPos.y;
  writeMessage('x: ' + x + ', y: ' + y);
});

circle.on('touchstart', function () {
  writeMessage('touchstart circle');
});
circle.on('touchend', function () {
  writeMessage('touchend circle');
});

layer.add(triangle);
layer.add(circle);
layer.add(text);
stage.add(layer);
`;

mobileEventsCodes.react = `import { Stage, Layer, RegularPolygon, Circle, Text } from 'react-konva';
import { useState, useRef } from 'react';

const App = () => {
  const [message, setMessage] = useState('');
  const stageRef = useRef();

  const handleTriangleTouch = () => {
    const touchPos = stageRef.current.getPointerPosition();
    setMessage(\`x: \${touchPos.x}, y: \${touchPos.y}\`);
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
          onTouchmove={handleTriangleTouch}
        />
        <Circle
          x={230}
          y={100}
          radius={60}
          fill="red"
          stroke="black"
          strokeWidth={4}
          onTouchstart={() => setMessage('touchstart circle')}
          onTouchend={() => setMessage('touchend circle')}
        />
      </Layer>
    </Stage>
  );
};

export default App;
`;

mobileEventsCodes.vue.app = `<template>
  <v-stage :config="stageSize" ref="stageRef">
    <v-layer>
      <v-text :config="textConfig" />
      <v-regular-polygon
        :config="triangleConfig"
        @touchmove="handleTriangleTouch"
      />
      <v-circle
        :config="circleConfig"
        @touchstart="handleTouchStart"
        @touchend="handleTouchEnd"
      />
    </v-layer>
  </v-stage>
</template>

<script setup>
import { ref, computed } from 'vue';

const stageRef = ref(null);
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

const handleTriangleTouch = () => {
  const touchPos = stageRef.value.getNode().getPointerPosition();
  message.value = \`x: \${touchPos.x}, y: \${touchPos.y}\`;
};

const handleTouchStart = () => {
  message.value = 'touchstart circle';
};

const handleTouchEnd = () => {
  message.value = 'touchend circle';
};
</script>
`;
