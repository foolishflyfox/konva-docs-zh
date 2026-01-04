import { createShapeCodesData } from "@docs/types";

export * from "./demo";

export const lineJoinCodes = createShapeCodesData();

lineJoinCodes.vanilla.js = `import Konva from 'konva';

const stage = new Konva.Stage({
  container: 'container',
  width: window.innerWidth,
  height: window.innerHeight,
});

const layer = new Konva.Layer();
stage.add(layer);

const triangle = new Konva.RegularPolygon({
  x: stage.width() / 2,
  y: stage.height() / 2,
  sides: 3,
  radius: 70,
  fill: '#00D2FF',
  stroke: 'black',
  strokeWidth: 20,
  lineJoin: 'miter'
});

layer.add(triangle);

triangle.on('mouseenter', function() {
  const lineJoins = ['miter', 'bevel', 'round'];
  const index = lineJoins.indexOf(triangle.lineJoin());
  const nextIndex = (index + 1) % lineJoins.length;
  triangle.lineJoin(lineJoins[nextIndex]);
});
`;

lineJoinCodes.react = `import { Stage, Layer, RegularPolygon } from 'react-konva';
import { useState } from 'react';

const App = () => {
  const [lineJoin, setLineJoin] = useState('miter');

  const handleMouseEnter = () => {
    const lineJoins = ['miter', 'bevel', 'round'];
    const index = lineJoins.indexOf(lineJoin);
    const nextIndex = (index + 1) % lineJoins.length;
    setLineJoin(lineJoins[nextIndex]);
  };

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <RegularPolygon
          x={window.innerWidth / 2}
          y={window.innerHeight / 2}
          sides={3}
          radius={70}
          fill="#00D2FF"
          stroke="black"
          strokeWidth={20}
          lineJoin={lineJoin}
          onMouseEnter={handleMouseEnter}
        />
      </Layer>
    </Stage>
  );
};

export default App;
`;

lineJoinCodes.vue.app = `<template>
  <v-stage :config="stageSize">
    <v-layer>
      <v-regular-polygon
        :config="triangleConfig"
        @mouseenter="handleMouseEnter"
      />
    </v-layer>
  </v-stage>
</template>

<script setup>
import { ref } from 'vue';

const stageSize = {
  width: window.innerWidth,
  height: window.innerHeight
};

const currentLineJoin = ref('miter');

const triangleConfig = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
  sides: 3,
  radius: 70,
  fill: '#00D2FF',
  stroke: 'black',
  strokeWidth: 20,
  lineJoin: currentLineJoin.value
};

const handleMouseEnter = () => {
  const lineJoins = ['miter', 'bevel', 'round'];
  const index = lineJoins.indexOf(currentLineJoin.value);
  const nextIndex = (index + 1) % lineJoins.length;
  currentLineJoin.value = lineJoins[nextIndex];
};
</script>
`;
