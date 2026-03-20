import { useState } from 'react'
import { Link } from 'react-router-dom'

const mudras = [
  { name: 'Pataka', meaning: 'Flag', description: 'All fingers extended and joined together, thumb bent. Used to represent a flag, cloud, forest, or blessing.', dances: ['Bharatanatyam', 'Kathak', 'Odissi'], emoji: '🤚', category: 'Basic' },
  { name: 'Tripataka', meaning: 'Three parts of a flag', description: 'Like Pataka but ring finger bent down. Used to represent a crown, tree, or flame.', dances: ['Bharatanatyam', 'Kathakali'], emoji: '✋', category: 'Basic' },
  { name: 'Alapadma', meaning: 'Fully bloomed lotus', description: 'All fingers spread out and slightly curved. Used to represent a lotus flower, beauty, or moon.', dances: ['Bharatanatyam', 'Odissi', 'Mohiniyattam'], emoji: '🌸', category: 'Basic' },
  { name: 'Ardhachandra', meaning: 'Half moon', description: 'Thumb extended, other fingers joined and extended. Used to represent the moon, waist, or beginning of prayer.', dances: ['Bharatanatyam', 'Kathak', 'Kuchipudi'], emoji: '🌙', category: 'Basic' },
  { name: 'Mushti', meaning: 'Fist', description: 'All fingers folded into a fist with thumb over them. Used to represent holding something, fighting, or strength.', dances: ['Bharatanatyam', 'Kathakali'], emoji: '✊', category: 'Basic' },
  { name: 'Shikhara', meaning: 'Spire or peak', description: 'All fingers folded, thumb extended upward. Used to represent a bow, pillar, or husband.', dances: ['Bharatanatyam', 'Kathak', 'Odissi'], emoji: '👍', category: 'Intermediate' },
  { name: 'Kapittha', meaning: 'Wood apple', description: 'Index finger and middle finger folded, thumb holds them, other fingers extended. Used for Lakshmi, Saraswati.', dances: ['Bharatanatyam', 'Kuchipudi'], emoji: '🤌', category: 'Intermediate' },
  { name: 'Katakamukha', meaning: 'Opening of a bracelet', description: 'Index finger curved to touch thumb, other fingers extended. Used for holding a garland or plucking flowers.', dances: ['Bharatanatyam', 'Odissi', 'Mohiniyattam'], emoji: '👌', category: 'Intermediate' },
  { name: 'Shukatunda', meaning: 'Parrot beak', description: 'Index finger bent to touch thumb tip, other fingers extended. Used to represent a parrot or shooting an arrow.', dances: ['Bharatanatyam', 'Kathakali'], emoji: '🦜', category: 'Intermediate' },
  { name: 'Mayura', meaning: 'Peacock', description: 'Thumb, index and little finger extended, middle and ring finger bent. Used to represent a peacock or applying tilak.', dances: ['Odissi', 'Kuchipudi', 'Mohiniyattam'], emoji: '🦚', category: 'Advanced' },
  { name: 'Arala', meaning: 'Bent or crooked', description: 'Index finger bent, other fingers extended. Used to represent drinking nectar or poison.', dances: ['Bharatanatyam', 'Odissi'], emoji: '☝️', category: 'Advanced' },
  { name: 'Kartarimukha', meaning: 'Scissors face', description: 'Index and middle finger separated and extended like scissors. Used for separation, lightning, or a thief.', dances: ['Bharatanatyam', 'Kathak', 'Kathakali'], emoji: '✌️', category: 'Advanced' },
  { name: 'Chatura', meaning: 'Four or clever', description: 'Four fingers extended together, thumb tucked in. Used to represent gold, cleverness, or a lamp.', dances: ['Odissi', 'Mohiniyattam'], emoji: '🖐️', category: 'Advanced' },
  { name: 'Hamsasya', meaning: 'Swan face', description: 'Thumb, index and middle finger touching at tips, other fingers extended. Used for a swan, painting, or dropping flowers.', dances: ['Bharatanatyam', 'Kuchipudi', 'Sattriya'], emoji: '🦢', category: 'Advanced' },
  { name: 'Anjali', meaning: 'Offering or salutation', description: 'Both hands joined together in prayer position. Used for greeting, prayer, or salutation to god.', dances: ['Bharatanatyam', 'Kathak', 'Odissi', 'Kuchipudi', 'Manipuri'], emoji: '🙏', category: 'Basic' },
]

const categories = ['All', 'Basic', 'Intermediate', 'Advanced']

