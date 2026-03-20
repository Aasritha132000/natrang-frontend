import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

export default function Admin() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [stats, setStats] = useState(null)
  const [videos, setVideos] = useState([])
  const [dances, setDances] = useState([])
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const [newTitle, setNewTitle] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [newLevel, setNewLevel] = useState('Beginner')
  const [newDanceId, setNewDanceId] = useState('')

  const token = localStorage.getItem('token')
  const userData = localStorage.getItem('user')
  const user = userData ? JSON.parse(userData) : null

  useEffect(() => {
    if (!token) {
      navigate('/login')
      return
    }

    if (!user?.is_admin) {
      navigate('/')
      return
    }

    fetchDashboard()
    fetchDances()
  }, [navigate])

  async function fetchDashboard() {
    try {
      const res = await axios.get('http://localhost:3000/admin/dashboard', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setStats(res.data)
    } catch (err) {
      setError('❌ Failed to load dashboard!')
    }
  }

  async function fetchVideos() {
    try {
      const res = await axios.get('http://localhost:3000/admin/videos', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setVideos(res.data)
    } catch (err) {
      setError('❌ Failed to load videos!')
    }
  }

  async function fetchDances() {
    try {
      const res = await axios.get('http://localhost:3000/admin/dances', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setDances(res.data)
    } catch (err) {
      setError('❌ Failed to load dances!')
    }
  }

  async function addVideo(e) {
    e.preventDefault()
    setMessage('')
    setError('')

    try {
      await axios.post(
        'http://localhost:3000/admin/videos',
        {
          dance_id: newDanceId,
          title: newTitle,
          youtube_url: newUrl,
          level: newLevel
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )

      setMessage('✅ Video added successfully!')
      setNewTitle('')
      setNewUrl('')
      setNewLevel('Beginner')
      setNewDanceId('')
      fetchVideos()
      fetchDashboard()
    } catch (err) {
      setError('❌ Failed to add video!')
    }
  }

  async function deleteVideo(id) {
    if (!window.confirm('Are you sure you want to delete this video?')) return

    try {
      await axios.delete(`http://localhost:3000/admin/videos/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setMessage('✅ Video deleted!')
      fetchVideos()
      fetchDashboard()
    } catch (err) {
      setError('❌ Failed to delete video!')
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f1f5f9' }}>
      <div style={{ background: '#111827', padding: '20px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ color: 'white', fontSize: '22px', fontWeight: '700', margin: '0 0 4px' }}>
            ⚙️ NataRang Admin Panel
          </h1>
          <p style={{ color: '#9ca3af', fontSize: '13px', margin: 0 }}>
            Welcome back, {user?.name}!
          </p>
        </div>
        <Link
          to="/"
          style={{
            color: 'white',
            background: '#f97316',
            padding: '8px 20px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: '13px',
            fontWeight: '600'
          }}
        >
          ← Back to Site
        </Link>
      </div>

      <div style={{ display: 'flex', minHeight: 'calc(100vh - 72px)' }}>
        <div style={{ width: '220px', background: '#1f2937', padding: '24px 0', flexShrink: 0 }}>
          {[
            { key: 'dashboard', label: '📊 Dashboard' },
            { key: 'videos', label: '🎬 Manage Videos' },
            { key: 'add_video', label: '➕ Add Video' },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => {
                setActiveTab(tab.key)
                setMessage('')
                setError('')
                if (tab.key === 'videos') fetchVideos()
              }}
              style={{
                width: '100%',
                padding: '12px 24px',
                textAlign: 'left',
                background: activeTab === tab.key ? '#f97316' : 'transparent',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: activeTab === tab.key ? '600' : '400'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div style={{ flex: 1, padding: '32px' }}>
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

          {activeTab === 'dashboard' && stats && (
            <div>
              <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#111827', margin: '0 0 24px' }}>
                📊 Dashboard
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '16px' }}>
                {[
                  { label: 'Total Dances', value: stats.dances, icon: '💃', color: '#f97316' },
                  { label: 'Total Videos', value: stats.videos, icon: '🎬', color: '#dc2626' },
                  { label: 'Total Users', value: stats.users, icon: '👤', color: '#7c3aed' },
                  { label: 'Total Reviews', value: stats.reviews, icon: '⭐', color: '#0891b2' },
                  { label: 'Total Quizzes', value: stats.quizzes, icon: '🎯', color: '#059669' },
                ].map(stat => (
                  <div
                    key={stat.label}
                    style={{
                      background: 'white',
                      borderRadius: '16px',
                      padding: '24px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                      textAlign: 'center',
                      borderTop: `4px solid ${stat.color}`
                    }}
                  >
                    <div style={{ fontSize: '36px', marginBottom: '8px' }}>{stat.icon}</div>
                    <div style={{ fontSize: '32px', fontWeight: '800', color: stat.color }}>{stat.value}</div>
                    <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'videos' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#111827', margin: 0 }}>
                  🎬 Manage Videos
                </h2>
                <button
                  onClick={() => setActiveTab('add_video')}
                  style={{
                    background: '#f97316',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '10px 20px',
                    fontSize: '13px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  ➕ Add New Video
                </button>
              </div>

              {videos.length === 0 ? (
                <div style={{ background: 'white', borderRadius: '16px', padding: '40px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                  <div style={{ fontSize: '48px', marginBottom: '12px' }}>🎬</div>
                  <p style={{ fontSize: '16px', fontWeight: '600', color: '#111827' }}>No videos yet!</p>
                  <p style={{ fontSize: '13px', color: '#9ca3af' }}>Click "Add New Video" to add your first video</p>
                </div>
              ) : (
                <div style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                        <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Title</th>
                        <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Dance</th>
                        <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Level</th>
                        <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {videos.map(video => (
                        <tr key={video.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                          <td style={{ padding: '12px 16px', fontSize: '13px', color: '#111827' }}>{video.title}</td>
                          <td style={{ padding: '12px 16px', fontSize: '13px', color: '#6b7280' }}>{video.dance_name}</td>
                          <td style={{ padding: '12px 16px' }}>
                            <span style={{ background: '#fef3c7', color: '#d97706', fontSize: '11px', padding: '2px 8px', borderRadius: '20px', fontWeight: '600' }}>
                              {video.level}
                            </span>
                          </td>
                          <td style={{ padding: '12px 16px' }}>
                            <button
                              onClick={() => deleteVideo(video.id)}
                              style={{
                                background: '#fef2f2',
                                color: '#ef4444',
                                border: '1px solid #fecaca',
                                borderRadius: '6px',
                                padding: '6px 12px',
                                fontSize: '12px',
                                fontWeight: '600',
                                cursor: 'pointer'
                              }}
                            >
                              🗑️ Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'add_video' && (
            <div>
              <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#111827', margin: '0 0 24px' }}>
                ➕ Add New Video
              </h2>
              <div style={{ background: 'white', borderRadius: '16px', padding: '32px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', maxWidth: '600px' }}>
                <form onSubmit={addVideo}>
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#6b7280', marginBottom: '6px', textTransform: 'uppercase' }}>
                      Dance Form
                    </label>
                    <select
                      value={newDanceId}
                      onChange={e => setNewDanceId(e.target.value)}
                      required
                      style={{ width: '100%', padding: '10px 14px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '14px', outline: 'none' }}
                    >
                      <option value="">Select a dance form</option>
                      {dances.map(d => (
                        <option key={d.id} value={d.id}>{d.name}</option>
                      ))}
                    </select>
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#6b7280', marginBottom: '6px', textTransform: 'uppercase' }}>
                      Video Title
                    </label>
                    <input
                      type="text"
                      value={newTitle}
                      onChange={e => setNewTitle(e.target.value)}
                      required
                      placeholder="e.g. Bharatanatyam Basics for Beginners"
                      style={{ width: '100%', boxSizing: 'border-box', padding: '10px 14px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '14px', outline: 'none' }}
                    />
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#6b7280', marginBottom: '6px', textTransform: 'uppercase' }}>
                      YouTube URL
                    </label>
                    <input
                      type="text"
                      value={newUrl}
                      onChange={e => setNewUrl(e.target.value)}
                      required
                      placeholder="https://www.youtube.com/watch?v=..."
                      style={{ width: '100%', boxSizing: 'border-box', padding: '10px 14px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '14px', outline: 'none' }}
                    />
                    <p style={{ fontSize: '11px', color: '#9ca3af', margin: '4px 0 0' }}>
                      Paste the full YouTube video URL here
                    </p>
                  </div>

                  <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#6b7280', marginBottom: '6px', textTransform: 'uppercase' }}>
                      Level
                    </label>
                    <select
                      value={newLevel}
                      onChange={e => setNewLevel(e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '14px', outline: 'none' }}
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>

                  {newUrl && (newUrl.includes('youtube.com') || newUrl.includes('youtu.be')) && (
                    <div style={{ marginBottom: '24px' }}>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#6b7280', marginBottom: '6px', textTransform: 'uppercase' }}>
                        Preview
                      </label>
                      <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '8px' }}>
                        <iframe
                          src={`https://www.youtube.com/embed/${newUrl.match(/(?:v=|youtu\.be\/)([^&\n?#]+)/)?.[1] || ''}`}
                          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                          allowFullScreen
                          title="Video preview"
                        />
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    style={{
                      width: '100%',
                      background: '#f97316',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '12px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    ➕ Add Video
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}