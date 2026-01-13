import { createShapeCodesData } from "@docs/types";

export * from "./demo";

export const contrastCodes = createShapeCodesData();
contrastCodes.vanilla.js = `import Konva from 'konva';

const width = window.innerWidth;
const height = window.innerHeight;

const stage = new Konva.Stage({
  container: 'container',
  width: width,
  height: height,
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
  image.filters([Konva.Filters.Contrast]);
  image.contrast(30);

  const slider = document.createElement('input');
  slider.type = 'range';
  slider.min = '-100';
  slider.max = '100';
  slider.value = image.contrast();

  slider.style.position = 'absolute';
  slider.style.top = '20px';
  slider.style.left = '20px';

  slider.addEventListener('input', (e) => {
    const value = parseInt(e.target.value);
    image.contrast(value);
  });

  document.body.appendChild(slider);
};

imageObj.src = 'https://konvajs.org/assets/darth-vader.jpg';
imageObj.crossOrigin = 'anonymous';
`;

contrastCodes.react = `import { Stage, Layer, Image } from 'react-konva';
import { useState, useEffect, useRef } from 'react';
import useImage from 'use-image';

const App = () => {
  const [contrast, setContrast] = useState(50);
  const [image] = useImage('https://konvajs.org/assets/darth-vader.jpg', 'anonymous');
  const imageRef = useRef(null);

  useEffect(() => {
    if (image && imageRef.current) {
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
            filters={[Konva.Filters.Contrast]}
            contrast={contrast}
          />
        </Layer>
      </Stage>
      <input
        type="range"
        min="-100"
        max="100"
        value={contrast}
        onChange={(e) => setContrast(parseInt(e.target.value))}
        style={{ position: 'absolute', top: '20px', left: '20px' }}
      />
    </>
  );
};

export default App;
`;

contrastCodes.vue.app = `<template>
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
            filters: [Konva.Filters.Contrast],
            contrast: contrast,
          }"
        />
      </v-layer>
    </v-stage>
    <input
      type="range"
      min="-100"
      max="100"
      :value="contrast"
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

const contrast = ref(50);
const imageNode = ref(null);
const [image] = useImage('https://konvajs.org/assets/darth-vader.jpg', 'anonymous');

watch(image, async (newImage) => {
  if (newImage) {
    await nextTick();
    imageNode.value.getNode().cache();
  }
});

const handleSlider = (e) => {
  contrast.value = parseInt(e.target.value);
};
</script>
`;
