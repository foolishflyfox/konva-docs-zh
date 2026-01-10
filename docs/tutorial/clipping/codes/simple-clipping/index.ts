import { createShapeCodesData } from "@docs/types";

export * from "./demo";

export const simpleClippingCodes = createShapeCodesData();
simpleClippingCodes.vanilla.js = `import Konva from 'konva';

// First we need to create stage
const stage = new Konva.Stage({
  container: 'container',
  width: window.innerWidth,
  height: window.innerHeight,
});

// Then create layer
const layer = new Konva.Layer();

const group = new Konva.Group({
  clip: {
    x: 100,
    y: 20,
    width: 200,
    height: 200,
  },
});

for (let i = 0; i < 20; i++) {
  const blob = new Konva.Circle({
    x: Math.random() * stage.width(),
    y: Math.random() * stage.height(),
    radius: Math.random() * 50,
    fill: 'green',
    opacity: 0.8,
  });
  group.add(blob);
}

// add the shape to the layer
layer.add(group);

// add the layer to the stage
stage.add(layer);
`;

simpleClippingCodes.react = `import { Stage, Layer, Group, Circle } from 'react-konva';

const App = () => {
  const blobs = Array.from({ length: 20 }, (_, i) => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    radius: Math.random() * 50,
  }));

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Group
          clip={{
            x: 100,
            y: 20,
            width: 200,
            height: 200,
          }}
        >
          {blobs.map((blob, i) => (
            <Circle
              key={i}
              x={blob.x}
              y={blob.y}
              radius={blob.radius}
              fill="green"
              opacity={0.8}
            />
          ))}
        </Group>
      </Layer>
    </Stage>
  );
};

export default App;
`;

simpleClippingCodes.vue.app = `<template>
  <v-stage :config="stageSize">
    <v-layer>
      <v-group :config="groupConfig">
        <v-circle
          v-for="(blob, i) in blobs"
          :key="i"
          :config="blob"
        />
      </v-group>
    </v-layer>
  </v-stage>
</template>

<script setup>
const stageSize = {
  width: window.innerWidth,
  height: window.innerHeight
};

const groupConfig = {
  clip: {
    x: 100,
    y: 20,
    width: 200,
    height: 200,
  }
};

const blobs = Array.from({ length: 20 }, () => ({
  x: Math.random() * window.innerWidth,
  y: Math.random() * window.innerHeight,
  radius: Math.random() * 50,
  fill: 'green',
  opacity: 0.8
}));
</script>
`;
