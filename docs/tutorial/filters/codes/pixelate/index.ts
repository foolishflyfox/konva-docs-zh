import { createShapeCodesData } from "@docs/types";

export * from "./demo";

export const pixelateCodes = createShapeCodesData();

pixelateCodes.vanilla.js = `import Konva from 'konva';

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
  image.filters([Konva.Filters.Pixelate]);
  image.pixelSize(8);

  // create slider
  const container = document.createElement('div');
  container.style.position = 'absolute';
  container.style.top = '20px';
  container.style.left = '20px';
  
  const text = document.createElement('span');
  text.textContent = 'Pixel Size: ';
  container.appendChild(text);
  
  const slider = document.createElement('input');
  slider.type = 'range';
  slider.min = '2';
  slider.max = '32';
  slider.step = '1';
  slider.value = image.pixelSize();
  slider.style.width = '200px';
  
  slider.addEventListener('input', (e) => {
    const value = parseInt(e.target.value);
    image.pixelSize(value);
  });
  
  container.appendChild(slider);
  document.body.appendChild(container);
};
imageObj.src = 'https://konvajs.org/assets/darth-vader.jpg';
imageObj.crossOrigin = 'anonymous';
`;

pixelateCodes.react = `import { Stage, Layer, Image } from 'react-konva';
import { useState, useEffect, useRef } from 'react';
import useImage from 'use-image';

const App = () => {
  const [pixelSize, setPixelSize] = useState(8);
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
            filters={[Konva.Filters.Pixelate]}
            pixelSize={pixelSize}
          />
        </Layer>
      </Stage>
      <input
        type="range"
        min="2"
        max="32"
        step="1"
        value={pixelSize}
        onChange={(e) => setPixelSize(parseInt(e.target.value))}
        style={{ position: 'absolute', top: '20px', left: '20px' }}
      />
    </>
  );
};

export default App;
`;

pixelateCodes.vue.app = `<template>
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
            filters: [Konva.Filters.Pixelate],
            pixelSize: pixelSize,
          }"
        />
      </v-layer>
    </v-stage>
    <input
      type="range"
      min="2"
      max="32"
      step="1"
      :value="pixelSize"
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

const pixelSize = ref(8);
const imageNode = ref(null);
const [image] = useImage('https://konvajs.org/assets/darth-vader.jpg', 'anonymous');

watch(image, async (newImage) => {
  if (newImage) {
    await nextTick();
    imageNode.value.getNode().cache();
  }
});

const handleSlider = (e) => {
  pixelSize.value = parseInt(e.target.value);
};
</script>
`;
