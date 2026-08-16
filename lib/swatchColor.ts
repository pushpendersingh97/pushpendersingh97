export function swatchColor(hex: string): string {
  return hex.toLowerCase() === "#ffffff" ? "#1f6f8b" : hex;
}

/** Dark ink on pale chips (React, Tailwind); white on saturated brand paper. */
export function swatchLogoIsInk(hex: string): boolean {
  const value = swatchColor(hex).replace("#", "");
  const r = parseInt(value.slice(0, 2), 16) / 255;
  const g = parseInt(value.slice(2, 4), 16) / 255;
  const b = parseInt(value.slice(4, 6), 16) / 255;
  const linear = (channel: number) =>
    channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
  const luminance =
    0.2126 * linear(r) + 0.7152 * linear(g) + 0.0722 * linear(b);
  return luminance > 0.42;
}
