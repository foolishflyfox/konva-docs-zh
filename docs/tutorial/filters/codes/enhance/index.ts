import { createShapeCodesData } from "@docs/types";

export * from "./demo";
export const enhanceCodes = createShapeCodesData();
enhanceCodes.vanilla.js = `import Konva from 'konva';

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
  image.filters([Konva.Filters.Enhance]);
  image.enhance(0.4);

  const slider = document.createElement('input');
  slider.type = 'range';
  slider.min = '-1';
  slider.max = '1';
  slider.step = '0.1';
  slider.value = image.enhance();

  slider.style.position = 'absolute';
  slider.style.top = '20px';
  slider.style.left = '20px';

  slider.addEventListener('input', (e) => {
    const value = parseFloat(e.target.value);
    image.enhance(value);
  });

  document.body.appendChild(slider);
};
imageObj.src = 'https://konvajs.org/assets/darth-vader.jpg';
imageObj.crossOrigin = 'anonymous';
`;

enhanceCodes.react = `import { Stage, Layer, Image } from 'react-konva';
import { useState, useEffect, useRef } from 'react';
import useImage from 'use-image';

const App = () => {
  const [enhance, setEnhance] = useState(0.4);
  const [image] = useImage('https://konvajs.org/assets/darth-vader.jpg', 'anonymous');
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
            filters={[Konva.Filters.Enhance]}
            enhance={enhance}
          />
        </Layer>
      </Stage>
      <input
        type="range"
        min="-1"
        max="1"
        step="0.1"
        value={enhance}
        onChange={(e) => setEnhance(parseFloat(e.target.value))}
        style={{ position: 'absolute', top: '20px', left: '20px' }}
      />
    </>
  );
};

export default App;
`;

enhanceCodes.vue.app = `<template>
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
            filters: [Konva.Filters.Enhance],
            enhance: enhance,
          }"
        />
      </v-layer>
    </v-stage>
    <input
      type="range"
      min="-1"
      max="1"
      step="0.1"
      :value="enhance"
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

const enhance = ref(0.4);
const imageNode = ref(null);
const [image] = useImage('https://konvajs.org/assets/darth-vader.jpg', 'anonymous');

watch(image, async (newImage) => {
  if (newImage) {
    await nextTick();
    imageNode.value.getNode().cache();
  }
});

const handleSlider = (e) => {
  enhance.value = parseFloat(e.target.value);
};
</script>
`;
