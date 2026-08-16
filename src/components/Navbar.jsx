import { NavLink } from 'react-router-dom'
import { Leaf, House, ScanLine, Users } from 'lucide-react'

const links = [
  { to: '/', label: 'Home', icon: House },
  { to: '/detect', label: 'Detect', icon: ScanLine },
  { to: '/about', label: 'About', icon: Users },
]

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-inner glass">
        <div className="navbar-brand">
          <Leaf size={18} strokeWidth={2.2} />
          <span>Smart Plants</span>
        </div>
        <div className="navbar-links">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                'navbar-link' + (isActive ? ' navbar-link-active' : '')
              }
            >
              <Icon size={16} strokeWidth={2.2} />
              <span>{label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  )
}
