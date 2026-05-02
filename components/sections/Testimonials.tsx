import { Star } from 'lucide-react'
import type { Testimonial } from '@/lib/db/schema'

interface TestimonialsProps {
  testimonials: Testimonial[]
}

const FALLBACK: Partial<Testimonial>[] = [
  {
    id: -1,
    name: 'Sarah Mitchell',
    role: 'CEO',
    company: 'Luminary Studio',
    content: 'Mahtamun completely transformed our brand. The new identity is stunning and our clients constantly ask who designed our materials.',
    rating: 5,
  },
  {
    id: -2,
    name: 'Ahmed Al-Rashid',
    role: 'Founder',
    company: 'TechBridge ME',
    content: 'Fast, professional, and incredibly talented. The UI design he delivered exceeded every expectation. Will absolutely work together again.',
    rating: 5,
  },
  {
    id: -3,
    name: 'Priya Sharma',
    role: 'Marketing Director',
    company: 'EcoVista',
    content: 'Our social media engagement doubled within a month of using the new design templates. The strategy behind the visuals is brilliant.',
    rating: 5,
  },
]

export default function Testimonials({ testimonials }: TestimonialsProps) {
  const display = testimonials.length > 0 ? testimonials : FALLBACK

  return (
    <section className="py-28">
      <div className="container">
        <div className="mb-14">
          <p className="section-label mb-4">Social Proof</p>
          <h2
            className="font-display font-semibold"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
          >
            Client Love
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {display.map((t, i) => (
            <div
              key={t.id ?? i}
              className="p-7 rounded-sm flex flex-col gap-5"
              style={{
                background: 'var(--col-surface)',
                border: '1px solid var(--col-border)',
              }}
            >
              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: t.rating ?? 5 }).map((_, j) => (
                  <Star
                    key={j}
                    size={13}
                    fill="var(--col-accent)"
                    style={{ color: 'var(--col-accent)' }}
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--col-text-2)' }}>
                &ldquo;{t.content}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-3" style={{ borderTop: '1px solid var(--col-border)' }}>
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center font-display font-semibold text-sm flex-shrink-0"
                  style={{ background: 'var(--col-accent)', color: 'var(--col-accent-fg)' }}
                >
                  {t.name?.[0]}
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: 'var(--col-text)' }}>
                    {t.name}
                  </p>
                  <p className="font-mono text-xs" style={{ color: 'var(--col-text-3)' }}>
                    {t.role}{t.company ? ` · ${t.company}` : ''}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
