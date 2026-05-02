# mahtamun.design

Graphic designer portfolio with admin dashboard.

**Stack:** Next.js 15.5.15 · TypeScript · Tailwind CSS 3 · Neon + Drizzle ORM · Vercel · Resend

---

## Prerequisites

- Node.js 20+
- pnpm
- Neon database (create at neon.tech)
- Resend account (resend.com)

---

## Local Setup

```bash
git clone https://github.com/mahtamun-hoque-fahim/mahtamun.design.git
cd mahtamun.design
pnpm install
cp .env.example .env.local   # fill in all values
pnpm db:push                  # push schema to Neon
pnpm dev
```

---

## Environment Variables

See `.env.example` and `PLANNER.md` for full descriptions.

```
DATABASE_URL
DATABASE_URL_UNPOOLED
ADMIN_PASSWORD
ADMIN_SECRET
RESEND_API_KEY
CONTACT_EMAIL
```

---

## Commands

```bash
pnpm dev          # dev server (Turbopack)
pnpm build        # production build
pnpm start        # production server
pnpm lint         # ESLint
pnpm db:push      # push schema changes to Neon
pnpm db:studio    # open Drizzle Studio
pnpm db:generate  # generate migration files
```

---

## Admin

`/admin` — password protected. Set `ADMIN_PASSWORD` + `ADMIN_SECRET` in env.  
Login sets an httpOnly cookie valid for 7 days.

---

## Deploy

Push to `main` → Vercel auto-deploys.  
Set all env vars in Vercel project settings before first deploy.

---

## Folder Structure

```
app/           Next.js App Router pages + API routes
components/    UI, section, and admin components
lib/           DB connection, schema, utilities
public/        Static assets
drizzle/       Migration files (generated)
```
