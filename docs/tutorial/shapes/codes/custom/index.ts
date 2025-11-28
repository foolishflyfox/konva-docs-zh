import { createShapeCodesData } from "@docs/types";
export * from "./demo";
export const codesData = createShapeCodesData();

codesData.vanilla.js = `import Konva from 'konva';

const stage = new Konva.Stage({
  container: 'container',
  width: window.innerWidth,
  height: window.innerHeight
});

const layer = new Konva.Layer();
stage.add(layer);

const triangle = new Konva.Shape({
  sceneFunc: function (context, shape) {
    context.beginPath();
    context.moveTo(20, 50);
    context.lineTo(220, 80);
    context.lineTo(100, 150);
    context.closePath();
    context.fillStrokeShape(shape);
  },
  fill: '#00D2FF',
  stroke: 'black',
  strokeWidth: 4
});

layer.add(triangle);`;

codesData.react = `import { Stage, Layer, Shape } from 'react-konva';

const App = () => {
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Shape
          sceneFunc={(context, shape) => {
            context.beginPath();
            context.moveTo(20, 50);
            context.lineTo(220, 80);
            context.lineTo(100, 150);
            context.closePath();
            context.fillStrokeShape(shape);
          }}
          fill="#00D2FF"
          stroke="black"
          strokeWidth={4}
        />
      </Layer>
    </Stage>
  );
};

export default App;`;

codesData.vue.app = `<template>
  <v-stage :config="stageSize">
    <v-layer>
      <v-shape :config="shapeConfig" />
    </v-layer>
  </v-stage>
</template>

<script setup>
const stageSize = {
  width: window.innerWidth,
  height: window.innerHeight
};

const shapeConfig = {
  sceneFunc: (context, shape) => {
    context.beginPath();
    context.moveTo(20, 50);
    context.lineTo(220, 80);
    context.lineTo(100, 150);
    context.closePath();
    context.fillStrokeShape(shape);
  },
  fill: '#00D2FF',
  stroke: 'black',
  strokeWidth: 4
};
</script>
`;
