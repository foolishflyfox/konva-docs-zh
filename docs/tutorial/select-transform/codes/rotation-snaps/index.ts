import { createShapeCodesData } from "@docs/types";

export * from "./demo";

export const rotationSnapsCodes = createShapeCodesData();
rotationSnapsCodes.vanilla.js = `import Konva from 'konva';

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
height: 50,
fill: 'yellow',
stroke: 'black',
draggable: true,
});
layer.add(rect);

const tr = new Konva.Transformer({
nodes: [rect],
rotationSnaps: [0, 90, 180, 270],
rotationSnapTolerance: 30,
});
layer.add(tr);
`;

rotationSnapsCodes.react = `import { Stage, Layer, Rect, Transformer } from 'react-konva';
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
          height={50}
          fill="yellow"
          stroke="black"
          draggable
          ref={rectRef}
        />
        <Transformer
          ref={trRef}
          rotationSnaps={[0, 90, 180, 270]}
          rotationSnapTolerance={30}
        />
      </Layer>
    </Stage>
  );
};

export default App;
`;

rotationSnapsCodes.vue.app = `<template>
  <v-stage :config="stageSize">
    <v-layer>
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

const rectConfig = {
  x: 50,
  y: 50,
  width: 100,
  height: 50,
  fill: 'yellow',
  stroke: 'black',
  draggable: true
};

const transformerConfig = {
  rotationSnaps: [0, 90, 180, 270],
  rotationSnapTolerance: 30
};

const rectRef = ref(null);
const transformerRef = ref(null);

onMounted(() => {
  transformerRef.value.getNode().nodes([rectRef.value.getNode()]);
});
</script>
`;
