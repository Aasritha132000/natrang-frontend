import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

export default function Signup() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState([])
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  async function handleSignup(e) {
    e.preventDefault()
    setErrors([])

    if (password !== confirmPassword) {
      setErrors(['Passwords do not match!'])
      return
    }

    try {
      await axios.post('http://localhost:3000/users', {
        user: { name, email, password, password_confirmation: confirmPassword }
      })
      navigate('/login')
    } catch (err) {
      setErrors(err.response?.data?.errors || ['Something went wrong!'])
    }
  }

  return (
    <div style={{minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', padding:'10px 16px', backgroundImage:"url('/dance_bg.jpg')", backgroundSize:'cover', backgroundPosition:'center', backgroundAttachment:'fixed', position:'relative'}}>
      <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.6)'}}></div>

      <div style={{position:'relative', zIndex:1, background:'white', borderRadius:'16px', width:'100%', maxWidth:'400px', overflow:'hidden', boxShadow:'0 8px 40px rgba(0,0,0,0.7)'}}>

        <div style={{background:'#f97316', padding:'16px 28px', textAlign:'center'}}>
          <div style={{fontSize:'11px', fontWeight:'600', color:'white', letterSpacing:'2px', textTransform:'uppercase', opacity:'0.85', marginBottom:'3px'}}>Welcome to</div>
          <div style={{fontSize:'24px', fontWeight:'700', color:'white'}}>💃 NataRang</div>
          <div style={{fontSize:'11px', color:'white', opacity:'0.75', marginTop:'2px'}}>India's Dance Universe 🇮🇳</div>
        </div>

        <div style={{padding:'16px 28px 20px'}}>
          <p style={{fontSize:'14px', fontWeight:'600', color:'#111827', margin:'0 0 12px'}}>Create your account</p>

          {errors.length > 0 && (
            <div style={{background:'#fef2f2', border:'1px solid #fecaca', borderRadius:'8px', padding:'10px 14px', marginBottom:'12px'}}>
              {errors.map((err, i) => (
                <p key={i} style={{color:'#ef4444', fontSize:'12px', margin:'2px 0'}}>❌ {err}</p>
              ))}
            </div>
          )}

          <form onSubmit={handleSignup} noValidate>
            <div style={{marginBottom:'10px'}}>
              <label style={{display:'block', fontSize:'11px', fontWeight:'600', color:'#6b7280', marginBottom:'4px', textTransform:'uppercase', letterSpacing:'0.5px'}}>Full Name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Enter your full name"
                style={{width:'100%', boxSizing:'border-box', padding:'8px 12px', border:'1px solid #e5e7eb', borderRadius:'8px', fontSize:'13px', outline:'none', background:'#f9fafb'}}
              />
              {name.length > 0 && name.length < 2 && (
                <p style={{fontSize:'11px', color:'#ef4444', margin:'3px 0 0'}}>❌ Name is too short</p>
              )}
              {name.length >= 2 && (
                <p style={{fontSize:'11px', color:'#22c55e', margin:'3px 0 0'}}>✅ Looks good!</p>
              )}
            </div>

            <div style={{marginBottom:'10px'}}>
              <label style={{display:'block', fontSize:'11px', fontWeight:'600', color:'#6b7280', marginBottom:'4px', textTransform:'uppercase', letterSpacing:'0.5px'}}>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email address"
                autoComplete="off"
                style={{width:'100%', boxSizing:'border-box', padding:'8px 12px', border:'1px solid #e5e7eb', borderRadius:'8px', fontSize:'13px', outline:'none', background:'#f9fafb'}}
              />
              {email.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && (
                <p style={{fontSize:'11px', color:'#ef4444', margin:'3px 0 0'}}>❌ Enter a valid email address</p>
              )}
              {email.length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && (
                <p style={{fontSize:'11px', color:'#22c55e', margin:'3px 0 0'}}>✅ Email looks good!</p>
              )}
            </div>

            <div style={{marginBottom:'10px'}}>
              <label style={{display:'block', fontSize:'11px', fontWeight:'600', color:'#6b7280', marginBottom:'4px', textTransform:'uppercase', letterSpacing:'0.5px'}}>Password</label>
              <div style={{position:'relative'}}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Min 6 characters"
                  autoComplete="new-password"
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
              {password.length > 0 && password.length < 6 && (
                <p style={{fontSize:'11px', color:'#ef4444', margin:'3px 0 0'}}>❌ Too short! Need {6 - password.length} more characters</p>
              )}
              {password.length >= 6 && (
                <p style={{fontSize:'11px', color:'#22c55e', margin:'3px 0 0'}}>✅ Password looks good!</p>
              )}
            </div>

            <div style={{marginBottom:'10px'}}>
              <label style={{display:'block', fontSize:'11px', fontWeight:'600', color:'#6b7280', marginBottom:'4px', textTransform:'uppercase', letterSpacing:'0.5px'}}>Confirm Password</label>
              <div style={{position:'relative'}}>
                <input
                  type={showConfirm ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter your password"
                  autoComplete="new-password"
                  style={{width:'100%', boxSizing:'border-box', padding:'8px 40px 8px 12px', border:'1px solid #e5e7eb', borderRadius:'8px', fontSize:'13px', outline:'none', background:'#f9fafb'}}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  style={{position:'absolute', right:'10px', top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', color:'#9ca3af'}}
                >
                  {showConfirm ? '🙈' : '👁️'}
                </button>
              </div>
              {confirmPassword.length > 0 && confirmPassword !== password && (
                <p style={{fontSize:'11px', color:'#ef4444', margin:'3px 0 0'}}>❌ Passwords do not match!</p>
              )}
              {confirmPassword.length > 0 && confirmPassword === password && (
                <p style={{fontSize:'11px', color:'#22c55e', margin:'3px 0 0'}}>✅ Passwords match!</p>
              )}
            </div>

            <div style={{marginBottom:'14px', display:'flex', alignItems:'flex-start', gap:'8px'}}>
              <input
                type="checkbox"
                id="terms"
                required
                style={{marginTop:'2px', accentColor:'#f97316', width:'13px', height:'13px', cursor:'pointer', flexShrink:0}}
              />
              <label htmlFor="terms" style={{fontSize:'11px', color:'#6b7280', cursor:'pointer', lineHeight:'1.6'}}>
                I agree to the <a href="#" style={{color:'#f97316', fontWeight:'600', textDecoration:'none'}}>Terms of Service</a> and <a href="#" style={{color:'#f97316', fontWeight:'600', textDecoration:'none'}}>Privacy Policy</a>
              </label>
            </div>

            <button
              type="submit"
              style={{width:'100%', background:'#f97316', color:'white', border:'none', borderRadius:'8px', padding:'10px', fontSize:'14px', fontWeight:'600', cursor:'pointer'}}
            >
              Create Account
            </button>
          </form>

          <div style={{display:'flex', alignItems:'center', gap:'12px', margin:'12px 0'}}>
            <div style={{flex:1, height:'1px', background:'#f3f4f6'}}></div>
            <span style={{fontSize:'11px', color:'#d1d5db'}}>or</span>
            <div style={{flex:1, height:'1px', background:'#f3f4f6'}}></div>
          </div>

          <p style={{textAlign:'center', fontSize:'13px', color:'#9ca3af', margin:0}}>
            Already have an account?{' '}
            <Link to="/login" style={{color:'#f97316', fontWeight:'600', textDecoration:'none'}}>
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}