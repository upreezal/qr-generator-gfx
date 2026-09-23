import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Copy, Download, Moon, RotateCcw, Sun } from "lucide-react";
import { Toaster, toast } from "sonner";
import { BrandMark } from "@/components/brand-mark";
import { Button } from "@/components/ui/button";
import { ContentForm } from "@/components/qr/content-form";
import { HistoryList } from "@/components/qr/history-list";
import { Panel } from "@/components/qr/panel";
import { QrLive } from "@/components/qr/qr-live";
import { StyleForm } from "@/components/qr/style-form";
import { TypePicker } from "@/components/qr/type-picker";
import { UserButton } from "@/lib/auth/gates";
import { copyQrPng, exportQrFile } from "@/lib/qr/export";
import { loadHistory, pushHistory, saveHistory } from "@/lib/qr/history";
import { buildPayload, contrastWarning } from "@/lib/qr/payload";
import { exportSize, toQrOptions } from "@/lib/qr/style-options";
import { recordVisit } from "@/lib/visits";
import {
  DEFAULT_STYLE,
  EMPTY_FIELDS,
  type FieldMap,
  type HistoryItem,
  type QrKind,
  type StyleState,
} from "@/lib/qr/types";

export function QrStudio() {
  const [kind, setKind] = useState<QrKind>("url");
  const [fields, setFields] = useState<FieldMap>(EMPTY_FIELDS);
  const [style, setStyle] = useState<StyleState>(DEFAULT_STYLE);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [pulse, setPulse] = useState(false);

  const payload = useMemo(() => buildPayload(kind, fields), [kind, fields]);
  const warning = contrastWarning(style.fg, style.bg);
  const options = payload.ok ? toQrOptions(payload.data, style) : null;
  const encoded = payload.ok ? payload.data : "";

  const snapshotRef = useRef({ payload, style, kind, fields });
  snapshotRef.current = { payload, style, kind, fields };

  useEffect(() => {
    setHistory(loadHistory());
    try {
      const saved = localStorage.getItem("arrizal-theme");
      if (saved === "light" || saved === "dark") setTheme(saved);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    try {
      localStorage.setItem("arrizal-theme", theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  useEffect(() => {
    void recordVisit().catch(() => {
      /* ignore visit errors */
    });
  }, []);

  const patchFields = (patch: Partial<FieldMap>) =>
    setFields((current) => ({ ...current, ...patch }));
  const patchStyle = (patch: Partial<StyleState>) =>
    setStyle((current) => ({ ...current, ...patch }));

  const remember = useCallback(() => {
    const snap = snapshotRef.current;
    if (!snap.payload.ok) return false;
    const item: HistoryItem = {
      id: crypto.randomUUID(),
      kind: snap.kind,
      label: snap.payload.label,
      data: snap.payload.data,
      fields: snap.fields,
      style: { ...snap.style },
      createdAt: Date.now(),
    };
    setHistory((list) => pushHistory(list, item));
    return true;
  }, []);

  const download = useCallback(async (extension: "png" | "svg") => {
    const snap = snapshotRef.current;
    if (!snap.payload.ok) {
      toast.error(snap.payload.error || "Isi data terlebih dahulu.");
      return;
    }
    try {
      const size = exportSize(snap.style);
      await exportQrFile(
        toQrOptions(snap.payload.data, snap.style, size),
        extension,
        `qr-arrizalgfx-${Date.now()}.${extension}`,
      );
      remember();
      toast.success(extension === "png" ? "PNG diunduh" : "SVG diunduh");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Gagal mengunduh");
    }
  }, [remember]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
        event.preventDefault();
        void download("png");
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [download]);

  async function handleCopy() {
    const snap = snapshotRef.current;
    if (!snap.payload.ok) {
      toast.error(snap.payload.error || "Isi data terlebih dahulu.");
      return;
    }
    try {
      const size = exportSize(snap.style);
      await copyQrPng(toQrOptions(snap.payload.data, snap.style, size));
      remember();
      toast.success("Disalin ke papan klip");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Gagal menyalin");
    }
  }

  function handleCreate() {
    if (!payload.ok) {
      toast.error(payload.error || "Isi data terlebih dahulu.");
      return;
    }
    remember();
    setPulse(true);
    window.setTimeout(() => setPulse(false), 280);
    toast.success("QR siap");
  }

  function handleReset() {
    setKind("url");
    setFields(EMPTY_FIELDS);
    setStyle(DEFAULT_STYLE);
    toast.message("Direset ke default");
  }

  return (
    <div className="flex min-h-dvh flex-col">
      <Toaster theme={theme} position="top-center" richColors={false} />
      <header className="sticky top-0 z-30 border-b border-border bg-panel backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-3 text-foreground">
            <BrandMark />
            <div>
              <h1 className="text-base font-semibold tracking-tight">QR Code Generator</h1>
              <p className="text-xs text-muted-foreground">by ArrizalGFX</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button type="button" variant="ghost" size="icon" onClick={handleReset} aria-label="Reset">
              <RotateCcw />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Tema"
              onClick={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
            >
              {theme === "dark" ? <Sun /> : <Moon />}
            </Button>
            <UserButton />
          </div>
        </div>
      </header>

      <main className="mx-auto grid w-full max-w-6xl flex-1 grid-cols-1 gap-5 px-4 py-6 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-start">
        <div className="order-1 lg:order-2 lg:sticky lg:top-20">
          <div
            className={`rounded-2xl bg-card p-4 text-card-foreground shadow-[var(--shadow-border)] transition-transform duration-200 ${pulse ? "scale-[1.02]" : "scale-100"}`}
          >
            <div className="mx-auto max-w-[200px] lg:max-w-none">
              {options ? (
                <div className="overflow-hidden rounded-xl bg-white p-3">
                  <QrLive options={options} />
                </div>
              ) : (
                <div className="flex aspect-square items-center justify-center rounded-xl border border-dashed border-border bg-muted/40 px-6 text-center">
                  <p className="text-sm text-muted-foreground">Isi data di kiri</p>
                </div>
              )}
            </div>

            {warning ? <p className="mt-3 text-xs text-destructive">{warning}</p> : null}

            <div className="mt-4 grid grid-cols-2 gap-2">
              <Button type="button" onClick={handleCreate} className="col-span-2">
                Buat QR
              </Button>
              <Button type="button" variant="outline" onClick={() => void download("png")}>
                <Download />
                Unduh PNG
              </Button>
              <Button type="button" variant="outline" onClick={() => void download("svg")}>
                <Download />
                Unduh SVG
              </Button>
              <Button type="button" variant="secondary" className="col-span-2" onClick={() => void handleCopy()}>
                <Copy />
                Salin
              </Button>
            </div>

            <div className="mt-4 space-y-2">
              <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Encoded content
              </p>
              <pre className="max-h-24 overflow-auto rounded-lg bg-muted px-3 py-2 font-mono text-[11px] leading-relaxed break-all text-muted-foreground">
                {encoded || "—"}
              </pre>
              <p className="text-xs text-muted-foreground">
                Uji pindaian dengan kamera HP sebelum dicetak atau dibagikan. Ctrl/Cmd + Enter untuk unduh PNG.
              </p>
            </div>
          </div>
        </div>

        <div className="order-2 space-y-5 lg:order-1">
          <Panel title="Konten" description="Pilih jenis, lalu isi data yang akan di-encode.">
            <div className="space-y-4">
              <TypePicker value={kind} onChange={setKind} />
              <ContentForm kind={kind} fields={fields} onChange={patchFields} />
              {!payload.ok && payload.error ? (
                <p className="text-sm text-destructive">{payload.error}</p>
              ) : null}
            </div>
          </Panel>

          <Panel title="Tampilan" description="Warna, bentuk, logo, dan koreksi error.">
            <StyleForm style={style} onChange={patchStyle} />
          </Panel>

          <Panel
            title="Riwayat"
            description="8 QR terakhir tersimpan di perangkat ini."
            action={
              history.length ? (
                <span className="font-mono text-xs tabular-nums text-muted-foreground">
                  {history.length}/8
                </span>
              ) : null
            }
          >
            <HistoryList
              items={history}
              onRestore={(item) => {
                setKind(item.kind);
                setFields(item.fields);
                setStyle({ ...DEFAULT_STYLE, ...item.style });
              }}
              onClear={() => {
                setHistory([]);
                saveHistory([]);
              }}
            />
          </Panel>
        </div>
      </main>

      <footer className="mt-auto border-t border-border px-4 py-5 text-center text-xs text-muted-foreground">
        Crafted by ArrizalGFX · {new Date().getFullYear()}
      </footer>
    </div>
  );
}
