import {
  pgTable, serial, text, timestamp, integer, boolean, varchar,
} from 'drizzle-orm/pg-core'

export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  category: text('category').notNull().default('branding'),
  description: text('description').notNull(),
  longDescription: text('long_description'),
  coverImage: text('cover_image'),
  images: text('images').array(),
  tags: text('tags').array(),
  client: text('client'),
  year: varchar('year', { length: 4 }),
  featured: boolean('featured').default(false),
  order: integer('order').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const messages = pgTable('messages', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  subject: text('subject'),
  message: text('message').notNull(),
  read: boolean('read').default(false),
  createdAt: timestamp('created_at').defaultNow(),
})

export const reviews = pgTable('reviews', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  role: text('role'),
  company: text('company'),
  avatar: text('avatar'),
  rating: integer('rating').default(5),
  content: text('content').notNull(),
  featured: boolean('featured').default(false),
  createdAt: timestamp('created_at').defaultNow(),
})

export type Project = typeof projects.$inferSelect
export type NewProject = typeof projects.$inferInsert
export type Message = typeof messages.$inferSelect
export type Review = typeof reviews.$inferSelect
