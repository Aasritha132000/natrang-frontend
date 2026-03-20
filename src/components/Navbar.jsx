import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()
 const user = JSON.parse(localStorage.getItem('user') || 'null')

  function handleLogout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <nav style={{background:'white', borderBottom:'1px solid #f3f4f6', padding:'12px 24px', display:'flex', justifyContent:'space-between', alignItems:'center', position:'sticky', top:0, zIndex:50, boxShadow:'0 1px 8px rgba(0,0,0,0.06)'}}>
      <Link to="/" style={{textDecoration:'none'}}>
        <span style={{fontSize:'20px', fontWeight:'700'}}>
          <span style={{color:'#f97316'}}>Nata</span>
          <span style={{color:'#dc2626'}}>Rang</span>
        </span>
      </Link>

      <div style={{display:'flex', alignItems:'center', gap:'16px'}}>
        <Link to="/" style={{fontSize:'13px', color:'#374151', textDecoration:'none', fontWeight:'500'}}>
          Dance Forms
        </Link>

        <Link to="/about" style={{fontSize:'13px', color:'#374151', textDecoration:'none', fontWeight:'500'}}>
  About Us
</Link>
 <Link to="/bookmarks" style={{fontSize:'13px', color:'#374151', textDecoration:'none', fontWeight:'500'}}>
  ❤️ Saved
</Link>
<Link to="/map" style={{fontSize:'13px', color:'#374151', textDecoration:'none', fontWeight:'500'}}>
  🗺️ Map
</Link>
<Link to="/mudras" style={{fontSize:'13px', color:'#374151', textDecoration:'none', fontWeight:'500'}}>
  🤲 Mudras
</Link>
<Link to="/temples" style={{fontSize:'13px', color:'#374151', textDecoration:'none', fontWeight:'500'}}>
  🕌 Temples
</Link>

<Link to="/festivals" style={{fontSize:'13px', color:'#374151', textDecoration:'none', fontWeight:'500'}}>
  📅 Festivals
</Link>
<Link to="/hall-of-fame" style={{fontSize:'13px', color:'#374151', textDecoration:'none', fontWeight:'500'}}>
  🏆 Legends
</Link>

        {user ? (
          <>
           <Link to="/profile" style={{fontSize:'13px', color:'#6b7280', textDecoration:'none'}}>👋 {user.name}</Link>
           {user.is_admin && (
  <Link to="/admin" style={{fontSize:'13px', color:'white', background:'#111827', padding:'7px 18px', borderRadius:'8px', textDecoration:'none', fontWeight:'600'}}>
    ⚙️ Admin
  </Link>
)}
            <button
              onClick={handleLogout}
              style={{fontSize:'13px', color:'white', background:'#ef4444', padding:'7px 18px', borderRadius:'8px', border:'none', cursor:'pointer', fontWeight:'600'}}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{fontSize:'13px', color:'#374151', textDecoration:'none', fontWeight:'500'}}>
              Login
            </Link>
            <Link to="/signup" style={{fontSize:'13px', color:'white', background:'#f97316', padding:'7px 18px', borderRadius:'8px', textDecoration:'none', fontWeight:'600'}}>
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}