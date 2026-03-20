import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import DanceCard from '../components/DanceCard'

export default function Bookmarks() {
  const navigate = useNavigate()
  const [dances, setDances] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token) {
      navigate('/login')
      return
    }

    axios
      .get('https://natrang-backend.onrender.com/bookmarks', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        setDances(res.data)
        setLoading(false)
      })
      .catch(() => navigate('/login'))
  }, [navigate])

  return (
    <div style={{ minHeight: '100vh', background: '#fff7ed' }}>
      <div style={{ background: 'linear-gradient(135deg, #f97316, #dc2626)', padding: '60px 32px', textAlign: 'center', color: 'white' }}>
        <div style={{ fontSize: '52px', marginBottom: '12px' }}>❤️</div>
        <h1 style={{ fontSize: '40px', fontWeight: '800', margin: '0 0 8px' }}>My Saved Dances</h1>
        <p style={{ fontSize: '16px', opacity: 0.85 }}>Your personal collection of favourite dance forms</p>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 32px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px' }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>💃</div>
            <p style={{ fontSize: '18px', color: '#6b7280' }}>Loading your saved dances...</p>
          </div>
        ) : dances.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px' }}>
            <div style={{ fontSize: '72px', marginBottom: '16px' }}>🤍</div>
            <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#111827', margin: '0 0 8px' }}>No saved dances yet!</h2>
            <p style={{ fontSize: '16px', color: '#6b7280', margin: '0 0 24px' }}>
              Click the 🤍 heart on any dance card to save it here!
            </p>
            <Link
              to="/"
              style={{
                background: '#f97316',
                color: 'white',
                padding: '12px 32px',
                borderRadius: '12px',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '600'
              }}
            >
              Explore Dance Forms →
            </Link>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#111827', margin: 0 }}>
                {dances.length} Saved {dances.length === 1 ? 'Dance' : 'Dances'}
              </h2>
              <Link to="/" style={{ color: '#f97316', fontSize: '13px', fontWeight: '600', textDecoration: 'none' }}>
                + Explore More
              </Link>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
              {dances.map(dance => (
                <DanceCard key={dance.id} dance={dance} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}