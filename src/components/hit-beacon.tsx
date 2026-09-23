import { useEffect } from "react";

export function HitBeacon() {
  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        if (sessionStorage.getItem("agx-hit")) return;
        sessionStorage.setItem("agx-hit", "1");
      } catch {
        return;
      }
      void import("@/lib/visits")
        .then((mod) => mod.recordHit())
        .catch(() => {
          /* ignore */
        });
    }, 2500);
    return () => window.clearTimeout(timer);
  }, []);
  return null;
}
