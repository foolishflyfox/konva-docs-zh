import { createShapeCodesData } from "@docs/types";

export * from "./demo";

export const dragGroupCodes = createShapeCodesData();
dragGroupCodes.vanilla.js = `import Konva from 'konva';

const stage = new Konva.Stage({
  container: 'container',
  width: window.innerWidth,
  height: window.innerHeight,
});

const layer = new Konva.Layer();
stage.add(layer);

const group = new Konva.Group({
  draggable: true,
});
layer.add(group);

const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];

for (let i = 0; i < 6; i++) {
  const box = new Konva.Rect({
    x: i * 30 + 10,
    y: i * 18 + 40,
    width: 100,
    height: 50,
    name: colors[i],
    fill: colors[i],
    stroke: 'black',
    strokeWidth: 4,
  });
  group.add(box);
}

group.on('mouseover', function () {
  document.body.style.cursor = 'move';
});
group.on('mouseout', function () {
  document.body.style.cursor = 'default';
});
`;

dragGroupCodes.react = `import { Stage, Layer, Group, Rect, Text } from 'react-konva';

const App = () => {
  const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];

  const handleMouseOver = () => {
    document.body.style.cursor = 'move';
  };

  const handleMouseOut = () => {
    document.body.style.cursor = 'default';
  };

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Group
          draggable
          onMouseEnter={handleMouseOver}
          onMouseLeave={handleMouseOut}
        >
          {colors.map((color, i) => (
            <Rect
              key={color}
              x={i * 30 + 10}
              y={i * 18 + 40}
              width={100}
              height={50}
              name={color}
              fill={color}
              stroke="black"
              strokeWidth={4}
            />
          ))}
        </Group>
      </Layer>
    </Stage>
  );
};

export default App;
`;

dragGroupCodes.vue.app = `<template>
  <v-stage :config="stageSize">
    <v-layer>
      <v-group
        :config="groupConfig"
        @mouseenter="handleMouseOver"
        @mouseleave="handleMouseOut"
      >
        <v-rect
          v-for="(color, i) in colors"
          :key="color"
          :config="{
            x: i * 30 + 10,
            y: i * 18 + 40,
            fill: color,
            ...rectConfig
          }"
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
  draggable: true
};

const rectConfig = {
  width: 100,
  height: 50,
  stroke: 'black',
  strokeWidth: 4
};

const textConfig = {
  y: 50,
  text: 'Draggable group',
  fontSize: 16,
  fontFamily: 'Calibri',
  fill: 'black'
};

const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];

const handleMouseOver = () => {
  document.body.style.cursor = 'move';
};

const handleMouseOut = () => {
  document.body.style.cursor = 'default';
};
</script>
`;
