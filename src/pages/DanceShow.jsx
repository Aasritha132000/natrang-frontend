import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

export default function DanceShow() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [dance, setDance] = useState(null)
  const [completedVideos, setCompletedVideos] = useState([])
  const [reviews, setReviews] = useState([])
  const [avgRating, setAvgRating] = useState(0)
  const [userRating, setUserRating] = useState(5)
  const [userComment, setUserComment] = useState('')

  async function fetchReviews() {
    try {
      const token = localStorage.getItem('token')
      const res = await axios.get(`https://natrang-backend.onrender.com/dances/${id}/reviews`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setReviews(res.data.reviews)
      setAvgRating(res.data.average)
    } catch (error) {
      console.error('Error fetching reviews:', error)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token) {
      navigate('/login')
      return
    }

    axios
      .get(`https://natrang-backend.onrender.com/dances/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => setDance(res.data))
      .catch(() => navigate('/'))

    axios
      .get('https://natrang-backend.onrender.com/progress', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => setCompletedVideos(res.data.completed_video_ids))
      .catch(error => console.error('Error fetching progress:', error))

    fetchReviews()
  }, [id, navigate])

  async function toggleProgress(videoId) {
    const token = localStorage.getItem('token')

    try {
      if (completedVideos.includes(videoId)) {
        await axios.delete(`https://natrang-backend.onrender.com/progress/${videoId}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setCompletedVideos(completedVideos.filter(id => id !== videoId))
      } else {
        await axios.post(
          'https://natrang-backend.onrender.com/progress',
          { video_id: videoId },
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        )
        setCompletedVideos([...completedVideos, videoId])
      }
    } catch (error) {
      console.error('Error updating progress:', error)
    }
  }

  async function submitReview() {
    if (!userComment.trim()) return

    try {
      const token = localStorage.getItem('token')
      await axios.post(
        `https://natrang-backend.onrender.com/dances/${id}/reviews`,
        { rating: userRating, comment: userComment },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setUserComment('')
      fetchReviews()
    } catch (error) {
      console.error('Error submitting review:', error)
    }
  }

  if (!dance) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontSize: '24px' }}>Loading... 💃</div>
      </div>
    )
  }

  const completedCount = dance.videos?.filter(v => completedVideos.includes(v.id)).length || 0
  const totalVideos = dance.videos?.length || 0
  const progressPercent = totalVideos > 0 ? Math.round((completedCount / totalVideos) * 100) : 0

  return (
    <div style={{ minHeight: '100vh', background: '#fff7ed' }}>
      <div style={{ position: 'relative', height: '400px', overflow: 'hidden' }}>
        <img
          src={`/${dance.image_url}`}
          alt={dance.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={e => (e.target.style.display = 'none')}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }} />
        <div style={{ position: 'absolute', top: '24px', left: '24px', zIndex: 10 }}>
          <Link
            to="/"
            style={{
              background: 'rgba(255,255,255,0.2)',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '13px',
              fontWeight: '600',
              backdropFilter: 'blur(4px)',
              border: '1px solid rgba(255,255,255,0.3)'
            }}
          >
            ← Back to Dances
          </Link>
        </div>
        <div style={{ position: 'absolute', bottom: '32px', left: '40px', zIndex: 10, color: 'white' }}>
          <span
            style={{
              background: '#f97316',
              fontSize: '11px',
              fontWeight: '700',
              padding: '4px 12px',
              borderRadius: '20px',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}
          >
            {dance.dance_type}
          </span>
          <h1 style={{ fontSize: '52px', fontWeight: '800', margin: '8px 0 4px', textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}>
            {dance.name}
          </h1>
          <p style={{ fontSize: '16px', opacity: 0.85 }}>📍 {dance.region}</p>
        </div>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 24px' }}>
        {totalVideos > 0 && (
          <div style={{ background: 'white', borderRadius: '16px', padding: '24px', marginBottom: '32px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#111827', margin: 0 }}>📊 Your Progress</h3>
              <span style={{ fontSize: '14px', fontWeight: '600', color: '#f97316' }}>
                {completedCount}/{totalVideos} completed ({progressPercent}%)
              </span>
            </div>
            <div style={{ background: '#f3f4f6', borderRadius: '50px', height: '12px', overflow: 'hidden' }}>
              <div
                style={{
                  background: 'linear-gradient(90deg, #f97316, #dc2626)',
                  height: '100%',
                  borderRadius: '50px',
                  width: `${progressPercent}%`,
                  transition: 'width 0.5s ease'
                }}
              />
            </div>
            {progressPercent === 100 && (
              <div style={{ textAlign: 'center', marginTop: '12px', fontSize: '20px' }}>
                🎉 Congratulations! You completed all {dance.name} lessons! ⭐
              </div>
            )}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '40px' }}>
          <div style={{ background: 'white', borderRadius: '16px', padding: '28px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#111827', margin: '0 0 12px' }}>💃 About {dance.name}</h2>
            <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.8', margin: 0 }}>{dance.description}</p>
          </div>
          <div style={{ background: 'white', borderRadius: '16px', padding: '28px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#111827', margin: '0 0 12px' }}>📜 History</h2>
            <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.8', margin: 0 }}>{dance.history}</p>
          </div>
        </div>

        <div style={{ background: 'linear-gradient(135deg, #f97316, #dc2626)', borderRadius: '16px', padding: '28px', marginBottom: '40px', color: 'white' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '700', margin: '0 0 20px' }}>⚡ Quick Facts</h2>
          <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
            {[
              { label: 'Dance Form', value: dance.name },
              { label: 'Region', value: dance.region },
              { label: 'Type', value: dance.dance_type },
              { label: 'Origin Year', value: dance.origin_year || 'Ancient' },
              { label: 'Videos', value: `${totalVideos} Lessons` }
            ].map(fact => (
              <div key={fact.label}>
                <div style={{ fontSize: '11px', opacity: 0.75, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>
                  {fact.label}
                </div>
                <div style={{ fontSize: '16px', fontWeight: '700' }}>{fact.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px', marginBottom: '40px' }}>
          <div style={{ background: 'white', borderRadius: '16px', padding: '28px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#111827', margin: '0 0 12px' }}>🤲 Mudras</h2>
            <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.8', margin: 0 }}>{dance.mudras}</p>
          </div>
          <div style={{ background: 'white', borderRadius: '16px', padding: '28px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#111827', margin: '0 0 12px' }}>👗 Costumes</h2>
            <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.8', margin: 0 }}>{dance.costumes}</p>
          </div>
          <div style={{ background: 'white', borderRadius: '16px', padding: '28px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#111827', margin: '0 0 12px' }}>🎵 Instruments</h2>
            <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.8', margin: 0 }}>{dance.instruments}</p>
          </div>
        </div>

        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#111827', margin: '0 0 20px' }}>🎬 Video Lessons</h2>
          {dance.videos && dance.videos.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
              {dance.videos.map(video => {
                const youtubeId = video.youtube_url?.match(/(?:v=|youtu\.be\/)([^&\n?#]+)/)?.[1]
                const isCompleted = completedVideos.includes(video.id)

                return (
                  <div
                    key={video.id}
                    style={{
                      background: 'white',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                      border: isCompleted ? '2px solid #22c55e' : '2px solid transparent'
                    }}
                  >
                    {youtubeId ? (
                      <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
                        <iframe
                          src={`https://www.youtube.com/embed/${youtubeId}`}
                          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                          allowFullScreen
                          title={video.title}
                        />
                      </div>
                    ) : (
                      <div style={{ height: '180px', background: 'linear-gradient(135deg, #f97316, #dc2626)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ color: 'white', fontSize: '40px' }}>🎬</span>
                      </div>
                    )}

                    <div style={{ padding: '16px' }}>
                      <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#111827', margin: '0 0 8px' }}>{video.title}</h3>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '11px', background: '#fef3c7', color: '#d97706', padding: '2px 8px', borderRadius: '20px', fontWeight: '600' }}>
                          {video.level}
                        </span>
                        <button
                          onClick={() => toggleProgress(video.id)}
                          style={{
                            fontSize: '12px',
                            fontWeight: '600',
                            padding: '6px 14px',
                            borderRadius: '8px',
                            border: 'none',
                            cursor: 'pointer',
                            background: isCompleted ? '#dcfce7' : '#f97316',
                            color: isCompleted ? '#166534' : 'white'
                          }}
                        >
                          {isCompleted ? '✅ Completed' : 'Mark Complete'}
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div style={{ background: 'white', borderRadius: '16px', padding: '40px', textAlign: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: '48px', marginBottom: '12px' }}>🎬</div>
              <p style={{ fontSize: '16px', fontWeight: '600', color: '#111827', margin: '0 0 4px' }}>Videos Coming Soon!</p>
              <p style={{ fontSize: '13px', color: '#9ca3af', margin: 0 }}>We are adding video lessons for {dance.name} soon!</p>
            </div>
          )}
        </div>

        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#111827', margin: '0 0 20px' }}>⭐ Ratings & Reviews</h2>

          <div style={{ background: 'white', borderRadius: '16px', padding: '28px', marginBottom: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#111827', margin: '0 0 16px' }}>Write a Review</h3>
            <div style={{ marginBottom: '12px' }}>
              <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 8px' }}>Your Rating:</p>
              <div style={{ display: 'flex', gap: '8px' }}>
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    onClick={() => setUserRating(star)}
                    style={{ fontSize: '28px', background: 'none', border: 'none', cursor: 'pointer', opacity: star <= userRating ? 1 : 0.3 }}
                  >
                    ⭐
                  </button>
                ))}
              </div>
            </div>

            <textarea
              value={userComment}
              onChange={e => setUserComment(e.target.value)}
              placeholder="Share your experience with this dance form..."
              rows={3}
              style={{
                width: '100%',
                boxSizing: 'border-box',
                padding: '10px 14px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '13px',
                outline: 'none',
                resize: 'none',
                marginBottom: '12px'
              }}
            />

            <button
              onClick={submitReview}
              style={{
                background: '#f97316',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '10px 24px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Submit Review ⭐
            </button>
          </div>

          {reviews.length > 0 && (
            <div>
              <div
                style={{
                  background: 'linear-gradient(135deg, #f97316, #dc2626)',
                  borderRadius: '16px',
                  padding: '20px 28px',
                  marginBottom: '16px',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '24px'
                }}
              >
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '48px', fontWeight: '800' }}>{avgRating}</div>
                  <div style={{ fontSize: '13px', opacity: 0.85 }}>Average Rating</div>
                </div>
                <div>
                  <div style={{ fontSize: '24px', marginBottom: '4px' }}>{'⭐'.repeat(Math.round(avgRating))}</div>
                  <div style={{ fontSize: '13px', opacity: 0.85 }}>
                    {reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {reviews.map(review => (
                  <div key={review.id} style={{ background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <div>
                        <span style={{ fontWeight: '600', color: '#111827', fontSize: '14px' }}>👤 {review.user_name}</span>
                        <span style={{ fontSize: '12px', color: '#9ca3af', marginLeft: '8px' }}>{review.created_at}</span>
                      </div>
                      <div style={{ fontSize: '16px' }}>{'⭐'.repeat(review.rating)}</div>
                    </div>
                    <p style={{ fontSize: '13px', color: '#6b7280', margin: 0, lineHeight: '1.7' }}>{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {reviews.length === 0 && (
            <div style={{ background: 'white', borderRadius: '16px', padding: '40px', textAlign: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: '48px', marginBottom: '12px' }}>⭐</div>
              <p style={{ fontSize: '16px', fontWeight: '600', color: '#111827', margin: '0 0 4px' }}>No reviews yet!</p>
              <p style={{ fontSize: '13px', color: '#9ca3af', margin: 0 }}>Be the first to review {dance.name}!</p>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            to="/"
            style={{
              background: 'white',
              color: '#f97316',
              border: '2px solid #f97316',
              padding: '12px 32px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '600'
            }}
          >
            ← Back to All Dances
          </Link>

          <Link
            to={`/dances/${id}/quiz`}
            style={{
              background: 'linear-gradient(135deg, #f97316, #dc2626)',
              color: 'white',
              padding: '12px 32px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '600'
            }}
          >
            🎯 Take Quiz
          </Link>
        </div>
      </div>
    </div>
  )
}