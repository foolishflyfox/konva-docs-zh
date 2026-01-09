import { createShapeCodesData } from "@docs/types";

export * from "./demo";
export const simpleDragBoundsCodes = createShapeCodesData();
simpleDragBoundsCodes.vanilla.js = `import Konva from 'konva';

const stage = new Konva.Stage({
  container: 'container',
  width: window.innerWidth,
  height: window.innerHeight,
});

const layer = new Konva.Layer();
stage.add(layer);

const horizontalText = new Konva.Text({
  x: 50,
  y: 50,
  text: 'Drag me horizontally',
  fontSize: 16,
  draggable: true,
  fill: 'black',
});

horizontalText.on('dragmove', function () {
  // horizontal only
  this.y(50);
});

const verticalText = new Konva.Text({
  x: 200,
  y: 50,
  text: 'Drag me vertically',
  fontSize: 16,
  draggable: true,
  fill: 'black',
});

verticalText.on('dragmove', function () {
  // vertical only
  this.x(200);
});

layer.add(horizontalText);
layer.add(verticalText);
`;

simpleDragBoundsCodes.react = `import { Stage, Layer, Text } from 'react-konva';

const App = () => {
  const handleHorizontalDragMove = (e) => {
    e.target.y(50);
  };

  const handleVerticalDragMove = (e) => {
    e.target.x(200);
  };

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Text
          x={50}
          y={50}
          text="Drag me horizontally"
          fontSize={16}
          draggable
          fill="black"
          onDragMove={handleHorizontalDragMove}
        />
        <Text
          x={200}
          y={50}
          text="Drag me vertically"
          fontSize={16}
          draggable
          fill="black"
          onDragMove={handleVerticalDragMove}
        />
      </Layer>
    </Stage>
  );
};

export default App;
`;

simpleDragBoundsCodes.vue.app = `<template>
  <v-stage :config="stageSize">
    <v-layer>
      <v-text
        :config="horizontalTextConfig"
        @dragmove="handleHorizontalDragMove"
      />
      <v-text
        :config="verticalTextConfig"
        @dragmove="handleVerticalDragMove"
      />
    </v-layer>
  </v-stage>
</template>

<script setup>
const stageSize = {
  width: window.innerWidth,
  height: window.innerHeight
};

const horizontalTextConfig = {
  x: 50,
  y: 50,
  text: 'Drag me horizontally',
  fontSize: 16,
  draggable: true,
  fill: 'black'
};

const verticalTextConfig = {
  x: 200,
  y: 50,
  text: 'Drag me vertically',
  fontSize: 16,
  draggable: true,
  fill: 'black'
};

const handleHorizontalDragMove = (e) => {
  e.target.y(50);
};

const handleVerticalDragMove = (e) => {
  e.target.x(200);
};
</script>
`;
