import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Leaderboard() {
  const [scores, setScores] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    axios
      .get('https://natrang-backend.onrender.com/leaderboard', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        setScores(res.data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontSize: '24px' }}>Loading Leaderboard... 🏆</div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fff7ed', padding: '40px 24px' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ fontSize: '56px', marginBottom: '12px' }}>🏆</div>
          <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#111827', margin: '0 0 8px' }}>Quiz Leaderboard</h1>
          <p style={{ color: '#6b7280', fontSize: '15px' }}>Top performers across all dance quizzes</p>
        </div>

        {scores.length === 0 ? (
          <div style={{ background: 'white', borderRadius: '24px', padding: '40px', textAlign: 'center', boxShadow: '0 8px 40px rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📝</div>
            <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#111827' }}>No scores yet!</h2>
            <p style={{ color: '#6b7280' }}>Be the first to take a quiz and appear here.</p>
            <Link to="/" style={{ background: '#f97316', color: 'white', borderRadius: '10px', padding: '12px 24px', fontSize: '14px', fontWeight: '600', textDecoration: 'none', display: 'inline-block', marginTop: '16px' }}>
              Go Take a Quiz!
            </Link>
          </div>
        ) : (
          <div style={{ background: 'white', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.1)' }}>
            {scores.map((s, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '16px 24px',
                  borderBottom: i < scores.length - 1 ? '1px solid #f3f4f6' : 'none',
                  background: i === 0 ? '#fffbeb' : i === 1 ? '#f9fafb' : 'white'
                }}
              >
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: i === 0 ? '#f59e0b' : i === 1 ? '#9ca3af' : i === 2 ? '#f97316' : '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '16px', color: 'white', flexShrink: 0 }}>
                  {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : i + 1}
                </div>
                <div style={{ marginLeft: '16px', flex: 1 }}>
                  <div style={{ fontWeight: '700', fontSize: '15px', color: '#111827' }}>{s.user_name}</div>
                  <div style={{ fontSize: '13px', color: '#6b7280' }}>💃 {s.dance_name}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: '800', fontSize: '18px', color: '#f97316' }}>{s.score}/{s.total}</div>
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>{s.percent}%</div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <Link to="/" style={{ color: '#9ca3af', fontSize: '13px', textDecoration: 'none' }}>← Back to Home</Link>
        </div>
      </div>
    </div>
  )
}
