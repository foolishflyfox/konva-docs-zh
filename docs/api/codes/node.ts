import Konva from "konva";

export function getClientRectDemo() {
  const rect = new Konva.Rect({
    width: 100,
    height: 100,
    x: 50,
    y: 50,
    strokeWidth: 4,
    stroke: "black",
    offsetX: 50,
    scaleY: 2,
  });
  console.log("=====测试rect.getClientRect=====");
  // 输出 {width: 104, height: 104, x: -2, y: -2}
  console.log(
    `参数为 { skipTransform: true }: `,
    rect.getClientRect({ skipTransform: true })
  );
  // 输出为 {x: -2, y: 46, width: 104, height: 208}
  console.log(`无参数: `, rect.getClientRect());
  // 输出为 { x: 0, y: 50, width: 100, height: 200 }
  console.log(
    `参数为 {skipStroke: true}: `,
    rect.getClientRect({ skipStroke: true })
  );
}
