import { createShapeCodesData } from "@docs/types";

export * from "./demo";
export const strokeCodes = createShapeCodesData();
strokeCodes.vanilla.js = `import Konva from 'konva';

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
    stroke: 'black',    // 在构造函数中指定描边颜色
    strokeWidth: 4,     // 在构造函数中指定描边宽度
});

pentagon.on('mouseover', function () {
    this.stroke('blue');    // 通过方法指定描边颜色
    this.strokeWidth(20);   // 通过方法指定描边宽度
});

pentagon.on('mouseout', function () {
    this.stroke('black');
    this.strokeWidth(4);
});

layer.add(pentagon);
stage.add(layer);
`;

strokeCodes.react = `import React, { useState } from 'react';
import { Stage, Layer, RegularPolygon } from 'react-konva';

const App = () => {
  const [stroke, setStroke] = useState('black');
  const [strokeWidth, setStrokeWidth] = useState(4);
  const [cursor, setCursor] = useState('default');

  const handleMouseEnter = () => {
    setStroke('blue');
    setStrokeWidth(20);
    setCursor('pointer');
  };

  const handleMouseLeave = () => {
    setStroke('black');
    setStrokeWidth(4);
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
          stroke={stroke}
          strokeWidth={strokeWidth}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      </Layer>
    </Stage>
  );
};

export default App;
`;

strokeCodes.vue.app = `<template>
  <v-stage :config="stageSize" :style="{ cursor: cursor }">
    <v-layer>
      <v-regular-polygon
        :config="{
          x: stageSize.width / 2,
          y: stageSize.height / 2,
          sides: 5,
          radius: 70,
          fill: 'red',
          stroke: strokeColor,
          strokeWidth: strokeWidth,
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
      strokeColor: 'black',
      strokeWidth: 4,
      cursor: 'default',
    };
  },
  methods: {
    onMouseEnter() {
      this.strokeColor = 'blue';
      this.strokeWidth = 20;
      this.cursor = 'pointer';
    },
    onMouseLeave() {
      this.strokeColor = 'black';
      this.strokeWidth = 4;
      this.cursor = 'default';
    },
  },
};
</script>
`;
