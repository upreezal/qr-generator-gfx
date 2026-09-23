import { lazy, Suspense } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AuthSkeleton, LoginScreen } from "@/components/auth/login-screen";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

const QrStudio = lazy(async () => {
  const mod = await import("@/components/qr/studio");
  return { default: mod.QrStudio };
});

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const { user } = useCurrentUserState();

  if (user) {
    return (
      <Suspense fallback={<AuthSkeleton />}>
        <QrStudio />
      </Suspense>
    );
  }

  return <LoginScreen />;
}
