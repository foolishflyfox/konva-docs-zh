import { createShapeCodesData } from "@docs/types";

export * from "./demo";

export const keepRatioCodes = createShapeCodesData();
keepRatioCodes.vanilla.js = `import Konva from 'konva';

const width = window.innerWidth;
const height = window.innerHeight;

const stage = new Konva.Stage({
container: 'container',
width: width,
height: height,
});

const layer = new Konva.Layer();
stage.add(layer);

const text = new Konva.Text({
x: 50,
y: 50,
text: 'keep ratio by default',
fontSize: 20,
draggable: true,
width: 200,
});
layer.add(text);

const text2 = new Konva.Text({
x: 50,
y: 150,
text: 'no ratio, but hold shift to keep ratio',
fontSize: 20,
draggable: true,
width: 200,
});
layer.add(text2);

const tr = new Konva.Transformer({
nodes: [text],
});
layer.add(tr);

const tr2 = new Konva.Transformer({
nodes: [text2],
keepRatio: false,
});
layer.add(tr2);
`;

keepRatioCodes.react = `import { Stage, Layer, Text, Transformer } from 'react-konva';
import { useRef, useEffect } from 'react';

const App = () => {
  const text1Ref = useRef();
  const text2Ref = useRef();
  const tr1Ref = useRef();
  const tr2Ref = useRef();

  useEffect(() => {
    tr1Ref.current.nodes([text1Ref.current]);
    tr2Ref.current.nodes([text2Ref.current]);
  }, []);

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Text
          x={50}
          y={50}
          text="keep ratio by default"
          fontSize={20}
          draggable
          width={200}
          ref={text1Ref}
        />
        <Transformer ref={tr1Ref} />

        <Text
          x={50}
          y={150}
          text="no ratio, but hold shift to keep ratio"
          fontSize={20}
          draggable
          width={200}
          ref={text2Ref}
        />
        <Transformer ref={tr2Ref} keepRatio={false} />
      </Layer>
    </Stage>
  );
};

export default App;
`;

keepRatioCodes.vue.app = `<template>
  <v-stage :config="stageSize">
    <v-layer>
      <v-text :config="text1Config" ref="text1Ref" />
      <v-transformer :config="tr1Config" ref="tr1Ref" />
      
      <v-text :config="text2Config" ref="text2Ref" />
      <v-transformer :config="tr2Config" ref="tr2Ref" />
    </v-layer>
  </v-stage>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const stageSize = {
  width: window.innerWidth,
  height: window.innerHeight
};

const text1Config = {
  x: 50,
  y: 50,
  text: 'keep ratio by default',
  fontSize: 20,
  draggable: true,
  width: 200
};

const text2Config = {
  x: 50,
  y: 150,
  text: 'no ratio, but hold shift to keep ratio',
  fontSize: 20,
  draggable: true,
  width: 200
};

const tr1Config = {};
const tr2Config = {
  keepRatio: false
};

const text1Ref = ref(null);
const text2Ref = ref(null);
const tr1Ref = ref(null);
const tr2Ref = ref(null);

onMounted(() => {
  tr1Ref.value.getNode().nodes([text1Ref.value.getNode()]);
  tr2Ref.value.getNode().nodes([text2Ref.value.getNode()]);
});
</script>
`;
