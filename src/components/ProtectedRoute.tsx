import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading, configured } = useAuth()
  const location = useLocation()

  if (loading) return <div className="route-loading">Loading your learner profile…</div>
  if (configured && !user) return <Navigate to="/account" replace state={{ from: location.pathname }} />
  return children
}
