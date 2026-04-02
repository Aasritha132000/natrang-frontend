import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const TIME_SLOTS = [
  '7:00 AM - 8:00 AM',
  '8:00 AM - 9:00 AM',
  '9:00 AM - 10:00 AM',
  '4:00 PM - 5:00 PM',
  '5:00 PM - 6:00 PM',
  '6:00 PM - 7:00 PM'
]

export default function Booking() {
  const navigate = useNavigate()
  const [dances, setDances] = useState([])
  const [myBookings, setMyBookings] = useState([])
  const [activeTab, setActiveTab] = useState('book')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const [danceId, setDanceId] = useState('')
  const [level, setLevel] = useState('Beginner')
  const [date, setDate] = useState('')
  const [timeSlot, setTimeSlot] = useState('')
  const [notes, setNotes] = useState('')

  const token = localStorage.getItem('token')

  useEffect(() => {
    if (!token) { navigate('/login'); return }
    fetchDances()
    fetchMyBookings()
  }, [])

  async function fetchDances() {
    const res = await axios.get('https://natrang-backend.onrender.com/dances', {
      headers: { Authorization: `Bearer ${token}` }
    })
    setDances(res.data)
  }

  async function fetchMyBookings() {
    const res = await axios.get('https://natrang-backend.onrender.com/bookings', {
      headers: { Authorization: `Bearer ${token}` }
    })
    setMyBookings(res.data)
  }

  async function submitBooking(e) {
    e.preventDefault()
    setMessage('')
    setError('')
    try {
      await axios.post('https://natrang-backend.onrender.com/bookings',
        { dance_id: danceId, level, date, time_slot: timeSlot, notes },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setMessage('✅ Booking request sent! Admin will confirm soon.')
      setDanceId('')
      setLevel('Beginner')
      setDate('')
      setTimeSlot('')
      setNotes('')
      fetchMyBookings()
      setActiveTab('mybookings')
    } catch (err) {
      setError(err.response?.data?.error || '❌ Failed to book slot!')
    }
  }

  const statusColor = (status) => {
    if (status === 'confirmed') return { bg: '#dcfce7', color: '#166534' }
    if (status === 'rejected') return { bg: '#fef2f2', color: '#dc2626' }
    return { bg: '#fef3c7', color: '#d97706' }
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <div style={{ minHeight: '100vh', background: '#fff7ed' }}>
      <div style={{ background: 'linear-gradient(135deg, #f97316, #dc2626)', padding: '40px 32px', textAlign: 'center', color: 'white' }}>
        <h1 style={{ fontSize: '36px', fontWeight: '800', margin: '0 0 8px' }}>🗓️ Book a Class</h1>
        <p style={{ fontSize: '16px', opacity: 0.9, margin: 0 }}>Reserve your slot for dance lessons</p>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
          {['book', 'mybookings'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              style={{ padding: '10px 24px', borderRadius: '50px', fontWeight: '600', fontSize: '14px', cursor: 'pointer', border: activeTab === tab ? 'none' : '2px solid #f97316', background: activeTab === tab ? '#f97316' : 'transparent', color: activeTab === tab ? 'white' : '#f97316' }}>
              {tab === 'book' ? '➕ Book a Slot' : '📋 My Bookings'}
            </button>
          ))}
        </div>

        {message && <div style={{ background: '#dcfce7', border: '1px solid #86efac', borderRadius: '10px', padding: '12px 16px', marginBottom: '20px', color: '#166534', fontWeight: '600' }}>{message}</div>}
        {error && <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '10px', padding: '12px 16px', marginBottom: '20px', color: '#dc2626', fontWeight: '600' }}>{error}</div>}

        {activeTab === 'book' && (
          <div style={{ background: 'white', borderRadius: '20px', padding: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#111827', margin: '0 0 24px' }}>Fill Booking Details</h2>
            <form onSubmit={submitBooking}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#6b7280', marginBottom: '6px', textTransform: 'uppercase' }}>Dance Form</label>
                <select value={danceId} onChange={e => setDanceId(e.target.value)} required
                  style={{ width: '100%', padding: '10px 14px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '14px', outline: 'none' }}>
                  <option value="">Select dance form</option>
                  {dances.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                </select>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#6b7280', marginBottom: '6px', textTransform: 'uppercase' }}>Level</label>
                <select value={level} onChange={e => setLevel(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '14px', outline: 'none' }}>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#6b7280', marginBottom: '6px', textTransform: 'uppercase' }}>Date</label>
                <input type="date" value={date} onChange={e => setDate(e.target.value)} required min={today}
                  style={{ width: '100%', boxSizing: 'border-box', padding: '10px 14px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '14px', outline: 'none' }} />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#6b7280', marginBottom: '6px', textTransform: 'uppercase' }}>Time Slot</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                  {TIME_SLOTS.map(slot => (
                    <button type="button" key={slot} onClick={() => setTimeSlot(slot)}
                      style={{ padding: '10px', borderRadius: '8px', border: timeSlot === slot ? 'none' : '2px solid #e5e7eb', background: timeSlot === slot ? '#f97316' : 'white', color: timeSlot === slot ? 'white' : '#374151', fontWeight: '600', fontSize: '13px', cursor: 'pointer' }}>
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#6b7280', marginBottom: '6px', textTransform: 'uppercase' }}>Notes (Optional)</label>
                <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Any special requirements..."
                  rows={3} style={{ width: '100%', boxSizing: 'border-box', padding: '10px 14px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '14px', outline: 'none', resize: 'none' }} />
              </div>

              <button type="submit"
                style={{ width: '100%', background: 'linear-gradient(135deg, #f97316, #dc2626)', color: 'white', border: 'none', borderRadius: '10px', padding: '14px', fontSize: '15px', fontWeight: '700', cursor: 'pointer' }}>
                🗓️ Request Booking
              </button>
            </form>
          </div>
        )}

        {activeTab === 'mybookings' && (
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#111827', margin: '0 0 20px' }}>My Bookings</h2>
            {myBookings.length === 0 ? (
              <div style={{ background: 'white', borderRadius: '20px', padding: '40px', textAlign: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                <div style={{ fontSize: '48px', marginBottom: '12px' }}>🗓️</div>
                <p style={{ fontSize: '16px', fontWeight: '600', color: '#111827' }}>No bookings yet!</p>
                <button onClick={() => setActiveTab('book')}
                  style={{ background: '#f97316', color: 'white', border: 'none', borderRadius: '8px', padding: '10px 24px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', marginTop: '12px' }}>
                  Book a Slot
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {myBookings.map(b => {
                  const sc = statusColor(b.status)
                  return (
                    <div key={b.id} style={{ background: 'white', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', borderLeft: `4px solid ${sc.color}` }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#111827', margin: 0 }}>{b.dance_name}</h3>
                        <span style={{ background: sc.bg, color: sc.color, fontSize: '12px', fontWeight: '700', padding: '4px 12px', borderRadius: '20px', textTransform: 'uppercase' }}>
                          {b.status}
                        </span>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '13px', color: '#6b7280' }}>
                        <div>📅 {b.date}</div>
                        <div>⏰ {b.time_slot}</div>
                        <div>🎯 {b.level}</div>
                        <div>📆 Booked on {b.created_at}</div>
                      </div>
                      {b.notes && <p style={{ fontSize: '13px', color: '#9ca3af', margin: '8px 0 0' }}>📝 {b.notes}</p>}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
