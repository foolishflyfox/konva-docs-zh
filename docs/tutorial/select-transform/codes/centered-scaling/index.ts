import { createShapeCodesData } from "@docs/types";

export * from "./demo";

export const centeredScalingCodes = createShapeCodesData();
centeredScalingCodes.vanilla.js = `import Konva from 'konva';

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
y: 80,
text: 'Simple text',
fontSize: 30,
draggable: true,
width: 200,
});
layer.add(text);

const text2 = new Konva.Text({
x: 50,
y: 180,
text: 'Simple text',
fontSize: 30,
draggable: true,
width: 200,
});
layer.add(text2);

const tr = new Konva.Transformer({
nodes: [text],
centeredScaling: true,
});
layer.add(tr);

const tr2 = new Konva.Transformer({
nodes: [text2],
});
layer.add(tr2);
`;

centeredScalingCodes.react = `import { useRef, useEffect } from 'react'
import { Stage, Layer, Text, Transformer } from 'react-konva';

const App = () => {
  const text1Ref = useRef()
  const text2Ref = useRef()
  const tr1Ref = useRef()
  const tr2Ref = useRef()
  
  useEffect(() => {
    tr1Ref.current.nodes([text1Ref.current]);
    tr2Ref.current.nodes([text2Ref.current]);
  }, []);

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Text
          x={50}
          y={80}
          text="Simple text"
          fontSize={30}
          draggable
          width={200}
          ref={text1Ref}
        />
        <Transformer centeredScaling ref={tr1Ref} />
        <Text
          x={50}
          y={180}
          text="Simple text"
          fontSize={30}
          draggable
          width={200}
          ref={text2Ref}
        />
        <Transformer ref={tr2Ref} />
      </Layer>
    </Stage>
  );
};

export default App;
`;

centeredScalingCodes.vue.app = `<template>
  <v-stage :config="stageSize">
    <v-layer>
      <v-text :config="textConfig1" />
      <v-transformer :config="transformerConfig1" />
      <v-text :config="textConfig2" />
      <v-transformer :config="transformerConfig2" />
    </v-layer>
  </v-stage>
</template>

<script setup>
const stageSize = {
  width: window.innerWidth,
  height: window.innerHeight
};

const textConfig1 = {
  x: 50,
  y: 80,
  text: 'Simple text',
  fontSize: 30,
  draggable: true,
  width: 200
};

const textConfig2 = {
  x: 50,
  y: 180,
  text: 'Simple text', 
  fontSize: 30,
  draggable: true,
  width: 200
};

const transformerConfig1 = {
  centeredScaling: true
};

const transformerConfig2 = {};
</script>
`;
