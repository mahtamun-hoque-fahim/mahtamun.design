import { Layers, Monitor, Palette, BarChart2, PenTool, Globe } from 'lucide-react'

const services = [
  {
    icon: Palette,
    title: 'Brand Identity',
    desc: 'Complete brand systems — logo, typography, color palette, brand guidelines, and all visual touchpoints.',
  },
  {
    icon: Monitor,
    title: 'UI/UX Design',
    desc: 'User-centered digital interfaces for web and mobile. From wireframes to pixel-perfect Figma designs.',
  },
  {
    icon: PenTool,
    title: 'Logo Design',
    desc: 'Memorable, versatile logos that communicate your brand essence and stand out in the market.',
  },
  {
    icon: BarChart2,
    title: 'Social Media',
    desc: 'Scroll-stopping content design — posts, stories, ads, and templates that build brand presence.',
  },
  {
    icon: Layers,
    title: 'Print Design',
    desc: 'Business cards, brochures, packaging, and all print collateral crafted with precision.',
  },
  {
    icon: Globe,
    title: 'Web Development',
    desc: 'Full-stack web builds with Next.js — fast, accessible, and beautifully designed.',
  },
]

export default function Services() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 max-w-xl">
          <span className="font-mono text-xs text-accent uppercase tracking-widest">What I Do</span>
          <h2 className="mt-3 font-syne font-bold text-4xl md:text-5xl">
            Services Built for<br />
            <span className="text-gradient">Real Impact</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s, i) => (
            <div
              key={s.title}
              className="group rounded-2xl border border-border bg-surface p-6 transition-all hover:border-accent/40 hover:bg-surface-2"
            >
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-surface-2 text-accent transition-all group-hover:border-accent/40 group-hover:bg-accent/10">
                <s.icon size={22} />
              </div>
              <h3 className="font-syne font-semibold text-lg mb-2">{s.title}</h3>
              <p className="font-onest text-sm text-muted leading-relaxed">{s.desc}</p>
              <div className="mt-4 font-mono text-xs text-accent/50 group-hover:text-accent transition-colors">
                0{i + 1} —
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
