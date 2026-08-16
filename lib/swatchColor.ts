export function swatchColor(hex: string): string {
  return hex.toLowerCase() === "#ffffff" ? "#1f6f8b" : hex;
}

export function swatchCode(hex: string): string {
  return swatchColor(hex).replace("#", "").toUpperCase();
}
