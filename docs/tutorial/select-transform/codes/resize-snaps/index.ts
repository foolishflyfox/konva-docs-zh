import { createShapeCodesData } from "@docs/types";

export * from "./demo";

export const resizeSnapsCodes = createShapeCodesData();
resizeSnapsCodes.vanilla.js = `import Konva from 'konva';

const width = window.innerWidth;
const height = window.innerHeight;

const stage = new Konva.Stage({
container: 'container',
width: width,
height: height,
});

const layer = new Konva.Layer();
stage.add(layer);

// create guides
const horizontalLine = new Konva.Line({
points: [0, height / 2, width, height / 2],
stroke: '#000',
strokeWidth: 1,
dash: [4, 4],
});
layer.add(horizontalLine);

const verticalLine = new Konva.Line({
points: [width / 2, 0, width / 2, height],
stroke: '#000',
strokeWidth: 1,
dash: [4, 4],
});
layer.add(verticalLine);

const rect = new Konva.Rect({
x: 60,
y: 60,
width: 100,
height: 100,
fill: 'red',
draggable: true,
});
layer.add(rect);

const tr = new Konva.Transformer({
nodes: [rect],
anchorDragBoundFunc: function (oldPos, newPos) {
const dist = Math.sqrt(Math.pow(newPos.x - width / 2, 2));
if (dist < 10) {
return {
...newPos,
x: width / 2,
};
}
return newPos;
},
});
layer.add(tr);
`;

resizeSnapsCodes.react = `import { Stage, Layer, Line, Rect, Transformer } from 'react-konva';
import { useRef, useEffect } from 'react';

const App = () => {
  const rectRef = useRef();
  const trRef = useRef();

  useEffect(() => {
    trRef.current.nodes([rectRef.current]);
  }, []);

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Line
          points={[0, window.innerHeight / 2, window.innerWidth, window.innerHeight / 2]}
          stroke="#000"
          strokeWidth={1}
          dash={[4, 4]}
        />
        <Line
          points={[window.innerWidth / 2, 0, window.innerWidth / 2, window.innerHeight]}
          stroke="#000"
          strokeWidth={1}
          dash={[4, 4]}
        />
        <Rect
          x={60}
          y={60}
          width={100}
          height={100}
          fill="red"
          draggable
          ref={rectRef}
        />
        <Transformer
          ref={trRef}
          anchorDragBoundFunc={(oldPos, newPos) => {
            const dist = Math.sqrt(Math.pow(newPos.x - window.innerWidth / 2, 2));
            if (dist < 10) {
              return {
                ...newPos,
                x: window.innerWidth / 2,
              };
            }
            return newPos;
          }}
        />
      </Layer>
    </Stage>
  );
};

export default App;
`;

resizeSnapsCodes.vue.app = `<template>
  <v-stage :config="stageSize">
    <v-layer>
      <v-line :config="horizontalLineConfig" />
      <v-line :config="verticalLineConfig" />
      <v-rect
        :config="rectConfig"
        ref="rectRef"
      />
      <v-transformer
        :config="transformerConfig"
        ref="transformerRef"
      />
    </v-layer>
  </v-stage>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const stageSize = {
  width: window.innerWidth,
  height: window.innerHeight
};

const horizontalLineConfig = {
  points: [0, window.innerHeight / 2, window.innerWidth, window.innerHeight / 2],
  stroke: '#000',
  strokeWidth: 1,
  dash: [4, 4]
};

const verticalLineConfig = {
  points: [window.innerWidth / 2, 0, window.innerWidth / 2, window.innerHeight],
  stroke: '#000',
  strokeWidth: 1,
  dash: [4, 4]
};

const rectConfig = {
  x: 60,
  y: 60,
  width: 100,
  height: 100,
  fill: 'red',
  draggable: true
};

const transformerConfig = {
  anchorDragBoundFunc: (oldPos, newPos) => {
    const dist = Math.sqrt(Math.pow(newPos.x - window.innerWidth / 2, 2));
    if (dist < 10) {
      return {
        ...newPos,
        x: window.innerWidth / 2,
      };
    }
    return newPos;
  }
};

const rectRef = ref(null);
const transformerRef = ref(null);

onMounted(() => {
  transformerRef.value.getNode().nodes([rectRef.value.getNode()]);
});
</script>
`;
