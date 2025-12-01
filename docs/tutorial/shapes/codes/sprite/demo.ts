import { createLayer } from "@docs/utils";
import Konva from "konva";
import blobSpritePng from "./blob-sprite.png?url";

export function spriteDemo(stage: Konva.Stage) {
  const layer = createLayer(stage);
  // prettier-ignore
  const animations = {
    idle: [
        2, 2, 70, 119, // 第一帧
        71, 2, 74, 119, // 第二帧
        146, 2, 81, 119, // 第三帧
        226, 2, 76, 119 // 第四帧
    ],
    punch: [
        2, 138, 74, 122,    // 第一帧
        76, 138, 84, 122,   // 第二帧
        346, 138, 120, 122, // 第三帧
    ]
  };
  const imageObj = new Image();
  imageObj.onload = function () {
    const sprite = new Konva.Sprite({
      x: 50,
      y: 50,
      image: imageObj,
      animation: "idle",
      animations: animations,
      frameRate: 7,
      frameIndex: 0,
    });
    // sprite.frameOffsets({
    //   idle: [0, 0, 10, 10, 20, 20, 30, 30],
    // });
    layer.add(sprite);
    sprite.start();
    // 添加一个 击打 功能按钮
    const button = document.createElement("button");
    button.style.backgroundColor = "#ddd";
    button.className = "raw-style";
    button.textContent = "Punch";
    button.style.position = "absolute";
    button.style.top = "0";
    button.style.left = "0";
    stage.container().style.position = "relative";
    stage.container().appendChild(button);
    button.addEventListener("click", () => {
      sprite.animation("punch");
      sprite.on("frameIndexChange.button", function () {
        if (this.frameIndex() === 2) {
          setTimeout(() => {
            sprite.animation("idle");
            sprite.off(".button");
          }, 1000 / sprite.frameRate());
        }
      });
    });
  };
  imageObj.src = blobSpritePng;
}
