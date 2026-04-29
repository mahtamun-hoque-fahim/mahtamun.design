# PLANNER — mahtamun.design

**Purpose:** Graphic designer portfolio + admin dashboard for managing designs, content, logins, and messages.

**Target User:** Clients discovering Fahim's work, potential collaborators, and admin (Fahim himself).

---

## Architecture

**Stack:** Next.js 14 App Router · TypeScript · Tailwind CSS · Neon (PostgreSQL) · Drizzle ORM · Resend · Vercel

**Folder Structure:**
```
app/
├── page.tsx                # Homepage (Hero + Services + Featured + CTA)
├── work/page.tsx           # Portfolio grid with filter
├── about/page.tsx          # About + skills + timeline
├── contact/page.tsx        # Contact form
├── admin/
│   ├── login/page.tsx      # Admin login
│   ├── layout.tsx          # Admin layout + sidebar
│   ├── page.tsx            # Dashboard overview (stats + recent messages)
│   ├── projects/page.tsx   # CRUD portfolio projects
│   ├── messages/page.tsx   # View + manage contact messages
│   └── content/page.tsx    # Content management (placeholder)
└── api/
    ├── contact/route.ts
    └── admin/
        ├── login/route.ts
        ├── logout/route.ts
        ├── projects/route.ts
        └── messages/route.ts
middleware.ts               # Admin auth guard
```

---

## User Flows

**Visitor → Client:**
1. Land on homepage → sees hero, services, featured work
2. Browse portfolio → filter by category
3. Click project → case study (slug page)
4. Contact form → message saved to DB + email notification

**Admin:**
1. `/admin/login` → enter password → cookie set → redirect to `/admin`
2. Dashboard shows stats + recent messages
3. Manage projects: add/edit/delete, mark featured, set order
4. Manage messages: read, mark unread, delete, reply by email
5. Logout → cookie cleared

---

## DB Schema

### `projects`
| Column | Type | Notes |
|---|---|---|
| id | serial PK | |
| title | text | |
| slug | text UNIQUE | auto-generated from title |
| category | text | branding, logo, ui-ux, social-media, print, web |
| description | text | short (card) |
| long_description | text | case study body |
| cover_image | text | Cloudinary URL |
| images | text[] | gallery images |
| tags | text[] | |
| client | text | |
| year | varchar(4) | |
| featured | boolean | show on homepage |
| order | integer | display order |
| created_at | timestamp | |
| updated_at | timestamp | |

### `messages`
| Column | Type | Notes |
|---|---|---|
| id | serial PK | |
| name | text | |
| email | text | |
| subject | text | |
| message | text | |
| read | boolean | default false |
| created_at | timestamp | |

### `reviews`
| Column | Type | Notes |
|---|---|---|
| id | serial PK | |
| name | text | |
| role | text | |
| company | text | |
| avatar | text | Cloudinary URL |
| rating | integer | 1–5 |
| content | text | |
| featured | boolean | |
| created_at | timestamp | |

---

## API Routes

| Method | Path | Auth | Description |
|---|---|---|---|
| POST | /api/contact | none | Submit contact form |
| POST | /api/admin/login | none | Set admin cookie |
| POST | /api/admin/logout | cookie | Clear admin cookie |
| GET | /api/admin/projects | cookie | List all projects |
| POST | /api/admin/projects | cookie | Create project |
| PUT | /api/admin/projects | cookie | Update project |
| DELETE | /api/admin/projects?id= | cookie | Delete project |
| GET | /api/admin/messages | cookie | List all messages |
| PUT | /api/admin/messages | cookie | Mark read/unread |
| DELETE | /api/admin/messages?id= | cookie | Delete message |

---

## Env Vars

| Var | Required | Description |
|---|---|---|
| DATABASE_URL | ✅ | Neon pooled connection |
| DATABASE_URL_UNPOOLED | ✅ | Neon direct (drizzle-kit migrations) |
| ADMIN_PASSWORD | ✅ | Admin dashboard password |
| NEXT_PUBLIC_APP_URL | ✅ | App URL |
| RESEND_API_KEY | optional | Contact form email notifications |
| NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME | optional | Image uploads |
| CLOUDINARY_API_KEY | optional | Image uploads |
| CLOUDINARY_API_SECRET | optional | Image uploads |

---

## Timeline

| Phase | Status | Tasks |
|---|---|---|
| Phase 1 — Public Site | ✅ | Homepage, Work, About, Contact, Footer, Navbar |
| Phase 2 — Admin Auth | ✅ | Login page, middleware guard, cookie auth |
| Phase 3 — Admin Dashboard | ✅ | Overview, Projects CRUD, Messages, Content |
| Phase 4 — DB & APIs | ✅ | Schema, all CRUD routes |
| Phase 5 — Deploy | ⏳ | Set env vars in Vercel, push schema to Neon |
| Phase 6 — Enhancements | ⏳ | Cloudinary uploads, reviews, OG images, work/[slug] page |

---

## Next Steps

1. Set `DATABASE_URL`, `DATABASE_URL_UNPOOLED`, `ADMIN_PASSWORD`, `NEXT_PUBLIC_APP_URL` in Vercel
2. Run `npx drizzle-kit push` to create tables in Neon
3. Add `RESEND_API_KEY` to Vercel for contact form emails
4. Build `app/work/[slug]/page.tsx` — individual case study page
5. Add Cloudinary upload to admin projects form
6. Add reviews CRUD in admin dashboard
