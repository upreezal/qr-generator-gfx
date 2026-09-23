import { ImagePlus, X } from "lucide-react";
import { Input, NativeSelect } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/qr/panel";
import type { StyleState } from "@/lib/qr/types";

function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <Field label={label}>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={safeHex(value)}
          onChange={(event) => onChange(event.target.value)}
          className="size-11 cursor-pointer rounded-lg border border-input bg-card p-1"
          aria-label={label}
        />
        <Input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="font-mono uppercase"
          maxLength={7}
        />
      </div>
    </Field>
  );
}

function safeHex(value: string) {
  return /^#[0-9a-fA-F]{6}$/.test(value) ? value : "#000000";
}

export function StyleForm({
  style,
  onChange,
}: {
  style: StyleState;
  onChange: (patch: Partial<StyleState>) => void;
}) {
  function onLogo(file: File | undefined) {
    if (!file) return;
    if (file.size > 1_000_000) return;
    const reader = new FileReader();
    reader.onload = () => {
      onChange({
        logoDataUrl: String(reader.result),
        logoName: file.name,
        ecLevel: "H",
      });
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="grid gap-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <ColorField label="Foreground (Warna depan)" value={style.fg} onChange={(fg) => onChange({ fg })} />
        <ColorField label="Background (Warna latar)" value={style.bg} onChange={(bg) => onChange({ bg })} />
      </div>

      <div className="flex items-center justify-between gap-3 rounded-xl bg-muted/60 px-3 py-2">
        <div>
          <p className="text-sm font-medium">Gradient</p>
          <p className="text-xs text-muted-foreground">Linear pada titik QR</p>
        </div>
        <Switch
          checked={style.useGradient}
          onCheckedChange={(checked) => onChange({ useGradient: checked })}
          aria-label="Gradient"
        />
      </div>

      {style.useGradient ? (
        <ColorField
          label="Gradient ke"
          value={style.gradientTo}
          onChange={(gradientTo) => onChange({ gradientTo })}
        />
      ) : null}

      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Dot Style (Gaya titik)">
          <NativeSelect
            value={style.dotType}
            onChange={(event) => onChange({ dotType: event.target.value as StyleState["dotType"] })}
          >
            <option value="square">Square</option>
            <option value="rounded">Rounded</option>
            <option value="extra-rounded">Extra-rounded</option>
            <option value="dots">Dots</option>
            <option value="classy">Classy</option>
            <option value="classy-rounded">Classy rounded</option>
          </NativeSelect>
        </Field>
        <Field label="Corner Square (Sudut luar)">
          <NativeSelect
            value={style.cornerSquareType}
            onChange={(event) =>
              onChange({ cornerSquareType: event.target.value as StyleState["cornerSquareType"] })
            }
          >
            <option value="square">Square</option>
            <option value="extra-rounded">Extra-rounded</option>
            <option value="dot">Dot</option>
          </NativeSelect>
        </Field>
        <Field label="Corner Dot (Sudut dalam)">
          <NativeSelect
            value={style.cornerDotType}
            onChange={(event) =>
              onChange({ cornerDotType: event.target.value as StyleState["cornerDotType"] })
            }
          >
            <option value="square">Square</option>
            <option value="dot">Dot</option>
          </NativeSelect>
        </Field>
        <Field label="Error Correction (Koreksi error)">
          <NativeSelect
            value={style.logoDataUrl ? "H" : style.ecLevel}
            disabled={Boolean(style.logoDataUrl)}
            onChange={(event) => onChange({ ecLevel: event.target.value as StyleState["ecLevel"] })}
          >
            <option value="L">L — 7%</option>
            <option value="M">M — 15%</option>
            <option value="Q">Q — 25%</option>
            <option value="H">H — 30%</option>
          </NativeSelect>
        </Field>
      </div>

      <div>
        <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
          <span>Size (Ukuran, px)</span>
          <span className="font-mono tabular-nums text-foreground">{style.size}</span>
        </div>
        <Slider
          min={240}
          max={512}
          step={8}
          value={[style.size]}
          onValueChange={([size]) => onChange({ size })}
        />
      </div>

      <div>
        <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
          <span>Quiet Zone (Margin)</span>
          <span className="font-mono tabular-nums text-foreground">{style.margin}</span>
        </div>
        <Slider
          min={0}
          max={32}
          step={1}
          value={[style.margin]}
          onValueChange={([margin]) => onChange({ margin })}
        />
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Logo tengah</p>
        {style.logoDataUrl ? (
          <div className="flex items-center gap-3 rounded-xl bg-muted/60 p-2">
            <img
              src={style.logoDataUrl}
              alt=""
              className="size-12 rounded-md object-contain outline outline-1 -outline-offset-1 outline-border"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm">{style.logoName || "Logo"}</p>
              <p className="text-xs text-muted-foreground">Koreksi error otomatis H</p>
            </div>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              aria-label="Hapus logo"
              onClick={() => onChange({ logoDataUrl: null, logoName: "" })}
            >
              <X />
            </Button>
          </div>
        ) : (
          <label className="flex h-24 cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-border bg-muted/40 text-xs text-muted-foreground transition-colors hover:bg-accent">
            <ImagePlus className="size-4" />
            Unggah PNG, JPG, atau SVG
            <input
              type="file"
              accept="image/png,image/jpeg,image/svg+xml,image/webp"
              className="sr-only"
              onChange={(event) => onLogo(event.target.files?.[0])}
            />
          </label>
        )}
      </div>

      {style.logoDataUrl ? (
        <>
          <div>
            <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
              <span>Ukuran logo</span>
              <span className="font-mono tabular-nums text-foreground">
                {Math.round(style.logoSize * 100)}%
              </span>
            </div>
            <Slider
              min={0.18}
              max={0.42}
              step={0.01}
              value={[style.logoSize]}
              onValueChange={([logoSize]) => onChange({ logoSize })}
            />
          </div>
          <div className="flex items-center justify-between gap-3 rounded-xl bg-muted/60 px-3 py-2">
            <div>
              <p className="text-sm font-medium">Sembunyikan titik di belakang logo</p>
              <p className="text-xs text-muted-foreground">Hide background dots</p>
            </div>
            <Switch
              checked={style.hideBackgroundDots}
              onCheckedChange={(checked) => onChange({ hideBackgroundDots: checked })}
            />
          </div>
        </>
      ) : null}
    </div>
  );
}
