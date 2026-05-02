'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, LogIn } from 'lucide-react'

export default function AdminLoginPage() {
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    if (res.ok) {
      router.push('/admin')
    } else {
      setStatus('error')
      setPassword('')
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: 'var(--col-bg)' }}
    >
      <div className="w-full max-w-sm px-6">
        {/* Logo */}
        <div className="text-center mb-10">
          <p className="font-display text-2xl font-semibold tracking-tight mb-1">
            MAHTAMUN<span style={{ color: 'var(--col-accent)' }}>.design</span>
          </p>
          <p className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--col-text-3)' }}>
            Admin Panel
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-sm p-8 flex flex-col gap-5"
          style={{ background: 'var(--col-surface)', border: '1px solid var(--col-border)' }}
        >
          <div>
            <label className="admin-label" htmlFor="password">Password</label>
            <div className="relative">
              <input
                id="password"
                type={show ? 'text' : 'password'}
                className="admin-input pr-10"
                placeholder="Enter admin password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShow(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
                style={{ color: 'var(--col-text-3)' }}
              >
                {show ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {status === 'error' && (
            <p className="text-xs text-red-400">Incorrect password. Try again.</p>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="btn btn-accent w-full justify-center"
          >
            {status === 'loading' ? (
              <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            ) : (
              <>Sign In <LogIn size={14} /></>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
