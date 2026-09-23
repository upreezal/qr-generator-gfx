import { a as getServerFnById, i as TSS_SERVER_FUNCTION, r as createServerFn } from "./ssr.mjs";
import { t as authMiddleware } from "./middleware-CtmxXNxn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/visits-ypoHHTCp.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var recordHit = createServerFn({ method: "POST" }).handler(createSsrRpc("88bc6362f2072943dc32863f7f525d203772cd69290daf5ef80f61a8dc988065"));
var recordVisit = createServerFn({ method: "POST" }).middleware([authMiddleware]).handler(createSsrRpc("343a04c306daba9cd8679d2897b3b392d39d655ef3dc92bec7462c14881a5476"));
var fetchLaporan = createServerFn({ method: "POST" }).validator((token) => token.trim()).handler(createSsrRpc("d0b00fdced1498edbbdfe8854e0786153e104399308c52392424d6757fce3e29"));
//#endregion
export { fetchLaporan, recordHit, recordVisit };
