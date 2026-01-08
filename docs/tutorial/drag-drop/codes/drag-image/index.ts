import { createShapeCodesData } from "@docs/types";

export * from "./demo";
export const dragImageCodes = createShapeCodesData();
dragImageCodes.vanilla.js = `import Konva from 'konva';

const stage = new Konva.Stage({
  container: 'container',
  width: window.innerWidth,
  height: window.innerHeight,
});

const layer = new Konva.Layer();

const imageObj = new Image();
imageObj.onload = () => {
  const yoda = new Konva.Image({
    x: 50,
    y: 50,
    image: imageObj,
    width: 106,
    height: 118,
    draggable: true,
  });

  // add cursor styling
  yoda.on('mouseover', function () {
    document.body.style.cursor = 'pointer';
  });
  yoda.on('mouseout', function () {
    document.body.style.cursor = 'default';
  });

  layer.add(yoda);
};
imageObj.src = 'https://konvajs.org/assets/yoda.jpg';

stage.add(layer);
`;

dragImageCodes.react = `import { Stage, Layer, Image } from 'react-konva';
import useImage from 'use-image';

const App = () => {
  const [yodaImage] = useImage('https://konvajs.org/assets/yoda.jpg');

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Image
          x={50}
          y={50}
          image={yodaImage}
          width={106}
          height={118}
          draggable
          onMouseEnter={(e) => {
            document.body.style.cursor = 'pointer';
          }}
          onMouseLeave={(e) => {
            document.body.style.cursor = 'default';
          }}
        />
      </Layer>
    </Stage>
  );
};

export default App;
`;

dragImageCodes.vue.app = `<template>
  <v-stage :config="stageSize">
    <v-layer>
      <v-image
        v-if="yodaImage"
        :config="imageConfig"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
      />
    </v-layer>
  </v-stage>
</template>

<script setup>
import { ref } from 'vue';
import { useImage } from 'vue-konva';

const stageSize = {
  width: window.innerWidth,
  height: window.innerHeight
};

const [yodaImage] = useImage('https://konvajs.org/assets/yoda.jpg');

const imageConfig = ref({
  x: 50,
  y: 50,
  image: yodaImage,
  width: 106,
  height: 118,
  draggable: true
});

const handleMouseEnter = () => {
  document.body.style.cursor = 'pointer';
};

const handleMouseLeave = () => {
  document.body.style.cursor = 'default';
};
</script>
`;
