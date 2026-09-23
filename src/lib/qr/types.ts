export type QrKind =
  | "text"
  | "url"
  | "whatsapp"
  | "wifi"
  | "email"
  | "phone"
  | "sms"
  | "vcard"
  | "location";

export type DotType =
  | "square"
  | "rounded"
  | "extra-rounded"
  | "dots"
  | "classy"
  | "classy-rounded";

export type CornerSquareType = "square" | "extra-rounded" | "dot";
export type CornerDotType = "square" | "dot";
export type EcLevel = "L" | "M" | "Q" | "H";

export type FieldMap = {
  text: string;
  url: string;
  waPhone: string;
  waText: string;
  wifiSsid: string;
  wifiPass: string;
  wifiEnc: "WPA" | "WEP" | "nopass";
  wifiHidden: "true" | "false";
  emailTo: string;
  emailSubject: string;
  emailBody: string;
  phone: string;
  smsPhone: string;
  smsBody: string;
  vName: string;
  vPhone: string;
  vEmail: string;
  vCompany: string;
  vUrl: string;
  locLat: string;
  locLng: string;
  locAddress: string;
};

export type StyleState = {
  fg: string;
  bg: string;
  useGradient: boolean;
  gradientTo: string;
  dotType: DotType;
  cornerSquareType: CornerSquareType;
  cornerDotType: CornerDotType;
  ecLevel: EcLevel;
  size: number;
  margin: number;
  logoDataUrl: string | null;
  logoName: string;
  logoSize: number;
  hideBackgroundDots: boolean;
};

export type PayloadResult =
  | { ok: true; data: string; label: string }
  | { ok: false; error: string };

export type HistoryItem = {
  id: string;
  kind: QrKind;
  label: string;
  data: string;
  fields: FieldMap;
  style: Omit<StyleState, "logoDataUrl"> & { logoDataUrl: string | null };
  createdAt: number;
};

export const EMPTY_FIELDS: FieldMap = {
  text: "",
  url: "",
  waPhone: "",
  waText: "",
  wifiSsid: "",
  wifiPass: "",
  wifiEnc: "WPA",
  wifiHidden: "false",
  emailTo: "",
  emailSubject: "",
  emailBody: "",
  phone: "",
  smsPhone: "",
  smsBody: "",
  vName: "",
  vPhone: "",
  vEmail: "",
  vCompany: "",
  vUrl: "",
  locLat: "",
  locLng: "",
  locAddress: "",
};

export const DEFAULT_STYLE: StyleState = {
  fg: "#0b0f14",
  bg: "#ffffff",
  useGradient: false,
  gradientTo: "#a78bfa",
  dotType: "extra-rounded",
  cornerSquareType: "extra-rounded",
  cornerDotType: "dot",
  ecLevel: "Q",
  size: 320,
  margin: 12,
  logoDataUrl: null,
  logoName: "",
  logoSize: 0.32,
  hideBackgroundDots: true,
};

export const KIND_META: {
  id: QrKind;
  label: string;
  hint: string;
}[] = [
  { id: "text", label: "Teks", hint: "Teks bebas" },
  { id: "url", label: "URL", hint: "Tautan situs" },
  { id: "whatsapp", label: "WhatsApp", hint: "Chat WA" },
  { id: "wifi", label: "WiFi", hint: "SSID & sandi" },
  { id: "email", label: "Email", hint: "mailto" },
  { id: "phone", label: "Telepon", hint: "Panggilan" },
  { id: "sms", label: "SMS", hint: "Pesan singkat" },
  { id: "vcard", label: "vCard", hint: "Kontak" },
  { id: "location", label: "Lokasi", hint: "Peta / geo" },
];
