import { LockKeyhole, Mail, UserRound } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function AuthPage() {
  const { user, configured, signIn, signUp, signInWithGoogle } = useAuth()
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [busy, setBusy] = useState(false)
  const location = useLocation()
  const from = (location.state as { from?: string } | null)?.from ?? '/dashboard'

  if (user) return <Navigate to={from} replace />

  async function submit(event: FormEvent) {
    event.preventDefault()
    setBusy(true)
    setMessage('')
    const error = mode === 'signin'
      ? await signIn(email, password)
      : await signUp(email, password, name)
    setBusy(false)
    setMessage(error ?? (mode === 'signup' ? 'Check your email to confirm the account.' : 'Signed in.'))
  }

  return (
    <section className="auth-page">
      <div className="auth-shell">
        <div className="auth-copy">
          <span className="eyebrow">Learner account</span>
          <h1>Save progress, quiz attempts, and course completion.</h1>
          <p>Course previews remain public. A free account keeps your work synchronized across devices once Supabase is configured.</p>
          <Link className="text-link" to="/courses">Browse courses without signing in</Link>
        </div>
        <div className="auth-card">
          <div className="auth-tabs">
            <button className={mode === 'signin' ? 'active' : ''} onClick={() => setMode('signin')} type="button">Sign in</button>
            <button className={mode === 'signup' ? 'active' : ''} onClick={() => setMode('signup')} type="button">Create account</button>
          </div>
          {!configured && (
            <div className="setup-notice">
              <strong>Account setup pending</strong>
              <p>Add the Supabase project URL and publishable key to enable account creation. Course content remains available in local demo mode.</p>
            </div>
          )}
          <form onSubmit={submit}>
            {mode === 'signup' && (
              <label><span>Name</span><div><UserRound size={18} /><input required value={name} onChange={(event) => setName(event.target.value)} /></div></label>
            )}
            <label><span>Email</span><div><Mail size={18} /><input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} /></div></label>
            <label><span>Password</span><div><LockKeyhole size={18} /><input required minLength={8} type="password" value={password} onChange={(event) => setPassword(event.target.value)} /></div></label>
            <button className="button primary" disabled={busy || !configured} type="submit">{busy ? 'Working…' : mode === 'signin' ? 'Sign in' : 'Create free account'}</button>
          </form>
          <div className="auth-divider"><span>or</span></div>
          <button className="button secondary google-button" disabled={!configured} type="button" onClick={() => void signInWithGoogle()}>Continue with Google</button>
          {message && <p className="auth-message">{message}</p>}
        </div>
      </div>
    </section>
  )
}
