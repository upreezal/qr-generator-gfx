import { useEffect, useState } from "react";
import { BrandMark } from "@/components/brand-mark";
import { GoogleIcon } from "@/components/auth/google-icon";
import { Button } from "@/components/ui/button";
import { GROK_PROVIDERS, authClient, signIn } from "@/lib/auth/client";

const google = GROK_PROVIDERS.find((provider) => provider.idp === "google");

function isMobileDevice() {
  if (typeof window === "undefined") return false;
  const ua = window.navigator.userAgent;
  if (/Android|iPhone|iPad|iPod|Mobile/i.test(ua)) return true;
  return window.matchMedia("(pointer: coarse), (hover: none), (max-width: 768px)").matches;
}

export function LoginScreen() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const idle = window.setTimeout(() => {
      void import("@/components/qr/studio");
    }, 1200);
    return () => window.clearTimeout(idle);
  }, []);

  async function startGoogle() {
    if (!google || busy) return;
    setError(null);
    setBusy(true);
    try {
      if (isMobileDevice()) {
        const { data, error: oauthError } = await authClient.signIn.oauth2({
          providerId: google.providerId,
          callbackURL: "/",
          errorCallbackURL: "/",
        });
        if (oauthError) throw new Error(oauthError.message ?? "Gagal masuk.");
        if (!data?.url) throw new Error("Gagal membuka Google.");
        window.location.assign(data.url);
        return;
      }
      await signIn(google.providerId, { callbackURL: "/" });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Gagal masuk.";
      setError(
        /pop-up|popup/i.test(message)
          ? "Izinkan pop-up di browser, lalu klik lagi."
          : message,
      );
      setBusy(false);
    }
  }

  return (
    <div className="relative z-20 flex min-h-dvh flex-col items-center justify-center px-4">
      <div className="relative z-20 w-full max-w-sm rounded-2xl bg-card p-7 text-card-foreground shadow-[var(--shadow-border)]">
        <div className="mb-6 flex items-center gap-3">
          <BrandMark />
          <div>
            <h1 className="text-base font-semibold tracking-tight">QR Code Generator</h1>
            <p className="text-xs text-muted-foreground">by ArrizalGFX</p>
          </div>
        </div>
        <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
          Masuk dengan Google untuk memakai generator.
        </p>
        {google ? (
          <Button
            type="button"
            className="relative z-30 w-full bg-foreground text-background hover:bg-foreground/90"
            disabled={busy}
            onClick={() => void startGoogle()}
          >
            <GoogleIcon className="size-4" />
            {busy ? "Membuka Google…" : "Lanjut dengan Google"}
          </Button>
        ) : (
          <p className="text-sm text-destructive">Login Google tidak tersedia.</p>
        )}
        {error ? <p className="mt-3 text-sm text-destructive">{error}</p> : null}
      </div>
    </div>
  );
}

export function AuthSkeleton() {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="border-b border-border px-4 py-3">
        <p className="mx-auto max-w-6xl text-sm font-semibold">QR Code Generator</p>
        <p className="mx-auto max-w-6xl text-xs text-muted-foreground">Memuat…</p>
      </header>
      <div className="mx-auto grid w-full max-w-6xl flex-1 gap-5 px-4 py-6 lg:grid-cols-2">
        <div className="h-80 animate-pulse rounded-2xl bg-muted" />
        <div className="h-80 animate-pulse rounded-2xl bg-muted" />
      </div>
    </div>
  );
}
