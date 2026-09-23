import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { _ as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as useCurrentUserState, r as LoginScreen } from "./login-screen-QyTzvYC2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-CrHGhmR6.js
var import_jsx_runtime = require_jsx_runtime();
function Login() {
	const { user } = useCurrentUserState();
	if (user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoginScreen, {});
}
//#endregion
export { Login as component };
