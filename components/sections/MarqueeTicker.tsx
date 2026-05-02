const ITEMS = [
  'Brand Identity',
  'Logo Design',
  'UI/UX Design',
  'Social Media',
  'Print Design',
  'Web Design',
  'Typography',
  'Motion Graphics',
  'Packaging',
  'Illustration',
]

export default function MarqueeTicker() {
  const doubled = [...ITEMS, ...ITEMS]

  return (
    <div
      className="py-5 overflow-hidden relative"
      style={{ borderTop: '1px solid var(--col-border)', borderBottom: '1px solid var(--col-border)' }}
    >
      {/* Gradient masks */}
      <div
        className="absolute left-0 inset-y-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, var(--col-bg), transparent)' }}
      />
      <div
        className="absolute right-0 inset-y-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, var(--col-bg), transparent)' }}
      />

      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-5 mx-5">
            <span
              className="font-display italic text-lg font-light"
              style={{ color: 'var(--col-text-2)' }}
            >
              {item}
            </span>
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ background: 'var(--col-accent)' }}
            />
          </span>
        ))}
      </div>
    </div>
  )
}
