import { createShapeCodesData } from "@docs/types";

export * from "./demo";
export const imageEventsCodes = createShapeCodesData();
imageEventsCodes.vanilla.js = `import Konva from 'konva';

const stage = new Konva.Stage({
  container: 'container',
  width: window.innerWidth,
  height: window.innerHeight,
});

const layer = new Konva.Layer();
stage.add(layer);

const text = new Konva.Text({
  x: 10,
  y: 10,
  fontFamily: 'Calibri',
  fontSize: 24,
  text: '',
  fill: 'black',
});
layer.add(text);

function writeMessage(message) {
  text.text(message);
}

const imageObj1 = new Image();
imageObj1.onload = () => {
  const monkey = new Konva.Image({
    x: 120,
    y: 50,
    image: imageObj1,
    width: 200,
    height: 200,
  });

  monkey.on('mouseover', function () {
    writeMessage('mouseover monkey (regular image)');
  });
  monkey.on('mouseout', function () {
    writeMessage('');
  });

  layer.add(monkey);
};
imageObj1.crossOrigin = 'Anonymous';
imageObj1.src = 'https://konvajs.org/assets/monkey.png';

const imageObj2 = new Image();
imageObj2.onload = () => {
  const lion = new Konva.Image({
    x: 320,
    y: 50,
    image: imageObj2,
    width: 200,
    height: 200,
  });

  // override color detection region
  lion.on('mouseover', function () {
    writeMessage('mouseover lion (with transparent pixels detection)');
  });
  lion.on('mouseout', function () {
    writeMessage('');
  });

  layer.add(lion);
  lion.cache();
  lion.drawHitFromCache();
};
imageObj2.crossOrigin = 'Anonymous';
imageObj2.src = 'https://konvajs.org/assets/lion.png';
`;

imageEventsCodes.react = `import { Stage, Layer, Image, Text } from 'react-konva';
import { useState, useEffect, useRef } from 'react';
import useImage from 'use-image';

const App = () => {
  const [message, setMessage] = useState('');
  const lionRef = useRef();
  const [monkeyImage] = useImage('https://konvajs.org/assets/monkey.png', 'anonymous');
  const [lionImage] = useImage('https://konvajs.org/assets/lion.png', 'anonymous');

  useEffect(() => {
    if (lionImage) {
    lionRef.current.cache();
      lionRef.current.drawHitFromCache();
    }
  }, [lionImage]);

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Text
          x={10}
          y={10}
          fontFamily="Calibri"
          fontSize={24}
          text={message}
          fill="black"
        />
        {monkeyImage && (
          <Image
            x={120}
            y={50}
            image={monkeyImage}
            width={200}
            height={200}
            onMouseover={() => setMessage('mouseover monkey (regular image)')}
            onMouseout={() => setMessage('')}
          />
        )}
        {lionImage && (
          <Image
            x={320}
            y={50}
            image={lionImage}
            width={200}
            height={200}
            ref={lionRef}
            onMouseover={() =>
              setMessage('mouseover lion (with transparent pixels detection)')
            }
            onMouseout={() => setMessage('')}
          />
        )}
      </Layer>
    </Stage>
  );
};

export default App;
`;

imageEventsCodes.vue.app = `<template>
  <v-stage :config="stageSize">
    <v-layer>
      <v-text :config="textConfig" />
      <v-image
        v-if="monkeyImage"
        :config="monkeyConfig"
        @mouseover="handleMonkeyOver"
        @mouseout="handleMouseOut"
        ref="monkeyRef"
      />
      <v-image
        v-if="lionImage"
        :config="lionConfig"
        @mouseover="handleLionOver"
        @mouseout="handleMouseOut"
        ref="lionRef"
      />
    </v-layer>
  </v-stage>
</template>

<script setup>
import { ref, computed, nextTick, watch } from 'vue';
import { useImage } from 'vue-konva';

const message = ref('');
const lionRef = ref(null);
const monkeyRef = ref(null);

const [monkeyImage] = useImage('https://konvajs.org/assets/monkey.png', 'anonymous');
const [lionImage] = useImage('https://konvajs.org/assets/lion.png', 'anonymous');

const stageSize = {
  width: window.innerWidth,
  height: window.innerHeight
};

const textConfig = computed(() => ({
  x: 10,
  y: 10,
  fontFamily: 'Calibri',
  fontSize: 24,
  text: message.value,
  fill: 'black'
}));

const monkeyConfig = computed(() => ({
  x: 120,
  y: 50,
  image: monkeyImage.value,
  width: 200,
  height: 200
}));

const lionConfig = computed(() => ({
  x: 320,
  y: 50,
  image: lionImage.value,
  width: 200,
  height: 200
}));

// watch for image loads to setup hit regions
watch([lionImage, monkeyImage], () => {
  console.log('watch', lionImage, monkeyImage);
  nextTick(() => {
    if (lionRef.value) {
      const node = lionRef.value.getNode();
      node.cache();
      node.drawHitFromCache();
    }
  });
});

const handleMonkeyOver = () => {
  message.value = 'mouseover monkey (regular image)';
};

const handleLionOver = () => {
  message.value = 'mouseover lion (with transparent pixels detection)';
};

const handleMouseOut = () => {
  message.value = '';
};
</script>
`;
