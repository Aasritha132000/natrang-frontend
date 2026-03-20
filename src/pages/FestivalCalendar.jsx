import { useState } from 'react'
import { Link } from 'react-router-dom'

const festivals = [
  {
    name: 'Navratri',
    month: 'October',
    monthNum: 10,
    duration: '9 nights',
    region: 'Gujarat, Pan India',
    description: 'Nine nights of worship dedicated to Goddess Durga. The most vibrant festival for Indian dance especially Garba and Dandiya.',
    dances: ['Garba', 'Kathak', 'Bharatanatyam'],
    emoji: '🪔',
    color: '#f97316',
    rituals: 'Fasting, worship of 9 forms of Durga, Garba dance every night'
  },
  {
    name: 'Bihu',
    month: 'April',
    monthNum: 4,
    duration: '3 days',
    region: 'Assam',
    description: 'Assamese New Year celebrated with great joy. Bihu dance is performed by young men and women in colorful traditional attire.',
    dances: ['Bihu', 'Sattriya'],
    emoji: '🌾',
    color: '#22c55e',
    rituals: 'Bihu dance, music, exchange of Bihu gifts, feasting'
  },
  {
    name: 'Onam',
    month: 'August',
    monthNum: 8,
    duration: '10 days',
    region: 'Kerala',
    description: 'Kerala harvest festival celebrating the return of King Mahabali. Mohiniyattam and Kathakali performances are central to celebrations.',
    dances: ['Mohiniyattam', 'Kathakali', 'Thiruvathirakali'],
    emoji: '🌺',
    color: '#0891b2',
    rituals: 'Pookalam flower carpet, Onam Sadhya feast, snake boat races, dance performances'
  },
  {
    name: 'Dussehra',
    month: 'October',
    monthNum: 10,
    duration: '10 days',
    region: 'Pan India',
    description: 'Victory of good over evil. Ramlila performances featuring Kathak and classical dance forms depict the story of Rama.',
    dances: ['Kathak', 'Bharatanatyam', 'Kuchipudi'],
    emoji: '🏹',
    color: '#dc2626',
    rituals: 'Ramlila performances, burning of Ravana effigy, processions'
  },
  {
    name: 'Pongal',
    month: 'January',
    monthNum: 1,
    duration: '4 days',
    region: 'Tamil Nadu',
    description: 'Tamil harvest festival thanking the Sun God. Bharatanatyam performances are held in temples across Tamil Nadu.',
    dances: ['Bharatanatyam', 'Karagattam'],
    emoji: '☀️',
    color: '#d97706',
    rituals: 'Cooking Pongal rice, Kolam rangoli, cattle worship, temple performances'
  },
  {
    name: 'Durga Puja',
    month: 'October',
    monthNum: 10,
    duration: '5 days',
    region: 'West Bengal, Pan India',
    description: 'Worship of Goddess Durga with grand pandals and cultural programs including classical dance performances.',
    dances: ['Odissi', 'Bharatanatyam', 'Manipuri'],
    emoji: '🙏',
    color: '#7c3aed',
    rituals: 'Pandal hopping, dhunuchi dance, sindoor khela, cultural programs'
  },
  {
    name: 'Holi',
    month: 'March',
    monthNum: 3,
    duration: '2 days',
    region: 'North India',
    description: 'Festival of colors celebrated with Kathak dance performances especially in Mathura and Vrindavan.',
    dances: ['Kathak', 'Manipuri', 'Garba'],
    emoji: '🎨',
    color: '#db2777',
    rituals: 'Playing with colors, Holika bonfire, Holi milan, folk dance performances'
  },
  {
    name: 'Khajuraho Dance Festival',
    month: 'February',
    monthNum: 2,
    duration: '7 days',
    region: 'Madhya Pradesh',
    description: 'Week long classical dance festival held against the backdrop of the magnificent Khajuraho temples.',
    dances: ['Bharatanatyam', 'Kathak', 'Odissi', 'Kuchipudi', 'Manipuri', 'Kathakali'],
    emoji: '🏛️',
    color: '#0284c7',
    rituals: 'Classical dance performances by top artists from across India'
  },
  {
    name: 'Mamallapuram Dance Festival',
    month: 'December',
    monthNum: 12,
    duration: '30 days',
    region: 'Tamil Nadu',
    description: 'Month long dance festival held at the UNESCO heritage site of Mamallapuram shore temples.',
    dances: ['Bharatanatyam', 'Kuchipudi', 'Odissi', 'Mohiniyattam'],
    emoji: '🌊',
    color: '#059669',
    rituals: 'Classical dance performances at ancient stone temples by the sea'
  },
  {
    name: 'Konark Dance Festival',
    month: 'December',
    monthNum: 12,
    duration: '5 days',
    region: 'Odisha',
    description: 'Annual classical dance festival at the Sun Temple of Konark celebrating Odissi and other classical forms.',
    dances: ['Odissi', 'Bharatanatyam', 'Kathak', 'Manipuri'],
    emoji: '🌅',
    color: '#9333ea',
    rituals: 'Classical dance performances at the 13th century Sun Temple'
  },
  {
    name: 'Baisakhi',
    month: 'April',
    monthNum: 4,
    duration: '1 day',
    region: 'Punjab',
    description: 'Punjabi harvest festival celebrated with energetic Bhangra and Giddha dance performances.',
    dances: ['Bhangra'],
    emoji: '🌻',
    color: '#65a30d',
    rituals: 'Bhangra and Giddha performances, processions, feasting'
  },
  {
    name: 'Ganesh Chaturthi',
    month: 'August',
    monthNum: 8,
    duration: '10 days',
    region: 'Maharashtra, Pan India',
    description: 'Festival of Lord Ganesha with Lavani and other Maharashtra folk dance performances.',
    dances: ['Lavani', 'Bharatanatyam', 'Kuchipudi'],
    emoji: '🐘',
    color: '#f97316',
    rituals: 'Ganesha idol installation, aarti, cultural programs, Lavani performances, immersion'
  },
]

