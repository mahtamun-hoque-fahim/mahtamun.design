'use client'
import { useState } from 'react'
import { Save, Check } from 'lucide-react'

interface Field {
  key: string
  value: string
  type: string
  label: string
}

export default function ContentEditor({ fields }: { fields: Field[] }) {
  const [values, setValues] = useState<Record<string, string>>(
    Object.fromEntries(fields.map(f => [f.key, f.value]))
  )
  const [saving, setSaving] = useState<Record<string, boolean>>({})
  const [saved, setSaved] = useState<Record<string, boolean>>({})

  const save = async (key: string, type: string) => {
    setSaving(s => ({ ...s, [key]: true }))
    await fetch('/api/admin/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, value: values[key], type }),
    })
    setSaving(s => ({ ...s, [key]: false }))
    setSaved(s => ({ ...s, [key]: true }))
    setTimeout(() => setSaved(s => ({ ...s, [key]: false })), 2000)
  }

  return (
    <div className="flex flex-col gap-5 max-w-2xl">
      {fields.map(f => (
        <div
          key={f.key}
          className="rounded-sm p-5"
          style={{ background: 'var(--col-surface)', border: '1px solid var(--col-border)' }}
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <label className="admin-label">{f.label}</label>
              <p className="font-mono text-xs" style={{ color: 'var(--col-text-3)' }}>{f.key}</p>
            </div>
            <button
              onClick={() => save(f.key, f.type)}
              disabled={saving[f.key]}
              className="btn text-xs flex-shrink-0"
              style={{
                background: saved[f.key] ? 'var(--col-accent-dim)' : 'var(--col-surface-2)',
                color: saved[f.key] ? 'var(--col-accent)' : 'var(--col-text-2)',
                border: `1px solid ${saved[f.key] ? 'rgba(200,255,0,0.3)' : 'var(--col-border)'}`,
              }}
            >
              {saving[f.key] ? (
                <span className="w-3.5 h-3.5 border-2 border-current/30 border-t-current rounded-full animate-spin" />
              ) : saved[f.key] ? (
                <><Check size={12} /> Saved</>
              ) : (
                <><Save size={12} /> Save</>
              )}
            </button>
          </div>

          {f.type === 'textarea' ? (
            <textarea
              className="admin-input resize-none"
              rows={4}
              value={values[f.key] ?? ''}
              onChange={e => setValues(v => ({ ...v, [f.key]: e.target.value }))}
            />
          ) : (
            <input
              className="admin-input"
              value={values[f.key] ?? ''}
              onChange={e => setValues(v => ({ ...v, [f.key]: e.target.value }))}
            />
          )}
        </div>
      ))}
    </div>
  )
}
