import { mapRange } from "@/lib/scrollProgress";

export type RangeMap = {
  input: number[];
  output: number[];
};

export type ElementAnimationConfig = {
  translateX?: RangeMap;
  translateY?: RangeMap;
  scale?: RangeMap;
  rotate?: RangeMap;
  opacity?: RangeMap;
};

export function applyElementAnimation(
  element: HTMLElement,
  progress: number,
  config: ElementAnimationConfig,
): void {
  const transforms: string[] = [];

  if (config.translateX) {
    const x = mapRange(progress, config.translateX.input, config.translateX.output);
    transforms.push(`translateX(${x}px)`);
  }

  if (config.translateY) {
    const y = mapRange(progress, config.translateY.input, config.translateY.output);
    transforms.push(`translateY(${y}px)`);
  }

  if (config.scale) {
    const scale = mapRange(progress, config.scale.input, config.scale.output);
    transforms.push(`scale(${scale})`);
  }

  if (config.rotate) {
    const rotate = mapRange(progress, config.rotate.input, config.rotate.output);
    transforms.push(`rotate(${rotate}deg)`);
  }

  if (transforms.length > 0) {
    element.style.transform = transforms.join(" ");
  }

  if (config.opacity) {
    element.style.opacity = String(
      mapRange(progress, config.opacity.input, config.opacity.output),
    );
  }
}

export type LinkedLayer = {
  element: HTMLElement;
  config: ElementAnimationConfig;
};

export function applyLinkedLayers(progress: number, layers: LinkedLayer[]): void {
  for (const layer of layers) {
    applyElementAnimation(layer.element, progress, layer.config);
  }
}
