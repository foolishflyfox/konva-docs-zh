import { createLayer } from "@docs/utils";
import Konva from "konva";
import lionUrl from "@docs/tutorial/events/codes/image/lion.png?url";

export function customFilterDemo(stage: Konva.Stage) {
  const layer = createLayer(stage);
  // Define variables for our custom filter
  let canvas = document.createElement("canvas") as HTMLCanvasElement;
  let tempCanvas = document.createElement("canvas") as HTMLCanvasElement;

  // Make all pixels opaque 100% (except pixels that are 100% transparent)
  // 将半透明的像素点的不透明度设为 100%
  function removeTransparency(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext("2d")!;
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const nPixels = imageData.data.length;

    for (let i = 3; i < nPixels; i += 4) {
      if (imageData.data[i] > 0) {
        imageData.data[i] = 255;
      }
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.putImageData(imageData, 0, 0);
    return canvas;
  }

  // Define our custom Border filter
  // 定义自定义的 Border 滤镜
  function Border(this: Konva.Node, imageData: ImageData) {
    const nPixels = imageData.data.length;
    const size = this.getAttr("borderSize") || 0;

    // Set correct dimensions for canvases
    // 设置正确的画布宽高
    canvas.width = imageData.width;
    canvas.height = imageData.height;

    tempCanvas.width = imageData.width;
    tempCanvas.height = imageData.height;

    // Draw original shape into temp canvas
    // 在临时画布上绘制原始图形
    tempCanvas.getContext("2d")!.putImageData(imageData, 0, 0);

    // Remove alpha channel because it will affect shadow (transparent shapes have smaller shadow)
    // 移除 alpha 通道将影响阴影(透明形状更小的阴影)
    removeTransparency(tempCanvas);

    const ctx = canvas.getContext("2d")!;
    const color = this.getAttr("borderColor") || "black";

    // Use shadow as border
    // 使用阴影作为边框
    ctx.save();
    ctx.shadowColor = color;
    ctx.shadowBlur = size;
    ctx.drawImage(tempCanvas, 0, 0);
    ctx.restore();

    // Get image data of [original image + shadow]
    const tempImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    const SMOOTH_MIN_THRESHOLD = 3;
    const SMOOTH_MAX_THRESHOLD = 10;

    let val, hasValue;
    const offset = 3;

    for (let i = 3; i < nPixels; i += 4) {
      // Skip opaque pixels
      // 跳过透明像素
      if (imageData.data[i] === 255) {
        continue;
      }

      val = tempImageData.data[i];
      hasValue = val !== 0;
      if (!hasValue) {
        continue;
      }

      if (val > SMOOTH_MAX_THRESHOLD) {
        val = 255;
      } else if (val < SMOOTH_MIN_THRESHOLD) {
        val = 0;
      } else {
        val =
          ((val - SMOOTH_MIN_THRESHOLD) /
            (SMOOTH_MAX_THRESHOLD - SMOOTH_MIN_THRESHOLD)) *
          255;
      }
      tempImageData.data[i] = val;
    }

    // Draw resulting image (original + shadow without opacity) into canvas
    ctx.putImageData(tempImageData, 0, 0);

    // Fill whole image with color (after that shadow is colored)
    ctx.save();
    ctx.globalCompositeOperation = "source-in";
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();

    // Copy colored shadow into original imageData
    const newImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    const indexesToProcess = [];
    for (let i = 3; i < nPixels; i += 4) {
      const hasTransparentOnTop =
        imageData.data[i - imageData.width * 4 * offset] === 0;
      const hasTransparentOnTopRight =
        imageData.data[i - (imageData.width * 4 + 4) * offset] === 0;
      const hasTransparentOnTopLeft =
        imageData.data[i - (imageData.width * 4 - 4) * offset] === 0;
      const hasTransparentOnRight = imageData.data[i + 4 * offset] === 0;
      const hasTransparentOnLeft = imageData.data[i - 4 * offset] === 0;
      const hasTransparentOnBottom =
        imageData.data[i + imageData.width * 4 * offset] === 0;
      const hasTransparentOnBottomRight =
        imageData.data[i + (imageData.width * 4 + 4) * offset] === 0;
      const hasTransparentOnBottomLeft =
        imageData.data[i + (imageData.width * 4 - 4) * offset] === 0;

      const hasTransparentAround =
        hasTransparentOnTop ||
        hasTransparentOnRight ||
        hasTransparentOnLeft ||
        hasTransparentOnBottom ||
        hasTransparentOnTopRight ||
        hasTransparentOnTopLeft ||
        hasTransparentOnBottomRight ||
        hasTransparentOnBottomLeft;

      // Skip pixels presented in original image
      if (
        imageData.data[i] === 255 ||
        (imageData.data[i] && !hasTransparentAround)
      ) {
        continue;
      }

      if (!newImageData.data[i]) {
        // Skip transparent pixels
        continue;
      }

      indexesToProcess.push(i);
    }

    for (let index = 0; index < indexesToProcess.length; index += 1) {
      const i = indexesToProcess[index];
      const alpha = imageData.data[i] / 255;

      imageData.data[i] = newImageData.data[i];
      imageData.data[i - 1] =
        newImageData.data[i - 1] * (1 - alpha) + imageData.data[i - 1] * alpha;
      imageData.data[i - 2] =
        newImageData.data[i - 2] * (1 - alpha) + imageData.data[i - 2] * alpha;
      imageData.data[i - 3] =
        newImageData.data[i - 3] * (1 - alpha) + imageData.data[i - 3] * alpha;
    }
  }

  // Load image and apply filter
  Konva.Image.fromURL(lionUrl, function (image) {
    layer.add(image);
    image.setAttr("x", 80);
    image.setAttr("y", 30);
    image.setAttr("borderSize", 5);
    image.setAttr("borderColor", "red");
    image.filters([Border]);
    image.cache();
  });
}
