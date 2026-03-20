import { useState } from 'react'
import { Link } from 'react-router-dom'

const dancers = [
  {
    name: 'Rukmini Devi Arundale',
    dance: 'Bharatanatyam',
    years: '1904 - 1986',
    state: 'Tamil Nadu',
    initials: 'RD',
    color: '#f97316',
    bgGradient: 'linear-gradient(135deg, #f97316, #fbbf24)',
    title: 'Mother of Bharatanatyam',
    contribution: 'Revived and reformed Bharatanatyam from Sadir dance. Founded Kalakshetra in Chennai in 1936, one of India\'s most prestigious dance and music institutions.',
    awards: ['Padma Bhushan', 'Sangeet Natak Akademi Award'],
    funFact: 'She was the first Indian woman nominated to the Rajya Sabha based on her contribution to arts.',
    symbol: '🌺'
  },
  {
    name: 'Pandit Birju Maharaj',
    dance: 'Kathak',
    years: '1938 - 2022',
    state: 'Uttar Pradesh',
    initials: 'BM',
    color: '#dc2626',
    bgGradient: 'linear-gradient(135deg, #dc2626, #f97316)',
    title: 'Legend of Kathak',
    contribution: 'Greatest Kathak dancer of the 20th century. Head of the Lucknow Kalka-Bindadin gharana and trained hundreds of students in Kathak.',
    awards: ['Padma Vibhushan', 'Sangeet Natak Akademi Award', 'Kalidas Samman'],
    funFact: 'He choreographed dances for Bollywood films including Devdas and Umrao Jaan.',
    symbol: '💫'
  },
  {
    name: 'Sonal Mansingh',
    dance: 'Bharatanatyam & Odissi',
    years: '1944 - present',
    state: 'Gujarat',
    initials: 'SM',
    color: '#7c3aed',
    bgGradient: 'linear-gradient(135deg, #7c3aed, #db2777)',
    title: 'Living Legend',
    contribution: 'One of India\'s most versatile classical dancers, mastering both Bharatanatyam and Odissi. Founded Centre for Indian Classical Dances in New Delhi.',
    awards: ['Padma Bhushan', 'Padma Vibhushan', 'Sangeet Natak Akademi Award'],
    funFact: 'She has performed in over 90 countries promoting Indian classical dance globally.',
    symbol: '🌟'
  },
  {
    name: 'Guru Kelucharan Mohapatra',
    dance: 'Odissi',
    years: '1926 - 2004',
    state: 'Odisha',
    initials: 'KM',
    color: '#0891b2',
    bgGradient: 'linear-gradient(135deg, #0891b2, #7c3aed)',
    title: 'Father of Modern Odissi',
    contribution: 'Single-handedly revived and systematized Odissi dance. Developed the grammar and vocabulary of modern Odissi and trained generations of dancers.',
    awards: ['Padma Vibhushan', 'Sangeet Natak Akademi Award', 'Kalidas Samman'],
    funFact: 'He started as a gotipua — a boy dancer who dressed as a girl to perform in Odisha temples.',
    symbol: '🏺'
  },
  {
    name: 'Yamini Krishnamurthy',
    dance: 'Bharatanatyam & Kuchipudi',
    years: '1940 - present',
    state: 'Andhra Pradesh',
    initials: 'YK',
    color: '#059669',
    bgGradient: 'linear-gradient(135deg, #059669, #0891b2)',
    title: 'Queen of Classical Dance',
    contribution: 'Regarded as one of the greatest classical dancers of India. She mastered both Bharatanatyam and Kuchipudi and popularized classical dance across the world.',
    awards: ['Padma Shri', 'Padma Bhushan', 'Sangeet Natak Akademi Award'],
    funFact: 'She trained at Kalakshetra under Rukmini Devi Arundale herself.',
    symbol: '👑'
  },
  {
    name: 'Mrinalini Sarabhai',
    dance: 'Bharatanatyam & Kuchipudi',
    years: '1918 - 2016',
    state: 'Gujarat',
    initials: 'MS',
    color: '#db2777',
    bgGradient: 'linear-gradient(135deg, #db2777, #9333ea)',
    title: 'Cultural Ambassador',
    contribution: 'Founded Darpana Academy of Performing Arts in Ahmedabad in 1949. Used dance as a medium for social messages and trained thousands of dancers.',
    awards: ['Padma Bhushan', 'Padma Vibhushan', 'Sangeet Natak Akademi Award'],
    funFact: 'Her daughter Mallika Sarabhai is also a world famous classical dancer and social activist.',
    symbol: '🦋'
  },
  {
    name: 'Sitara Devi',
    dance: 'Kathak',
    years: '1920 - 2014',
    state: 'Uttar Pradesh',
    initials: 'SD',
    color: '#9333ea',
    bgGradient: 'linear-gradient(135deg, #9333ea, #dc2626)',
    title: 'Queen of Kathak',
    contribution: 'Called the Queen of Kathak, she was one of the most celebrated Kathak dancers. She started performing on stage at age 7.',
    awards: ['Padma Shri', 'Sangeet Natak Akademi Award', 'Kalidas Samman'],
    funFact: 'Rabindranath Tagore called her the Nritya Samragini — Empress of Dance.',
    symbol: '⭐'
  },
  {
    name: 'Guru Vallathol Narayana Menon',
    dance: 'Kathakali',
    years: '1878 - 1958',
    state: 'Kerala',
    initials: 'VN',
    color: '#0284c7',
    bgGradient: 'linear-gradient(135deg, #0284c7, #059669)',
    title: 'Savior of Kathakali',
    contribution: 'Founded Kerala Kalamandalam in 1930 which saved Kathakali from extinction. He single-handedly revived this dying art form.',
    awards: ['Padma Bhushan', 'Sahitya Akademi Award'],
    funFact: 'He was also a celebrated Malayalam poet who used his influence to preserve Kerala\'s cultural heritage.',
    symbol: '🎭'
  },
  {
    name: 'Alarmel Valli',
    dance: 'Bharatanatyam',
    years: '1956 - present',
    state: 'Tamil Nadu',
    initials: 'AV',
    color: '#65a30d',
    bgGradient: 'linear-gradient(135deg, #65a30d, #0891b2)',
    title: 'Jewel of Bharatanatyam',
    contribution: 'One of the finest exponents of the Pandanallur style of Bharatanatyam. Known for her deep scholarship, expressive abhinaya and spiritual approach.',
    awards: ['Padma Shri', 'Padma Bhushan', 'Sangeet Natak Akademi Award'],
    funFact: 'She has collaborated with world music legends including Anoushka Shankar.',
    symbol: '🌸'
  },
  {
    name: 'Guru Bipin Singh',
    dance: 'Manipuri',
    years: '1918 - 2000',
    state: 'Manipur',
    initials: 'BS',
    color: '#d97706',
    bgGradient: 'linear-gradient(135deg, #d97706, #dc2626)',
    title: 'Patriarch of Manipuri',
    contribution: 'Revived and popularized Manipuri dance across India. Trained legendary dancers and brought Manipuri to national prominence.',
    awards: ['Padma Shri', 'Sangeet Natak Akademi Award'],
    funFact: 'He established the Manipuri Nartanalaya in Mumbai to teach Manipuri dance.',
    symbol: '🎪'
  },
]

