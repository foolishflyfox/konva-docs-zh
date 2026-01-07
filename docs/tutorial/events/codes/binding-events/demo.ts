import { createLayer } from "@docs/utils";
import Konva from "konva";

export function bindingEventsDemo(stage: Konva.Stage) {
  const layer = createLayer(stage);
  const text = new Konva.Text({
    x: 10,
    y: 10,
    fontFamily: "Calibri",
    fontSize: 24,
    text: "",
    fill: "black",
  });

  const triangle = new Konva.RegularPolygon({
    x: 80,
    y: 120,
    sides: 3,
    radius: 80,
    fill: "#00D2FF",
    stroke: "black",
    strokeWidth: 4,
  });

  const circle = new Konva.Circle({
    x: 230,
    y: 100,
    radius: 60,
    fill: "red",
    stroke: "black",
    strokeWidth: 4,
  });

  function writeMessage(message: string) {
    text.text(message);
  }

  triangle.on("mouseout", () => {
    writeMessage("Mouseout triangle");
  });

  triangle.on("mousemove", () => {
    const mousePos = stage.getPointerPosition()!;
    writeMessage("x: " + mousePos.x + ", y: " + mousePos.y);
  });

  circle.on("mouseover", () => {
    writeMessage("Mouseover circle");
  });
  circle.on("mouseout", () => {
    writeMessage("Mouseout circle");
  });
  circle.on("mousedown", () => {
    writeMessage("Mousedown circle");
  });
  circle.on("mouseup", () => {
    writeMessage("Mouseup circle");
  });

  layer.add(triangle);
  layer.add(circle);
  layer.add(text);
}

export function eventTest(stage: Konva.Stage) {
  const layer = createLayer(stage);
  const events = [
    // 鼠标事件
    `mouseover`,
    `mouseout`,
    `mouseenter`,
    `mouseleave`,
    `mousemove`,
    `mousedown`,
    `mouseup`,
    `wheel`,
    `click`,
    `dblclick`,
    // 触碰事件
    `touchstart`,
    `touchmove`,
    `touchend`,
    `tap`,
    `dbltap`,
    // 指针事件
    `pointerdown`,
    `pointermove`,
    `pointerup`,
    `pointercancel`,
    `pointerover`,
    `pointerenter`,
    `pointerout`,
    `pointerleave`,
    `pointerclick`,
    `pointerdblclick`,
    // 拖拽事件
    `dragstart`,
    `dragmove`,
    `dragend`,
    // 变换事件
    `transformstart`,
    `transform`,
    `transformend`,
  ];

  const rw = 200;
  const rh = 200;
  const rect = new Konva.Rect({
    stroke: "black",
    fill: "blue",
    strokeWidth: 3,
    x: (stage.width() - rw) / 2,
    y: (stage.height() - rh) / 2,
    width: rw,
    height: rh,
    draggable: true,
  });
  const tr = new Konva.Transformer({
    nodes: [rect],
    // add border
    borderStroke: "#000",
    borderStrokeWidth: 3,
    // add anchors
    anchorFill: "#fff",
    anchorStroke: "#000",
    anchorStrokeWidth: 2,
    anchorSize: 20,
    // make all anchors look like circles
    anchorCornerRadius: 50,
  });
  const text = new Konva.Text({
    fill: "black",
    text: "",
    align: "left",
    verticalAlign: "top",
    fontSize: 18,
    x: 5,
    y: 5,
  });
  layer.add(rect, text, tr);
  interface EventReccord {
    event: string;
    time: number;
  }
  const eventRecords: EventReccord[] = [];
  function updateEventRecordsDisplay() {
    text.text(eventRecords.map((e) => e.event).join(", "));
  }
  function bindEvents() {
    for (const event of events) {
      rect.on(event, () => {
        const now = Date.now();
        const oldEventRecords = [...eventRecords];
        eventRecords.length = 0;
        for (const e of oldEventRecords) {
          if (e.event === event) continue;
          if (now - e.time > 200) continue;
          eventRecords.push(e);
        }
        eventRecords.push({ event, time: now });
        updateEventRecordsDisplay();
      });
    }
  }
  bindEvents();
}
