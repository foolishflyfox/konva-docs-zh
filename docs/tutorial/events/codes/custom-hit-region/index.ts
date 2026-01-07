import { createShapeCodesData } from "@docs/types";

export * from "./demo";

export const customHitRegionCodes = createShapeCodesData();
customHitRegionCodes.vanilla.js = `import Konva from 'konva';

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
  text: '',
  fontSize: 24,
});
layer.add(text);

const star = new Konva.Star({
  x: stage.width() / 4,
  y: stage.height() / 2,
  numPoints: 5,
  innerRadius: 40,
  outerRadius: 70,
  fill: 'red',
  stroke: 'black',
  strokeWidth: 4,
});

// custom hit function
star.hitFunc(function (context) {
  context.beginPath();
  context.arc(0, 0, 70, 0, Math.PI * 2, true);
  context.closePath();
  context.fillStrokeShape(this);
});

const line = new Konva.Line({
  x: stage.width() * 0.6,
  y: stage.height() / 2,
  points: [-50, -50, 50, 50],
  stroke: 'black',
  strokeWidth: 2,
  hitStrokeWidth: 20,
});

const button = document.createElement('button');
button.innerHTML = 'Toggle hit canvas';
document.body.appendChild(button);
let showHit = false;

button.addEventListener('click', () => {
  showHit = !showHit;
  if (showHit) {
    stage.container().style.border = '2px solid black';
    stage.container().style.height = stage.height() + 'px';
    stage.container().appendChild(layer.hitCanvas._canvas);
    layer.hitCanvas._canvas.style.position = 'absolute';
    layer.hitCanvas._canvas.style.top = 0;
    layer.hitCanvas._canvas.style.left = 0;
  } else {
    layer.hitCanvas._canvas.remove();
  }
});

function writeMessage(message) {
  text.text(message);
}

star.on('mouseover mouseout mousedown mouseup', function (evt) {
  writeMessage(evt.type + ' star');
});

line.on('mouseover mouseout mousedown mouseup', function (evt) {
  writeMessage(evt.type + ' line');
});

layer.add(star);
layer.add(line);
`;

customHitRegionCodes.react = `import { Stage, Layer, Star, Line, Text } from 'react-konva';
import { useState, useEffect } from 'react';

const App = () => {
  const [message, setMessage] = useState('');
  const [showHit, setShowHit] = useState(false);

  const handleStarEvent = (evt) => {
    setMessage(evt.type + ' star');
  };

  const handleLineEvent = (evt) => {
    setMessage(evt.type + ' line');
  };

  useEffect(() => {
    const stage = document.querySelector('.konvajs-content');
    if (showHit) {
      const hitCanvas = stage.querySelector('canvas:last-child');
      stage.style.border = '2px solid black';
      hitCanvas.style.position = 'absolute';
      hitCanvas.style.top = '0';
      hitCanvas.style.left = '0';
    }
  }, [showHit]);

  return (
    <>
      <button onClick={() => setShowHit(!showHit)}>Toggle hit canvas</button>
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Text x={10} y={10} text={message} fontSize={24} />
          <Star
            x={window.innerWidth / 4}
            y={window.innerHeight / 2}
            numPoints={5}
            innerRadius={40}
            outerRadius={70}
            fill="red"
            stroke="black"
            strokeWidth={4}
            hitFunc={(context, shape) => {
              context.beginPath();
              context.arc(0, 0, 70, 0, Math.PI * 2, true);
              context.closePath();
              context.fillStrokeShape(shape);
            }}
            onMouseover={handleStarEvent}
            onMouseout={handleStarEvent}
            onMousedown={handleStarEvent}
            onMouseup={handleStarEvent}
          />
          <Line
            x={window.innerWidth * 0.6}
            y={window.innerHeight / 2}
            points={[-50, -50, 50, 50]}
            stroke="black"
            strokeWidth={2}
            hitStrokeWidth={20}
            onMouseover={handleLineEvent}
            onMouseout={handleLineEvent}
            onMousedown={handleLineEvent}
            onMouseup={handleLineEvent}
          />
        </Layer>
      </Stage>
    </>
  );
};

export default App;
`;

customHitRegionCodes.vue.app = `<template>
  <div>
    <button @click="toggleHit">Toggle hit canvas</button>
    <v-stage :config="stageSize" ref="stageRef">
      <v-layer ref="layerRef">
        <v-text :config="textConfig" />
        <v-star
          :config="starConfig"
          @mouseover="handleStarEvent"
          @mouseout="handleStarEvent"
          @mousedown="handleStarEvent"
          @mouseup="handleStarEvent"
        />
        <v-line
          :config="lineConfig"
          @mouseover="handleLineEvent"
          @mouseout="handleLineEvent"
          @mousedown="handleLineEvent"
          @mouseup="handleLineEvent"
        />
      </v-layer>
    </v-stage>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const message = ref('');
const showHit = ref(false);
const stageRef = ref(null);
const layerRef = ref(null);

const stageSize = {
  width: window.innerWidth,
  height: window.innerHeight
};

const textConfig = computed(() => ({
  x: 10,
  y: 10,
  text: message.value,
  fontSize: 24
}));

const starConfig = {
  x: window.innerWidth / 4,
  y: window.innerHeight / 2,
  numPoints: 5,
  innerRadius: 40,
  outerRadius: 70,
  fill: 'red',
  stroke: 'black',
  strokeWidth: 4,
  hitFunc: function(context, shape) {
    context.beginPath();
    context.arc(0, 0, 70, 0, Math.PI * 2, true);
    context.closePath();
    context.fillStrokeShape(shape);
  }
};

const lineConfig = {
  x: window.innerWidth * 0.6,
  y: window.innerHeight / 2,
  points: [-50, -50, 50, 50],
  stroke: 'black',
  strokeWidth: 2,
  hitStrokeWidth: 20
};

const handleStarEvent = (e) => {
  message.value = e.type + ' star';
};

const handleLineEvent = (e) => {
  message.value = e.type + ' line';
};

const toggleHit = () => {
  showHit.value = !showHit.value;
  const stage = stageRef.value.getNode().container();
  if (showHit.value) {
    const hitCanvas = layerRef.value.getNode().hitCanvas._canvas;
    stage.style.border = '2px solid black';
    stage.appendChild(hitCanvas);
    hitCanvas.style.position = 'absolute';
    hitCanvas.style.top = '0';
    hitCanvas.style.left = '0';
  } else {
    const hitCanvas = layerRef.value.getNode().hitCanvas._canvas;
    hitCanvas.remove();
  }
};
</script>
`;
