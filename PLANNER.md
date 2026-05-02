# PLANNER — mahtamun.design

> Graphic designer portfolio + admin dashboard

---

## Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 15 (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS 3 |
| Database | Neon PostgreSQL (serverless) |
| ORM | Drizzle ORM (neon-http driver) |
| Auth | Custom cookie — password + httpOnly token |
| Email | Resend |
| Images | Cloudinary (external URL, no SDK) |
| Deploy | Vercel |

---

## Routes

### Public
| Route | Description |
|-------|-------------|
| `/` | Homepage — hero, services, work preview, process, testimonials |
| `/work` | All published projects with category filter |
| `/work/[slug]` | Project case study page |
| `/about` | About page |
| `/contact` | Contact form page |

### API
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/contact` | Save message + send Resend email |
| POST | `/api/admin/login` | Set admin cookie |
| POST | `/api/admin/logout` | Clear admin cookie |
| GET/POST | `/api/admin/projects` | List / create projects |
| GET/PATCH/DELETE | `/api/admin/projects/[id]` | Single project CRUD |
| GET | `/api/admin/messages` | List all messages |
| PATCH/DELETE | `/api/admin/messages/[id]` | Mark read / delete |
| GET/POST | `/api/admin/testimonials` | List / create testimonials |
| PATCH/DELETE | `/api/admin/testimonials/[id]` | Toggle publish / delete |
| GET/POST | `/api/admin/content` | Get / upsert site content keys |

### Admin (protected by middleware)
| Route | Description |
|-------|-------------|
| `/admin` | Dashboard overview — stats, recent messages |
| `/admin/login` | Login page |
| `/admin/projects` | Project list table |
| `/admin/projects/new` | Create project form |
| `/admin/projects/[id]` | Edit project form |
| `/admin/messages` | Messages inbox |
| `/admin/testimonials` | Testimonials list + add form |
| `/admin/content` | Site content CMS (key-value) |

---

## Database Schema

### `projects`
title, slug (unique), category, description, content, coverImage, images (json), client, year, tags (json), featured, published, createdAt, updatedAt

### `messages`
name, email, subject, message, budget, service, read, createdAt

### `site_content`
key (unique), value, type, updatedAt

### `testimonials`
name, role, company, avatar, content, rating, published, createdAt

---

## Environment Variables

```
DATABASE_URL              — Neon pooled connection string
DATABASE_URL_UNPOOLED     — For drizzle-kit migrations
ADMIN_PASSWORD            — Admin login password
ADMIN_SECRET              — Cookie token value
RESEND_API_KEY            — Resend API key
CONTACT_EMAIL             — Where to forward contact messages
```

---

## Deployment Checklist

- [ ] Push schema: `pnpm db:push`
- [ ] Set all env vars in Vercel
- [ ] Verify Resend domain (mahtamun.design)
- [ ] Add `*.vercel.app` to Cloudinary allowed origins (if used)
- [ ] Test contact form end-to-end
- [ ] Test admin login / logout
- [ ] Add first projects from admin

---

## Next Steps / Future

- [ ] Cloudinary upload widget in project form (direct upload)
- [ ] OG image generation per project page
- [ ] Analytics dashboard (simple page view counter)
- [ ] Project ordering / drag-and-drop in admin
- [ ] LinkedIn profile import
