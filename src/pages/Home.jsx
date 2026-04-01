import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import DanceCard from '../components/DanceCard'

export default function Home() {
  const navigate = useNavigate()
  const [dances, setDances] = useState([])
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [current, setCurrent] = useState(0)
  const slideInterval = useRef(null)

  const slides = ['/slide1.jpg', '/slide2.jpg', '/slide3.jpg', '/slide4.jpg']

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }

    axios
      .get('https://natrang-backend.onrender.com/dances', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => setDances(res.data))
      .catch(() => navigate('/login'))
  }, [navigate])

  useEffect(() => {
    slideInterval.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length)
    }, 3000)

    return () => clearInterval(slideInterval.current)
  }, [slides.length])

  const filtered = dances.filter(d => {
    const matchType = filter === 'all' || d.dance_type === filter
    const matchSearch =
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.region.toLowerCase().includes(search.toLowerCase())
    return matchType && matchSearch
  })

  return (
    <div style={{ minHeight: '100vh', background: '#fff7ed' }}>
      <div style={{ position: 'relative', height: '520px', overflow: 'hidden' }}>
        {slides.map((slide, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${slide})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: i === current ? 1 : 0,
              transition: 'opacity 1.5s ease'
            }}
          />
        ))}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 1 }} />
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '0 24px',
            color: 'white'
          }}
        >
          <h1 style={{ fontSize: '64px', fontWeight: '800', margin: '0 0 8px', textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}>
            NataRang
          </h1>
          <p style={{ fontSize: '22px', margin: '0 0 6px' }}>India's Dance Universe 🇮🇳</p>
          <p style={{ fontSize: '16px', opacity: 0.85, margin: '0 0 32px' }}>
            Learn every Indian dance form — from beginner to professional
          </p>
          <div style={{ display: 'flex', gap: '48px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '40px', fontWeight: '700' }}>{dances.length}+</div>
              <div style={{ fontSize: '13px', opacity: 0.75 }}>Dance Forms</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '40px', fontWeight: '700' }}>500+</div>
              <div style={{ fontSize: '13px', opacity: 0.75 }}>Video Lessons</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '40px', fontWeight: '700' }}>3</div>
              <div style={{ fontSize: '13px', opacity: 0.75 }}>Skill Levels</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', marginTop: '24px' }}>
            {slides.map((_, i) => (
              <span
                key={i}
                onClick={() => setCurrent(i)}
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: 'white',
                  opacity: i === current ? 1 : 0.4,
                  cursor: 'pointer'
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding: '24px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
        <div style={{ position: 'relative', width: '100%', maxWidth: '500px' }}>
          <input
            type="text"
            placeholder="Search dance forms..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: '100%',
              boxSizing: 'border-box',
              padding: '12px 20px 12px 48px',
              border: '2px solid #f97316',
              borderRadius: '50px',
              fontSize: '14px',
              outline: 'none',
              background: 'white'
            }}
          />
          <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', fontSize: '18px' }}>
            🔍
          </span>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          {['all', 'Classical', 'Folk'].map(type => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              style={{
                padding: '8px 24px',
                borderRadius: '50px',
                fontWeight: '600',
                fontSize: '14px',
                cursor: 'pointer',
                border: filter === type ? 'none' : '2px solid #f97316',
                background: filter === type ? '#f97316' : 'transparent',
                color: filter === type ? 'white' : '#f97316'
              }}
            >
              {type === 'all' ? 'All' : type}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: '0 32px 60px' }}>
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px', maxWidth: '1200px', margin: '0 auto' }}>
          {filtered.map(dance => (
            <DanceCard key={dance.id} dance={dance} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px' }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>🔍</div>
            <p style={{ fontSize: '18px', fontWeight: '600', color: '#111827' }}>No dance forms found!</p>
          </div>
        )}
      </div>
    </div>
  )
}
