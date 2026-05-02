import type { Metadata } from 'next'
import ContactForm from '@/components/sections/ContactForm'
import { Mail, MapPin, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch to start a design project with Mahtamun Hoque Fahim.',
}

const info = [
  { Icon: Mail, label: 'Email', value: 'mahtamunhoquefahim@pm.me', href: 'mailto:mahtamunhoquefahim@pm.me' },
  { Icon: MapPin, label: 'Location', value: 'Bangladesh · Remote worldwide', href: null },
  { Icon: Clock, label: 'Response', value: 'Within 24 hours', href: null },
]

export default function ContactPage() {
  return (
    <div className="pt-32 pb-28">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Left info */}
          <div className="lg:col-span-2 flex flex-col gap-10">
            <div>
              <p className="section-label mb-5">Get In Touch</p>
              <h1
                className="font-display font-semibold mb-5"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
              >
                Let&apos;s Build Something Great.
              </h1>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--col-text-2)' }}>
                Whether you have a project in mind or just want to say hello, I&apos;d love to hear
                from you. Fill out the form and I&apos;ll get back to you within 24 hours.
              </p>
            </div>

            {/* Contact info */}
            <div className="flex flex-col gap-5">
              {info.map(({ Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4">
                  <div
                    className="w-9 h-9 rounded-sm flex items-center justify-center flex-shrink-0"
                    style={{ background: 'var(--col-accent-dim)', border: '1px solid rgba(200,255,0,0.15)' }}
                  >
                    <Icon size={15} style={{ color: 'var(--col-accent)' }} />
                  </div>
                  <div>
                    <p className="admin-label">{label}</p>
                    {href ? (
                      <a href={href} className="text-sm transition-colors hover:underline" style={{ color: 'var(--col-text)' }}>
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm" style={{ color: 'var(--col-text)' }}>{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Availability badge */}
            <div
              className="rounded-sm p-5"
              style={{ background: 'var(--col-accent-dim)', border: '1px solid rgba(200,255,0,0.2)' }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: 'var(--col-accent)', animation: 'pulseDot 2s ease-in-out infinite' }}
                />
                <p className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--col-accent)' }}>
                  Available Now
                </p>
              </div>
              <p className="text-sm" style={{ color: 'var(--col-text-2)' }}>
                Currently accepting new projects. Typical start: within 1–2 weeks.
              </p>
            </div>
          </div>

          {/* Right form */}
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  )
}
