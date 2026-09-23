import { cn } from "@/lib/utils";

export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("size-9", className)}
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="8" fill="var(--color-card)" stroke="var(--color-border)" />
      <rect x="6" y="6" width="8" height="8" rx="1.5" fill="currentColor" />
      <rect x="18" y="6" width="8" height="8" rx="1.5" fill="currentColor" />
      <rect x="6" y="18" width="8" height="8" rx="1.5" fill="currentColor" />
      <rect x="16" y="16" width="3" height="3" rx="0.5" fill="currentColor" />
      <rect x="20" y="20" width="6" height="6" rx="1.2" fill="var(--color-primary)" />
      <rect x="16" y="24" width="3" height="3" rx="0.5" fill="var(--color-brand)" />
    </svg>
  );
}
