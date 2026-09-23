import type { Options } from "qr-code-styling";
import type { StyleState } from "./types";

export function toQrOptions(
  data: string,
  style: StyleState,
  size = style.size,
): Options {
  const errorCorrectionLevel = style.logoDataUrl ? "H" : style.ecLevel;
  const gradient = style.useGradient
    ? {
        type: "linear" as const,
        rotation: Math.PI / 4,
        colorStops: [
          { offset: 0, color: style.fg },
          { offset: 1, color: style.gradientTo },
        ],
      }
    : undefined;

  return {
    width: size,
    height: size,
    type: "canvas",
    data,
    margin: style.margin,
    image: style.logoDataUrl || undefined,
    qrOptions: { errorCorrectionLevel, mode: "Byte" },
    imageOptions: {
      hideBackgroundDots: style.hideBackgroundDots,
      imageSize: style.logoSize,
      margin: 6,
      crossOrigin: "anonymous",
    },
    dotsOptions: {
      type: style.dotType,
      color: style.fg,
      gradient,
    },
    cornersSquareOptions: {
      type: style.cornerSquareType,
      color: style.useGradient ? style.gradientTo : style.fg,
    },
    cornersDotOptions: {
      type: style.cornerDotType,
      color: style.fg,
    },
    backgroundOptions: {
      color: style.bg,
    },
  };
}

export function exportSize(style: StyleState) {
  return Math.max(1024, Math.round(style.size * 2));
}
