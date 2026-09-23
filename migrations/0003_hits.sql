create table if not exists daily_hits (
  day date primary key,
  hits integer not null default 0
);
