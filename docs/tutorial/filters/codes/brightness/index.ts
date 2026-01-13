import { createShapeCodesData } from "@docs/types";

export * from "./demo";
export const brightnessCodes = createShapeCodesData();
brightnessCodes.vanilla.js = `import Konva from 'konva';

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
  image.filters([Konva.Filters.Brightness]);
  image.brightness(1.5);

  const slider = document.createElement('input');
  slider.type = 'range';
  slider.min = '0';
  slider.max = '2';
  slider.step = '0.1';
  slider.value = image.brightness();

  slider.style.position = 'absolute';
  slider.style.top = '20px';
  slider.style.left = '20px';

  slider.addEventListener('input', (e) => {
    const value = parseFloat(e.target.value);
    image.brightness(value);
  });

  document.body.appendChild(slider);
};

imageObj.src = 'https://konvajs.org/assets/darth-vader.jpg';
imageObj.crossOrigin = 'anonymous';
`;
brightnessCodes.react = `import { Stage, Layer, Image } from 'react-konva';
import { useState, useEffect, useRef } from 'react';
import useImage from 'use-image';

const App = () => {
  const [brightness, setBrightness] = useState(1.5);
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
            filters={[Konva.Filters.Brightness]}
            brightness={brightness}
          />
        </Layer>
      </Stage>
      <input
        type="range"
        min="0"
        max="2"
        step="0.1"
        value={brightness}
        onChange={(e) => setBrightness(parseFloat(e.target.value))}
        style={{ position: 'absolute', top: '20px', left: '20px' }}
      />
    </>
  );
};

export default App;
`;

brightnessCodes.vue.app = `<template>
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
            filters: [Konva.Filters.Brightness],
            brightness: brightness,
          }"
        />
      </v-layer>
    </v-stage>
    <input
      type="range"
      min="0"
      max="2"
      step="0.1"
      :value="brightness"
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

const brightness = ref(1.5);
const imageNode = ref(null);
const [image] = useImage('https://konvajs.org/assets/darth-vader.jpg', 'anonymous');

watch(image, async (newImage) => {
  if (newImage) {
    await nextTick();
    imageNode.value.getNode().cache();
  }
});

const handleSlider = (e) => {
  brightness.value = parseFloat(e.target.value);
};
</script>
`;
