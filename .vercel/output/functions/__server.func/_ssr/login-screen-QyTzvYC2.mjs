import { o as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { r as signIn, t as authClient } from "./client-CVqXY6bk.mjs";
import { n as cn, t as Button } from "./button-DrQLw21j.mjs";
import { t as GROK_PROVIDERS } from "./server-Dd5C3fnE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-screen-QyTzvYC2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function BrandMark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 32 32",
		className: cn("size-9", className),
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				width: "32",
				height: "32",
				rx: "8",
				fill: "var(--color-card)",
				stroke: "var(--color-border)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "6",
				y: "6",
				width: "8",
				height: "8",
				rx: "1.5",
				fill: "currentColor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "18",
				y: "6",
				width: "8",
				height: "8",
				rx: "1.5",
				fill: "currentColor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "6",
				y: "18",
				width: "8",
				height: "8",
				rx: "1.5",
				fill: "currentColor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "16",
				y: "16",
				width: "3",
				height: "3",
				rx: "0.5",
				fill: "currentColor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "20",
				y: "20",
				width: "6",
				height: "6",
				rx: "1.2",
				fill: "var(--color-primary)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "16",
				y: "24",
				width: "3",
				height: "3",
				rx: "0.5",
				fill: "var(--color-brand)"
			})
		]
	});
}
/**
* Current user + loading state. Same behavior in live preview and when deployed:
*   - Auth enabled -> the real signed-in user; `user` is `null` while
*                            the session resolves (`isPending: true`) and when
*                            signed out (`isPending: false`). Session comes from
*                            Better Auth `useSession()` → `/api/auth/get-session`
*                            (cookie when deployed; bearer in live preview).
*   - Auth disabled (`VITE_AUTH_ENABLED=false`) -> `DEV_USER`, never pending.
*
* Protect a route by waiting out `isPending` before acting on `user` —
* redirecting on `user: null` alone bounces signed-in visitors to sign-in on
* every hard reload:
*
*   import { RedirectToSignIn } from "@/lib/auth/gates";
*   const { user, isPending } = useCurrentUserState();
*   if (isPending) return null;              // still resolving — don't redirect yet
*   if (!user) return <RedirectToSignIn />;  // definitely signed out
*
* `authEnabled` is a module-level constant fixed at load, so the guarded hook
* call keeps a stable hook order across every render of a given component.
*/
function useCurrentUserState() {
	const { data, isPending } = authClient.useSession();
	const user = data?.user;
	return {
		user: user ? {
			id: user.id,
			displayName: user.name ?? null,
			primaryEmail: user.email ?? null,
			profileImageUrl: user.image ?? null,
			isDevFallback: false
		} : null,
		isPending
	};
}
/**
* Convenience view of `useCurrentUserState().user` for display (e.g.
* `user?.displayName ?? "Guest"`). NOTE: `null` means *loading OR signed out* —
* for redirects/guards use `useCurrentUserState()` and check `isPending`.
*/
function useCurrentUser() {
	return useCurrentUserState().user;
}
function GoogleIcon({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 24 24",
		className,
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#4285F4",
				d: "M23.49 12.27c0-.82-.07-1.64-.23-2.43H12v4.6h6.46a5.52 5.52 0 0 1-2.4 3.63v3.01h3.88c2.27-2.09 3.55-5.17 3.55-8.81Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#34A853",
				d: "M12 24c3.24 0 5.96-1.07 7.95-2.92l-3.88-3.01c-1.08.73-2.47 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.28v3.11A12 12 0 0 0 12 24Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#FBBC05",
				d: "M5.27 14.27A7.2 7.2 0 0 1 4.89 12c0-.79.14-1.56.38-2.27V6.62H1.28A12 12 0 0 0 0 12c0 1.94.46 3.77 1.28 5.38l3.99-3.11Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#EA4335",
				d: "M12 4.75c1.76 0 3.34.61 4.59 1.8l3.44-3.44C17.95 1.19 15.23 0 12 0 7.31 0 3.26 2.69 1.28 6.62l3.99 3.11C6.22 6.86 8.87 4.75 12 4.75Z"
			})
		]
	});
}
var google = GROK_PROVIDERS.find((provider) => provider.idp === "google");
function isMobileDevice() {
	if (typeof window === "undefined") return false;
	const ua = window.navigator.userAgent;
	if (/Android|iPhone|iPad|iPod|Mobile/i.test(ua)) return true;
	return window.matchMedia("(pointer: coarse), (hover: none), (max-width: 768px)").matches;
}
function LoginScreen() {
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const idle = window.setTimeout(() => {
			import("./studio-BgPnINBp.mjs");
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
					errorCallbackURL: "/"
				});
				if (oauthError) throw new Error(oauthError.message ?? "Gagal masuk.");
				if (!data?.url) throw new Error("Gagal membuka Google.");
				window.location.assign(data.url);
				return;
			}
			await signIn(google.providerId, { callbackURL: "/" });
		} catch (err) {
			const message = err instanceof Error ? err.message : "Gagal masuk.";
			setError(/pop-up|popup/i.test(message) ? "Izinkan pop-up di browser, lalu klik lagi." : message);
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "relative z-20 flex min-h-dvh flex-col items-center justify-center px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative z-20 w-full max-w-sm rounded-2xl bg-card p-7 text-card-foreground shadow-[var(--shadow-border)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-6 flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandMark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-base font-semibold tracking-tight",
						children: "QR Code Generator"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "by ArrizalGFX"
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-5 text-sm leading-relaxed text-muted-foreground",
					children: "Masuk dengan Google untuk memakai generator."
				}),
				google ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					className: "relative z-30 w-full bg-foreground text-background hover:bg-foreground/90",
					disabled: busy,
					onClick: () => void startGoogle(),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoogleIcon, { className: "size-4" }), busy ? "Membuka Google…" : "Lanjut dengan Google"]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-destructive",
					children: "Login Google tidak tersedia."
				}),
				error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-destructive",
					children: error
				}) : null
			]
		})
	});
}
function AuthSkeleton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "border-b border-border px-4 py-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mx-auto max-w-6xl text-sm font-semibold",
				children: "QR Code Generator"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mx-auto max-w-6xl text-xs text-muted-foreground",
				children: "Memuat…"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid w-full max-w-6xl flex-1 gap-5 px-4 py-6 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-80 animate-pulse rounded-2xl bg-muted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-80 animate-pulse rounded-2xl bg-muted" })]
		})]
	});
}
//#endregion
export { useCurrentUserState as a, useCurrentUser as i, BrandMark as n, LoginScreen as r, AuthSkeleton as t };
