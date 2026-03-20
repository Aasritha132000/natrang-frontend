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

  const linkStyle = {fontSize:'14px', color:'#374151', textDecoration:'none', fontWeight:'500', padding:'8px 0', display:'block'}

  const navLinks = (
    <>
      <Link to="/" style={linkStyle} onClick={() => setMenuOpen(false)}>Dance Forms</Link>
      <Link to="/about" style={linkStyle} onClick={() => setMenuOpen(false)}>About Us</Link>
      <Link to="/bookmarks" style={linkStyle} onClick={() => setMenuOpen(false)}>❤️ Saved</Link>
      <Link to="/map" style={linkStyle} onClick={() => setMenuOpen(false)}>🗺️ Map</Link>
      <Link to="/mudras" style={linkStyle} onClick={() => setMenuOpen(false)}>🤲 Mudras</Link>
      <Link to="/temples" style={linkStyle} onClick={() => setMenuOpen(false)}>🕌 Temples</Link>
      <Link to="/festivals" style={linkStyle} onClick={() => setMenuOpen(false)}>📅 Festivals</Link>
      <Link to="/hall-of-fame" style={linkStyle} onClick={() => setMenuOpen(false)}>🏆 Legends</Link>
      {user ? (
        <>
          <Link to="/profile" style={{...linkStyle, color:'#6b7280'}} onClick={() => setMenuOpen(false)}>👋 {user.name}</Link>
          {user.is_admin && (
            <Link to="/admin" style={{...linkStyle, color:'white', background:'#111827', padding:'7px 18px', borderRadius:'8px', fontWeight:'600', textAlign:'center'}} onClick={() => setMenuOpen(false)}>⚙️ Admin</Link>
          )}
          <button onClick={handleLogout} style={{fontSize:'14px', color:'white', background:'#ef4444', padding:'8px 18px', borderRadius:'8px', border:'none', cursor:'pointer', fontWeight:'600', width:'100%', marginTop:'4px'}}>
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login" style={linkStyle} onClick={() => setMenuOpen(false)}>Login</Link>
          <Link to="/signup" style={{...linkStyle, color:'white', background:'#f97316', padding:'7px 18px', borderRadius:'8px', fontWeight:'600', textAlign:'center'}} onClick={() => setMenuOpen(false)}>Sign Up</Link>
        </>
      )}
    </>
  )

  return (
    <nav style={{background:'white', borderBottom:'1px solid #f3f4f6', padding:'12px 24px', position:'sticky', top:0, zIndex:50, boxShadow:'0 1px 8px rgba(0,0,0,0.06)'}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <Link to="/" style={{textDecoration:'none'}}>
          <span style={{fontSize:'20px', fontWeight:'700'}}>
            <span style={{color:'#f97316'}}>Nata</span>
            <span style={{color:'#dc2626'}}>Rang</span>
          </span>
        </Link>

        {/* Desktop menu */}
        <div style={{display:'flex', alignItems:'center', gap:'16px', flexWrap:'nowrap'}} className="desktop-nav">
          {navLinks}
        </div>

        {/* Hamburger button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="hamburger-btn"
          style={{display:'none', background:'none', border:'none', cursor:'pointer', fontSize:'24px', padding:'4px'}}>
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="mobile-nav" style={{paddingTop:'12px', borderTop:'1px solid #f3f4f6', marginTop:'12px', display:'flex', flexDirection:'column', gap:'4px'}}>
          {navLinks}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: block !important; }
        }
        @media (min-width: 769px) {
          .mobile-nav { display: none !important; }
        }
      `}</style>
    </nav>
  )
}
