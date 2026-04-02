import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function Navbar() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user') || 'null')
  const [menuOpen, setMenuOpen] = useState(false)

  function handleLogout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
    setMenuOpen(false)
  }
const links = [
    { to: '/', label: 'Dance Forms' },
    { to: '/about', label: 'About Us' },
    { to: '/bookmarks', label: '❤️ Saved' },
    { to: '/mudras', label: '🤲 Mudras' },
    { to: '/booking', label: '🗓️ Book Class' },
  ]
  return (
    <>
      <style>{`
        .navbar { background: white; border-bottom: 1px solid #f3f4f6; padding: 0 24px; position: sticky; top: 0; z-index: 50; box-shadow: 0 1px 8px rgba(0,0,0,0.06); height: 56px; display: flex; align-items: center; justify-content: space-between; }
        .nav-logo { text-decoration: none; font-size: 20px; font-weight: 700; flex-shrink: 0; }
        .nav-links { display: flex; align-items: center; gap: 4px; }
        .nav-link { font-size: 13px; color: #374151; text-decoration: none; font-weight: 500; padding: 6px 8px; border-radius: 6px; white-space: nowrap; }
        .nav-link:hover { background: #f9fafb; }
        .nav-btn-admin { font-size: 13px; color: white; background: #111827; padding: 6px 12px; border-radius: 8px; text-decoration: none; font-weight: 600; white-space: nowrap; }
        .nav-btn-logout { font-size: 13px; color: white; background: #ef4444; padding: 6px 14px; border-radius: 8px; border: none; cursor: pointer; font-weight: 600; white-space: nowrap; }
        .nav-btn-signup { font-size: 13px; color: white; background: #f97316; padding: 6px 14px; border-radius: 8px; text-decoration: none; font-weight: 600; white-space: nowrap; }
        .hamburger { display: none; background: none; border: none; cursor: pointer; font-size: 22px; padding: 4px 8px; }
        .mobile-menu { display: none; }

        @media (max-width: 900px) {
          .nav-links { display: none; }
          .hamburger { display: block; }
          .mobile-menu.open {
            display: flex;
            flex-direction: column;
            background: white;
            position: fixed;
            top: 56px;
            left: 0;
            right: 0;
            bottom: 0;
            padding: 16px 24px;
            gap: 4px;
            overflow-y: auto;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            z-index: 49;
          }
          .mobile-menu .nav-link { font-size: 15px; padding: 12px 8px; border-bottom: 1px solid #f3f4f6; }
          .mobile-menu .nav-btn-logout { width: 100%; margin-top: 8px; padding: 12px; font-size: 15px; }
          .mobile-menu .nav-btn-admin { text-align: center; padding: 12px; font-size: 15px; }
          .mobile-menu .nav-btn-signup { text-align: center; padding: 12px; font-size: 15px; }
        }
      `}</style>

      <nav className="navbar">
<Link to="/" className="nav-logo" style={{display:'flex', alignItems:'center', gap:'8px', textDecoration:'none'}}>
  <svg width="28" height="36" viewBox="0 0 70 90">
    <ellipse cx="35" cy="78" rx="22" ry="10" fill="#8B3A0F"/>
    <ellipse cx="16" cy="70" rx="5" ry="4" fill="#8B3A0F"/>
    <ellipse cx="24" cy="67" rx="5.5" ry="4" fill="#8B3A0F"/>
    <ellipse cx="33" cy="65" rx="5.5" ry="4" fill="#8B3A0F"/>
    <ellipse cx="42" cy="66" rx="5" ry="4" fill="#8B3A0F"/>
    <ellipse cx="50" cy="68" rx="4" ry="3.5" fill="#8B3A0F"/>
    <ellipse cx="16" cy="69" rx="3.5" ry="2" fill="#dc2626"/>
    <ellipse cx="24" cy="66" rx="4" ry="2" fill="#dc2626"/>
    <ellipse cx="33" cy="64" rx="4" ry="2" fill="#dc2626"/>
    <ellipse cx="42" cy="65" rx="3.5" ry="2" fill="#dc2626"/>
    <ellipse cx="50" cy="67" rx="3" ry="1.8" fill="#dc2626"/>
    <rect x="13" y="52" width="44" height="22" rx="6" fill="#7a3009"/>
    <rect x="10" y="46" width="50" height="12" rx="3" fill="#5c2a00"/>
    <rect x="10" y="46" width="50" height="2.5" rx="1" fill="#d4af37"/>
    <rect x="10" y="55.5" width="50" height="2.5" rx="1" fill="#d4af37"/>
    <circle cx="20" cy="40" r="4.5" fill="#b8960c"/><circle cx="20" cy="40" r="2.8" fill="#d4af37"/>
    <circle cx="30" cy="38" r="4.5" fill="#b8960c"/><circle cx="30" cy="38" r="2.8" fill="#d4af37"/>
    <circle cx="40" cy="38" r="4.5" fill="#b8960c"/><circle cx="40" cy="38" r="2.8" fill="#d4af37"/>
    <circle cx="50" cy="40" r="4.5" fill="#b8960c"/><circle cx="50" cy="40" r="2.8" fill="#d4af37"/>
    <circle cx="25" cy="28" r="4.5" fill="#b8960c"/><circle cx="25" cy="28" r="2.8" fill="#d4af37"/>
    <circle cx="35" cy="26" r="4.5" fill="#b8960c"/><circle cx="35" cy="26" r="2.8" fill="#d4af37"/>
    <circle cx="45" cy="28" r="4.5" fill="#b8960c"/><circle cx="45" cy="28" r="2.8" fill="#d4af37"/>
    <circle cx="30" cy="16" r="4.5" fill="#b8960c"/><circle cx="30" cy="16" r="2.8" fill="#d4af37"/>
    <circle cx="40" cy="16" r="4.5" fill="#b8960c"/><circle cx="40" cy="16" r="2.8" fill="#d4af37"/>
    <circle cx="16" cy="70" r="3.5" fill="none" stroke="#d4af37" stroke-width="1.5"/>
  </svg>
  <span style={{fontFamily:'Palatino,Georgia,serif', fontSize:'22px', fontWeight:'bold', letterSpacing:'2px'}}>
    <span style={{color:'#f97316'}}>NATA</span><span style={{color:'#d4af37'}}>RANG</span>
  </span>
</Link>

        {/* Desktop */}
        <div className="nav-links">
          {links.map(l => <Link key={l.to} to={l.to} className="nav-link">{l.label}</Link>)}
          {user ? (
            <>
              <Link to="/profile" className="nav-link" style={{color:'#6b7280'}}>👋 {user.name}</Link>
              {user.is_admin && <Link to="/admin" className="nav-btn-admin">⚙️ Admin</Link>}
              <button onClick={handleLogout} className="nav-btn-logout">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/signup" className="nav-btn-signup">Sign Up</Link>
            </>
          )}
        </div>

        {/* Hamburger */}
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? '✕' : '☰'}
        </button>
      </nav>

      {/* Mobile menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        {links.map(l => (
          <Link key={l.to} to={l.to} className="nav-link" onClick={() => setMenuOpen(false)}>{l.label}</Link>
        ))}
        {user ? (
          <>
            <Link to="/profile" className="nav-link" style={{color:'#6b7280'}} onClick={() => setMenuOpen(false)}>👋 {user.name}</Link>
            {user.is_admin && <Link to="/admin" className="nav-btn-admin" onClick={() => setMenuOpen(false)}>⚙️ Admin</Link>}
            <button onClick={handleLogout} className="nav-btn-logout">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link" onClick={() => setMenuOpen(false)}>Login</Link>
            <Link to="/signup" className="nav-btn-signup" onClick={() => setMenuOpen(false)}>Sign Up</Link>
          </>
        )}
      </div>
    </>
  )
}
