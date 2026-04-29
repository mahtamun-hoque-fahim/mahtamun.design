import type { Metadata } from 'next'
import { Syne, Onest, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['400', '500', '600', '700', '800'],
})

const onest = Onest({
  subsets: ['latin'],
  variable: '--font-onest',
  weight: ['300', '400', '500', '600'],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500'],
})

export const metadata: Metadata = {
  title: { default: 'MAHTAMUN — Graphic Designer & UI/UX', template: '%s | MAHTAMUN' },
  description: 'Graphic designer, UI/UX designer & full-stack developer crafting brand identities, digital products, and visual experiences.',
  keywords: ['graphic designer', 'ui ux designer', 'brand identity', 'logo design', 'bangladesh'],
  authors: [{ name: 'Mahtamun Hoque Fahim' }],
  openGraph: {
    title: 'MAHTAMUN — Graphic Designer & UI/UX',
    description: 'Crafting brand identities, digital products, and visual experiences.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: { card: 'summary_large_image' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${syne.variable} ${onest.variable} ${jetbrainsMono.variable} bg-bg text-[#e8e8e8] antialiased`}>
        {children}
      </body>
    </html>
  )
}