const months = ['All', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export default function FestivalCalendar() {
  const [selectedMonth, setSelectedMonth] = useState('All')
  const [selected, setSelected] = useState(null)

  const filtered = selectedMonth === 'All' ? festivals : festivals.filter(f => f.month === selectedMonth)

  const upcomingFestivals = [...festivals]
    .sort((a, b) => {
      const currentMonth = new Date().getMonth() + 1
      const aMonths = a.monthNum >= currentMonth ? a.monthNum - currentMonth : a.monthNum + 12 - currentMonth
      const bMonths = b.monthNum >= currentMonth ? b.monthNum - currentMonth : b.monthNum + 12 - currentMonth
      return aMonths - bMonths
    })
    .slice(0, 3)

  return (
    <div style={{ minHeight: '100vh', background: '#fff7ed' }}>
      <div style={{ background: 'linear-gradient(135deg, #f97316, #dc2626)', padding: '60px 32px', textAlign: 'center', color: 'white' }}>
        <div style={{ fontSize: '52px', marginBottom: '12px' }}>📅</div>
        <h1 style={{ fontSize: '40px', fontWeight: '800', margin: '0 0 8px' }}>Festival Calendar</h1>
        <p style={{ fontSize: '16px', opacity: 0.85, margin: '0 0 24px' }}>Discover Indian festivals and their traditional dance forms</p>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <span style={{ background: 'rgba(255,255,255,0.2)', padding: '6px 16px', borderRadius: '20px', fontSize: '13px' }}>
            {festivals.length} Festivals
          </span>
          <span style={{ background: 'rgba(255,255,255,0.2)', padding: '6px 16px', borderRadius: '20px', fontSize: '13px' }}>
            All Seasons
          </span>
          <span style={{ background: 'rgba(255,255,255,0.2)', padding: '6px 16px', borderRadius: '20px', fontSize: '13px' }}>
            🇮🇳 Pan India
          </span>
        </div>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#111827', margin: '0 0 16px' }}>🔜 Coming Up Next</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            {upcomingFestivals.map(f => (
              <div
                key={f.name}
                style={{
                  background: 'white',
                  borderRadius: '16px',
                  padding: '20px',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                  borderLeft: `4px solid ${f.color}`
                }}
              >
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '32px' }}>{f.emoji}</span>
                  <div>
                    <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#111827', margin: '0 0 2px' }}>{f.name}</h3>
                    <p style={{ fontSize: '12px', color: '#9ca3af', margin: 0 }}>
                      {f.month} • {f.duration}
                    </p>
                  </div>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {f.dances.slice(0, 2).map(d => (
                    <span
                      key={d}
                      style={{
                        background: '#fff7ed',
                        color: '#f97316',
                        fontSize: '11px',
                        padding: '2px 8px',
                        borderRadius: '20px',
                        fontWeight: '600'
                      }}
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '32px', justifyContent: 'center' }}>
          {months.map(month => (
            <button
              key={month}
              onClick={() => setSelectedMonth(month)}
              style={{
                padding: '7px 16px',
                borderRadius: '50px',
                fontWeight: '600',
                fontSize: '12px',
                cursor: 'pointer',
                border: selectedMonth === month ? 'none' : '2px solid #f97316',
                background: selectedMonth === month ? '#f97316' : 'transparent',
                color: selectedMonth === month ? 'white' : '#f97316'
              }}
            >
              {month}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
          {filtered.map(festival => (
            <div
              key={festival.name}
              onClick={() => setSelected(selected?.name === festival.name ? null : festival)}
              style={{
                background: 'white',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                cursor: 'pointer',
                transition: 'all 0.3s',
                border: selected?.name === festival.name ? `2px solid ${festival.color}` : '2px solid transparent'
              }}
              onMouseOver={e => (e.currentTarget.style.transform = 'translateY(-4px)')}
              onMouseOut={e => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <div
                style={{
                  background: `linear-gradient(135deg, ${festival.color}22, ${festival.color}44)`,
                  padding: '20px 24px',
                  borderBottom: `3px solid ${festival.color}`
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '40px' }}>{festival.emoji}</span>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '12px', fontWeight: '700', color: festival.color }}>{festival.month}</span>
                    <p style={{ fontSize: '11px', color: '#9ca3af', margin: '2px 0 0' }}>{festival.duration}</p>
                  </div>
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#111827', margin: '8px 0 4px' }}>{festival.name}</h3>
                <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>📍 {festival.region}</p>
              </div>

              <div style={{ padding: '16px 24px' }}>
                <p
                  style={{
                    fontSize: '13px',
                    color: '#6b7280',
                    lineHeight: '1.7',
                    margin: '0 0 12px',
                    overflow: 'hidden',
                    display: selected?.name === festival.name ? 'block' : '-webkit-box',
                    WebkitLineClamp: selected?.name === festival.name ? 'unset' : 2,
                    WebkitBoxOrient: 'vertical'
                  }}
                >
                  {festival.description}
                </p>

                {selected?.name === festival.name && (
                  <div style={{ background: '#fff7ed', borderRadius: '8px', padding: '12px', marginBottom: '12px' }}>
                    <p style={{ fontSize: '12px', fontWeight: '600', color: '#f97316', margin: '0 0 4px' }}>🎭 Rituals & Celebrations</p>
                    <p style={{ fontSize: '12px', color: '#6b7280', margin: 0, lineHeight: '1.7' }}>{festival.rituals}</p>
                  </div>
                )}

                <div>
                  <p
                    style={{
                      fontSize: '11px',
                      color: '#9ca3af',
                      margin: '0 0 6px',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}
                  >
                    Dance Forms
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {festival.dances.map(dance => (
                      <span
                        key={dance}
                        style={{
                          background: '#fff7ed',
                          color: '#f97316',
                          fontSize: '11px',
                          padding: '3px 10px',
                          borderRadius: '20px',
                          fontWeight: '600',
                          border: '1px solid #fed7aa'
                        }}
                      >
                        💃 {dance}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px' }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>📅</div>
            <p style={{ fontSize: '18px', fontWeight: '600', color: '#111827' }}>No festivals in this month!</p>
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link to="/" style={{ color: '#f97316', fontSize: '13px', fontWeight: '600', textDecoration: 'none' }}>
            ← Back to Dance Forms
          </Link>
        </div>
      </div>
    </div>
  )
}