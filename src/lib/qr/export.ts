import type { Options } from "qr-code-styling";

async function loadLib() {
  const mod = await import("qr-code-styling");
  return mod.default;
}

function toBlob(raw: Blob | Buffer, type: string): Blob {
  if (raw instanceof Blob) return raw;
  return new Blob([raw as BlobPart], { type });
}

function saveBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

export async function exportQrFile(
  options: Options,
  extension: "png" | "svg",
  filename: string,
) {
  const QRCodeStyling = await loadLib();
  const qr = new QRCodeStyling({
    ...options,
    width: options.width,
    height: options.height,
    type: extension === "svg" ? "svg" : "canvas",
  });
  const raw = await qr.getRawData(extension);
  if (!raw) throw new Error("Gagal mengekspor QR.");
  const mime = extension === "svg" ? "image/svg+xml" : "image/png";
  const blob = toBlob(raw, mime);
  saveBlob(blob, filename);
}

export async function copyQrPng(options: Options) {
  const QRCodeStyling = await loadLib();
  const qr = new QRCodeStyling({ ...options, type: "canvas" });
  const raw = await qr.getRawData("png");
  if (!raw) throw new Error("Gagal menyalin QR.");
  const blob = toBlob(raw, "image/png");
  if (!navigator.clipboard || !("ClipboardItem" in window)) {
    throw new Error("Papan klip tidak tersedia di browser ini.");
  }
  await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
}