const danceFilters = ['All', 'Bharatanatyam', 'Kathak', 'Odissi', 'Kuchipudi', 'Manipuri', 'Kathakali']

export default function HallOfFame() {
  const [filter, setFilter] = useState('All')
  const [selected, setSelected] = useState(null)

  const filtered = filter === 'All' ? dancers : dancers.filter(d => d.dance.includes(filter))

  return (
    <div style={{minHeight:'100vh', background:'#fff7ed'}}>

      {/* HERO */}
      <div style={{background:'linear-gradient(135deg, #f97316, #dc2626)', padding:'60px 32px', textAlign:'center', color:'white'}}>
        <div style={{fontSize:'52px', marginBottom:'12px'}}>🏆</div>
        <h1 style={{fontSize:'40px', fontWeight:'800', margin:'0 0 8px'}}>Hall of Fame</h1>
        <p style={{fontSize:'16px', opacity:0.85, margin:'0 0 24px'}}>Celebrating the legends who shaped Indian classical dance</p>
        <div style={{display:'flex', gap:'8px', justifyContent:'center', flexWrap:'wrap'}}>
          <span style={{background:'rgba(255,255,255,0.2)', padding:'6px 16px', borderRadius:'20px', fontSize:'13px'}}>{dancers.length} Legends</span>
          <span style={{background:'rgba(255,255,255,0.2)', padding:'6px 16px', borderRadius:'20px', fontSize:'13px'}}>All Dance Forms</span>
          <span style={{background:'rgba(255,255,255,0.2)', padding:'6px 16px', borderRadius:'20px', fontSize:'13px'}}>🇮🇳 India's Best</span>
        </div>
      </div>

      <div style={{maxWidth:'1100px', margin:'0 auto', padding:'40px 24px'}}>

        {/* FILTER */}
        <div style={{display:'flex', gap:'10px', flexWrap:'wrap', marginBottom:'32px', justifyContent:'center'}}>
          {danceFilters.map(f => (
            <button key={f} onClick={() => setFilter(f)}
              style={{padding:'8px 20px', borderRadius:'50px', fontWeight:'600', fontSize:'13px', cursor:'pointer',
                border: filter === f ? 'none' : '2px solid #f97316',
                background: filter === f ? '#f97316' : 'transparent',
                color: filter === f ? 'white' : '#f97316'}}>
              {f}
            </button>
          ))}
        </div>

        {/* DANCER CARDS */}
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(320px, 1fr))', gap:'24px'}}>
          {filtered.map(dancer => (
            <div key={dancer.name}
              onClick={() => setSelected(selected?.name === dancer.name ? null : dancer)}
              style={{background:'white', borderRadius:'20px', overflow:'hidden', boxShadow:'0 4px 20px rgba(0,0,0,0.1)', cursor:'pointer', transition:'all 0.3s', border: selected?.name === dancer.name ? `2px solid ${dancer.color}` : '2px solid transparent'}}
              onMouseOver={e => e.currentTarget.style.transform='translateY(-6px)'}
              onMouseOut={e => e.currentTarget.style.transform='translateY(0)'}>

              {/* ANIMATED AVATAR HEADER */}
              <div style={{background: dancer.bgGradient, padding:'32px 24px', textAlign:'center', position:'relative', overflow:'hidden'}}>

                {/* DECORATIVE CIRCLES */}
                <div style={{position:'absolute', top:'-20px', right:'-20px', width:'100px', height:'100px', borderRadius:'50%', background:'rgba(255,255,255,0.1)'}}/>
                <div style={{position:'absolute', bottom:'-30px', left:'-30px', width:'120px', height:'120px', borderRadius:'50%', background:'rgba(255,255,255,0.08)'}}/>

                {/* AVATAR CIRCLE */}
                <div style={{position:'relative', display:'inline-block', marginBottom:'16px'}}>
                  <div style={{width:'90px', height:'90px', borderRadius:'50%', background:'rgba(255,255,255,0.25)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto', border:'3px solid rgba(255,255,255,0.5)', boxShadow:'0 4px 20px rgba(0,0,0,0.2)'}}>
                    <span style={{fontSize:'36px', fontWeight:'800', color:'white'}}>{dancer.initials}</span>
                  </div>
                  {/* SYMBOL BADGE */}
                  <div style={{position:'absolute', bottom:'-4px', right:'-4px', width:'32px', height:'32px', borderRadius:'50%', background:'white', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'16px', boxShadow:'0 2px 8px rgba(0,0,0,0.2)'}}>
                    {dancer.symbol}
                  </div>
                </div>

                <h3 style={{fontSize:'17px', fontWeight:'800', color:'white', margin:'0 0 4px', textShadow:'0 1px 4px rgba(0,0,0,0.2)'}}>{dancer.name}</h3>
                <p style={{fontSize:'12px', color:'rgba(255,255,255,0.85)', fontWeight:'600', margin:'0 0 4px'}}>{dancer.title}</p>
                <p style={{fontSize:'11px', color:'rgba(255,255,255,0.7)', margin:0}}>{dancer.years} • {dancer.state}</p>
              </div>

              {/* BODY */}
              <div style={{padding:'20px 24px'}}>
                <div style={{marginBottom:'12px'}}>
                  <span style={{background:'#fff7ed', color:'#f97316', fontSize:'12px', padding:'4px 12px', borderRadius:'20px', fontWeight:'600', border:'1px solid #fed7aa'}}>
                    💃 {dancer.dance}
                  </span>
                </div>

                <p style={{fontSize:'13px', color:'#6b7280', lineHeight:'1.7', margin:'0 0 12px',
                  overflow:'hidden', display: selected?.name === dancer.name ? 'block' : '-webkit-box',
                  WebkitLineClamp: selected?.name === dancer.name ? 'unset' : 3,
                  WebkitBoxOrient:'vertical'}}>
                  {dancer.contribution}
                </p>

                {selected?.name === dancer.name && (
                  <>
                    <div style={{background:'#fff7ed', borderRadius:'8px', padding:'12px', marginBottom:'12px', borderLeft:`3px solid ${dancer.color}`}}>
                      <p style={{fontSize:'12px', fontWeight:'600', color:'#f97316', margin:'0 0 4px'}}>💡 Fun Fact</p>
                      <p style={{fontSize:'12px', color:'#6b7280', margin:0, lineHeight:'1.7'}}>{dancer.funFact}</p>
                    </div>
                    <div>
                      <p style={{fontSize:'11px', fontWeight:'600', color:'#9ca3af', textTransform:'uppercase', letterSpacing:'0.5px', margin:'0 0 8px'}}>🏅 Awards</p>
                      <div style={{display:'flex', flexWrap:'wrap', gap:'6px'}}>
                        {dancer.awards.map(award => (
                          <span key={award} style={{background:'#fef3c7', color:'#d97706', fontSize:'11px', padding:'3px 10px', borderRadius:'20px', fontWeight:'600'}}>
                            🏅 {award}
                          </span>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                <p style={{fontSize:'12px', color:dancer.color, fontWeight:'600', margin:'12px 0 0', textAlign:'right'}}>
                  {selected?.name === dancer.name ? '▲ Show less' : '▼ Read more'}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div style={{textAlign:'center', marginTop:'40px'}}>
          <Link to="/" style={{color:'#f97316', fontSize:'13px', fontWeight:'600', textDecoration:'none'}}>
            ← Back to Dance Forms
          </Link>
        </div>

      </div>
    </div>
  )
}