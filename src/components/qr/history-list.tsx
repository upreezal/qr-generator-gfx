import { KIND_META, type HistoryItem } from "@/lib/qr/types";
import { Button } from "@/components/ui/button";

export function HistoryList({
  items,
  onRestore,
  onClear,
}: {
  items: HistoryItem[];
  onRestore: (item: HistoryItem) => void;
  onClear: () => void;
}) {
  if (items.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Belum ada riwayat. Tekan Buat QR atau unduh untuk menyimpan.
      </p>
    );
  }

  return (
    <div className="space-y-2">
      <ul className="space-y-1.5">
        {items.map((item) => {
          const kind = KIND_META.find((entry) => entry.id === item.kind)?.label ?? item.kind;
          const time = new Date(item.createdAt).toLocaleString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
            day: "numeric",
            month: "short",
          });
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => onRestore(item)}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left transition-colors hover:bg-accent"
              >
                <span className="w-16 shrink-0 text-xs font-medium text-primary">{kind}</span>
                <span className="min-w-0 flex-1 truncate text-sm">{item.label}</span>
                <span className="shrink-0 font-mono text-[11px] tabular-nums text-muted-foreground">
                  {time}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      <Button type="button" variant="ghost" size="sm" onClick={onClear}>
        Hapus riwayat
      </Button>
    </div>
  );
}
