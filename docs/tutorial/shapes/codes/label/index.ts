import { createShapeCodesData } from "@docs/types";
export * from "./demo";

export const codesData = createShapeCodesData();

codesData.vanilla.js = `import Konva from 'konva';

const stage = new Konva.Stage({
  container: 'container',
  width: window.innerWidth,
  height: window.innerHeight
});

const layer = new Konva.Layer();

// 向下指示的提示
const tooltip = new Konva.Label({
  x: 170,
  y: 75,
  opacity: 0.75
});

tooltip.add(
  new Konva.Tag({
    fill: 'black',
    pointerDirection: 'down',
    pointerWidth: 10,
    pointerHeight: 10,
    lineJoin: 'round',
    shadowColor: 'black',
    shadowBlur: 10,
    shadowOffsetX: 10,
    shadowOffsetY: 10,
    shadowOpacity: 0.5
  })
);

tooltip.add(
  new Konva.Text({
    text: 'Tooltip pointing down',
    fontFamily: 'Calibri',
    fontSize: 18,
    padding: 5,
    fill: 'white'
  })
);

// 左向指示的标签
const labelLeft = new Konva.Label({
  x: 20,
  y: 130,
  opacity: 0.75
});

labelLeft.add(
  new Konva.Tag({
    fill: 'green',
    pointerDirection: 'left',
    pointerWidth: 20,
    pointerHeight: 28,
    lineJoin: 'round'
  })
);

labelLeft.add(
  new Konva.Text({
    text: 'Label pointing left',
    fontFamily: 'Calibri',
    fontSize: 18,
    padding: 5,
    fill: 'white'
  })
);

// 简单标签
const simpleLabel = new Konva.Label({
  x: 180,
  y: 150,
  opacity: 0.75
});

simpleLabel.add(
  new Konva.Tag({
    fill: 'yellow'
  })
);

simpleLabel.add(
  new Konva.Text({
    text: 'Simple label',
    fontFamily: 'Calibri',
    fontSize: 18,
    padding: 5,
    fill: 'black'
  })
);

layer.add(tooltip).add(labelLeft).add(simpleLabel);
stage.add(layer);
`;

codesData.react = `import { Stage, Layer, Label, Tag, Text } from 'react-konva';

const App = () => {
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        {/* tooltip pointing down */}
        <Label x={170} y={75} opacity={0.75}>
          <Tag
            fill="black"
            pointerDirection="down"
            pointerWidth={10}
            pointerHeight={10}
            lineJoin="round"
            shadowColor="black"
            shadowBlur={10}
            shadowOffsetX={10}
            shadowOffsetY={10}
            shadowOpacity={0.5}
          />
          <Text
            text="Tooltip pointing down"
            fontFamily="Calibri"
            fontSize={18}
            padding={5}
            fill="white"
          />
        </Label>

        {/* label pointing left */}
        <Label x={20} y={130} opacity={0.75}>
          <Tag
            fill="green"
            pointerDirection="left"
            pointerWidth={20}
            pointerHeight={28}
            lineJoin="round"
          />
          <Text
            text="Label pointing left"
            fontFamily="Calibri"
            fontSize={18}
            padding={5}
            fill="white"
          />
        </Label>

        {/* simple label */}
        <Label x={180} y={150} opacity={0.75}>
          <Tag fill="yellow" />
          <Text
            text="Simple label"
            fontFamily="Calibri"
            fontSize={18}
            padding={5}
            fill="black"
          />
        </Label>
      </Layer>
    </Stage>
  );
};

export default App;
`;

codesData.vue.app = `<template>
  <v-stage :config="stageSize">
    <v-layer>
      <!-- tooltip pointing down -->
      <v-label :config="tooltipConfig">
        <v-tag :config="tooltipTagConfig" />
        <v-text :config="tooltipTextConfig" />
      </v-label>

      <!-- label pointing left -->
      <v-label :config="leftLabelConfig">
        <v-tag :config="leftTagConfig" />
        <v-text :config="leftTextConfig" />
      </v-label>

      <!-- simple label -->
      <v-label :config="simpleLabelConfig">
        <v-tag :config="simpleTagConfig" />
        <v-text :config="simpleTextConfig" />
      </v-label>
    </v-layer>
  </v-stage>
</template>

<script setup>
const stageSize = {
  width: window.innerWidth,
  height: window.innerHeight
};

// tooltip pointing down
const tooltipConfig = {
  x: 170,
  y: 75,
  opacity: 0.75
};

const tooltipTagConfig = {
  fill: 'black',
  pointerDirection: 'down',
  pointerWidth: 10,
  pointerHeight: 10,
  lineJoin: 'round',
  shadowColor: 'black',
  shadowBlur: 10,
  shadowOffsetX: 10,
  shadowOffsetY: 10,
  shadowOpacity: 0.5
};

const tooltipTextConfig = {
  text: 'Tooltip pointing down',
  fontFamily: 'Calibri',
  fontSize: 18,
  padding: 5,
  fill: 'white'
};

// label pointing left
const leftLabelConfig = {
  x: 20,
  y: 130,
  opacity: 0.75
};

const leftTagConfig = {
  fill: 'green',
  pointerDirection: 'left',
  pointerWidth: 20,
  pointerHeight: 28,
  lineJoin: 'round'
};

const leftTextConfig = {
  text: 'Label pointing left',
  fontFamily: 'Calibri',
  fontSize: 18,
  padding: 5,
  fill: 'white'
};

// simple label
const simpleLabelConfig = {
  x: 180,
  y: 150,
  opacity: 0.75
};

const simpleTagConfig = {
  fill: 'yellow'
};

const simpleTextConfig = {
  text: 'Simple label',
  fontFamily: 'Calibri',
  fontSize: 18,
  padding: 5,
  fill: 'black'
};
</script>
`;
