import { LogOut, Menu, UserRound, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Brand } from './Brand'

const navItems = [
  { to: '/paths', label: 'Learning paths' },
  { to: '/courses', label: 'Courses' },
  { to: '/capstones', label: 'Capstones' },
  { to: '/interview-lab', label: 'Interview lab' },
  { to: '/dashboard', label: 'My progress' },
]

export function Layout() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const { user, signOut } = useAuth()

  useEffect(() => {
    setOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="container header-inner">
          <Brand />
          <nav className={open ? 'site-nav open' : 'site-nav'} aria-label="Primary navigation">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to}>{item.label}</NavLink>
            ))}
            {user ? (
              <button className="nav-account-button" type="button" onClick={() => void signOut()} title="Sign out">
                <UserRound size={16} />
                <span>{user.user_metadata?.full_name ?? user.email?.split('@')[0] ?? 'Learner'}</span>
                <LogOut size={14} />
              </button>
            ) : (
              <NavLink className="nav-account-button" to="/account"><UserRound size={16} /> Sign in</NavLink>
            )}
            <NavLink className="nav-cta" to="/courses/apis-webhooks-integration">Start with APIs</NavLink>
          </nav>
          <button
            className="menu-button"
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? 'Close navigation' : 'Open navigation'}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>
      <main><Outlet /></main>
      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <Brand />
            <p>Practical technical fluency for healthcare product, implementation, analytics, and governance leaders.</p>
          </div>
          <div>
            <strong>Build proof, not buzzwords.</strong>
            <p>Every production course includes instruction, visuals, labs, randomized assessments, and portfolio evidence.</p>
          </div>
          <div>
            <strong>Curriculum status</strong>
            <p>Standards and vendor resources are credited at lesson level. Public exercises use synthetic data only.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
