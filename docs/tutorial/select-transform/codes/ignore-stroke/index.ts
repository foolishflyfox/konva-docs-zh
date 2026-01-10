import { createShapeCodesData } from "@docs/types";

export * from "./demo";

export const ignoreStrokeCodes = createShapeCodesData();
ignoreStrokeCodes.vanilla.js = `import Konva from 'konva';

const width = window.innerWidth;
const height = window.innerHeight;

const stage = new Konva.Stage({
container: 'container',
width: width,
height: height,
});

const layer = new Konva.Layer();
stage.add(layer);

// first way - reset scale on transform end
const rect1 = new Konva.Rect({
x: 50,
y: 50,
width: 100,
height: 100,
fill: '#00ff00',
stroke: 'black',
strokeWidth: 5,
draggable: true,
});
layer.add(rect1);

const tr1 = new Konva.Transformer({
nodes: [rect1],
});
layer.add(tr1);

rect1.on('transformend', () => {
// and increase width and height manually
rect1.width(rect1.width() * rect1.scaleX());
rect1.height(rect1.height() * rect1.scaleY());
// after transform we need to reset scale
rect1.scaleX(1);
rect1.scaleY(1);
});

// second way - disable stroke scaling
const rect2 = new Konva.Rect({
x: 200,
y: 50,
width: 100,
height: 100,
fill: '#ff0000',
stroke: 'black',
strokeWidth: 5,
draggable: true,
strokeScaleEnabled: false,
});
layer.add(rect2);

const tr2 = new Konva.Transformer({
nodes: [rect2],
ignoreStroke: true,
});
layer.add(tr2);

`;

ignoreStrokeCodes.react = `import { Stage, Layer, Rect, Transformer } from 'react-konva';
import { useRef, useEffect, useState } from 'react';

const App = () => {
  const [rect1Size, setRect1Size] = useState({
    width: 100,
    height: 100,
  });

  const rect1Ref = useRef();
  const rect2Ref = useRef();
  const tr1Ref = useRef();
  const tr2Ref = useRef();

  useEffect(() => {
    tr1Ref.current.nodes([rect1Ref.current]);
    tr2Ref.current.nodes([rect2Ref.current]);
  }, []);

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Rect
          x={50}
          y={50}
          width={rect1Size.width}
          height={rect1Size.height}
          fill="#00ff00"
          stroke="black"
          strokeWidth={5}
          draggable
          ref={rect1Ref}
          onTransformEnd={(e) => {
            const node = rect1Ref.current;
            setRect1Size({
              width: node.width() * node.scaleX(),
              height: node.height() * node.scaleY(),
            });
            node.scaleX(1);
            node.scaleY(1);
          }}
        />
        <Transformer ref={tr1Ref} />

        <Rect
          x={200}
          y={50}
          width={100}
          height={100}
          fill="#ff0000"
          stroke="black"
          strokeWidth={5}
          draggable
          strokeScaleEnabled={false}
          ref={rect2Ref}
        />
        <Transformer ref={tr2Ref} ignoreStroke={true} />
      </Layer>
    </Stage>
  );
};

export default App;
`;

ignoreStrokeCodes.vue.app = `<template>
  <v-stage :config="stageSize">
    <v-layer>
      <v-rect
        :config="rect1Config"
        @transformend="handleTransformEnd"
        ref="rect1Ref"
      />
      <v-transformer
        :config="tr1Config"
        ref="tr1Ref"
      />
      
      <v-rect
        :config="rect2Config"
        ref="rect2Ref"
      />
      <v-transformer
        :config="tr2Config"
        ref="tr2Ref"
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

const rect1Size = ref({
  width: 100,
  height: 100
});

const rect1Config = {
  x: 50,
  y: 50,
  width: rect1Size.value.width,
  height: rect1Size.value.height,
  fill: '#00ff00',
  stroke: 'black',
  strokeWidth: 5,
  draggable: true
};

const rect2Config = {
  x: 200,
  y: 50,
  width: 100,
  height: 100,
  fill: '#ff0000',
  stroke: 'black',
  strokeWidth: 5,
  draggable: true,
  strokeScaleEnabled: false
};

const tr1Config = {};
const tr2Config = {
  ignoreStroke: true
};

const rect1Ref = ref(null);
const rect2Ref = ref(null);
const tr1Ref = ref(null);
const tr2Ref = ref(null);

const handleTransformEnd = () => {
  const node = rect1Ref.value.getNode();
  rect1Size.value = {
    width: node.width() * node.scaleX(),
    height: node.height() * node.scaleY()
  };
  node.scaleX(1);
  node.scaleY(1);
};

onMounted(() => {
  tr1Ref.value.getNode().nodes([rect1Ref.value.getNode()]);
  tr2Ref.value.getNode().nodes([rect2Ref.value.getNode()]);
});
</script>
`;
