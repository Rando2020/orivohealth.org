import type { Session, User } from '@supabase/supabase-js'
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { isSupabaseConfigured, supabase } from '../lib/supabase'

interface AuthContextValue {
  user: User | null
  session: Session | null
  loading: boolean
  configured: boolean
  signUp: (email: string, password: string, displayName: string) => Promise<string | null>
  signIn: (email: string, password: string) => Promise<string | null>
  signInWithGoogle: () => Promise<string | null>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!supabase) {
      setLoading(false)
      return
    }

    void supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setLoading(false)
    })

    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession)
      setLoading(false)
    })

    return () => data.subscription.unsubscribe()
  }, [])

  const value = useMemo<AuthContextValue>(() => ({
    user: session?.user ?? null,
    session,
    loading,
    configured: isSupabaseConfigured,
    async signUp(email, password, displayName) {
      if (!supabase) return 'Account services have not been configured yet.'
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: displayName },
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      })
      return error?.message ?? null
    },
    async signIn(email, password) {
      if (!supabase) return 'Account services have not been configured yet.'
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      return error?.message ?? null
    },
    async signInWithGoogle() {
      if (!supabase) return 'Account services have not been configured yet.'
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: `${window.location.origin}/dashboard` },
      })
      return error?.message ?? null
    },
    async signOut() {
      if (supabase) await supabase.auth.signOut()
    },
  }), [loading, session])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const value = useContext(AuthContext)
  if (!value) throw new Error('useAuth must be used inside AuthProvider')
  return value
}
