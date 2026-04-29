# mahtamun.design

Graphic designer portfolio with admin dashboard. Built with Next.js 14 App Router.

## Stack

- Next.js 14 App Router + TypeScript
- Tailwind CSS (dark-first, `#0a0a0a`, `#00e676` accent)
- Neon (PostgreSQL) + Drizzle ORM
- Resend (contact form emails)
- Cloudinary (image uploads — optional)
- Vercel (deployment)

## Setup

```bash
git clone https://github.com/mahtamun-hoque-fahim/mahtamun.design.git
cd mahtamun.design
npm install
cp .env.example .env.local
# Fill in env vars
npm run db:push
npm run dev
```

## Env Vars

See `.env.example` and `PLANNER.md` for full documentation.

Required: `DATABASE_URL`, `DATABASE_URL_UNPOOLED`, `ADMIN_PASSWORD`

## Commands

```bash
npm run dev       # Start dev server
npm run build     # Production build
npm run db:push   # Push schema to Neon (dev)
npm run db:studio # Drizzle Studio
```

## Structure

```
app/
├── page.tsx              # Homepage
├── work/                 # Portfolio grid
├── about/                # About page
├── contact/              # Contact form
├── admin/                # Protected dashboard
│   ├── login/
│   ├── projects/
│   ├── messages/
│   └── content/
└── api/                  # Route handlers
components/
├── ui/                   # Navbar, Footer
├── sections/             # Hero, Services, etc.
└── admin/                # AdminSidebar
lib/
├── db/                   # Schema + Drizzle
└── utils.ts
```

## Admin

Route: `/admin/login` — password set via `ADMIN_PASSWORD` env var.
