import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function formatRelativeDate(date: Date | string): string {
  const now = new Date()
  const d = new Date(date)
  const diff = Math.floor((now.getTime() - d.getTime()) / 1000)
  if (diff < 60) return 'just now'
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}

export const CATEGORIES = [
  { value: 'branding', label: 'Branding' },
  { value: 'logo', label: 'Logo Design' },
  { value: 'ui-ux', label: 'UI/UX' },
  { value: 'social', label: 'Social Media' },
  { value: 'print', label: 'Print' },
  { value: 'web', label: 'Web Design' },
]

export const BUDGETS = [
  { value: 'under-500', label: 'Under $500' },
  { value: '500-1000', label: '$500 – $1,000' },
  { value: '1000-5000', label: '$1,000 – $5,000' },
  { value: '5000-plus', label: '$5,000+' },
]

export const SERVICES = [
  { value: 'brand-identity', label: 'Brand Identity' },
  { value: 'logo-design', label: 'Logo Design' },
  { value: 'ui-ux', label: 'UI/UX Design' },
  { value: 'social-media', label: 'Social Media Design' },
  { value: 'print-design', label: 'Print Design' },
  { value: 'web-design', label: 'Web Design' },
  { value: 'other', label: 'Other' },
]
