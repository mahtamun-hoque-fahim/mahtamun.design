'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock, Eye, EyeOff, AlertCircle } from 'lucide-react'

export default function AdminLogin() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (res.ok) {
        router.push('/admin')
        router.refresh()
      } else {
        setError('Invalid password. Please try again.')
      }
    } catch {
      setError('Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="mb-10 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-accent/30 bg-accent/5">
            <Lock size={28} className="text-accent" />
          </div>
          <h1 className="font-syne font-bold text-3xl">Admin Access</h1>
          <p className="mt-2 font-onest text-sm text-muted">MAHTAMUN.design Dashboard</p>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block font-mono text-xs text-muted mb-2">Password</label>
              <div className="relative">
                <input
                  type={show ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full rounded-xl border border-border bg-surface-2 px-4 py-3 pr-12 font-onest text-sm text-white placeholder:text-muted focus:border-accent focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-white transition-colors"
                >
                  {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-400 font-onest text-sm">
                <AlertCircle size={15} /> {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-accent py-3.5 font-onest font-medium text-bg transition-all hover:bg-accent/90 disabled:opacity-60"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center font-onest text-xs text-muted">
          Protected admin area — not for public access.
        </p>
      </div>
    </div>
  )
}
