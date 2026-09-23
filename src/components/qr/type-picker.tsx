import {
  Contact,
  Link2,
  Mail,
  MapPin,
  MessageCircle,
  MessageSquareText,
  Phone,
  Type,
  Wifi,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { KIND_META, type QrKind } from "@/lib/qr/types";

const ICONS: Record<QrKind, LucideIcon> = {
  text: Type,
  url: Link2,
  whatsapp: MessageCircle,
  wifi: Wifi,
  email: Mail,
  phone: Phone,
  sms: MessageSquareText,
  vcard: Contact,
  location: MapPin,
};

export function TypePicker({
  value,
  onChange,
}: {
  value: QrKind;
  onChange: (kind: QrKind) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Jenis QR">
      {KIND_META.map((item) => {
        const Icon = ICONS[item.id];
        const active = item.id === value;
        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(item.id)}
            className={cn(
              "inline-flex h-10 items-center gap-1.5 rounded-lg px-3 text-xs font-medium transition-colors duration-150",
              active
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground",
            )}
          >
            <Icon className="size-3.5" strokeWidth={2} />
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
