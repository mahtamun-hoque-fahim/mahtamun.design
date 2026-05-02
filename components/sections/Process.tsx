const steps = [
  {
    n: '01',
    title: 'Discover',
    desc: 'We start with a deep dive into your brand, goals, target audience and competitive landscape. No assumptions—only clarity.',
  },
  {
    n: '02',
    title: 'Design',
    desc: 'I craft multiple visual directions rooted in strategy. Every decision has a reason, every element serves your brand.',
  },
  {
    n: '03',
    title: 'Refine',
    desc: 'Your feedback shapes the work. We iterate until every detail is exactly right—pixel-perfect and purpose-driven.',
  },
  {
    n: '04',
    title: 'Deliver',
    desc: 'Final files in every format you need, with documentation to ensure you can use your new assets with confidence.',
  },
]

export default function Process() {
  return (
    <section className="py-28" style={{ background: 'var(--col-surface)' }}>
      <div className="container">
        <div className="mb-16">
          <p className="section-label mb-4">Process</p>
          <h2
            className="font-display font-semibold"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
          >
            How I Work
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: 'var(--col-border)' }}>
          {steps.map((s, i) => (
            <div
              key={s.n}
              className="p-8 flex flex-col gap-6"
              style={{ background: 'var(--col-surface)' }}
            >
              <div className="flex items-center justify-between">
                <span
                  className="font-display font-light"
                  style={{ fontSize: '4rem', lineHeight: 1, color: 'var(--col-border-2)' }}
                >
                  {s.n}
                </span>
                <div
                  className="w-6 h-px"
                  style={{ background: i < steps.length - 1 ? 'var(--col-accent)' : 'transparent' }}
                />
              </div>
              <div>
                <h3
                  className="font-display text-2xl font-semibold mb-3"
                  style={{ color: 'var(--col-text)' }}
                >
                  {s.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--col-text-2)' }}>
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
