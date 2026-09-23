export const OWNER_EMAIL = "arrizal.gfx@gmail.com";
export const OWNER_WHATSAPP = "6285183396522";
export const SHADOW_TOKEN = "agx-k7n4-m2q9-x8v1";
export const SHADOW_PATH = `/x/${SHADOW_TOKEN}`;

export function isOwnerEmail(email: string | null | undefined) {
  return (email ?? "").trim().toLowerCase() === OWNER_EMAIL;
}

export function isShadowToken(token: string | null | undefined) {
  return (token ?? "").trim() === SHADOW_TOKEN;
}
