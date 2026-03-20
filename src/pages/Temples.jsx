import { useState } from 'react'
import { Link } from 'react-router-dom'

const temples = [
  {
    name: 'Chidambaram Nataraja Temple',
    location: 'Chidambaram, Tamil Nadu',
    dance: 'Bharatanatyam',
    built: '7th Century CE',
    color: '#f97316',
    emoji: '🕌',
    description: 'The most sacred temple for Bharatanatyam dancers. Lord Shiva is worshipped here as Nataraja — the cosmic dancer. The temple walls are covered with 108 karanas (dance poses) from the Natya Shastra.',
    significance: 'Bharatanatyam dancers come here to perform Arangetram — their first stage performance. The temple is considered the birthplace of classical dance in India.',
    festivals: ['Natyanjali Dance Festival', 'Masi Magam', 'Arudra Darshan'],
    architecture: 'Dravidian style with magnificent gopurams (towers) decorated with dance sculptures',
    funFact: 'The 108 dance poses carved on temple walls match exactly with poses described in the 2000 year old Natya Shastra text!'
  },
  {
    name: 'Konark Sun Temple',
    location: 'Konark, Odisha',
    dance: 'Odissi',
    built: '13th Century CE',
    color: '#7c3aed',
    emoji: '☀️',
    description: 'UNESCO World Heritage Site shaped like a giant chariot of the Sun God. The temple walls are adorned with exquisite sculptures of dancers in Odissi poses.',
    significance: 'The annual Konark Dance Festival held here in December attracts top classical dancers from across India performing against this magnificent backdrop.',
    festivals: ['Konark Dance Festival', 'Magha Saptami', 'Chandrabhaga Mela'],
    architecture: 'Kalinga architecture style. The entire temple is designed as the chariot of Surya with 24 wheels and 7 horses',
    funFact: 'The wheels of the temple are actually giant sundials — you can tell the exact time of day from the shadows they cast!'
  },
  {
    name: 'Khajuraho Temples',
    location: 'Khajuraho, Madhya Pradesh',
    dance: 'Bharatanatyam, Kathak, Odissi',
    built: '10th-12th Century CE',
    color: '#dc2626',
    emoji: '🏛️',
    description: "UNESCO World Heritage Site famous for its stunning sculptures depicting dancers in various classical poses. The temples host the famous Khajuraho Dance Festival every February.",
    significance: "The annual Khajuraho Dance Festival is one of India's most prestigious classical dance events, held against the illuminated temple backdrop.",
    festivals: ['Khajuraho Dance Festival', 'Shivaratri'],
    architecture: 'Nagara style of North Indian temple architecture with intricate carvings covering every surface',
    funFact: 'Only 25 of the original 85 temples survive today but they contain some of the finest dance sculptures in the world!'
  },
  {
    name: 'Brihadeeswara Temple',
    location: 'Thanjavur, Tamil Nadu',
    dance: 'Bharatanatyam',
    built: '11th Century CE',
    color: '#d97706',
    emoji: '⛩️',
    description: 'UNESCO World Heritage Site built by Raja Raja Chola I. This magnificent temple was the center of Bharatanatyam during the Chola period when devadasis performed daily.',
    significance: 'The temple had 400 devadasi dancers who performed Bharatanatyam as daily worship. It was the most important center of classical dance in medieval India.',
    festivals: ['Navarathri Celebrations', 'Shivaratri', 'Thai Poosam'],
    architecture: 'Dravidian architecture with a 66 meter tall vimana (tower) — the tallest in India at the time of construction',
    funFact: 'The shadow of the main tower never falls on the ground at noon — an architectural marvel from 1000 years ago!'
  },
  {
    name: 'Guruvayur Temple',
    location: 'Guruvayur, Kerala',
    dance: 'Mohiniyattam, Kathakali',
    built: '16th Century CE',
    color: '#0891b2',
    emoji: '🛕',
    description: 'One of the most important Vishnu temples in Kerala. Kathakali and Mohiniyattam performances are regularly held in the temple grounds as offerings to Lord Krishna.',
    significance: "The temple's Krishnanattam dance drama is performed exclusively here and is the precursor to Kathakali. Artists train for years to perform here.",
    festivals: ['Guruvayur Ekadasi', 'Utsavam', 'Krishnanattam performances'],
    architecture: 'Traditional Kerala style with wooden carvings and a beautiful pond',
    funFact: "Krishnanattam performed here inspired the creation of Kathakali — making this temple the birthplace of Kerala's most famous dance drama!"
  },
  {
    name: 'Mamallapuram Shore Temple',
    location: 'Mamallapuram, Tamil Nadu',
    dance: 'Bharatanatyam, Kuchipudi',
    built: '8th Century CE',
    color: '#059669',
    emoji: '🌊',
    description: 'UNESCO World Heritage Site built by the Pallava dynasty overlooking the Bay of Bengal. The month-long Mamallapuram Dance Festival is held here every year.',
    significance: 'One of the most atmospheric venues for classical dance in India. The ancient stone temples by the sea create a magical backdrop for performances.',
    festivals: ['Mamallapuram Dance Festival', 'Tamil New Year celebrations'],
    architecture: 'Rock-cut Pallava architecture — temples carved directly from giant boulders and rock faces',
    funFact: 'After the 2004 tsunami, ancient submerged temples were briefly visible before being covered by water again — proving legends of a sunken city!'
  },
  {
    name: 'Puri Jagannath Temple',
    location: 'Puri, Odisha',
    dance: 'Odissi',
    built: '12th Century CE',
    color: '#9333ea',
    emoji: '🏯',
    description: 'One of the four sacred dhams of Hinduism. The devadasi tradition of Odissi dance was preserved here for centuries. The temple had hundreds of Maharis — temple dancers.',
    significance: 'The Mahari tradition of Odissi dance was practiced here continuously for over 800 years. Modern Odissi dance draws directly from these temple traditions.',
    festivals: ['Rath Yatra', 'Snana Yatra', 'Navarathri'],
    architecture: 'Kalinga architecture with a 65 meter tall shikhara (spire) visible from miles away',
    funFact: 'The flag on top of the temple always waves in the opposite direction of the wind — a mystery that has never been explained scientifically!'
  },
  {
    name: 'Kalakshetra Foundation',
    location: 'Chennai, Tamil Nadu',
    dance: 'Bharatanatyam',
    built: '1936 CE',
    color: '#db2777',
    emoji: '🎭',
    description: "India's most prestigious classical dance institution founded by Rukmini Devi Arundale. Located on a beautiful 100 acre campus, it has trained generations of Bharatanatyam dancers.",
    significance: 'Not a temple but the most important institution for Bharatanatyam. Every serious Bharatanatyam dancer dreams of training here.',
    festivals: ['Kalakshetra Arts Festival', 'Annual Day performances'],
    architecture: 'Beautiful campus with traditional architecture, open air theatres and dance studios surrounded by nature',
    funFact: 'Kalakshetra has its own unique style of Bharatanatyam called the Kalakshetra style which is recognized worldwide!'
  },
]

