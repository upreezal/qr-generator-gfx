import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";
import { isShadowToken } from "@/lib/owner";

export type VisitorRow = {
  userId: string;
  email: string;
  displayName: string;
  visitCount: number;
  firstSeenAt: string;
  lastSeenAt: string;
};

export type VisitEventRow = {
  id: number;
  userId: string;
  email: string;
  displayName: string;
  createdAt: string;
};

export type DayHit = {
  day: string;
  hits: number;
};

export type LaporanData = {
  totalHits: number;
  todayHits: number;
  uniqueUsers: number;
  sessions: number;
  days: DayHit[];
  visitors: VisitorRow[];
  events: VisitEventRow[];
};

type AuthUserRow = { id: string; name: string | null; email: string | null };

async function loadAuthUser(userId: string): Promise<AuthUserRow | null> {
  const { getSql } = await import("@/lib/db");
  const sql = await getSql();
  const rows = await sql<AuthUserRow>`
    select id, name, email from "user" where id = ${userId} limit 1
  `;
  return rows[0] ?? null;
}

export const recordHit = createServerFn({ method: "POST" }).handler(async () => {
  const { getSql } = await import("@/lib/db");
  const sql = await getSql();
  await sql`
    insert into daily_hits (day, hits)
    values (current_date, 1)
    on conflict (day) do update set hits = daily_hits.hits + 1
  `;
  return { ok: true as const };
});

export const recordVisit = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const profile = await loadAuthUser(context.userId);
    const email = profile?.email ?? "";
    const displayName = profile?.name ?? email ?? "Pengguna";
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();

    const existing = await sql<{ last_seen_at: string }>`
      select last_seen_at from visitors where user_id = ${context.userId} limit 1
    `;

    if (existing[0]) {
      await sql`
        update visitors
        set email = ${email},
            display_name = ${displayName},
            visit_count = visit_count + 1,
            last_seen_at = now()
        where user_id = ${context.userId}
      `;
    } else {
      await sql`
        insert into visitors (user_id, email, display_name, visit_count)
        values (${context.userId}, ${email}, ${displayName}, 1)
      `;
    }

    const recent = await sql<{ n: number }>`
      select count(*)::int as n
      from visit_events
      where user_id = ${context.userId}
        and created_at > now() - interval '15 minutes'
    `;
    if ((recent[0]?.n ?? 0) === 0) {
      await sql`
        insert into visit_events (user_id, email, display_name)
        values (${context.userId}, ${email}, ${displayName})
      `;
    }

    return { ok: true as const };
  });

export const fetchLaporan = createServerFn({ method: "POST" })
  .validator((token: string) => token.trim())
  .handler(async ({ data: token }): Promise<LaporanData> => {
    if (!isShadowToken(token)) {
      throw new Error("Not found");
    }
    try {
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    const totals = await sql<{ total: number; today: number }>`
      select
        coalesce(sum(hits), 0)::int as total,
        coalesce(sum(case when day = current_date then hits else 0 end), 0)::int as today
      from daily_hits
    `;
    const days = await sql<{ day: string; hits: number }>`
      select day::text as day, hits
      from daily_hits
      order by day desc
      limit 14
    `;
    const visitors = await sql<{
      user_id: string;
      email: string | null;
      display_name: string | null;
      visit_count: number;
      first_seen_at: string;
      last_seen_at: string;
    }>`
      select user_id, email, display_name, visit_count, first_seen_at, last_seen_at
      from visitors
      order by last_seen_at desc
    `;
    const events = await sql<{
      id: number;
      user_id: string;
      email: string | null;
      display_name: string | null;
      created_at: string;
    }>`
      select id, user_id, email, display_name, created_at
      from visit_events
      order by created_at desc
      limit 200
    `;
    const sessions = await sql<{ n: number }>`
      select count(*)::int as n from visit_events
    `;
    return {
      totalHits: Number(totals[0]?.total ?? 0),
      todayHits: Number(totals[0]?.today ?? 0),
      uniqueUsers: visitors.length,
      sessions: Number(sessions[0]?.n ?? 0),
      days: days.map((row) => ({ day: String(row.day), hits: Number(row.hits) })),
      visitors: visitors.map((row) => ({
        userId: row.user_id,
        email: row.email ?? "",
        displayName: row.display_name ?? "",
        visitCount: Number(row.visit_count),
        firstSeenAt: String(row.first_seen_at),
        lastSeenAt: String(row.last_seen_at),
      })),
      events: events.map((row) => ({
        id: Number(row.id),
        userId: row.user_id,
        email: row.email ?? "",
        displayName: row.display_name ?? "",
        createdAt: String(row.created_at),
      })),
    };
    } catch (error) {
      console.error("[laporan]", error);
      throw error;
    }
  });
