import { createLayer } from "@docs/utils";
import Konva from "konva";
import monkeyUrl from "../image/monkey.png?url";
import lionUrl from "../image/lion.png?url";

export function imageEventsDemo(stage: Konva.Stage) {
  const layer = createLayer(stage);
  const text = new Konva.Text({
    x: 10,
    y: 10,
    fontFamily: "Calibri",
    fontSize: 24,
    text: "",
    fill: "black",
  });
  layer.add(text);

  function writeMessage(message: string) {
    text.text(message);
  }

  const imageObj1 = new Image();
  imageObj1.onload = () => {
    const monkey = new Konva.Image({
      x: 120,
      y: 50,
      image: imageObj1,
      width: 200,
      height: 200,
    });

    monkey.on("mouseover", function () {
      writeMessage("mouseover monkey (regular image)");
    });
    monkey.on("mouseout", function () {
      writeMessage("");
    });

    layer.add(monkey);
  };
  imageObj1.crossOrigin = "Anonymous";
  // imageObj1.src = "https://konvajs.org/assets/monkey.png";
  imageObj1.src = monkeyUrl;

  const imageObj2 = new Image();
  imageObj2.onload = () => {
    const lion = new Konva.Image({
      x: 320,
      y: 50,
      image: imageObj2,
      width: 200,
      height: 200,
    });

    // override color detection region
    lion.on("mouseover", function () {
      writeMessage("mouseover lion (with transparent pixels detection)");
    });
    lion.on("mouseout", function () {
      writeMessage("");
    });

    layer.add(lion);
    lion.cache();
    lion.drawHitFromCache();
  };
  imageObj2.crossOrigin = "Anonymous";
  imageObj2.src = lionUrl;
}
