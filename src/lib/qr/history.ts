import type { HistoryItem } from "./types";

const KEY = "arrizalgfx-qr-history";
const LIMIT = 8;

export function loadHistory(): HistoryItem[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as HistoryItem[];
    if (!Array.isArray(parsed)) return [];
    return parsed.slice(0, LIMIT);
  } catch {
    return [];
  }
}

export function saveHistory(items: HistoryItem[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(items.slice(0, LIMIT)));
  } catch {
    /* quota */
  }
}

export function pushHistory(list: HistoryItem[], item: HistoryItem): HistoryItem[] {
  const next = [item, ...list.filter((entry) => entry.data !== item.data)].slice(0, LIMIT);
  saveHistory(next);
  return next;
}
