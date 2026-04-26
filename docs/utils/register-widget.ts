type WidgetConstructor = new (...args: any[]) => any;

const widgetClassDict: Record<string, WidgetConstructor> = {};

export function RegisterWidget(className: string) {
  return function (target: WidgetConstructor, _context: ClassDecoratorContext): void {
    widgetClassDict[className] = target;
    target.prototype.className = className;
  };
}

export function getWidgetClassByName(className: string): WidgetConstructor | undefined {
  return widgetClassDict[className];
}
