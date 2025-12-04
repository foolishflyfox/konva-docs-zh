import { createShapeCodesData } from "@docs/types";

export * from "./demo";
export const opacityCodes = createShapeCodesData();
opacityCodes.vanilla.js = `import Konva from 'konva';

var width = window.innerWidth;
var height = window.innerHeight;

var stage = new Konva.Stage({
    container: 'container',
    width: width,
    height: height,
});
var layer = new Konva.Layer();

var pentagon = new Konva.RegularPolygon({
    x: stage.width() / 2,
    y: stage.height() / 2,
    sides: 5,
    radius: 70,
    fill: 'red',
    stroke: 'black',
    strokeWidth: 4,
    opacity: 0.5, // 在构造函数中设置不透明度
});

pentagon.on('mouseover', function () {
    this.opacity(1); // 通过函数设置不透明度
});

pentagon.on('mouseout', function () {
    this.opacity(0.5);
});

layer.add(pentagon);

stage.add(layer);
`;

opacityCodes.react = `import React, { useState } from 'react';
import { Stage, Layer, RegularPolygon } from 'react-konva';

const App = () => {
  const [opacity, setOpacity] = useState(0.5);
  const [cursor, setCursor] = useState('default');

  const handleMouseEnter = () => {
    setOpacity(1);
    setCursor('pointer');
  };

  const handleMouseLeave = () => {
    setOpacity(0.5);
    setCursor('default');
  };

  return (
    <Stage width={window.innerWidth} height={window.innerHeight} style={{ cursor: cursor }}>
      <Layer>
        <RegularPolygon
          x={window.innerWidth / 2}
          y={window.innerHeight / 2}
          sides={5}
          radius={70}
          fill="red"
          stroke="black"
          strokeWidth={4}
          opacity={opacity}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      </Layer>
    </Stage>
  );
};

export default App;
`;

opacityCodes.vue.app = `<template>
  <v-stage :config="stageSize" :style="{ cursor: cursor }">
    <v-layer>
      <v-regular-polygon
        :config="{
          x: stageSize.width / 2,
          y: stageSize.height / 2,
          sides: 5,
          radius: 70,
          fill: 'red',
          stroke: 'black',
          strokeWidth: 4,
          opacity: opacity,
        }"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
      />
    </v-layer>
  </v-stage>
</template>

<script>
export default {
  data() {
    return {
      stageSize: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
      opacity: 0.5,
      cursor: 'default',
    };
  },
  methods: {
    onMouseEnter() {
      this.opacity = 1;
      this.cursor = 'pointer';
    },
    onMouseLeave() {
      this.opacity = 0.5;
      this.cursor = 'default';
    },
  },
};
</script>
`;
