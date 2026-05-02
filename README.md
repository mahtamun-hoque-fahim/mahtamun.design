# mahtamun.design

Graphic designer portfolio with admin dashboard. Next.js 15 · TypeScript · Tailwind · Neon + Drizzle · Vercel.

## Setup

```bash
pnpm install
cp .env.example .env.local   # Fill in all values
pnpm db:push                  # Push schema to Neon
pnpm dev
```

## Env vars required

See `.env.example`

## Deploy

Push to `main` → Vercel auto-deploys. Set env vars in Vercel project settings.

## Admin

`/admin` — password protected via cookie auth. Set `ADMIN_PASSWORD` in env.

## DB commands

```bash
pnpm db:push      # Push schema changes to Neon
pnpm db:studio    # Open Drizzle Studio
pnpm db:generate  # Generate migration files
```
