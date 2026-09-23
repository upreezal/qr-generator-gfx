create table if not exists visitors (
  user_id text primary key,
  email text,
  display_name text,
  visit_count integer not null default 0,
  first_seen_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now()
);

create table if not exists visit_events (
  id serial primary key,
  user_id text not null,
  email text,
  display_name text,
  created_at timestamptz not null default now()
);

create index if not exists visit_events_created_at_idx on visit_events (created_at desc);
create index if not exists visit_events_user_id_idx on visit_events (user_id);
