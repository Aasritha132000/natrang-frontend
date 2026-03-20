import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

export default function Profile() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('profile')
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirmNew, setShowConfirmNew] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    const parsedUser = userData ? JSON.parse(userData) : null

    if (!token || !parsedUser) {
      navigate('/login')
      return
    }

    setUser(parsedUser)
    setName(parsedUser.name || '')
    setEmail(parsedUser.email || '')
  }, [navigate])

  async function handleUpdateProfile(e) {
    e.preventDefault()
    setMessage('')
    setError('')

    try {
      const token = localStorage.getItem('token')
      const res = await axios.put(
        'http://localhost:3000/profile',
        { user: { name, email } },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      localStorage.setItem('user', JSON.stringify(res.data.user))
      setUser(res.data.user)
      setMessage('✅ Profile updated successfully!')
    } catch (err) {
      setError('❌ Failed to update profile. Please try again.')
    }
  }

  async function handleChangePassword(e) {
    e.preventDefault()
    setMessage('')
    setError('')

    if (newPassword !== confirmPassword) {
      setError('❌ New passwords do not match!')
      return
    }

    if (newPassword.length < 6) {
      setError('❌ Password must be at least 6 characters!')
      return
    }

    try {
      const token = localStorage.getItem('token')
      await axios.put(
        'http://localhost:3000/profile/password',
        {
          user: {
            current_password: currentPassword,
            password: newPassword,
            password_confirmation: confirmPassword
          }
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      setMessage('✅ Password changed successfully!')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (err) {
      setError('❌ Current password is incorrect!')
    }
  }

  const getBadge = () => {
    return { icon: '🌱', label: 'Beginner', color: '#22c55e' }
  }

  if (!user) return null

  return (
    <div style={{ minHeight: '100vh', background: '#fff7ed' }}>
      <div style={{ background: 'linear-gradient(135deg, #f97316, #dc2626)', padding: '60px 32px', textAlign: 'center', color: 'white' }}>
        <div style={{ position: 'relative', display: 'inline-block', marginBottom: '12px' }}>
          {user.photo ? (
            <img
              src={user.photo}
              alt="profile"
              style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', border: '4px solid white' }}
            />
          ) : (
            <div
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '48px',
                border: '4px solid white'
              }}
            >
              👤
            </div>
          )}

          <label
            htmlFor="photo-upload"
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              background: 'white',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: '16px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
            }}
          >
            📷
          </label>

          <input
            id="photo-upload"
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={e => {
              const file = e.target.files[0]
              if (file) {
                const reader = new FileReader()
                reader.onload = ev => {
                  const updatedUser = { ...user, photo: ev.target.result }
                  setUser(updatedUser)
                  localStorage.setItem('user', JSON.stringify(updatedUser))
                }
                reader.readAsDataURL(file)
              }
            }}
          />
        </div>

        <h1 style={{ fontSize: '32px', fontWeight: '800', margin: '0 0 8px' }}>{user.name}</h1>
        <p style={{ fontSize: '16px', opacity: 0.85, margin: '0 0 16px' }}>{user.email}</p>

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.2)', padding: '8px 20px', borderRadius: '20px' }}>
          <span style={{ fontSize: '20px' }}>{getBadge().icon}</span>
          <span style={{ fontSize: '14px', fontWeight: '600' }}>{getBadge().label} Dancer</span>
        </div>
      </div>

      <div style={{ maxWidth: '700px', margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', background: 'white', padding: '6px', borderRadius: '12px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          {[
            { key: 'profile', label: '👤 Edit Profile' },
            { key: 'password', label: '🔒 Change Password' },
            { key: 'stats', label: '📊 My Stats' },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => {
                setActiveTab(tab.key)
                setMessage('')
                setError('')
              }}
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '13px',
                background: activeTab === tab.key ? '#f97316' : 'transparent',
                color: activeTab === tab.key ? 'white' : '#6b7280'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {message && (
          <div style={{ background: '#dcfce7', border: '1px solid #86efac', borderRadius: '10px', padding: '12px 16px', marginBottom: '20px' }}>
            <p style={{ color: '#166534', fontSize: '13px', margin: 0 }}>{message}</p>
          </div>
        )}

        {error && (
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '10px', padding: '12px 16px', marginBottom: '20px' }}>
            <p style={{ color: '#ef4444', fontSize: '13px', margin: 0 }}>{error}</p>
          </div>
        )}

        {activeTab === 'profile' && (
          <div style={{ background: 'white', borderRadius: '16px', padding: '32px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#111827', margin: '0 0 24px' }}>Edit Profile</h2>
            <form onSubmit={handleUpdateProfile}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '600', color: '#6b7280', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  style={{ width: '100%', boxSizing: 'border-box', padding: '10px 14px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '14px', outline: 'none' }}
                />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '600', color: '#6b7280', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={{ width: '100%', boxSizing: 'border-box', padding: '10px 14px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '14px', outline: 'none' }}
                />
              </div>

              <button
                type="submit"
                style={{ width: '100%', background: '#f97316', color: 'white', border: 'none', borderRadius: '8px', padding: '12px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}
              >
                Save Changes
              </button>
            </form>
          </div>
        )}

        {activeTab === 'password' && (
          <div style={{ background: 'white', borderRadius: '16px', padding: '32px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#111827', margin: '0 0 24px' }}>Change Password</h2>
            <form onSubmit={handleChangePassword}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '600', color: '#6b7280', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Current Password
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showCurrent ? 'text' : 'password'}
                    value={currentPassword}
                    onChange={e => setCurrentPassword(e.target.value)}
                    placeholder="Enter current password"
                    style={{ width: '100%', boxSizing: 'border-box', padding: '10px 40px 10px 14px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '14px', outline: 'none' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrent(!showCurrent)}
                    style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' }}
                  >
                    {showCurrent ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '600', color: '#6b7280', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  New Password
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showNew ? 'text' : 'password'}
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    placeholder="Min 6 characters"
                    style={{ width: '100%', boxSizing: 'border-box', padding: '10px 40px 10px 14px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '14px', outline: 'none' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew(!showNew)}
                    style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' }}
                  >
                    {showNew ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '600', color: '#6b7280', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Confirm New Password
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showConfirmNew ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter new password"
                    style={{ width: '100%', boxSizing: 'border-box', padding: '10px 40px 10px 14px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '14px', outline: 'none' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmNew(!showConfirmNew)}
                    style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' }}
                  >
                    {showConfirmNew ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                style={{ width: '100%', background: '#f97316', color: 'white', border: 'none', borderRadius: '8px', padding: '12px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}
              >
                Change Password
              </button>
            </form>
          </div>
        )}

        {activeTab === 'stats' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
              {[
                { icon: '💃', label: 'Dances Explored', value: '0' },
                { icon: '🎬', label: 'Videos Watched', value: '0' },
                { icon: '❤️', label: 'Favourites', value: '0' },
                { icon: '🏆', label: 'Badges Earned', value: '0' },
              ].map(stat => (
                <div key={stat.label} style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', textAlign: 'center' }}>
                  <div style={{ fontSize: '36px', marginBottom: '8px' }}>{stat.icon}</div>
                  <div style={{ fontSize: '28px', fontWeight: '700', color: '#111827', marginBottom: '4px' }}>{stat.value}</div>
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>{stat.label}</div>
                </div>
              ))}
            </div>

            <div style={{ background: 'white', borderRadius: '16px', padding: '28px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#111827', margin: '0 0 16px' }}>🏆 Badge Progress</h3>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'space-around' }}>
                {[
                  { icon: '🌱', label: 'Beginner', req: '1 video', earned: false },
                  { icon: '🎵', label: 'Learner', req: '5 videos', earned: false },
                  { icon: '💃', label: 'Dancer', req: '10 videos', earned: false },
                  { icon: '⭐', label: 'Expert', req: 'All videos', earned: false },
                ].map(badge => (
                  <div key={badge.label} style={{ textAlign: 'center', opacity: badge.earned ? 1 : 0.4 }}>
                    <div style={{ fontSize: '36px', marginBottom: '6px' }}>{badge.icon}</div>
                    <div style={{ fontSize: '12px', fontWeight: '600', color: '#111827' }}>{badge.label}</div>
                    <div style={{ fontSize: '11px', color: '#9ca3af' }}>{badge.req}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <Link to="/" style={{ color: '#f97316', fontSize: '13px', fontWeight: '600', textDecoration: 'none' }}>
            ← Back to Dance Forms
          </Link>
        </div>
      </div>
    </div>
  )
}