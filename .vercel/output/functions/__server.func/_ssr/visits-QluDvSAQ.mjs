import { i as TSS_SERVER_FUNCTION, r as createServerFn } from "./ssr.mjs";
import { t as authMiddleware } from "./middleware-CtmxXNxn.mjs";
import { t as isShadowToken } from "./owner-B9VeZ3H_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/visits-QluDvSAQ.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
async function loadAuthUser(userId) {
	const { getSql } = await import("./db-B7x1Ebfo.mjs").then((n) => n.t).then((n) => n.t);
	return (await (await getSql())`
    select id, name, email from "user" where id = ${userId} limit 1
  `)[0] ?? null;
}
var recordHit_createServerFn_handler = createServerRpc({
	id: "88bc6362f2072943dc32863f7f525d203772cd69290daf5ef80f61a8dc988065",
	name: "recordHit",
	filename: "src/lib/visits.ts"
}, (opts) => recordHit.__executeServer(opts));
var recordHit = createServerFn({ method: "POST" }).handler(recordHit_createServerFn_handler, async () => {
	const { getSql } = await import("./db-B7x1Ebfo.mjs").then((n) => n.t).then((n) => n.t);
	await (await getSql())`
    insert into daily_hits (day, hits)
    values (current_date, 1)
    on conflict (day) do update set hits = daily_hits.hits + 1
  `;
	return { ok: true };
});
var recordVisit_createServerFn_handler = createServerRpc({
	id: "343a04c306daba9cd8679d2897b3b392d39d655ef3dc92bec7462c14881a5476",
	name: "recordVisit",
	filename: "src/lib/visits.ts"
}, (opts) => recordVisit.__executeServer(opts));
var recordVisit = createServerFn({ method: "POST" }).middleware([authMiddleware]).handler(recordVisit_createServerFn_handler, async ({ context }) => {
	const profile = await loadAuthUser(context.userId);
	const email = profile?.email ?? "";
	const displayName = profile?.name ?? email ?? "Pengguna";
	const { getSql } = await import("./db-B7x1Ebfo.mjs").then((n) => n.t).then((n) => n.t);
	const sql = await getSql();
	if ((await sql`
      select last_seen_at from visitors where user_id = ${context.userId} limit 1
    `)[0]) await sql`
        update visitors
        set email = ${email},
            display_name = ${displayName},
            visit_count = visit_count + 1,
            last_seen_at = now()
        where user_id = ${context.userId}
      `;
	else await sql`
        insert into visitors (user_id, email, display_name, visit_count)
        values (${context.userId}, ${email}, ${displayName}, 1)
      `;
	if (((await sql`
      select count(*)::int as n
      from visit_events
      where user_id = ${context.userId}
        and created_at > now() - interval '15 minutes'
    `)[0]?.n ?? 0) === 0) await sql`
        insert into visit_events (user_id, email, display_name)
        values (${context.userId}, ${email}, ${displayName})
      `;
	return { ok: true };
});
var fetchLaporan_createServerFn_handler = createServerRpc({
	id: "d0b00fdced1498edbbdfe8854e0786153e104399308c52392424d6757fce3e29",
	name: "fetchLaporan",
	filename: "src/lib/visits.ts"
}, (opts) => fetchLaporan.__executeServer(opts));
var fetchLaporan = createServerFn({ method: "POST" }).validator((token) => token.trim()).handler(fetchLaporan_createServerFn_handler, async ({ data: token }) => {
	if (!isShadowToken(token)) throw new Error("Not found");
	try {
		const { getSql } = await import("./db-B7x1Ebfo.mjs").then((n) => n.t).then((n) => n.t);
		const sql = await getSql();
		const totals = await sql`
      select
        coalesce(sum(hits), 0)::int as total,
        coalesce(sum(case when day = current_date then hits else 0 end), 0)::int as today
      from daily_hits
    `;
		const days = await sql`
      select day::text as day, hits
      from daily_hits
      order by day desc
      limit 14
    `;
		const visitors = await sql`
      select user_id, email, display_name, visit_count, first_seen_at, last_seen_at
      from visitors
      order by last_seen_at desc
    `;
		const events = await sql`
      select id, user_id, email, display_name, created_at
      from visit_events
      order by created_at desc
      limit 200
    `;
		const sessions = await sql`
      select count(*)::int as n from visit_events
    `;
		return {
			totalHits: Number(totals[0]?.total ?? 0),
			todayHits: Number(totals[0]?.today ?? 0),
			uniqueUsers: visitors.length,
			sessions: Number(sessions[0]?.n ?? 0),
			days: days.map((row) => ({
				day: String(row.day),
				hits: Number(row.hits)
			})),
			visitors: visitors.map((row) => ({
				userId: row.user_id,
				email: row.email ?? "",
				displayName: row.display_name ?? "",
				visitCount: Number(row.visit_count),
				firstSeenAt: String(row.first_seen_at),
				lastSeenAt: String(row.last_seen_at)
			})),
			events: events.map((row) => ({
				id: Number(row.id),
				userId: row.user_id,
				email: row.email ?? "",
				displayName: row.display_name ?? "",
				createdAt: String(row.created_at)
			}))
		};
	} catch (error) {
		console.error("[laporan]", error);
		throw error;
	}
});
//#endregion
export { fetchLaporan_createServerFn_handler, recordHit_createServerFn_handler, recordVisit_createServerFn_handler };
