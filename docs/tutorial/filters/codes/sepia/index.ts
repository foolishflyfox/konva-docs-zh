import { createShapeCodesData } from "@docs/types";

export * from "./demo";

export const sepiaCodes = createShapeCodesData();
sepiaCodes.vanilla.js = `import Konva from 'konva';

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

  // Apply Sepia filter
  image.cache();
  image.filters([Konva.Filters.Sepia]);
};
imageObj.src = 'https://konvajs.org/assets/darth-vader.jpg';
imageObj.crossOrigin = 'anonymous';
`;

sepiaCodes.react = `import { Stage, Layer, Image } from 'react-konva';
import { useRef, useEffect } from 'react';
import useImage from 'use-image';

const App = () => {
  const [image] = useImage('https://konvajs.org/assets/darth-vader.jpg', 'anonymous');
  const imageRef = useRef(null);

  useEffect(() => {
    if (image && imageRef.current) {
      imageRef.current.cache();
    }
  }, [image]);

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        {image && (
          <Image
            ref={imageRef}
            x={50}
            y={50}
            image={image}
            draggable
            filters={[Konva.Filters.Sepia]}
          />
        )}
      </Layer>
    </Stage>
  );
};

export default App;
`;

sepiaCodes.vue.app = `<template>
  <v-stage :config="stageSize">
    <v-layer>
      <v-image
        v-if="image"
        ref="imageNode"
        :config="{
          x: 50,
          y: 50,
          image: image,
          draggable: true,
          filters: [Konva.Filters.Sepia],
        }"
      />
    </v-layer>
  </v-stage>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue';
import { useImage } from 'vue-konva';
import Konva from 'konva';
const stageSize = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const imageNode = ref(null);
const [image] = useImage('https://konvajs.org/assets/darth-vader.jpg', 'anonymous');

watch(image, async (newImage) => {
  if (newImage) {
    await nextTick();
    imageNode.value.getNode().cache();
  }
});
</script>
`;
