# PLANNER — mahtamun.design

> Graphic designer portfolio + admin dashboard · Last synced: May 2025

---

## Project Overview

**Purpose:** Conversion-focused graphic design portfolio for Mahtamun Hoque Fahim (MAHTAMUN brand). Hooks clients visually, funnels them to contact, and gives full content control via a private admin dashboard.

**Target user (public):** Potential design clients globally — startups, SMEs, solopreneurs.

**Target user (admin):** Fahim — managing projects, messages, testimonials, and site copy.

**Key value:** No-code content management over a world-class portfolio design.

---

## Architecture

| Layer | Tech |
|-------|------|
| Framework | Next.js 15.5.15 (App Router, Turbopack) |
| Language | TypeScript (strict, zero errors) |
| Styling | Tailwind CSS 3 + CSS custom properties |
| Database | Neon PostgreSQL (serverless, neon-http driver) |
| ORM | Drizzle ORM |
| Auth | Custom cookie — password + httpOnly token (no Clerk) |
| Email | Resend |
| Images | Cloudinary (external URL, no SDK needed) |
| Deploy | Vercel |

### Folder Structure
```
app/
  (main)/          — public-facing pages + layout (Navbar, Footer)
    page.tsx       — Homepage
    work/          — Portfolio listing + [slug] case study
    about/         — About page
    contact/       — Contact form
  admin/           — Protected by middleware
    login/         — Login page (cookie auth)
    (dashboard)/   — Admin layout with sidebar
      page.tsx     — Dashboard overview
      projects/    — CRUD table + new/[id] forms
      messages/    — Inbox
      testimonials/— List + add form
      content/     — Key-value CMS
  api/
    contact/       — Save message + Resend email
    admin/login    — Set cookie
    admin/logout   — Clear cookie
    admin/projects/[id]
    admin/messages/[id]
    admin/testimonials/[id]
    admin/content
components/
  ui/              — Navbar, Footer, CustomCursor, RevealOnScroll
  sections/        — Hero, MarqueeTicker, WorkGrid, Services, Process, Testimonials, ContactForm
  admin/           — AdminSidebar, ProjectForm, ProjectActions, MessageActions, TestimonialForm, TestimonialActions, ContentEditor
lib/
  db/index.ts      — getDb() factory (neon-http + Drizzle)
  db/schema.ts     — All table definitions
  utils.ts         — cn(), slugify(), formatDate(), CATEGORIES, BUDGETS, SERVICES
```

---

## User Flows

### Public visitor
1. Land on `/` — hero grabs attention, stats build trust
2. Click "View My Work" → `/work` — filter by category
3. Click a project → `/work/[slug]` — full case study
4. Click "Start a Project" CTA → `/contact`
5. Fill form → message saved to DB + email to Fahim via Resend

### Admin
1. Visit `/admin` → redirected to `/admin/login` by middleware
2. Enter password → cookie set → redirected to `/admin`
3. Dashboard: see stats (projects, unread messages, testimonials) + recent messages
4. `/admin/projects` → table of all projects; click New → form; click edit → prefilled form
5. `/admin/messages` → inbox with read/unread toggle + reply via email link
6. `/admin/testimonials` → add form + live list with publish toggle
7. `/admin/content` → edit hero text, bio, social links — per-field save

---

## DB Schema

### `projects`
| Column | Type | Notes |
|--------|------|-------|
| id | serial PK | |
| title | text NOT NULL | |
| slug | text UNIQUE NOT NULL | auto-generated on create |
| category | text | default 'branding' |
| description | text | short blurb |
| content | text | long-form case study body |
| cover_image | text | URL (Cloudinary etc.) |
| images | json | string[] gallery URLs |
| client | text | |
| year | integer | |
| tags | json | string[] |
| featured | boolean | default false |
| published | boolean | default true |
| created_at | timestamp | |
| updated_at | timestamp | |

### `messages`
| Column | Type | Notes |
|--------|------|-------|
| id | serial PK | |
| name | text NOT NULL | |
| email | text NOT NULL | |
| subject | text | |
| message | text NOT NULL | |
| budget | text | from dropdown |
| service | text | from dropdown |
| read | boolean | default false |
| created_at | timestamp | |

### `site_content`
| Column | Type | Notes |
|--------|------|-------|
| id | serial PK | |
| key | text UNIQUE NOT NULL | e.g. hero.headline |
| value | text NOT NULL | |
| type | text | 'text' or 'textarea' |
| updated_at | timestamp | |

### `testimonials`
| Column | Type | Notes |
|--------|------|-------|
| id | serial PK | |
| name | text NOT NULL | |
| role | text | |
| company | text | |
| avatar | text | URL |
| content | text NOT NULL | |
| rating | integer | default 5 |
| published | boolean | default true |
| created_at | timestamp | |

---

## API Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/contact | Save message + Resend email |
| POST | /api/admin/login | Set httpOnly cookie |
| POST | /api/admin/logout | Clear cookie |
| GET/POST | /api/admin/projects | List / create |
| GET/PATCH/DELETE | /api/admin/projects/[id] | Single CRUD |
| GET | /api/admin/messages | List all |
| PATCH/DELETE | /api/admin/messages/[id] | Toggle read / delete |
| GET/POST | /api/admin/testimonials | List / create |
| PATCH/DELETE | /api/admin/testimonials/[id] | Toggle published / delete |
| GET/POST | /api/admin/content | List / upsert by key |

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| DATABASE_URL | YES | Neon pooled connection string |
| DATABASE_URL_UNPOOLED | YES | For drizzle-kit db:push |
| ADMIN_PASSWORD | YES | Admin login password |
| ADMIN_SECRET | YES | Value stored in httpOnly cookie |
| RESEND_API_KEY | YES | Resend API key |
| CONTACT_EMAIL | optional | Where to forward contact messages |

---

## Phases

| Phase | Status | Description |
|-------|--------|-------------|
| 1 — Scaffold | DONE | Repo wipe, Next.js 15.5.15, design system, fonts |
| 2 — Public pages | DONE | Homepage, /work, /work/[slug], /about, /contact |
| 3 — API layer | DONE | Contact, admin login/logout, all CRUD routes |
| 4 — Admin dashboard | DONE | Sidebar, projects CRUD, messages, testimonials, content CMS |
| 5 — DB migration | DONE | Schema pushed to Neon (manual SQL + db:push) |
| 6 — Deploy | DONE | Vercel live, CVE-2025-66478 patched (15.5.15) |
| 7 — Cloudinary uploads | PENDING | Direct upload widget in project form |
| 8 — OG images | PENDING | Per-project dynamic OG via @vercel/og |
| 9 — Analytics | PENDING | Page view counter + admin sparkline |
| 10 — Project ordering | PENDING | Drag-and-drop display_order in admin |

---

## Next Steps

1. Add Cloudinary upload widget to project form (replace manual URL input)
2. Add @vercel/og dynamic OG image route per project slug
3. Add simple page_views table + sparkline in admin dashboard
4. Add drag-and-drop project reordering (display_order column)
5. Verify Resend domain mahtamun.design for styled transactional emails
