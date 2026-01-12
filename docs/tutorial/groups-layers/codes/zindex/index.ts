import { createShapeCodesData } from "@docs/types";

export * from "./demo";
export const zindexCodes = createShapeCodesData();

zindexCodes.vanilla.js = `import Konva from 'konva';

const width = window.innerWidth;
const height = window.innerHeight;

const stage = new Konva.Stage({
container: 'container',
width: width,
height: height,
});

const layer = new Konva.Layer();

// first group
const group1 = new Konva.Group();
layer.add(group1);

const blackRect = new Konva.Rect({
x: 10,
y: 10,
width: 100,
height: 100,
fill: 'black',
});
group1.add(blackRect);

const redCircle = new Konva.Circle({
x: 80,
y: 80,
radius: 40,
fill: 'red',
});
group1.add(redCircle);

// second group
const group2 = new Konva.Group();
layer.add(group2);

const greenRect = new Konva.Rect({
x: 50,
y: 50,
width: 100,
height: 100,
fill: 'green',
});
group2.add(greenRect);

stage.add(layer);

// create buttons
const btn1 = document.createElement('button');
btn1.textContent = 'Move red circle to group2';
btn1.addEventListener('click', () => {
redCircle.moveTo(group2);
});

const btn2 = document.createElement('button');
btn2.textContent = 'Move red circle to group1';
btn2.addEventListener('click', () => {
redCircle.moveTo(group1);
});

document.body.appendChild(btn1);
document.body.appendChild(btn2);
`;

zindexCodes.react = `import { Stage, Layer, Group, Rect, Circle } from 'react-konva';
import { useState } from 'react';

const App = () => {
  const [redCircleGroup, setRedCircleGroup] = useState('group1');

  return (
    <>
      <button onClick={() => setRedCircleGroup('group2')}>
        Move red circle to group2
      </button>
      <button onClick={() => setRedCircleGroup('group1')}>
        Move red circle to group1
      </button>
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Group>
            <Rect
              x={10}
              y={10}
              width={100}
              height={100}
              fill="black"
            />
            {redCircleGroup === 'group1' && (
              <Circle
                x={80}
                y={80}
                radius={40}
                fill="red"
              />
            )}
          </Group>
          <Group>
            <Rect
              x={50}
              y={50}
              width={100}
              height={100}
              fill="green"
            />
            {redCircleGroup === 'group2' && (
              <Circle
                x={80}
                y={80}
                radius={40}
                fill="red"
              />
            )}
          </Group>
        </Layer>
      </Stage>
    </>
  );
};

export default App;
`;

zindexCodes.vue.app = `<template>
  <div>
    <button @click="moveToGroup2">Move red circle to group2</button>
    <button @click="moveToGroup1">Move red circle to group1</button>
    <v-stage :config="stageSize">
      <v-layer>
        <v-group>
          <v-rect :config="blackRectConfig" />
          <v-circle v-if="redCircleGroup === 'group1'" :config="redCircleConfig" />
        </v-group>
        <v-group>
          <v-rect :config="greenRectConfig" />
          <v-circle v-if="redCircleGroup === 'group2'" :config="redCircleConfig" />
        </v-group>
      </v-layer>
    </v-stage>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const stageSize = {
  width: window.innerWidth,
  height: window.innerHeight
};

const redCircleGroup = ref('group1');

const blackRectConfig = {
  x: 10,
  y: 10,
  width: 100,
  height: 100,
  fill: 'black'
};

const greenRectConfig = {
  x: 50,
  y: 50,
  width: 100,
  height: 100,
  fill: 'green'
};

const redCircleConfig = {
  x: 80,
  y: 80,
  radius: 40,
  fill: 'red'
};

const moveToGroup2 = () => {
  redCircleGroup.value = 'group2';
};

const moveToGroup1 = () => {
  redCircleGroup.value = 'group1';
};
</script>
`;
