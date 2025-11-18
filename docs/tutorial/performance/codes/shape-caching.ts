import { createShapeCodesData } from "@docs/types";

export const codeData = createShapeCodesData();

codeData.vanilla.js = `import Konva from 'konva';

const stage = new Konva.Stage({
  container: 'container',
  width: window.innerWidth,
  height: window.innerHeight,
});

const layer = new Konva.Layer();
stage.add(layer);

// Create a group of circles
const group = new Konva.Group({
  x: stage.width() / 2,
  y: stage.height() / 2,
});
layer.add(group);

// Add initial circles
const addCircles = (count) => {
  const radius = 300;
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * radius;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    const circle = new Konva.Circle({
      x,
      y,
      radius: 5 + Math.random() * 10,
      fill: Konva.Util.getRandomColor(),
      shadowColor: 'black',
      shadowBlur: 10,
      shadowOpacity: 0.5,
      shadowOffset: { x: 2, y: 2 },
      listening: false,
    });

    group.add(circle);
  }
};

// Add initial circles
addCircles(5000);

// Add FPS counter
const fpsText = new Konva.Text({
  x: 10,
  y: 10,
  text: 'FPS: 0',
  fontSize: 16,
  fill: 'white',
  shadowColor: 'black',
  shadowBlur: 5,
  shadowOffset: { x: 1, y: 1 }
});
layer.add(fpsText);

// Add circle count text
const countText = new Konva.Text({
  x: 10,
  y: 40,
  text: 'Circles: 1000',
  fontSize: 16,
  fill: 'white',
  shadowColor: 'black',
  shadowBlur: 5,
  shadowOffset: { x: 1, y: 1 }
});
layer.add(countText);

// Create animation
const anim = new Konva.Animation((frame) => {
  group.rotation(frame.time * 0.05);
  
  // Update FPS counter
  fpsText.text('FPS: ' + frame.frameRate.toFixed(1));
}, layer);

// Add click handler to add more circles
stage.on('click', () => {
  addCircles(1000);
  countText.text('Circles: ' + group.children.length);
});

// Add DOM checkbox
const container = stage.container();
const checkbox = document.createElement('input');
checkbox.type = 'checkbox';
checkbox.id = 'cache-toggle';
checkbox.style.position = 'absolute';
checkbox.style.top = '70px';
checkbox.style.left = '10px';
checkbox.style.zIndex = '100';
container.appendChild(checkbox);

const label = document.createElement('label');
label.htmlFor = 'cache-toggle';
label.textContent = 'Enable Caching';
label.style.position = 'absolute';
label.style.top = '70px';
label.style.left = '30px';
label.style.color = 'white';
label.style.textShadow = '0 0 5px black';
label.style.zIndex = '100';
container.appendChild(label);

// Toggle caching
checkbox.addEventListener('change', () => {
  if (checkbox.checked) {
    group.cache();
  } else {
    group.clearCache();
  }
});

anim.start();
`;
const xxx = `a
\${f}
b`;
codeData.react = `import { Stage, Layer, Circle, Text, Group } from 'react-konva';
import { useEffect, useRef, useState } from 'react';
import Konva from 'konva';

const App = () => {
  const [circles, setCircles] = useState([]);
  const [isCached, setIsCached] = useState(false);
  const fpsTextRef = useRef(null);
  const groupRef = useRef(null);

  useEffect(() => {
    // Add initial circles
    addCircles(5000);

    // Setup animation
    const anim = new Konva.Animation((frame) => {
      if (groupRef.current) {
        groupRef.current.rotation(frame.time * 0.05);
      }
      
      // Update FPS counter
      fpsTextRef.current.text('FPS: ' + frame.frameRate.toFixed(1));
    }, fpsTextRef.current.getLayer());

    anim.start();
    return () => anim.stop();
  }, []);

  // Toggle caching
  useEffect(() => {
    if (groupRef.current) {
      if (isCached) {
        groupRef.current.cache();
      } else {
        groupRef.current.clearCache();
      }
    }
  }, [isCached]);

  // Add circles
  const addCircles = (count) => {
    const newCircles = [];
    const radius = 300;

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * radius;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;

      newCircles.push({
        id: circles.length + i,
        x,
        y,
        radius: 5 + Math.random() * 10,
        fill: Konva.Util.getRandomColor(),
        shadowColor: 'black',
        shadowBlur: 10,
        shadowOpacity: 0.5,
        shadowOffset: { x: 2, y: 2 },
        listening: false
      });
    }

    setCircles(prev => [...prev, ...newCircles]);
  };

  return (
    <>
      <Stage 
        width={window.innerWidth} 
        height={window.innerHeight}
        onClick={() => addCircles(1000)}
      >
        <Layer>
          <Group
            ref={groupRef}
            x={window.innerWidth / 2}
            y={window.innerHeight / 2}
          >
            {circles.map((circle) => (
              <Circle
                key={circle.id}
                {...circle}
              />
            ))}
          </Group>

          <Text
            ref={fpsTextRef}
            x={10}
            y={10}
            text="FPS: 0"
            fontSize={16}
            fill="white"
            shadowColor="black"
            shadowBlur={5}
            shadowOffset={{ x: 1, y: 1 }}
          />

          <Text
            x={10}
            y={40}
            text={\`Circles: \${circles.length}\`}
            fontSize={16}
            fill="white"
            shadowColor="black"
            shadowBlur={5}
            shadowOffset={{ x: 1, y: 1 }}
          />
        </Layer>
      </Stage>

      <div style={{ position: 'absolute', top: '70px', left: '10px', zIndex: 100 }}>
        <input
          type="checkbox"
          id="cache-toggle"
          checked={isCached}
          onChange={(e) => setIsCached(e.target.checked)}
        />
        <label
          htmlFor="cache-toggle"
          style={{
            color: 'white',
            textShadow: '0 0 5px black',
            marginLeft: '10px'
          }}
        >
          Enable Caching
        </label>
      </div>
    </>
  );
};

export default App;
`;

