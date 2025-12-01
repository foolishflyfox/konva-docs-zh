import { createShapeCodesData } from "@docs/types";
export * from "./demo";

export const regularPolygonCodes = createShapeCodesData();

regularPolygonCodes.vanilla.js = `import Konva from 'konva';

const stage = new Konva.Stage({
  container: 'container',
  width: window.innerWidth,
  height: window.innerHeight
});

const layer = new Konva.Layer();
stage.add(layer);

const hexagon = new Konva.RegularPolygon({
  x: stage.width() / 2,
  y: stage.height() / 2,
  sides: 6,
  radius: 70,
  fill: 'red',
  stroke: 'black',
  strokeWidth: 4
});

layer.add(hexagon);`;

regularPolygonCodes.react = `import { Stage, Layer, RegularPolygon } from 'react-konva';

const App = () => {
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <RegularPolygon
          x={window.innerWidth / 2}
          y={window.innerHeight / 2}
          sides={6}
          radius={70}
          fill="red"
          stroke="black"
          strokeWidth={4}
        />
      </Layer>
    </Stage>
  );
};

export default App;`;

regularPolygonCodes.vue.app = `<template>
  <v-stage :config="stageSize">
    <v-layer>
      <v-regular-polygon :config="polygonConfig" />
    </v-layer>
  </v-stage>
</template>

<script setup>
const stageSize = {
  width: window.innerWidth,
  height: window.innerHeight
};

const polygonConfig = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
  sides: 6,
  radius: 70,
  fill: 'red',
  stroke: 'black',
  strokeWidth: 4
};
</script>`;
