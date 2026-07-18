import { LockKeyhole, Mail, UserRound } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function AuthPage() {
  const { user, configured, authError, signIn, signUp, signInWithGoogle } = useAuth()
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
    const error = mode === 'signin' ? await signIn(email.trim(), password) : await signUp(email.trim(), password, name)
    setBusy(false)
    setMessage(error ?? (mode === 'signup' ? 'Check your email to confirm the account.' : 'Signed in.'))
  }

  async function googleSignIn() {
    setBusy(true)
    setMessage('')
    const error = await signInWithGoogle()
    if (error) setMessage(error)
    setBusy(false)
  }

  const visibleMessage = message || authError
  const isError = Boolean(visibleMessage && !visibleMessage.startsWith('Check your email') && visibleMessage !== 'Signed in.')

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
          <div className="auth-tabs" role="tablist" aria-label="Account action">
            <button role="tab" aria-selected={mode === 'signin'} className={mode === 'signin' ? 'active' : ''} onClick={() => { setMode('signin'); setMessage('') }} type="button">Sign in</button>
            <button role="tab" aria-selected={mode === 'signup'} className={mode === 'signup' ? 'active' : ''} onClick={() => { setMode('signup'); setMessage('') }} type="button">Create account</button>
          </div>
          {!configured && <div className="setup-notice" role="status"><strong>Account setup pending</strong><p>Account creation is unavailable until the Supabase project URL and publishable key are configured. Courses, local progress, and quizzes remain available on this device.</p></div>}
          <form onSubmit={submit} aria-describedby={visibleMessage ? 'auth-message' : undefined}>
            {mode === 'signup' && <label htmlFor="display-name"><span>Name</span><div><UserRound size={18} aria-hidden="true" /><input id="display-name" autoComplete="name" required value={name} onChange={(event) => setName(event.target.value)} /></div></label>}
            <label htmlFor="email"><span>Email</span><div><Mail size={18} aria-hidden="true" /><input id="email" required type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} /></div></label>
            <label htmlFor="password"><span>Password</span><div><LockKeyhole size={18} aria-hidden="true" /><input id="password" required minLength={8} type="password" autoComplete={mode === 'signin' ? 'current-password' : 'new-password'} value={password} onChange={(event) => setPassword(event.target.value)} /></div></label>
            <button className="button primary" disabled={busy || !configured} type="submit">{busy ? 'Working…' : mode === 'signin' ? 'Sign in' : 'Create free account'}</button>
          </form>
          <div className="auth-divider"><span>or</span></div>
          <button className="button secondary google-button" disabled={busy || !configured} type="button" onClick={() => void googleSignIn()}>Continue with Google</button>
          {visibleMessage && <p id="auth-message" className={isError ? 'status-message error' : 'status-message success'} role={isError ? 'alert' : 'status'} aria-live="polite">{visibleMessage}</p>}
        </div>
      </div>
    </section>
  )
}
