import {
  pgTable, serial, text, timestamp, boolean, integer, json,
} from 'drizzle-orm/pg-core'

export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  category: text('category').notNull().default('branding'),
  description: text('description'),
  content: text('content'),
  coverImage: text('cover_image'),
  images: json('images').$type<string[]>().default([]),
  client: text('client'),
  year: integer('year'),
  tags: json('tags').$type<string[]>().default([]),
  featured: boolean('featured').default(false),
  published: boolean('published').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const messages = pgTable('messages', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  subject: text('subject'),
  message: text('message').notNull(),
  budget: text('budget'),
  service: text('service'),
  read: boolean('read').default(false),
  createdAt: timestamp('created_at').defaultNow(),
})

export const siteContent = pgTable('site_content', {
  id: serial('id').primaryKey(),
  key: text('key').notNull().unique(),
  value: text('value').notNull(),
  type: text('type').default('text'),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const testimonials = pgTable('testimonials', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  role: text('role'),
  company: text('company'),
  avatar: text('avatar'),
  content: text('content').notNull(),
  rating: integer('rating').default(5),
  published: boolean('published').default(true),
  createdAt: timestamp('created_at').defaultNow(),
})

export type Project = typeof projects.$inferSelect
export type NewProject = typeof projects.$inferInsert
export type Message = typeof messages.$inferSelect
export type SiteContent = typeof siteContent.$inferSelect
export type Testimonial = typeof testimonials.$inferSelect