codeData.vue.app = `<template>
  <v-stage 
    :config="stageSize"
    @click="addCircles(1000)"
  >
    <v-layer ref="layerRef">
      <v-group
        ref="groupRef"
        :config="{
          x: stageSize.width / 2,
          y: stageSize.height / 2
        }"
      >
        <v-circle
          v-for="circle in circles"
          :key="circle.id"
          :config="circle"
        />
      </v-group>

      <v-text
        ref="fpsTextRef"
        :config="fpsConfig"
      />

      <v-text
        :config="{
          x: 10,
          y: 40,
          text: \`Circles: \${circles.length}\`,
          fontSize: 16,
          fill: 'white',
          shadowColor: 'black',
          shadowBlur: 5,
          shadowOffset: { x: 1, y: 1 }
        }"
      />
    </v-layer>
  </v-stage>
    <div style="position: absolute; top: 70px; left: 10px; z-index: 100">
      <input
        type="checkbox"
        id="cache-toggle"
        v-model="isCached"
      />
      <label
        for="cache-toggle"
        style="color: white; text-shadow: 0 0 5px black; margin-left: 10px"
      >
        Enable Caching
      </label>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import Konva from 'konva';

const stageSize = {
  width: window.innerWidth,
  height: window.innerHeight
};

const isCached = ref(false);
const layerRef = ref(null);
const fpsTextRef = ref(null);
const groupRef = ref(null);
const circles = ref([]);

// Add circles
const addCircles = (count) => {
  console.log('addCircles', count);
  const radius = 300;
  const newCircles = [];

  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * radius;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    newCircles.push({
      id: (circles.value.length + i).toString(),
      x,
      y,
      radius: 5 + Math.random() * 10,
      fill: Konva.Util.getRandomColor(),
      shadowColor: 'black',
      shadowBlur: 10,
      shadowOpacity: 0.5,
      shadowOffset: { x: 2, y: 2 },
      listening: false
    });
  }

  circles.value = [...circles.value, ...newCircles];
};

// Toggle caching
watch(isCached, (value) => {
  if (groupRef.value) {
    if (value) {
      groupRef.value.getNode().cache();
    } else {
      groupRef.value.getNode().clearCache();
    }
  }
});

const fpsConfig = ref({
  x: 10,
  y: 10,
  text: 'FPS: 0',
  fontSize: 16,
  fill: 'white',
  shadowColor: 'black',
  shadowBlur: 5,
  shadowOffset: { x: 1, y: 1 }
});

let anim = null;

onMounted(() => {
  // Add initial circles
  addCircles(5000);

  anim = new Konva.Animation((frame) => {
    if (groupRef.value) {
      groupRef.value.getNode().rotation(frame.time * 0.05);
    }
    
    // Update FPS counter
    fpsTextRef.value.getNode().text('FPS: ' + frame.frameRate.toFixed(1));
  }, layerRef.value.getNode());

  anim.start();
});

onUnmounted(() => {
  if (anim) {
    anim.stop();
  }
});
</script>
`;
