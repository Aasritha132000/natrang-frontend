import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  async function handleLogin(e) {
    e.preventDefault()
    setError('')

    try {
      const res = await axios.post('http://localhost:3000/login', {
        email,
        password,
      })

      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      navigate('/')
    } catch (err) {
      setError('Invalid email or password. Please try again.')
    }
  }

  return (
    <div style={{minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', padding:'10px 16px', backgroundImage:"url('/login_bg.jpg')", backgroundSize:'cover', backgroundPosition:'center', position:'relative'}}>
      <div style={{position:'absolute', inset:0, background:'rgba(0,0,0,0.6)'}}></div>

      <div style={{position:'relative', zIndex:1, background:'white', borderRadius:'16px', width:'100%', maxWidth:'400px', overflow:'hidden', boxShadow:'0 8px 40px rgba(0,0,0,0.7)'}}>

        <div style={{background:'#f97316', padding:'16px 28px', textAlign:'center'}}>
          <div style={{fontSize:'11px', fontWeight:'600', color:'white', letterSpacing:'2px', textTransform:'uppercase', opacity:'0.85', marginBottom:'3px'}}>Welcome back to</div>
          <div style={{fontSize:'24px', fontWeight:'700', color:'white'}}>💃 NataRang</div>
          <div style={{fontSize:'11px', color:'white', opacity:'0.75', marginTop:'2px'}}>India's Dance Universe 🇮🇳</div>
        </div>

        <div style={{padding:'16px 28px 20px'}}>
          <p style={{fontSize:'14px', fontWeight:'600', color:'#111827', margin:'0 0 12px'}}>Login to your account</p>

          {error && (
            <div style={{background:'#fef2f2', border:'1px solid #fecaca', borderRadius:'8px', padding:'10px 14px', marginBottom:'12px'}}>
              <p style={{color:'#ef4444', fontSize:'12px', margin:0}}>❌ {error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} noValidate>
            <div style={{marginBottom:'10px'}}>
              <label style={{display:'block', fontSize:'11px', fontWeight:'600', color:'#6b7280', marginBottom:'4px', textTransform:'uppercase', letterSpacing:'0.5px'}}>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email address"
                style={{width:'100%', boxSizing:'border-box', padding:'8px 12px', border:'1px solid #e5e7eb', borderRadius:'8px', fontSize:'13px', outline:'none', background:'#f9fafb'}}
              />
            </div>

            <div style={{marginBottom:'16px'}}>
              <label style={{display:'block', fontSize:'11px', fontWeight:'600', color:'#6b7280', marginBottom:'4px', textTransform:'uppercase', letterSpacing:'0.5px'}}>Password</label>
              <div style={{position:'relative'}}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  style={{width:'100%', boxSizing:'border-box', padding:'8px 40px 8px 12px', border:'1px solid #e5e7eb', borderRadius:'8px', fontSize:'13px', outline:'none', background:'#f9fafb'}}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{position:'absolute', right:'10px', top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', color:'#9ca3af'}}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <button
              type="submit"
              style={{width:'100%', background:'#f97316', color:'white', border:'none', borderRadius:'8px', padding:'10px', fontSize:'14px', fontWeight:'600', cursor:'pointer'}}
            >
              Login to NataRang 🎶
            </button>
          </form>

          <div style={{display:'flex', alignItems:'center', gap:'12px', margin:'12px 0'}}>
            <div style={{flex:1, height:'1px', background:'#f3f4f6'}}></div>
            <span style={{fontSize:'11px', color:'#d1d5db'}}>or</span>
            <div style={{flex:1, height:'1px', background:'#f3f4f6'}}></div>
          </div>

          <p style={{textAlign:'center', fontSize:'13px', color:'#9ca3af', margin:0}}>
            Don't have an account?{' '}
            <Link to="/signup" style={{color:'#f97316', fontWeight:'600', textDecoration:'none'}}>
              Sign Up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}