import Konva from "konva";
import type { ICustomShape } from "@docs/types";

type WidgetConstructor = new (...args: any[]) => any;

const widgetClassDict: Record<string, WidgetConstructor> = {};

export function RegisterWidget(className: string) {
  return function (target: WidgetConstructor, _context: ClassDecoratorContext): void {
    if (widgetClassDict[className]) {
      console.error(`Widget "${className}" is already registered.`);
      return;
    }
    widgetClassDict[className] = target;
    target.prototype.className = className;
  };
}

export function getWidgetClassByName(className: string): WidgetConstructor | undefined {
  return widgetClassDict[className];
}

export function loadWidgetConfigData(
  configData: { className: string; data: object },
): (Konva.Shape & ICustomShape) | null {
  const WidgetClass = getWidgetClassByName(configData.className);
  if (!WidgetClass) {
    console.error(`Widget "${configData.className}" is not registered.`);
    return null;
  }
  return new WidgetClass(configData.data);
}
