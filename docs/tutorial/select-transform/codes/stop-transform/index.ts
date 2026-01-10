import { createShapeCodesData } from "@docs/types";

export * from "./demo";

export const stopTransformCodes = createShapeCodesData();
stopTransformCodes.vanilla.js = `import Konva from 'konva';

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

rect.on('transform', function () {
const width = rect.width() * rect.scaleX();
if (width > 200) {
tr.stopTransform();
}
});
`;

stopTransformCodes.react = `import { Stage, Layer, Rect, Transformer } from 'react-konva';
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
          onTransform={() => {
            const node = rectRef.current;
            const width = node.width() * node.scaleX();
            if (width > 200) {
              trRef.current.stopTransform();
            }
          }}
        />
        <Transformer ref={trRef} />
      </Layer>
    </Stage>
  );
};

export default App;
`;

stopTransformCodes.vue.app = `<template>
  <v-stage :config="stageSize">
    <v-layer>
      <v-rect
        :config="rectConfig"
        @transform="handleTransform"
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
  height: 100,
  fill: 'yellow',
  stroke: 'black',
  draggable: true
};

const transformerConfig = {};

const rectRef = ref(null);
const transformerRef = ref(null);

const handleTransform = () => {
  const node = rectRef.value.getNode();
  const width = node.width() * node.scaleX();
  if (width > 200) {
    transformerRef.value.getNode().stopTransform();
  }
};

onMounted(() => {
  transformerRef.value.getNode().nodes([rectRef.value.getNode()]);
});
</script>
`;
