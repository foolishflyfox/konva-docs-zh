import { createShapeCodesData } from "@docs/types";

export * from "./demo";
export const customFilterCodes = createShapeCodesData();

customFilterCodes.vanilla.js = `import Konva from 'konva';

// create our custom filter
Konva.Filters.RemoveAlpha = function (imageData) {
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    data[i + 3] = 255; // set alpha to 1
  }
};

const stage = new Konva.Stage({
  container: 'container',
  width: window.innerWidth,
  height: window.innerHeight,
});

const layer = new Konva.Layer();
stage.add(layer);

const imageObj = new Image();
imageObj.onload = () => {
  const image = new Konva.Image({
    x: 50,
    y: 50,
    image: imageObj,
    draggable: true,
  });

  layer.add(image);

  image.cache();
  image.filters([Konva.Filters.RemoveAlpha]);
};
imageObj.src = 'https://konvajs.org/assets/lion.png';
imageObj.crossOrigin = 'anonymous';
`;

customFilterCodes.react = `import { Stage, Layer, Image } from 'react-konva';
import { useState, useEffect, useRef } from 'react';
import useImage from 'use-image';

// create our custom filter
Konva.Filters.RemoveAlpha = function (imageData) {
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    data[i + 3] = 255; // set alpha to 1
  }
};

const App = () => {
  const [image] = useImage('https://konvajs.org/assets/lion.png', 'anonymous');
  const imageRef = useRef(null);

  useEffect(() => {
    if (image) {
      imageRef.current.cache();
    }
  }, [image]);

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Image
          ref={imageRef}
          x={50}
          y={50}
          image={image}
          draggable
          filters={[Konva.Filters.RemoveAlpha]}
        />
      </Layer>
    </Stage>
  );
};

export default App;
`;

customFilterCodes.vue.app = `<template>
  <v-stage :config="stageSize">
    <v-layer>
      <v-image
        ref="imageNode"
        :config="{
          x: 50,
          y: 50,
          image: image,
          draggable: true,
          filters: [Konva.Filters.RemoveAlpha],
        }"
      />
    </v-layer>
  </v-stage>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue';
import { useImage } from 'vue-konva';
import Konva from 'konva';

// create our custom filter
Konva.Filters.RemoveAlpha = function (imageData) {
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    data[i + 3] = 255; // set alpha to 1
  }
};

const stageSize = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const imageNode = ref(null);
const [image] = useImage('https://konvajs.org/assets/lion.png', 'anonymous');

watch(image, async (newImage) => {
  if (newImage) {
    await nextTick();
    imageNode.value.getNode().cache();
  }
});
</script>
`;
