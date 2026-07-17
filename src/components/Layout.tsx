import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
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
              <NavLink key={item.to} to={item.to}>
                {item.label}
              </NavLink>
            ))}
            <NavLink className="nav-cta" to="/courses/apis-webhooks-integration">
              Start with APIs
            </NavLink>
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
      <main>
        <Outlet />
      </main>
      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <Brand />
            <p>
              Practical technical fluency for healthcare product, implementation, analytics, and governance leaders.
            </p>
          </div>
          <div>
            <strong>Build proof, not buzzwords.</strong>
            <p>Every course ends with a portfolio artifact and an interview translation.</p>
          </div>
          <div>
            <strong>Curriculum status</strong>
            <p>Standards and vendor resources reviewed for 2026. External links open official documentation.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
