import type { FieldMap, PayloadResult, QrKind } from "./types";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function trim(value: string) {
  return value.trim();
}

function escapeWifi(value: string) {
  return value.replace(/([\\;,:"])/g, "\\$1");
}

function digitsPhone(raw: string) {
  let value = raw.replace(/[^\d+]/g, "");
  if (value.startsWith("+")) value = value.slice(1);
  if (value.startsWith("0")) value = `62${value.slice(1)}`;
  return value;
}

function normalizeUrl(raw: string) {
  const value = trim(raw);
  if (!value) return "";
  if (/^https?:\/\//i.test(value)) return value;
  return `https://${value}`;
}

function isUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function buildPayload(kind: QrKind, fields: FieldMap): PayloadResult {
  switch (kind) {
    case "text": {
      const text = trim(fields.text);
      if (!text) return { ok: false, error: "" };
      return { ok: true, data: text, label: text };
    }
    case "url": {
      if (!trim(fields.url)) return { ok: false, error: "" };
      const url = normalizeUrl(fields.url);
      if (!url || !isUrl(url)) return { ok: false, error: "URL tidak valid." };
      return { ok: true, data: url, label: url };
    }
    case "whatsapp": {
      if (!trim(fields.waPhone)) return { ok: false, error: "" };
      const phone = digitsPhone(fields.waPhone);
      if (phone.length < 8) return { ok: false, error: "Nomor WhatsApp tidak valid." };
      const text = trim(fields.waText);
      const data = text
        ? `https://wa.me/${phone}?text=${encodeURIComponent(text)}`
        : `https://wa.me/${phone}`;
      return { ok: true, data, label: `WA ${phone}` };
    }
    case "wifi": {
      const ssid = trim(fields.wifiSsid);
      if (!ssid) return { ok: false, error: "" };
      const enc = fields.wifiEnc || "WPA";
      const pass = fields.wifiPass;
      if (enc !== "nopass" && !trim(pass)) {
        return { ok: false, error: "Kata sandi WiFi wajib diisi." };
      }
      const hidden = fields.wifiHidden === "true";
      const data = `WIFI:T:${enc};S:${escapeWifi(ssid)};${
        enc === "nopass" ? "" : `P:${escapeWifi(pass)};`
      }H:${hidden};;`;
      return { ok: true, data, label: `WiFi ${ssid}` };
    }
    case "email": {
      const to = trim(fields.emailTo);
      if (!to) return { ok: false, error: "" };
      if (!EMAIL_RE.test(to)) return { ok: false, error: "Alamat email tidak valid." };
      const params = new URLSearchParams();
      if (trim(fields.emailSubject)) params.set("subject", trim(fields.emailSubject));
      if (trim(fields.emailBody)) params.set("body", trim(fields.emailBody));
      const query = params.toString();
      const data = `mailto:${to}${query ? `?${query}` : ""}`;
      return { ok: true, data, label: to };
    }
    case "phone": {
      const phone = trim(fields.phone);
      if (!phone) return { ok: false, error: "" };
      if (phone.replace(/\D/g, "").length < 6) {
        return { ok: false, error: "Nomor telepon tidak valid." };
      }
      return { ok: true, data: `tel:${phone.replace(/\s/g, "")}`, label: phone };
    }
    case "sms": {
      const phone = trim(fields.smsPhone);
      if (!phone) return { ok: false, error: "" };
      if (phone.replace(/\D/g, "").length < 6) {
        return { ok: false, error: "Nomor SMS tidak valid." };
      }
      const body = trim(fields.smsBody);
      const data = body
        ? `sms:${phone.replace(/\s/g, "")}?body=${encodeURIComponent(body)}`
        : `sms:${phone.replace(/\s/g, "")}`;
      return { ok: true, data, label: phone };
    }
    case "vcard": {
      const name = trim(fields.vName);
      if (!name) return { ok: false, error: "" };
      const lines = ["BEGIN:VCARD", "VERSION:3.0", `FN:${name}`];
      if (trim(fields.vPhone)) lines.push(`TEL:${trim(fields.vPhone)}`);
      if (trim(fields.vEmail)) {
        if (!EMAIL_RE.test(trim(fields.vEmail))) {
          return { ok: false, error: "Email vCard tidak valid." };
        }
        lines.push(`EMAIL:${trim(fields.vEmail)}`);
      }
      if (trim(fields.vCompany)) lines.push(`ORG:${trim(fields.vCompany)}`);
      if (trim(fields.vUrl)) {
        const url = normalizeUrl(fields.vUrl);
        if (!isUrl(url)) return { ok: false, error: "Website vCard tidak valid." };
        lines.push(`URL:${url}`);
      }
      lines.push("END:VCARD");
      return { ok: true, data: lines.join("\n"), label: name };
    }
    case "location": {
      const lat = trim(fields.locLat);
      const lng = trim(fields.locLng);
      const address = trim(fields.locAddress);
      if (lat || lng) {
        const la = Number(lat);
        const ln = Number(lng);
        if (!Number.isFinite(la) || !Number.isFinite(ln)) {
          return { ok: false, error: "Latitude / longitude tidak valid." };
        }
        if (Math.abs(la) > 90 || Math.abs(ln) > 180) {
          return { ok: false, error: "Koordinat di luar jangkauan." };
        }
        return { ok: true, data: `geo:${la},${ln}`, label: `${la}, ${ln}` };
      }
      if (!address) {
        return { ok: false, error: "" };
      }
      return {
        ok: true,
        data: `geo:0,0?q=${encodeURIComponent(address)}`,
        label: address,
      };
    }
    default:
      return { ok: false, error: "Jenis QR tidak dikenal." };
  }
}

export function contrastWarning(fg: string, bg: string): string | null {
  const a = luminance(fg);
  const b = luminance(bg);
  if (a === null || b === null) return null;
  const ratio = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
  if (ratio < 3) {
    return "Kontras rendah — beberapa kamera mungkin gagal memindai.";
  }
  return null;
}

function luminance(hex: string): number | null {
  const match = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!match) return null;
  const n = Number.parseInt(match[1], 16);
  const r = srgb((n >> 16) & 255);
  const g = srgb((n >> 8) & 255);
  const bl = srgb(n & 255);
  return 0.2126 * r + 0.7152 * g + 0.0722 * bl;
}

function srgb(channel: number) {
  const c = channel / 255;
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}
