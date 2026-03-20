import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function DanceCard({ dance }) {
  const navigate = useNavigate()
  const [bookmarked, setBookmarked] = useState(false)

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('bookmarks') || '[]')
    setBookmarked(saved.includes(dance.id))
  }, [dance.id])

  async function toggleBookmark(e) {
    e.stopPropagation()

    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }

    const saved = JSON.parse(localStorage.getItem('bookmarks') || '[]')

    try {
      if (bookmarked) {
        await axios.delete(`http://localhost:3000/bookmarks/${dance.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })

        const updated = saved.filter(id => id !== dance.id)
        localStorage.setItem('bookmarks', JSON.stringify(updated))
        setBookmarked(false)
      } else {
        await axios.post(
          'http://localhost:3000/bookmarks',
          { dance_id: dance.id },
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        )

        localStorage.setItem('bookmarks', JSON.stringify([...saved, dance.id]))
        setBookmarked(true)
      }
    } catch (err) {
      console.error('Bookmark error', err)
    }
  }

  return (
    <div
      onClick={() => navigate(`/dances/${dance.id}`)}
      style={{
        background: 'white',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        cursor: 'pointer',
        transition: 'all 0.3s'
      }}
      onMouseOver={e => (e.currentTarget.style.transform = 'translateY(-4px)')}
      onMouseOut={e => (e.currentTarget.style.transform = 'translateY(0)')}
    >
      <div style={{ position: 'relative', height: '192px', overflow: 'hidden' }}>
        <img
          src={`/${dance.image_url}`}
          alt={dance.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={e => {
            e.target.style.display = 'none'
            e.target.nextSibling.style.display = 'flex'
          }}
        />
        <div
          style={{
            display: 'none',
            background: 'linear-gradient(135deg, #f97316, #dc2626)',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <span style={{ color: 'white', fontSize: '20px', fontWeight: '700' }}>{dance.name}</span>
        </div>

        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)'
          }}
        />

        <button
          onClick={toggleBookmark}
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            background: 'rgba(255,255,255,0.9)',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: '18px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
          }}
        >
          {bookmarked ? '❤️' : '🤍'}
        </button>

        <span
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'rgba(255,255,255,0.9)',
            fontSize: '11px',
            fontWeight: '700',
            padding: '4px 10px',
            borderRadius: '20px'
          }}
        >
          {dance.dance_type}
        </span>
      </div>

      <div style={{ padding: '16px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#111827', margin: '0 0 4px' }}>
          {dance.name}
        </h3>
        <p style={{ fontSize: '12px', color: '#f97316', fontWeight: '600', margin: '0 0 8px' }}>
          📍 {dance.region}
        </p>
        <p
          style={{
            fontSize: '13px',
            color: '#6b7280',
            margin: '0 0 16px',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical'
          }}
        >
          {dance.description}
        </p>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '4px' }}>
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#f97316',
                display: 'inline-block'
              }}
            />
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#f97316',
                display: 'inline-block'
              }}
            />
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#e5e7eb',
                display: 'inline-block'
              }}
            />
          </div>

          <button
            style={{
              background: '#f97316',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '8px 16px',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Explore →
          </button>
        </div>
      </div>
    </div>
  )
}