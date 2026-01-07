import { createShapeCodesData } from "@docs/types";

export * from "./demo";

export const keyboardEventsCodes = createShapeCodesData();

keyboardEventsCodes.vanilla.js = `import Konva from 'konva';

const stage = new Konva.Stage({
  container: 'container',
  width: window.innerWidth,
  height: window.innerHeight,
});

const layer = new Konva.Layer();
stage.add(layer);

const circle = new Konva.Circle({
  x: stage.width() / 2,
  y: stage.height() / 2,
  radius: 50,
  fill: 'red',
  stroke: 'black',
  strokeWidth: 4,
});
layer.add(circle);

// make stage container focusable
stage.container().tabIndex = 1;
// focus it
// also stage will be in focus on its click
stage.container().focus();

const DELTA = 4;

// add keyboard events
stage.container().addEventListener('keydown', (e) => {
  if (e.keyCode === 37) {
    circle.x(circle.x() - DELTA);
  } else if (e.keyCode === 38) {
    circle.y(circle.y() - DELTA);
  } else if (e.keyCode === 39) {
    circle.x(circle.x() + DELTA);
  } else if (e.keyCode === 40) {
    circle.y(circle.y() + DELTA);
  } else {
    return;
  }
  e.preventDefault();
});
`;

keyboardEventsCodes.react = `import { Stage, Layer, Circle } from 'react-konva';
import { useRef, useEffect, useState } from 'react';

const App = () => {
  const stageRef = useRef();
  const containerRef = useRef();
  const [position, setPosition] = useState({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });

  useEffect(() => {
    // focus the div on mount
    containerRef.current.focus();
  }, []);

  const handleKeyDown = (e) => {
    const DELTA = 4;
    switch (e.keyCode) {
      case 37: // left
        setPosition(pos => ({ ...pos, x: pos.x - DELTA }));
        break;
      case 38: // up
        setPosition(pos => ({ ...pos, y: pos.y - DELTA }));
        break;
      case 39: // right
        setPosition(pos => ({ ...pos, x: pos.x + DELTA }));
        break;
      case 40: // down
        setPosition(pos => ({ ...pos, y: pos.y + DELTA }));
        break;
      default:
        return;
    }
    e.preventDefault();
  };

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        ref={stageRef}
      >
        <Layer>
          <Circle
            x={position.x}
            y={position.y}
            radius={50}
            fill="red"
            stroke="black"
            strokeWidth={4}
          />
        </Layer>
      </Stage>
    </div>
  );
};

export default App;
`;

keyboardEventsCodes.vue.app = `<template>
  <div
    ref="containerRef"
    tabindex="0"
    @keydown="handleKeyDown"
  >
    <v-stage :config="stageSize" ref="stageRef">
      <v-layer>
        <v-circle :config="circleConfig" />
      </v-layer>
    </v-stage>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';

const stageRef = ref(null);
const containerRef = ref(null);
const position = ref({
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
});

const stageSize = {
  width: window.innerWidth,
  height: window.innerHeight
};

const circleConfig = computed(() => ({
  x: position.value.x,
  y: position.value.y,
  radius: 50,
  fill: 'red',
  stroke: 'black',
  strokeWidth: 4
}));

onMounted(() => {
  // focus the div on mount
  containerRef.value.focus();
});

const focusDiv = () => {
  containerRef.value.focus();
};

const handleKeyDown = (e) => {
  const DELTA = 4;
  switch (e.keyCode) {
    case 37: // left
      position.value.x -= DELTA;
      break;
    case 38: // up
      position.value.y -= DELTA;
      break;
    case 39: // right
      position.value.x += DELTA;
      break;
    case 40: // down
      position.value.y += DELTA;
      break;
    default:
      return;
  }
  e.preventDefault();
};
</script>
`;
