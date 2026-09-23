import { createServerFn } from "@tanstack/react-start";

export const fetchSessionUser = createServerFn({ method: "GET" }).handler(
  async () => {
    const { getSessionUser } = await import("@/lib/auth/verify.server");
    const user = await getSessionUser();
    return user ? { id: user.id, email: user.email } : null;
  },
);