export default function MudraDictionary() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [selected, setSelected] = useState(null)

  const filtered = mudras.filter(m => {
    const matchSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.meaning.toLowerCase().includes(search.toLowerCase()) ||
      m.dances.some(d => d.toLowerCase().includes(search.toLowerCase()))

    const matchCategory = category === 'All' || m.category === category
    return matchSearch && matchCategory
  })

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
        <div style={{ fontSize: '52px', marginBottom: '12px' }}>🤲</div>
        <h1 style={{ fontSize: '40px', fontWeight: '800', margin: '0 0 8px' }}>
          Mudra Dictionary
        </h1>
        <p style={{ fontSize: '16px', opacity: 0.85, margin: '0 0 24px' }}>
          Learn the meaning of every hand gesture in Indian classical dance
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
            {mudras.length} Mudras
          </span>
          <span
            style={{
              background: 'rgba(255,255,255,0.2)',
              padding: '6px 16px',
              borderRadius: '20px',
              fontSize: '13px'
            }}
          >
            3 Difficulty Levels
          </span>
          <span
            style={{
              background: 'rgba(255,255,255,0.2)',
              padding: '6px 16px',
              borderRadius: '20px',
              fontSize: '13px'
            }}
          >
            All Dance Forms
          </span>
        </div>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 24px' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '32px'
          }}
        >
          <div style={{ position: 'relative', width: '100%', maxWidth: '500px' }}>
            <input
              type="text"
              placeholder="Search mudras by name, meaning or dance..."
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
            <span
              style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: '18px'
              }}
            >
              🔍
            </span>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                style={{
                  padding: '8px 20px',
                  borderRadius: '50px',
                  fontWeight: '600',
                  fontSize: '13px',
                  cursor: 'pointer',
                  border: category === cat ? 'none' : '2px solid #f97316',
                  background: category === cat ? '#f97316' : 'transparent',
                  color: category === cat ? 'white' : '#f97316'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '20px'
          }}
        >
          {filtered.map(mudra => (
            <div
              key={mudra.name}
              onClick={() => setSelected(selected?.name === mudra.name ? null : mudra)}
              style={{
                background: 'white',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                cursor: 'pointer',
                transition: 'all 0.3s',
                border: selected?.name === mudra.name ? '2px solid #f97316' : '2px solid transparent'
              }}
              onMouseOver={e => (e.currentTarget.style.transform = 'translateY(-4px)')}
              onMouseOut={e => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '12px'
                }}
              >
                <span style={{ fontSize: '48px' }}>{mudra.emoji}</span>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: '700',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    background:
                      mudra.category === 'Basic'
                        ? '#dcfce7'
                        : mudra.category === 'Intermediate'
                        ? '#fef3c7'
                        : '#fecaca',
                    color:
                      mudra.category === 'Basic'
                        ? '#166534'
                        : mudra.category === 'Intermediate'
                        ? '#92400e'
                        : '#dc2626'
                  }}
                >
                  {mudra.category}
                </span>
              </div>

              <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#111827', margin: '0 0 4px' }}>
                {mudra.name}
              </h3>
              <p style={{ fontSize: '13px', color: '#f97316', fontWeight: '600', margin: '0 0 8px' }}>
                "{mudra.meaning}"
              </p>
              <p
                style={{
                  fontSize: '13px',
                  color: '#6b7280',
                  lineHeight: '1.7',
                  margin: '0 0 12px',
                  overflow: 'hidden',
                  display: selected?.name === mudra.name ? 'block' : '-webkit-box',
                  WebkitLineClamp: selected?.name === mudra.name ? 'unset' : 2,
                  WebkitBoxOrient: 'vertical'
                }}
              >
                {mudra.description}
              </p>

              <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: '12px' }}>
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
                  Used in
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {mudra.dances.map(dance => (
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
                      {dance}
                    </span>
                  ))}
                </div>
              </div>

              {selected?.name === mudra.name && (
                <div
                  style={{
                    marginTop: '12px',
                    background: '#fff7ed',
                    borderRadius: '8px',
                    padding: '10px 14px'
                  }}
                >
                  <p style={{ fontSize: '12px', color: '#f97316', fontWeight: '600', margin: 0 }}>
                    💡 Click again to collapse
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px' }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>🔍</div>
            <p style={{ fontSize: '18px', fontWeight: '600', color: '#111827' }}>
              No mudras found!
            </p>
            <p style={{ fontSize: '14px', color: '#6b7280' }}>
              Try searching with a different word
            </p>
          </div>
        )}

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