import type { Session, User } from '@supabase/supabase-js'
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { isSupabaseConfigured, supabase } from '../lib/supabase'

interface AuthContextValue {
  user: User | null
  session: Session | null
  loading: boolean
  configured: boolean
  authError: string
  signUp: (email: string, password: string, displayName: string) => Promise<string | null>
  signIn: (email: string, password: string) => Promise<string | null>
  signInWithGoogle: () => Promise<string | null>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

function safeAuthMessage(message?: string) {
  const normalized = message?.toLowerCase() ?? ''
  if (normalized.includes('invalid login credentials')) return 'The email or password was not accepted.'
  if (normalized.includes('email not confirmed')) return 'Confirm your email before signing in.'
  if (normalized.includes('already registered')) return 'An account already exists for this email.'
  if (normalized.includes('rate limit') || normalized.includes('too many')) return 'Too many attempts. Wait a few minutes and try again.'
  if (normalized.includes('password')) return 'The password does not meet the account requirements.'
  return 'Account services could not complete the request. Try again later.'
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [authError, setAuthError] = useState('')

  useEffect(() => {
    if (!supabase) {
      setLoading(false)
      return
    }

    void supabase.auth.getSession().then(({ data, error }) => {
      if (error) setAuthError('Your account session could not be restored. Sign in again if needed.')
      setSession(data.session)
      setLoading(false)
    }).catch(() => {
      setAuthError('Account services are temporarily unavailable. Local learning remains available.')
      setLoading(false)
    })

    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession)
      setAuthError('')
      setLoading(false)
    })

    return () => data.subscription.unsubscribe()
  }, [])

  const value = useMemo<AuthContextValue>(() => ({
    user: session?.user ?? null,
    session,
    loading,
    configured: isSupabaseConfigured,
    authError,
    async signUp(email, password, displayName) {
      if (!supabase) return 'Account services have not been configured yet.'
      try {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: displayName.trim() },
            emailRedirectTo: `${window.location.origin}/dashboard`,
          },
        })
        return error ? safeAuthMessage(error.message) : null
      } catch {
        return safeAuthMessage()
      }
    },
    async signIn(email, password) {
      if (!supabase) return 'Account services have not been configured yet.'
      try {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        return error ? safeAuthMessage(error.message) : null
      } catch {
        return safeAuthMessage()
      }
    },
    async signInWithGoogle() {
      if (!supabase) return 'Account services have not been configured yet.'
      try {
        const { error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: { redirectTo: `${window.location.origin}/dashboard` },
        })
        return error ? safeAuthMessage(error.message) : null
      } catch {
        return safeAuthMessage()
      }
    },
    async signOut() {
      if (!supabase) return
      try {
        await supabase.auth.signOut()
      } catch {
        setAuthError('Sign-out could not be confirmed. Reload before using a shared device.')
      }
    },
  }), [authError, loading, session])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const value = useContext(AuthContext)
  if (!value) throw new Error('useAuth must be used inside AuthProvider')
  return value
}
