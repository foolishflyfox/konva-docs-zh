import { createLayer } from "@docs/utils";
import Konva from "konva";
import darthVadarUrl from "../../../shapes/codes/image/darth-vader.jpg?url";
import yodaUrl from "../../../shapes/codes/image/yoda.jpg?url";

function loadImages(
  sources: Record<string, string>,
  callback: (images: Record<string, HTMLImageElement>) => void
) {
  const images: Record<string, HTMLImageElement> = {};
  let loadedImages = 0;
  const numImages = Object.keys(sources).length;
  for (const src in sources) {
    images[src] = new Image();
    images[src].onload = function () {
      if (++loadedImages >= numImages) {
        callback(images);
      }
    };
    images[src].src = sources[src];
  }
}

function draw(stage: Konva.Stage, images: Record<string, HTMLImageElement>) {
  const layer = createLayer(stage);
  const colorPentagon = new Konva.RegularPolygon({
    x: 80,
    y: stage.height() / 2,
    sides: 5,
    radius: 70,
    fill: "red",
    stroke: "black",
    strokeWidth: 4,
    draggable: true,
  });
  colorPentagon.on("mouseover touchstart", function () {
    this.fill("blue");
  });
  colorPentagon.on("mouseout touchend", function () {
    this.fill("red");
  });
  const patternPentagon = new Konva.RegularPolygon({
    x: 220,
    y: stage.height() / 2,
    sides: 5,
    radius: 70,
    fillPatternImage: images["darthVadar"],
    fillPatternOffset: { x: -220, y: 70 },
    stroke: "black",
    strokeWidth: 4,
    draggable: true,
  });
  patternPentagon.on("mouseover touchstart", function () {
    patternPentagon.fillPatternImage(images["yoda"]);
  });
  patternPentagon.on("mouseout touchend", function () {
    patternPentagon.fillPatternImage(images["darthVadar"]);
  });

  const linearGradPentagon = new Konva.RegularPolygon({
    x: 360,
    y: stage.height() / 2,
    sides: 5,
    radius: 70,
    fillLinearGradientStartPoint: { x: -50, y: -50 },
    fillLinearGradientEndPoint: { x: 50, y: 50 },
    fillLinearGradientColorStops: [0, "red", 1, "yellow"],
    stroke: "black",
    strokeWidth: 4,
    draggable: true,
  });
  linearGradPentagon.on("mouseover touchstart", function () {
    this.fillLinearGradientColorStops([0, "green", 1, "yellow"]);
  });

  linearGradPentagon.on("mouseout touchend", function () {
    this.fillLinearGradientStartPoint({ x: -50, y: -50 });
    this.fillLinearGradientEndPoint({ x: 50, y: 50 });
    this.fillLinearGradientColorStops([0, "red", 1, "yellow"]);
  });

  const radialGradPentagon = new Konva.RegularPolygon({
    x: 500,
    y: stage.height() / 2,
    sides: 5,
    radius: 70,
    fillRadialGradientStartPoint: { x: 0, y: 0 },
    fillRadialGradientStartRadius: 0,
    fillRadialGradientEndPoint: { x: 0, y: 0 },
    fillRadialGradientEndRadius: 70,
    fillRadialGradientColorStops: [0, "red", 0.5, "yellow", 1, "blue"],
    stroke: "black",
    strokeWidth: 4,
    draggable: true,
  });

  radialGradPentagon.on("mouseover touchstart", function () {
    this.fillRadialGradientColorStops([0, "red", 0.5, "yellow", 1, "green"]);
  });

  radialGradPentagon.on("mouseout touchend", function () {
    this.fillRadialGradientStartPoint({ x: 0, y: 0 });
    this.fillRadialGradientStartRadius(0);
    this.fillRadialGradientEndPoint({ x: 0, y: 0 });
    this.fillRadialGradientEndRadius(70);
    this.fillRadialGradientColorStops([0, "red", 0.5, "yellow", 1, "blue"]);
  });

  layer.add(
    colorPentagon,
    patternPentagon,
    linearGradPentagon,
    radialGradPentagon
  );
}

export function fillDemo(stage: Konva.Stage) {
  const sources = {
    darthVadar: darthVadarUrl,
    yoda: yodaUrl,
  };
  loadImages(sources, function (images) {
    draw(stage, images);
  });
}
