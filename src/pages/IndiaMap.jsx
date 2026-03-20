import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const stateData = {
  'Tamil Nadu': { dances: ['Bharatanatyam'], color: '#f97316', x: 420, y: 580 },
  'Uttar Pradesh': { dances: ['Kathak'], color: '#dc2626', x: 380, y: 280 },
  'Odisha': { dances: ['Odissi'], color: '#7c3aed', x: 460, y: 400 },
  'Andhra Pradesh': { dances: ['Kuchipudi'], color: '#0891b2', x: 420, y: 500 },
  'Manipur': { dances: ['Manipuri'], color: '#059669', x: 580, y: 300 },
  'Kerala': { dances: ['Mohiniyattam', 'Kathakali'], color: '#d97706', x: 370, y: 620 },
  'Assam': { dances: ['Sattriya', 'Bihu'], color: '#db2777', x: 560, y: 240 },
  'Gujarat': { dances: ['Garba'], color: '#65a30d', x: 240, y: 360 },
  'Punjab': { dances: ['Bhangra'], color: '#9333ea', x: 300, y: 180 },
  'Maharashtra': { dances: ['Lavani'], color: '#0284c7', x: 300, y: 440 },
}

export default function IndiaMap() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState(null)
  const [hovered, setHovered] = useState(null)

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
        <div style={{ fontSize: '52px', marginBottom: '12px' }}>🗺️</div>
        <h1 style={{ fontSize: '40px', fontWeight: '800', margin: '0 0 8px' }}>
          India Dance Explorer
        </h1>
        <p style={{ fontSize: '16px', opacity: 0.85 }}>
          Click on any state to discover its dance forms!
        </p>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 24px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px',
            alignItems: 'start'
          }}
        >
          <div
            style={{
              background: 'white',
              borderRadius: '20px',
              padding: '24px',
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)'
            }}
          >
            <h3
              style={{
                fontSize: '16px',
                fontWeight: '700',
                color: '#111827',
                margin: '0 0 16px',
                textAlign: 'center'
              }}
            >
              🇮🇳 Click a state to explore!
            </h3>

            <div style={{ position: 'relative', width: '100%', paddingBottom: '100%' }}>
              <svg
                viewBox="0 0 700 750"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%'
                }}
              >
                <path
                  d="M280,80 L380,60 L460,80 L520,120 L580,160 L620,220 L640,280 L620,340 L580,380 L560,440 L520,500 L480,560 L460,620 L420,660 L380,680 L340,660 L300,620 L260,560 L220,500 L180,440 L160,380 L140,320 L140,260 L160,200 L200,150 L240,110 Z"
                  fill="#fef3c7"
                  stroke="#f97316"
                  strokeWidth="3"
                />

                {Object.entries(stateData).map(([state, data]) => (
                  <g
                    key={state}
                    onClick={() => setSelected(selected === state ? null : state)}
                    onMouseEnter={() => setHovered(state)}
                    onMouseLeave={() => setHovered(null)}
                    style={{ cursor: 'pointer' }}
                  >
                    <circle
                      cx={data.x}
                      cy={data.y}
                      r={hovered === state || selected === state ? 22 : 16}
                      fill={data.color}
                      opacity={selected && selected !== state ? 0.4 : 1}
                      style={{ transition: 'all 0.3s' }}
                    />
                    <text
                      x={data.x}
                      y={data.y + 4}
                      textAnchor="middle"
                      style={{
                        fontSize: '10px',
                        fill: 'white',
                        fontWeight: '700',
                        pointerEvents: 'none'
                      }}
                    >
                      {data.dances.length}
                    </text>

                    {(hovered === state || selected === state) && (
                      <text
                        x={data.x}
                        y={data.y - 28}
                        textAnchor="middle"
                        style={{
                          fontSize: '11px',
                          fill: '#111827',
                          fontWeight: '700',
                          pointerEvents: 'none'
                        }}
                      >
                        {state}
                      </text>
                    )}
                  </g>
                ))}

                <text x="20" y="720" style={{ fontSize: '11px', fill: '#6b7280' }}>
                  ● Each dot = a state with dance forms
                </text>
                <text x="20" y="738" style={{ fontSize: '11px', fill: '#6b7280' }}>
                  Number inside = count of dance forms
                </text>
              </svg>
            </div>
          </div>

          <div>
            {selected ? (
              <div>
                <div
                  style={{
                    background: 'linear-gradient(135deg, #f97316, #dc2626)',
                    borderRadius: '16px',
                    padding: '24px',
                    marginBottom: '20px',
                    color: 'white'
                  }}
                >
                  <h2 style={{ fontSize: '24px', fontWeight: '800', margin: '0 0 4px' }}>
                    📍 {selected}
                  </h2>
                  <p style={{ fontSize: '14px', opacity: 0.85, margin: 0 }}>
                    {stateData[selected].dances.length} dance{' '}
                    {stateData[selected].dances.length === 1 ? 'form' : 'forms'} from
                    this state
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {stateData[selected].dances.map(dance => (
                    <div
                      key={dance}
                      style={{
                        background: 'white',
                        borderRadius: '12px',
                        padding: '20px',
                        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <div>
                        <h3
                          style={{
                            fontSize: '18px',
                            fontWeight: '700',
                            color: '#111827',
                            margin: '0 0 4px'
                          }}
                        >
                          💃 {dance}
                        </h3>
                        <p
                          style={{
                            fontSize: '12px',
                            color: '#f97316',
                            fontWeight: '600',
                            margin: 0
                          }}
                        >
                          📍 {selected}
                        </p>
                      </div>

                      <button
                        onClick={() => navigate('/')}
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
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <div
                  style={{
                    background: 'white',
                    borderRadius: '16px',
                    padding: '28px',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                    marginBottom: '20px',
                    textAlign: 'center'
                  }}
                >
                  <div style={{ fontSize: '52px', marginBottom: '12px' }}>👆</div>
                  <h3
                    style={{
                      fontSize: '18px',
                      fontWeight: '700',
                      color: '#111827',
                      margin: '0 0 8px'
                    }}
                  >
                    Click any dot on the map!
                  </h3>
                  <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>
                    Each dot represents a state with its traditional dance forms
                  </p>
                </div>

                <div
                  style={{
                    background: 'white',
                    borderRadius: '16px',
                    padding: '24px',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.06)'
                  }}
                >
                  <h3
                    style={{
                      fontSize: '16px',
                      fontWeight: '700',
                      color: '#111827',
                      margin: '0 0 16px'
                    }}
                  >
                    🗺️ All States
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {Object.entries(stateData).map(([state, data]) => (
                      <div
                        key={state}
                        onClick={() => setSelected(state)}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '10px 14px',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          background: hovered === state ? '#fff7ed' : '#f9fafb',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={() => setHovered(state)}
                        onMouseLeave={() => setHovered(null)}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span
                            style={{
                              width: '12px',
                              height: '12px',
                              borderRadius: '50%',
                              background: data.color,
                              display: 'inline-block',
                              flexShrink: 0
                            }}
                          />
                          <span
                            style={{
                              fontSize: '13px',
                              fontWeight: '500',
                              color: '#111827'
                            }}
                          >
                            {state}
                          </span>
                        </div>

                        <span
                          style={{
                            fontSize: '12px',
                            color: '#f97316',
                            fontWeight: '600',
                            textAlign: 'right'
                          }}
                        >
                          {data.dances.join(', ')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}