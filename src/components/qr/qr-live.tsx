import { useEffect, useRef } from "react";
import type { Options } from "qr-code-styling";
import { cn } from "@/lib/utils";

export function QrLive({
  options,
  className,
}: {
  options: Options | null;
  className?: string;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const qrRef = useRef<{ update: (opts: Options) => void } | null>(null);
  const optionsRef = useRef(options);
  optionsRef.current = options;

  useEffect(() => {
    let cancelled = false;
    const host = hostRef.current;
    if (!host) return undefined;

    import("qr-code-styling").then(({ default: QRCodeStyling }) => {
      if (cancelled || !hostRef.current) return;
      hostRef.current.innerHTML = "";
      const qr = new QRCodeStyling({
        width: 320,
        height: 320,
        type: "canvas",
        data: "https://arrizalgfx.com",
        dotsOptions: { color: "#0b0f14", type: "extra-rounded" },
        backgroundOptions: { color: "#ffffff" },
      });
      qr.append(hostRef.current);
      qrRef.current = qr;
      if (optionsRef.current) qr.update(optionsRef.current);
    });

    return () => {
      cancelled = true;
      qrRef.current = null;
      host.innerHTML = "";
    };
  }, []);

  useEffect(() => {
    if (!options || !qrRef.current) return;
    qrRef.current.update(options);
  }, [options]);

  return <div ref={hostRef} className={cn("qr-host", className)} />;
}
