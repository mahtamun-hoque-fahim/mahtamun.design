import type { Metadata } from 'next'
import { Cormorant, Outfit, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-outfit',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'MAHTAMUN — Graphic Designer & Creative Director',
    template: '%s | MAHTAMUN',
  },
  description:
    'Graphic designer and creative director specialising in brand identity, UI/UX and visual storytelling that converts browsers into believers.',
  keywords: ['graphic designer', 'brand identity', 'logo design', 'UI/UX', 'Bangladesh'],
  authors: [{ name: 'Mahtamun Hoque Fahim' }],
  openGraph: {
    title: 'MAHTAMUN — Graphic Designer & Creative Director',
    description:
      'Brand identity, UI/UX and graphic design that makes your business unforgettable.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MAHTAMUN — Graphic Designer',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${outfit.variable} ${jetbrains.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
