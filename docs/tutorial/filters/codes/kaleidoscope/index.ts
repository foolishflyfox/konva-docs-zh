import { createShapeCodesData } from "@docs/types";

export * from "./demo";

export const kaleidoscopeCodes = createShapeCodesData();
kaleidoscopeCodes.vanilla.js = `import Konva from 'konva';

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
  image.filters([Konva.Filters.Kaleidoscope]);
  image.kaleidoscopePower(3);
  image.kaleidoscopeAngle(0);

  // create sliders
  const createSlider = (label, min, max, defaultValue, property) => {
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.left = '20px';
    
    const text = document.createElement('span');
    text.textContent = \`\${label}: \`;
    container.appendChild(text);
    
    const slider = document.createElement('input');
    slider.type = 'range';
    slider.min = min;
    slider.max = max;
    slider.step = property === 'kaleidoscopePower' ? '1' : '0.1';
    slider.value = defaultValue;
    slider.style.width = '200px';
    
    slider.addEventListener('input', (e) => {
      const value = parseFloat(e.target.value);
      image[property](value);
    });
    
    container.appendChild(slider);
    return container;
  };

  const powerSlider = createSlider('Power', 0, 8, 3, 'kaleidoscopePower');
  powerSlider.style.top = '20px';
  document.body.appendChild(powerSlider);

  const angleSlider = createSlider('Angle', 0, 360, 0, 'kaleidoscopeAngle');
  angleSlider.style.top = '45px';
  document.body.appendChild(angleSlider);
};
imageObj.src = 'https://konvajs.org/assets/darth-vader.jpg';
imageObj.crossOrigin = 'anonymous';
`;

kaleidoscopeCodes.react = `import { Stage, Layer, Image } from 'react-konva';
import { useState, useEffect, useRef } from 'react';
import useImage from 'use-image';

const App = () => {
  const [angle, setAngle] = useState(0);
  const [power, setPower] = useState(3);
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
            filters={[Konva.Filters.Kaleidoscope]}
            kaleidoscopePower={power}
            kaleidoscopeAngle={angle}
          />
        </Layer>
      </Stage>
      <div style={{ position: 'absolute', top: '20px', left: '20px' }}>
        <div>
          Power
          <input
            type="range"
            min="0"
            max="8"
            step="1"
            value={power}
            onChange={(e) => setPower(parseInt(e.target.value))}
            style={{ width: '200px' }}
          />
        </div>
        <div>
          Angle
          <input
            type="range"
            min="0"
            max="360"
            step="0.1"
            value={angle}
            onChange={(e) => setAngle(parseFloat(e.target.value))}
            style={{ width: '200px' }}
          />
        </div>
      </div>
    </>
  );
};

export default App;
`;

kaleidoscopeCodes.vue.app = `<template>
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
            filters: [Konva.Filters.Kaleidoscope],
            kaleidoscopePower: sides,
            kaleidoscopeAngle: angle,
          }"
        />
      </v-layer>
    </v-stage>
    <div style="position: absolute; top: 20px; left: 20px">
      <div>
        Sides
        <input
          type="range"
          min="1"
          max="8"
          step="1"
          :value="sides"
          @input="(e) => sides = parseInt(e.target.value)"
        />
      </div>
      <div>
        Angle
        <input
          type="range"
          min="0"
          max="360"
          step="1"
          :value="angle"
          @input="(e) => angle = parseInt(e.target.value)"
        />
      </div>
    </div>
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

const sides = ref(6);
const angle = ref(0);
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
