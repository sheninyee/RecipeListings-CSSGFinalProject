-- Paste this into Supabase dashboard -> SQL Editor -> Run

create table if not exists example (
  id bigint generated always as identity primary key,
  title text not null,
  created_at timestamptz not null default now()
);

-- Enable RLS so the public anon key can't touch this table.
-- The backend uses the secret key, which bypasses RLS.
alter table example enable row level security;

-- This grant allows the backend to read and write to the table.
grant select, insert, update, delete on table public.example to service_role;


create table if not exists profile (
  id bigint generated always as identity primary key,
  email text not null,
  name text,
  created_at timestamptz not null default now(),
  deleted_at timestamptz,
  is_demo boolean not null default false
);

create table if not exists recipe (
  id bigint generated always as identity primary key,
  profile_id bigint not null references profile(id),
  title text not null,
  description text,
  ingredients text,
  tools text,
  created_at timestamptz not null default now(),
  last_edited_at timestamptz not null default now(),
  deleted_at timestamptz
);

-- Enable RLS so the public anon key can't touch this table.
-- The backend uses the secret key, which bypasses RLS.
alter table profile enable row level security;
alter table recipe enable row level security;

-- This grant allows the backend to read and write to the table.
grant select, insert, update, delete on table public.profile to service_role;
grant select, insert, update, delete on table public.recipe to service_role;
