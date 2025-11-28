import { createShapeCodesData } from "@docs/types";

export const codesData = createShapeCodesData();
codesData.vanilla.js = `import Konva from 'konva';

const stage = new Konva.Stage({
  container: 'container',
  width: window.innerWidth,
  height: window.innerHeight
});

const layer = new Konva.Layer();
stage.add(layer);

const arc = new Konva.Arc({
  x: stage.width() / 2, // 圆弧中心点 x 坐标
  y: stage.height() / 2, // 圆弧中心点 y 坐标
  innerRadius: 40, // 内圆半径
  outerRadius: 70, // 外圆半径
  angle: 60, // 圆弧的绘制角度数
  fill: 'yellow', // 填充颜色
  stroke: 'black', // 描边颜色
  strokeWidth: 4 // 描边宽度
});

layer.add(arc);
`;

codesData.vue.app = `<template>
  <v-stage :config="stageSize">
    <v-layer>
      <v-arc :config="arcConfig" />
    </v-layer>
  </v-stage>
</template>

<script setup>
const stageSize = {
  width: window.innerWidth,
  height: window.innerHeight
};

const arcConfig = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
  innerRadius: 40,
  outerRadius: 70,
  angle: 60,
  fill: 'yellow',
  stroke: 'black',
  strokeWidth: 4
};
</script>
`;

codesData.react = `import { Stage, Layer, Arc } from 'react-konva';

const App = () => {
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Arc
          x={window.innerWidth / 2}
          y={window.innerHeight / 2}
          innerRadius={40}
          outerRadius={70}
          angle={60}
          fill="yellow"
          stroke="black"
          strokeWidth={4}
        />
      </Layer>
    </Stage>
  );
};

export default App;
`;
