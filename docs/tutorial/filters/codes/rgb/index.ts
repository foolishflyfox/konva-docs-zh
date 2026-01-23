import { createShapeCodesData } from "@docs/types";

export * from "./demo";

export const rgbCodes = createShapeCodesData();

rgbCodes.vanilla.js = `import Konva from 'konva';

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
  image.filters([Konva.Filters.RGB]);
  image.red(100);
  image.green(100);
  image.blue(100);

  // create sliders
  const createSlider = (label, property) => {
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.left = '20px';
    
    const text = document.createElement('span');
    text.textContent = \`\${label}: \`;
    container.appendChild(text);
    
    const slider = document.createElement('input');
    slider.type = 'range';
    slider.min = '0';
    slider.max = '255';
    slider.step = '1';
    slider.value = image[property]();
    slider.style.width = '200px';
    
    slider.addEventListener('input', (e) => {
      const value = parseInt(e.target.value);
      image[property](value);
    });
    
    container.appendChild(slider);
    return container;
  };

  const redSlider = createSlider('Red', 'red');
  redSlider.style.top = '20px';
  document.body.appendChild(redSlider);

  const greenSlider = createSlider('Green', 'green');
  greenSlider.style.top = '45px';
  document.body.appendChild(greenSlider);

  const blueSlider = createSlider('Blue', 'blue');
  blueSlider.style.top = '70px';
  document.body.appendChild(blueSlider);
};
imageObj.src = 'https://konvajs.org/assets/darth-vader.jpg';
imageObj.crossOrigin = 'anonymous';
`;

rgbCodes.react = `import { Stage, Layer, Image } from 'react-konva';
import { useState, useEffect, useRef } from 'react';
import useImage from 'use-image';

const App = () => {
  const [red, setRed] = useState(100);
  const [green, setGreen] = useState(100);
  const [blue, setBlue] = useState(100);
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
            filters={[Konva.Filters.RGB]}
            red={red}
            green={green}
            blue={blue}
          />
        </Layer>
      </Stage>
      <div style={{ position: 'absolute', top: '20px', left: '20px' }}>
        <div>
          Red
          <input
            type="range"
            min="0"
            max="255"
            value={red}
            onChange={(e) => setRed(parseInt(e.target.value))}
          />
        </div>
        <div>
          Green
          <input
            type="range"
            min="0"
            max="255"
            value={green}
            onChange={(e) => setGreen(parseInt(e.target.value))}
          />
        </div>
        <div>
          Blue
          <input
            type="range"
            min="0"
            max="255"
            value={blue}
            onChange={(e) => setBlue(parseInt(e.target.value))}
          />
        </div>
      </div>
    </>
  );
};

export default App;
`;

rgbCodes.vue.app = `<template>
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
            filters: [Konva.Filters.RGB],
            red: red,
            green: green,
            blue: blue,
          }"
        />
      </v-layer>
    </v-stage>
    <div style="position: absolute; top: 20px; left: 20px">
      <div>
        Red
        <input
          type="range"
          min="0"
          max="255"
          :value="red"
          @input="(e) => red = parseInt(e.target.value)"
        />
      </div>
      <div>
        Green
        <input
          type="range"
          min="0"
          max="255"
          :value="green"
          @input="(e) => green = parseInt(e.target.value)"
        />
      </div>
      <div>
        Blue
        <input
          type="range"
          min="0"
          max="255"
          :value="blue"
          @input="(e) => blue = parseInt(e.target.value)"
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

const red = ref(100);
const green = ref(100);
const blue = ref(100);
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
