import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { isShadowToken } from "@/lib/owner";
import { fetchLaporan, type LaporanData } from "@/lib/visits";

export const Route = createFileRoute("/x/$token")({
  head: () => ({
    meta: [
      { title: "Not found" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: ShadowPage,
});

function formatWhen(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function NotFound() {
  return (
    <div className="grid min-h-dvh place-items-center px-4">
      <p className="text-sm text-muted-foreground">404 — halaman tidak ditemukan</p>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-2xl bg-card p-4 shadow-[var(--shadow-border)]">
      <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p className="mt-2 font-mono text-3xl tabular-nums tracking-tight">{value}</p>
    </div>
  );
}

function ShadowPage() {
  const { token } = Route.useParams();
  const allowed = isShadowToken(token);
  const [data, setData] = useState<LaporanData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!allowed) return;
    fetchLaporan({ data: token })
      .then(setData)
      .catch(() => setError("Gagal memuat statistik."));
  }, [allowed, token]);

  if (!allowed) return <NotFound />;

  function downloadCsv() {
    if (!data) return;
    const header = "Waktu,Nama,Email";
    const rows = data.events.map((row) =>
      [formatWhen(row.createdAt), row.displayName, row.email]
        .map((cell) => `"${String(cell).replaceAll('"', '""')}"`)
        .join(","),
    );
    const blob = new Blob([[header, ...rows].join("\n")], {
      type: "text/csv;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `statistik-qr-${new Date().toISOString().slice(0, 10)}.csv`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="border-b border-border bg-panel px-4 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
          <div>
            <p className="text-base font-semibold tracking-tight">Shadow statistik</p>
            <p className="text-xs text-muted-foreground">Hanya lewat tautan ini</p>
          </div>
          <Button type="button" variant="outline" size="sm" onClick={downloadCsv} disabled={!data}>
            <Download />
            CSV
          </Button>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 space-y-5 px-4 py-6">
        {error ? <p className="text-sm text-destructive">{error}</p> : null}

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Stat label="Klik website" value={data?.totalHits ?? "—"} />
          <Stat label="Hari ini" value={data?.todayHits ?? "—"} />
          <Stat label="Login unik" value={data?.uniqueUsers ?? "—"} />
          <Stat label="Sesi login" value={data?.sessions ?? "—"} />
        </div>

        <section className="overflow-x-auto rounded-2xl bg-card shadow-[var(--shadow-border)]">
          <div className="border-b border-border px-4 py-3">
            <h2 className="text-sm font-semibold">Klik per hari</h2>
          </div>
          <table className="w-full min-w-[320px] text-left text-sm">
            <thead className="text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-2 font-medium">Tanggal</th>
                <th className="px-4 py-2 font-medium">Klik</th>
              </tr>
            </thead>
            <tbody>
              {(data?.days ?? []).map((row) => (
                <tr key={row.day} className="border-t border-border">
                  <td className="px-4 py-2">{row.day}</td>
                  <td className="px-4 py-2 font-mono tabular-nums">{row.hits}</td>
                </tr>
              ))}
              {data && data.days.length === 0 ? (
                <tr>
                  <td className="px-4 py-6 text-muted-foreground" colSpan={2}>
                    Belum ada klik.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </section>

        <section className="overflow-x-auto rounded-2xl bg-card shadow-[var(--shadow-border)]">
          <div className="border-b border-border px-4 py-3">
            <h2 className="text-sm font-semibold">Pengguna yang login</h2>
          </div>
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-2 font-medium">Nama</th>
                <th className="px-4 py-2 font-medium">Email</th>
                <th className="px-4 py-2 font-medium">Kunjungan</th>
                <th className="px-4 py-2 font-medium">Pertama</th>
                <th className="px-4 py-2 font-medium">Terakhir</th>
              </tr>
            </thead>
            <tbody>
              {(data?.visitors ?? []).map((row) => (
                <tr key={row.userId} className="border-t border-border">
                  <td className="px-4 py-2">{row.displayName || "—"}</td>
                  <td className="px-4 py-2 font-mono text-xs">{row.email || "—"}</td>
                  <td className="px-4 py-2 tabular-nums">{row.visitCount}</td>
                  <td className="px-4 py-2 text-muted-foreground">{formatWhen(row.firstSeenAt)}</td>
                  <td className="px-4 py-2 text-muted-foreground">{formatWhen(row.lastSeenAt)}</td>
                </tr>
              ))}
              {data && data.visitors.length === 0 ? (
                <tr>
                  <td className="px-4 py-6 text-muted-foreground" colSpan={5}>
                    Belum ada yang login.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}
