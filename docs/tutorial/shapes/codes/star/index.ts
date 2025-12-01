import { createShapeCodesData } from "@docs/types";
export * from "./demo";

export const starCodes = createShapeCodesData();
starCodes.vanilla.js = `import Konva from 'konva';

const stage = new Konva.Stage({
  container: 'container',
  width: window.innerWidth,
  height: window.innerHeight
});

const layer = new Konva.Layer();
stage.add(layer);

const star = new Konva.Star({
  x: stage.width() / 2,
  y: stage.height() / 2,
  numPoints: 5, // 角的数量，5 表示绘制五角星
  innerRadius: 30,
  outerRadius: 70,
  fill: 'yellow',
  stroke: 'black',
  strokeWidth: 4
});

layer.add(star);
`;

starCodes.react = `import { Stage, Layer, Star } from 'react-konva';

const App = () => {
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Star
          x={window.innerWidth / 2}
          y={window.innerHeight / 2}
          numPoints={5}
          innerRadius={30}
          outerRadius={70}
          fill="yellow"
          stroke="black"
          strokeWidth={4}
        />
      </Layer>
    </Stage>
  );
};

export default App;
`;

starCodes.vue.app = `<template>
  <v-stage :config="stageSize">
    <v-layer>
      <v-star :config="starConfig" />
    </v-layer>
  </v-stage>
</template>

<script setup>
const stageSize = {
  width: window.innerWidth,
  height: window.innerHeight
};

const starConfig = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
  numPoints: 5,
  innerRadius: 30,
  outerRadius: 70,
  fill: 'yellow',
  stroke: 'black',
  strokeWidth: 4
};
</script>
`;
