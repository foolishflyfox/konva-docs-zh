import { createShapeCodesData } from "@docs/types";

export * from "./demo";
export const spriteCodes = createShapeCodesData();
spriteCodes.vanilla.js = `import Konva from 'konva';

const stage = new Konva.Stage({
  container: 'container',
  width: window.innerWidth,
  height: window.innerHeight
});

const layer = new Konva.Layer();
stage.add(layer);

// 定义多个动画序列
const animations = {
  idle: [
    2, 2, 70, 119,      // 第一帧的 x,y,width,height
    71, 2, 74, 119,     // 第二帧
    146, 2, 81, 119,    // 第三帧
    226, 2, 76, 119,    // 第四帧
  ],
  punch: [
    2, 138, 74, 122,    // 第一帧
    76, 138, 84, 122,   // 第二帧
    346, 138, 120, 122, // 第三帧
  ],
};

const imageObj = new Image();
imageObj.onload = function() {
  const sprite = new Konva.Sprite({
    x: 50, // 精灵图左上角的 x 坐标
    y: 50, // 精灵图左上角的 y 坐标
    image: imageObj, // 精灵图对象
    animation: 'idle', // 动画键名
    animations: animations, // 动画组(键名与动画帧数组映射)
    frameRate: 7, // 动画帧率
    frameIndex: 0, // 初始帧设置
  });

  layer.add(sprite);
  sprite.start();

  // 点击后，动画变为 “击打” 的按钮
  const button = document.createElement('button');
  button.textContent = 'Punch';
  button.style.position = 'absolute';
  button.style.top = '0';
  button.style.left = '0';
  document.body.appendChild(button);

  button.addEventListener('click', () => {
    sprite.animation('punch');
    // 设置 frameIndex 改变的属性监听，并设置命名空间为 button
    sprite.on('frameIndexChange.button', function() {
      // 击打动画一共有3帧，当 frameIndex 为 2 时，表示已到达最后一帧
      if (this.frameIndex() === 2) {
        setTimeout(() => {
          // 切换回常态动画，且不再监听动画帧索引的变化
          sprite.animation('idle');
          sprite.off('.button');
        }, 1000 / sprite.frameRate());
      }
    });
  });
};
imageObj.src = 'https://konvajs.org/assets/blob-sprite.png';
`;

spriteCodes.react = `import { Stage, Layer, Sprite } from 'react-konva';
import { useEffect, useRef } from 'react';
import useImage from 'use-image';

const App = () => {
  const spriteRef = useRef(null);
  const [image] = useImage('https://konvajs.org/assets/blob-sprite.png');

  const animations = {
    idle: [
      2, 2, 70, 119,      // frame 1
      71, 2, 74, 119,     // frame 2
      146, 2, 81, 119,    // frame 3
      226, 2, 76, 119,    // frame 4
    ],
    punch: [
      2, 138, 74, 122,    // frame 1
      76, 138, 84, 122,   // frame 2
      346, 138, 120, 122, // frame 3
    ],
  };

  useEffect(() => {
    if (spriteRef.current) {
      spriteRef.current.start();
    }
  }, [image]);

  const handlePunch = () => {
    if (spriteRef.current) {
      const sprite = spriteRef.current;
      sprite.animation('punch');
      sprite.on('frameIndexChange.button', function() {
        if (this.frameIndex() === 2) {
          setTimeout(() => {
            sprite.animation('idle');
            sprite.off('.button');
          }, 1000 / sprite.frameRate());
        }
      });
    }
  };

  return (
    <>
     
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Sprite
            ref={spriteRef}
            x={50}
            y={50}
            image={image}
            animation="idle"
            animations={animations}
            frameRate={7}
            frameIndex={0}
          />
        </Layer>
      </Stage>
      <button 
        onClick={handlePunch}
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        Punch
      </button>
    </>
  );
};

export default App;
`;

spriteCodes.vue.app = `<template>
  <div>
    <v-stage :config="stageSize">
      <v-layer>
        <v-sprite
          :config="spriteConfig"
          ref="spriteRef"
        />
      </v-layer>
    </v-stage>
    <button
      @click="handlePunch"
      style="position: absolute; top: 0; left: 0"
    >
      Punch
    </button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useImage } from 'vue-konva';

const stageSize = {
  width: window.innerWidth,
  height: window.innerHeight
};

const spriteRef = ref(null);
const [image] = useImage('https://konvajs.org/assets/blob-sprite.png');

const animations = {
  idle: [
    2, 2, 70, 119,      // frame 1
    71, 2, 74, 119,     // frame 2
    146, 2, 81, 119,    // frame 3
    226, 2, 76, 119,    // frame 4
  ],
  punch: [
    2, 138, 74, 122,    // frame 1
    76, 138, 84, 122,   // frame 2
    346, 138, 120, 122, // frame 3
  ],
};

const spriteConfig = ref({
  x: 50,
  y: 50,
  image: image,
  animation: 'idle',
  animations: animations,
  frameRate: 7,
  frameIndex: 0
});

watch(image, (newImage) => {
  if (newImage) {
    const sprite = spriteRef.value.getNode();
    sprite.start();
  }
});

const handlePunch = () => {
  const sprite = spriteRef.value.getNode();
  sprite.animation('punch');
  sprite.on('frameIndexChange.button', function() {
    if (this.frameIndex() === 2) {
      setTimeout(() => {
        sprite.animation('idle');
        sprite.off('.button');
      }, 1000 / sprite.frameRate());
    }
  });
};
</script>
`;
