import { createShapeCodesData } from "@docs/types";

export * from "./demo";

export const removeByNameCodes = createShapeCodesData();
removeByNameCodes.hideReact = true;
removeByNameCodes.hideVue = true;
removeByNameCodes.vanilla.js = `import Konva from 'konva';

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
  radius: 70,
  fill: 'red',
  stroke: 'black',
  strokeWidth: 4,
});

// add click listeners
circle.on('click.event1', function () {
  alert('first click listener');
});

circle.on('click.event2', function () {
  alert('second click listener');
});

layer.add(circle);

// add buttons to remove listeners
const button1 = document.createElement('button');
button1.innerHTML = 'Remove first listener';
button1.style.position = 'absolute';
button1.style.top = '0';
button1.style.left = '0';
button1.onclick = function() {
  circle.off('click.event1');
};
document.getElementById('container').appendChild(button1);

const button2 = document.createElement('button');
button2.innerHTML = 'Remove second listener';
button2.style.position = 'absolute';
button2.style.top = '30px';
button2.style.left = '0';
button2.onclick = function() {
  circle.off('click.event2');
};
document.getElementById('container').appendChild(button2);
`;
