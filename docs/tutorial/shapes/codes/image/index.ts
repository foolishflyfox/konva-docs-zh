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

// main API:
const imageObj = new Image();
imageObj.onload = function () {
  const yoda = new Konva.Image({
    x: 50,
    y: 50,
    image: imageObj,
    width: 106,
    height: 118
  });

  layer.add(yoda);
};
imageObj.src = 'https://konvajs.org/assets/yoda.jpg';

// 等效方法:
Konva.Image.fromURL('https://konvajs.org/assets/darth-vader.jpg', function (darthNode) {
  darthNode.x(200).y(50).scaleX(0.5).scaleY(0.5).cornerRadius(20);
  layer.add(darthNode);
});
`;

codesData.react = `import { Stage, Layer, Image } from 'react-konva';
import { useEffect, useState } from 'react';
import useImage from 'use-image';

const App = () => {
  const [yodaImage] = useImage('https://konvajs.org/assets/yoda.jpg');
  const [vaderImage] = useImage('https://konvajs.org/assets/darth-vader.jpg');

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Image
          x={50}
          y={50}
          image={yodaImage}
          width={106}
          height={118}
        />
        <Image
          x={200}
          y={50}
          image={vaderImage}
          scaleX={0.5}
          scaleY={0.5}
          cornerRadius={20}
        />
      </Layer>
    </Stage>
  );
};

export default App;
`;

codesData.vue.app = `<template>
  <v-stage :config="stageSize">
    <v-layer>
      <v-image
        v-if="yodaImage"
        :config="{
          x: 50,
          y: 50,
          image: yodaImage,
          width: 106,
          height: 118
        }"
      />
      <v-image
        v-if="vaderImage"
        :config="{
          x: 200,
          y: 50,
          image: vaderImage,
          scaleX: 0.5,
          scaleY: 0.5,
          cornerRadius: 20
        }"
      />
    </v-layer>
  </v-stage>
</template>

<script setup>
import { useImage } from 'vue-konva';

const stageSize = {
  width: window.innerWidth,
  height: window.innerHeight
};

const [yodaImage] = useImage('https://konvajs.org/assets/yoda.jpg');
const [vaderImage] = useImage('https://konvajs.org/assets/darth-vader.jpg');
</script>
`;