export default function Temples() {
  const [selected, setSelected] = useState(null)
  const [filter, setFilter] = useState('All')

  const danceTypes = ['All', 'Bharatanatyam', 'Odissi', 'Kathakali', 'Mohiniyattam', 'Kathak']
  const filtered = filter === 'All' ? temples : temples.filter(t => t.dance.includes(filter))

  return (
    <div style={{ minHeight: '100vh', background: '#fff7ed' }}>
      <div
        style={{
          background: 'linear-gradient(135deg, #f97316, #dc2626)',
          padding: '60px 32px',
          textAlign: 'center',
          color: 'white'
        }}
      >
        <div style={{ fontSize: '52px', marginBottom: '12px' }}>🕌</div>
        <h1 style={{ fontSize: '40px', fontWeight: '800', margin: '0 0 8px' }}>
          Famous Temples & Venues
        </h1>
        <p style={{ fontSize: '16px', opacity: 0.85, margin: '0 0 24px' }}>
          Sacred places where Indian dance was born and preserved
        </p>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <span
            style={{
              background: 'rgba(255,255,255,0.2)',
              padding: '6px 16px',
              borderRadius: '20px',
              fontSize: '13px'
            }}
          >
            {temples.length} Sacred Places
          </span>
          <span
            style={{
              background: 'rgba(255,255,255,0.2)',
              padding: '6px 16px',
              borderRadius: '20px',
              fontSize: '13px'
            }}
          >
            4 UNESCO Sites
          </span>
          <span
            style={{
              background: 'rgba(255,255,255,0.2)',
              padding: '6px 16px',
              borderRadius: '20px',
              fontSize: '13px'
            }}
          >
            🇮🇳 Pan India
          </span>
        </div>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '32px', justifyContent: 'center' }}>
          {danceTypes.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '8px 20px',
                borderRadius: '50px',
                fontWeight: '600',
                fontSize: '13px',
                cursor: 'pointer',
                border: filter === f ? 'none' : '2px solid #f97316',
                background: filter === f ? '#f97316' : 'transparent',
                color: filter === f ? 'white' : '#f97316'
              }}
            >
              {f}
            </button>
          ))}
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '24px'
          }}
        >
          {filtered.map(temple => (
            <div
              key={temple.name}
              onClick={() => setSelected(selected?.name === temple.name ? null : temple)}
              style={{
                background: 'white',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                cursor: 'pointer',
                transition: 'all 0.3s',
                border: selected?.name === temple.name ? `2px solid ${temple.color}` : '2px solid transparent'
              }}
              onMouseOver={e => (e.currentTarget.style.transform = 'translateY(-6px)')}
              onMouseOut={e => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <div
                style={{
                  background: `linear-gradient(135deg, ${temple.color}22, ${temple.color}55)`,
                  padding: '28px 24px',
                  borderBottom: `3px solid ${temple.color}`,
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '-20px',
                    right: '-20px',
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    background: `${temple.color}22`
                  }}
                />
                <div style={{ fontSize: '52px', marginBottom: '12px' }}>{temple.emoji}</div>
                <h3 style={{ fontSize: '17px', fontWeight: '800', color: '#111827', margin: '0 0 6px' }}>
                  {temple.name}
                </h3>
                <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 4px' }}>
                  📍 {temple.location}
                </p>
                <p style={{ fontSize: '11px', color: temple.color, fontWeight: '600', margin: 0 }}>
                  🏛️ Built: {temple.built}
                </p>
              </div>

              <div style={{ padding: '20px 24px' }}>
                <div style={{ marginBottom: '12px' }}>
                  <span
                    style={{
                      background: '#fff7ed',
                      color: '#f97316',
                      fontSize: '12px',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontWeight: '600',
                      border: '1px solid #fed7aa'
                    }}
                  >
                    💃 {temple.dance}
                  </span>
                </div>

                <p
                  style={{
                    fontSize: '13px',
                    color: '#6b7280',
                    lineHeight: '1.7',
                    margin: '0 0 12px',
                    overflow: 'hidden',
                    display: selected?.name === temple.name ? 'block' : '-webkit-box',
                    WebkitLineClamp: selected?.name === temple.name ? 'unset' : 3,
                    WebkitBoxOrient: 'vertical'
                  }}
                >
                  {temple.description}
                </p>

                {selected?.name === temple.name && (
                  <>
                    <div
                      style={{
                        background: '#fff7ed',
                        borderRadius: '8px',
                        padding: '12px',
                        marginBottom: '12px',
                        borderLeft: `3px solid ${temple.color}`
                      }}
                    >
                      <p style={{ fontSize: '12px', fontWeight: '600', color: '#f97316', margin: '0 0 4px' }}>
                        🎭 Dance Significance
                      </p>
                      <p style={{ fontSize: '12px', color: '#6b7280', margin: 0, lineHeight: '1.7' }}>
                        {temple.significance}
                      </p>
                    </div>

                    <div
                      style={{
                        background: '#f0fdf4',
                        borderRadius: '8px',
                        padding: '12px',
                        marginBottom: '12px',
                        borderLeft: '3px solid #22c55e'
                      }}
                    >
                      <p style={{ fontSize: '12px', fontWeight: '600', color: '#166534', margin: '0 0 4px' }}>
                        🏗️ Architecture
                      </p>
                      <p style={{ fontSize: '12px', color: '#6b7280', margin: 0, lineHeight: '1.7' }}>
                        {temple.architecture}
                      </p>
                    </div>

                    <div
                      style={{
                        background: '#eff6ff',
                        borderRadius: '8px',
                        padding: '12px',
                        marginBottom: '12px',
                        borderLeft: '3px solid #3b82f6'
                      }}
                    >
                      <p style={{ fontSize: '12px', fontWeight: '600', color: '#1d4ed8', margin: '0 0 4px' }}>
                        💡 Amazing Fact
                      </p>
                      <p style={{ fontSize: '12px', color: '#6b7280', margin: 0, lineHeight: '1.7' }}>
                        {temple.funFact}
                      </p>
                    </div>

                    <div>
                      <p
                        style={{
                          fontSize: '11px',
                          fontWeight: '600',
                          color: '#9ca3af',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                          margin: '0 0 8px'
                        }}
                      >
                        🎪 Festivals & Events
                      </p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {temple.festivals.map(fest => (
                          <span
                            key={fest}
                            style={{
                              background: '#fef3c7',
                              color: '#d97706',
                              fontSize: '11px',
                              padding: '3px 10px',
                              borderRadius: '20px',
                              fontWeight: '600'
                            }}
                          >
                            🪔 {fest}
                          </span>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                <p
                  style={{
                    fontSize: '12px',
                    color: temple.color,
                    fontWeight: '600',
                    margin: '12px 0 0',
                    textAlign: 'right'
                  }}
                >
                  {selected?.name === temple.name ? '▲ Show less' : '▼ Read more'}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link
            to="/"
            style={{
              color: '#f97316',
              fontSize: '13px',
              fontWeight: '600',
              textDecoration: 'none'
            }}
          >
            ← Back to Dance Forms
          </Link>
        </div>
      </div>
    </div>
  )
}