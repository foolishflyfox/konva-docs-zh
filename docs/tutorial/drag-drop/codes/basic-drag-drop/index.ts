import { createShapeCodesData } from "@docs/types";

export * from "./demo";
export const basicDragDropCodes = createShapeCodesData();
basicDragDropCodes.vanilla.js = `import Konva from 'konva';

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
  draggable: true,
});

// add cursor styling
circle.on('mouseover', function () {
  document.body.style.cursor = 'pointer';
});
circle.on('mouseout', function () {
  document.body.style.cursor = 'default';
});

layer.add(circle);
`;

basicDragDropCodes.react = `import { Stage, Layer, Circle } from 'react-konva';
import { useState } from 'react';

const App = () => {
  const [position, setPosition] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Circle
          x={position.x}
          y={position.y}
          radius={70}
          fill="red"
          stroke="black"
          strokeWidth={4}
          draggable
          onMouseEnter={(e) => {
            document.body.style.cursor = 'pointer';
          }}
          onMouseLeave={(e) => {
            document.body.style.cursor = 'default';
          }}
          onDragEnd={(e) => {
            setPosition({
              x: e.target.x(),
              y: e.target.y()
            });
          }}
        />
      </Layer>
    </Stage>
  );
};

export default App;
`;

basicDragDropCodes.vue.app = `<template>
  <v-stage :config="stageSize">
    <v-layer>
      <v-circle
        :config="circleConfig"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
      />
    </v-layer>
  </v-stage>
</template>

<script setup>
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
  strokeWidth: 4,
  draggable: true
};

const handleMouseEnter = () => {
  document.body.style.cursor = 'pointer';
};

const handleMouseLeave = () => {
  document.body.style.cursor = 'default';
};
</script>
`;
