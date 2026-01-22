import { createShapeCodesData } from "@docs/types";

export * from "./demo";

export const maskCodes = createShapeCodesData();
maskCodes.vanilla.js = `import Konva from 'konva';

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
  image.filters([Konva.Filters.Mask]);
  image.threshold(10);

  const slider = document.createElement('input');
  slider.type = 'range';
  slider.min = '0';
  slider.max = '255';
  slider.value = image.threshold();

  slider.style.position = 'absolute';
  slider.style.top = '20px';
  slider.style.left = '20px';

  slider.addEventListener('input', (e) => {
    const value = parseInt(e.target.value);
    image.threshold(value);
  });

  document.body.appendChild(slider);
};
imageObj.src = 'https://konvajs.org/assets/space.jpg';
imageObj.crossOrigin = 'anonymous';
`;

maskCodes.react = `import { Stage, Layer, Image } from 'react-konva';
import { useState, useEffect, useRef } from 'react';
import useImage from 'use-image';

const App = () => {
  const [threshold, setThreshold] = useState(10);
  const [image] = useImage('https://konvajs.org/assets/space.jpg', 'anonymous');
  const imageRef = useRef(null);

  useEffect(() => {
    if (image) {
      imageRef.current.cache();
    }
  }, [image]);

  return (
    <>
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Image
            ref={imageRef}
            x={50}
            y={50}
            image={image}
            draggable
            filters={[Konva.Filters.Mask]}
            threshold={threshold}
          />
        </Layer>
      </Stage>
      <input
        type="range"
        min="0"
        max="255"
        value={threshold}
        onChange={(e) => setThreshold(parseInt(e.target.value))}
        style={{ position: 'absolute', top: '20px', left: '20px' }}
      />
    </>
  );
};

export default App;
`;

maskCodes.vue.app = `<template>
  <div>
    <v-stage :config="stageSize">
      <v-layer>
        <v-image
          ref="imageNode"
          :config="{
            x: 50,
            y: 50,
            image: image,
            draggable: true,
            filters: [Konva.Filters.Mask],
            threshold: threshold,
          }"
        />
      </v-layer>
    </v-stage>
    <input
      type="range"
      min="0"
      max="255"
      :value="threshold"
      @input="handleSlider"
      style="position: absolute; top: 20px; left: 20px"
    />
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue';
import { useImage } from 'vue-konva';
import Konva from 'konva';

const stageSize = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const threshold = ref(10);
const imageNode = ref(null);
const [image] = useImage('https://konvajs.org/assets/space.jpg', 'anonymous');

watch(image, async (newImage) => {
  if (newImage) {
    // wait for the next DOM update
    await nextTick();
    // now the image component is fully updated
    imageNode.value.getNode().cache();
  }
});

const handleSlider = (e) => {
  threshold.value = parseInt(e.target.value);
};
</script>
`;
