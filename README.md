# Personal Portfolio

Next.js App Router portfolio backed by Supabase and ready for Vercel deployment.

## Local setup

1. Copy `.env.example` to `.env.local`.
2. Fill in the Supabase values below.
3. Run `npm install` and `npm run dev`.

## Required environment variables

| Variable | Where to get it | Exposure |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Project Settings → API → Project URL | Browser and server |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Project Settings → API → Publishable/anon key | Browser and server |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Project Settings → API → Secret/service_role key | Server only; never commit or prefix with `NEXT_PUBLIC_` |
| `NEXT_PUBLIC_SITE_URL` | Production URL, for example `https://your-domain.com` | Browser and server |

## Supabase setup

1. Create a Supabase project.
2. Run `supabase/migrations/0001_portfolio.sql` in the Supabase SQL editor.
3. Create an email/password user in Supabase Authentication.
4. Insert that user ID into `public.admins`:

```sql
insert into public.admins (user_id) values ('AUTH_USER_UUID');
```

The migration enables RLS, creates the public `site-media` bucket, and creates the admin-only storage policies.

## Vercel setup

Import this project into Vercel, set all four environment variables for Preview and Production, then deploy. The Vercel build command is `npm run build`.

## Validation

```bash
npm run typecheck
npm run build
```
