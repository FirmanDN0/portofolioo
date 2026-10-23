create extension if not exists "pgcrypto";

create table public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;

create table public.site_settings (
  id int primary key default 1 check (id = 1),
  site_title text not null default 'UI & UX Designer Portfolio',
  meta_description text,
  language text not null default 'en',
  cta_label text not null default 'Let''s Talk',
  cta_href text not null default '#contact',
  contact_email text,
  contact_phone text,
  social_links jsonb not null default '[]',
  footer_copyright text,
  updated_at timestamptz not null default now()
);

create table public.hero (
  id int primary key default 1 check (id = 1),
  greeting text not null default 'Hi I am',
  title text not null default 'UI & UX Designer',
  description text,
  primary_btn_label text not null default 'Contact Us',
  primary_btn_href text not null default '#contact',
  secondary_btn_label text not null default 'Portfolio',
  secondary_btn_href text not null default '#portfolio',
  image_url text,
  badge_visible boolean not null default false,
  badge_text text,
  badge_avatar_url text,
  updated_at timestamptz not null default now()
);

create table public.about (
  id int primary key default 1 check (id = 1),
  heading text not null default 'About Me',
  body text,
  image_url text,
  updated_at timestamptz not null default now()
);

create table public.skills (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  percent int not null check (percent between 0 and 100),
  color text not null default '#1B2587',
  sort_order int not null default 0
);

create table public.services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  icon text,
  link_url text,
  is_highlighted boolean not null default false,
  is_visible boolean not null default true,
  sort_order int not null default 0
);

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  label text not null default 'Design',
  categories text[] not null default '{}',
  cover_url text,
  gallery_urls text[] not null default '{}',
  summary text,
  content text,
  external_url text,
  status text not null default 'draft' check (status in ('draft', 'published')),
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  body text not null,
  is_read boolean not null default false,
  ip_hash text,
  created_at timestamptz not null default now()
);

alter table public.admins enable row level security;
alter table public.site_settings enable row level security;
alter table public.hero enable row level security;
alter table public.about enable row level security;
alter table public.skills enable row level security;
alter table public.services enable row level security;
alter table public.projects enable row level security;
alter table public.messages enable row level security;

create policy "public can read settings" on public.site_settings for select using (true);
create policy "admins manage settings" on public.site_settings for all using (public.is_admin()) with check (public.is_admin());
create policy "public can read hero" on public.hero for select using (true);
create policy "admins manage hero" on public.hero for all using (public.is_admin()) with check (public.is_admin());
create policy "public can read about" on public.about for select using (true);
create policy "admins manage about" on public.about for all using (public.is_admin()) with check (public.is_admin());
create policy "public can read skills" on public.skills for select using (true);
create policy "admins manage skills" on public.skills for all using (public.is_admin()) with check (public.is_admin());
create policy "public can read visible services" on public.services for select using (is_visible = true);
create policy "admins manage services" on public.services for all using (public.is_admin()) with check (public.is_admin());
create policy "public can read published projects" on public.projects for select using (status = 'published');
create policy "admins manage projects" on public.projects for all using (public.is_admin()) with check (public.is_admin());
create policy "admins read messages" on public.messages for select using (public.is_admin());
create policy "admins update messages" on public.messages for update using (public.is_admin()) with check (public.is_admin());
create policy "admins delete messages" on public.messages for delete using (public.is_admin());
create policy "admins read own admin row" on public.admins for select using (auth.uid() = user_id);

insert into public.site_settings (id) values (1) on conflict (id) do nothing;
insert into public.hero (id) values (1) on conflict (id) do nothing;
insert into public.about (id) values (1) on conflict (id) do nothing;

insert into storage.buckets (id, name, public) values ('site-media', 'site-media', true)
on conflict (id) do nothing;

create policy "public can read site media" on storage.objects for select
  using (bucket_id = 'site-media');
create policy "admins upload site media" on storage.objects for insert
  with check (bucket_id = 'site-media' and public.is_admin());
create policy "admins update site media" on storage.objects for update
  using (bucket_id = 'site-media' and public.is_admin())
  with check (bucket_id = 'site-media' and public.is_admin());
create policy "admins delete site media" on storage.objects for delete
  using (bucket_id = 'site-media' and public.is_admin());
