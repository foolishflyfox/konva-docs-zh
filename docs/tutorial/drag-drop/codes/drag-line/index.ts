import { createShapeCodesData } from "@docs/types";

export * from "./demo";
export const dragLineCodes = createShapeCodesData();
dragLineCodes.vanilla.js = `import Konva from 'konva';

const stage = new Konva.Stage({
  container: 'container',
  width: window.innerWidth,
  height: window.innerHeight,
});

const layer = new Konva.Layer();

const redLine = new Konva.Line({
  x: 50,
  y: 50,
  points: [0, 0, 150, 0],
  stroke: 'red',
  strokeWidth: 15,
  lineCap: 'round',
  lineJoin: 'round',
  draggable: true,
});

// add cursor styling
redLine.on('mouseover', function () {
  document.body.style.cursor = 'pointer';
});
redLine.on('mouseout', function () {
  document.body.style.cursor = 'default';
});

layer.add(redLine);
stage.add(layer);
`;

dragLineCodes.react = `import { Stage, Layer, Line } from 'react-konva';
import { useState } from 'react';

const App = () => {
  const [position, setPosition] = useState({ x: 50, y: 50 });

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Line
          x={position.x}
          y={position.y}
          points={[0, 0, 150, 0]}
          stroke="red"
          strokeWidth={15}
          lineCap="round"
          lineJoin="round"
          draggable
          onDragEnd={(e) => {
            setPosition({
              x: e.target.x(),
              y: e.target.y(),
            });
          }}
          onMouseEnter={(e) => {
            document.body.style.cursor = 'pointer';
          }}
          onMouseLeave={(e) => {
            document.body.style.cursor = 'default';
          }}
        />
      </Layer>
    </Stage>
  );
};

export default App;
`;

dragLineCodes.vue.app = `<template>
  <v-stage :config="stageSize">
    <v-layer>
      <v-line
        :config="lineConfig"
        @dragend="handleDragEnd"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
      />
    </v-layer>
  </v-stage>
</template>

<script setup>
import { ref, reactive } from 'vue';

const stageSize = {
  width: window.innerWidth,
  height: window.innerHeight
};

const position = reactive({ x: 50, y: 50 });

const lineConfig = {
  x: position.x,
  y: position.y,
  points: [0, 0, 150, 0],
  stroke: 'red',
  strokeWidth: 15,
  lineCap: 'round',
  lineJoin: 'round',
  draggable: true
};

const handleDragEnd = (e) => {
  position.x = e.target.x();
  position.y = e.target.y();
};

const handleMouseEnter = () => {
  document.body.style.cursor = 'pointer';
};

const handleMouseLeave = () => {
  document.body.style.cursor = 'default';
};
</script>
`;
