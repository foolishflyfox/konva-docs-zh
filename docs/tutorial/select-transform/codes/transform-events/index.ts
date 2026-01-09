import { createShapeCodesData } from "@docs/types";

export * from "./demo";

export const transformEventsCodes = createShapeCodesData();
transformEventsCodes.vanilla.js = `import Konva from 'konva';

const width = window.innerWidth;
const height = window.innerHeight;

const stage = new Konva.Stage({
container: 'container',
width: width,
height: height,
});

const layer = new Konva.Layer();
stage.add(layer);

const rect = new Konva.Rect({
x: 50,
y: 50,
width: 100,
height: 100,
fill: 'yellow',
stroke: 'black',
draggable: true,
});
layer.add(rect);

const tr = new Konva.Transformer({
nodes: [rect],
});
layer.add(tr);

tr.on('transformstart', () => {
console.log('transform start');
});

tr.on('transform', () => {
console.log('transforming');
});

tr.on('transformend', () => {
console.log('transform end');
});

rect.on('transformstart', () => {
console.log('rect transform start');
});

rect.on('transform', () => {
console.log('rect transforming');
});

rect.on('transformend', () => {
console.log('rect transform end');
});
`;

transformEventsCodes.react = `import { Stage, Layer, Rect, Transformer } from 'react-konva';
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
        <Rect
          x={50}
          y={50}
          width={100}
          height={100}
          fill="yellow"
          stroke="black"
          draggable
          ref={rectRef}
          onTransformStart={() => console.log('rect transform start')}
          onTransform={() => console.log('rect transforming')}
          onTransformEnd={() => console.log('rect transform end')}
        />
        <Transformer
          ref={trRef}
          onTransformStart={() => console.log('transform start')}
          onTransform={() => console.log('transforming')}
          onTransformEnd={() => console.log('transform end')}
        />
      </Layer>
    </Stage>
  );
};

export default App;
`;

transformEventsCodes.vue.app = `<template>
  <v-stage :config="stageSize">
    <v-layer>
      <v-rect
        :config="rectConfig"
        ref="rectRef"
        @transformstart="() => console.log('rect transform start')"
        @transform="() => console.log('rect transforming')"
        @transformend="() => console.log('rect transform end')"
      />
      <v-transformer
        :config="transformerConfig"
        ref="transformerRef"
        @transformstart="() => console.log('transform start')"
        @transform="() => console.log('transforming')"
        @transformend="() => console.log('transform end')"
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

const rectConfig = {
  x: 50,
  y: 50,
  width: 100,
  height: 100,
  fill: 'yellow',
  stroke: 'black',
  draggable: true
};

const transformerConfig = {};

const rectRef = ref(null);
const transformerRef = ref(null);

onMounted(() => {
  transformerRef.value.getNode().nodes([rectRef.value.getNode()]);
});
</script>
`;
