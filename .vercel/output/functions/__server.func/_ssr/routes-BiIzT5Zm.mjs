import { o as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { a as useCurrentUserState, r as LoginScreen, t as AuthSkeleton } from "./login-screen-CLOmUgEb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BiIzT5Zm.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var QrStudio = (0, import_react.lazy)(async () => {
	return { default: (await import("./studio-D1KRDUWt.mjs")).QrStudio };
});
function Home() {
	const { user } = useCurrentUserState();
	if (user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthSkeleton, {}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrStudio, {})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoginScreen, {});
}
//#endregion
export { Home as component };
