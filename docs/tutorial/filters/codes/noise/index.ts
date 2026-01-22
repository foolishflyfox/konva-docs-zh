import { createShapeCodesData } from "@docs/types";

export * from "./demo";

export const noiseCodes = createShapeCodesData();
noiseCodes.vanilla.js = `import Konva from 'konva';

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
  image.filters([Konva.Filters.Noise]);
  image.noise(0.3);

  // create slider
  const container = document.createElement('div');
  container.style.position = 'absolute';
  container.style.top = '20px';
  container.style.left = '20px';
  
  const text = document.createElement('span');
  text.textContent = 'Noise: ';
  container.appendChild(text);
  
  const slider = document.createElement('input');
  slider.type = 'range';
  slider.min = '0';
  slider.max = '1';
  slider.step = '0.1';
  slider.value = image.noise();
  slider.style.width = '200px';
  
  slider.addEventListener('input', (e) => {
    const value = parseFloat(e.target.value);
    image.noise(value);
  });
  
  container.appendChild(slider);
  document.body.appendChild(container);
};
imageObj.src = 'https://konvajs.org/assets/darth-vader.jpg';
imageObj.crossOrigin = 'anonymous';
`;

noiseCodes.react = `import { Stage, Layer, Image } from 'react-konva';
import { useState, useEffect, useRef } from 'react';
import useImage from 'use-image';

const App = () => {
  const [noise, setNoise] = useState(0.5);
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
            filters={[Konva.Filters.Noise]}
            noise={noise}
          />
        </Layer>
      </Stage>
      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={noise}
        onChange={(e) => setNoise(parseFloat(e.target.value))}
        style={{ position: 'absolute', top: '20px', left: '20px' }}
      />
    </>
  );
};

export default App;
`;

noiseCodes.vue.app = `<template>
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
            filters: [Konva.Filters.Noise],
            noise: noise,
          }"
        />
      </v-layer>
    </v-stage>
    <input
      type="range"
      min="0"
      max="1"
      step="0.1"
      :value="noise"
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

const noise = ref(0.5);
const imageNode = ref(null);
const [image] = useImage('https://konvajs.org/assets/darth-vader.jpg', 'anonymous');

watch(image, async (newImage) => {
  if (newImage) {
    await nextTick();
    imageNode.value.getNode().cache();
  }
});

const handleSlider = (e) => {
  noise.value = parseFloat(e.target.value);
};
</script>
`;
