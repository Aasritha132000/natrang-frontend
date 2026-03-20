import { Link } from 'react-router-dom'

export default function AboutUs() {
  return (
    <div style={{ minHeight: '100vh', background: '#fff7ed' }}>
      <div
        style={{
          background: 'linear-gradient(135deg, #f97316, #dc2626)',
          padding: '80px 32px',
          textAlign: 'center',
          color: 'white'
        }}
      >
        <h1 style={{ fontSize: '52px', fontWeight: '800', margin: '0 0 16px' }}>
          About NataRang 💃
        </h1>
        <p
          style={{
            fontSize: '18px',
            opacity: 0.9,
            maxWidth: '600px',
            margin: '0 auto 24px',
            lineHeight: '1.8'
          }}
        >
          India's premier platform dedicated to preserving and promoting the rich
          heritage of Indian classical and folk dance forms.
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
            🇮🇳 Made in India
          </span>
          <span
            style={{
              background: 'rgba(255,255,255,0.2)',
              padding: '6px 16px',
              borderRadius: '20px',
              fontSize: '13px'
            }}
          >
            💃 12 Dance Forms
          </span>
          <span
            style={{
              background: 'rgba(255,255,255,0.2)',
              padding: '6px 16px',
              borderRadius: '20px',
              fontSize: '13px'
            }}
          >
            🎓 For All Levels
          </span>
        </div>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '60px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#111827', margin: '0 0 16px' }}>
            Our Mission 🎯
          </h2>
          <p
            style={{
              fontSize: '16px',
              color: '#6b7280',
              lineHeight: '1.9',
              maxWidth: '700px',
              margin: '0 auto'
            }}
          >
            NataRang was born from a deep love for Indian dance. We believe every
            dance form tells a story — of devotion, of history, of a culture that
            has flourished for thousands of years. Our mission is to make these art
            forms accessible to everyone, from curious beginners to dedicated
            learners, so that India's dance heritage lives on for generations to
            come.
          </p>
        </div>

        <div style={{ marginBottom: '60px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#111827', margin: '0 0 32px', textAlign: 'center' }}>
            What We Offer 🌟
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
            {[
              {
                icon: '💃',
                title: '12 Dance Forms',
                desc: 'Classical and folk dances from every corner of India — Bharatanatyam to Bhangra!'
              },
              {
                icon: '🤲',
                title: 'Mudra Guide',
                desc: 'Learn the meaning of every hand gesture used in Indian classical dance forms.'
              },
              {
                icon: '👗',
                title: 'Costumes & Culture',
                desc: 'Explore the traditional costumes, jewellery and makeup of each dance form.'
              },
              {
                icon: '🎵',
                title: 'Instruments',
                desc: 'Discover the traditional instruments that accompany each dance performance.'
              },
              {
                icon: '📜',
                title: 'History & Heritage',
                desc: 'Deep dive into the rich history and origin of every Indian dance form.'
              },
              {
                icon: '🏆',
                title: 'Progress Tracking',
                desc: 'Track your learning journey with badges from Beginner to Expert dancer.'
              },
            ].map(item => (
              <div
                key={item.title}
                style={{
                  background: 'white',
                  borderRadius: '16px',
                  padding: '28px',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                  textAlign: 'center'
                }}
              >
                <div style={{ fontSize: '40px', marginBottom: '12px' }}>{item.icon}</div>
                <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#111827', margin: '0 0 8px' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: '1.7', margin: 0 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            background: 'linear-gradient(135deg, #f97316, #dc2626)',
            borderRadius: '20px',
            padding: '40px',
            marginBottom: '60px',
            color: 'white',
            textAlign: 'center'
          }}
        >
          <h2 style={{ fontSize: '28px', fontWeight: '700', margin: '0 0 32px' }}>
            NataRang in Numbers 📊
          </h2>
          <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '24px' }}>
            {[
              { number: '12+', label: 'Dance Forms' },
              { number: '500+', label: 'Video Lessons' },
              { number: '3', label: 'Skill Levels' },
              { number: '1000+', label: 'Years of Heritage' },
            ].map(stat => (
              <div key={stat.label}>
                <div style={{ fontSize: '48px', fontWeight: '800' }}>{stat.number}</div>
                <div style={{ fontSize: '14px', opacity: 0.85, marginTop: '4px' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '60px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#111827', margin: '0 0 32px', textAlign: 'center' }}>
            Meet the Team 👥
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
            {[
              {
                name: 'Aasritha',
                role: 'Full Stack Developer',
                emoji: '👩‍💻',
                desc: 'Built NataRang with passion for Indian culture and technology.'
              },
              {
                name: 'Dance Experts',
                role: 'Content Team',
                emoji: '💃',
                desc: 'Classical dancers who verified all dance information and content.'
              },
              {
                name: 'You!',
                role: 'Our Learner',
                emoji: '🌟',
                desc: 'Every person who learns a dance form keeps Indian culture alive.'
              },
            ].map(member => (
              <div
                key={member.name}
                style={{
                  background: 'white',
                  borderRadius: '16px',
                  padding: '28px',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                  textAlign: 'center'
                }}
              >
                <div style={{ fontSize: '52px', marginBottom: '12px' }}>{member.emoji}</div>
                <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#111827', margin: '0 0 4px' }}>
                  {member.name}
                </h3>
                <p style={{ fontSize: '12px', color: '#f97316', fontWeight: '600', margin: '0 0 8px' }}>
                  {member.role}
                </p>
                <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: '1.7', margin: 0 }}>
                  {member.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            background: 'white',
            borderRadius: '20px',
            padding: '40px',
            marginBottom: '60px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)'
          }}
        >
          <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#111827', margin: '0 0 24px', textAlign: 'center' }}>
            Dance Forms We Cover 💃
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            <div>
              <p
                style={{
                  fontSize: '13px',
                  fontWeight: '700',
                  color: '#f97316',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  margin: '0 0 12px'
                }}
              >
                Classical
              </p>
              {[
                'Bharatanatyam — Tamil Nadu',
                'Kathak — Uttar Pradesh',
                'Odissi — Odisha',
                'Kuchipudi — Andhra Pradesh',
                'Manipuri — Manipur',
                'Mohiniyattam — Kerala',
                'Kathakali — Kerala',
                'Sattriya — Assam'
              ].map(d => (
                <div
                  key={d}
                  style={{
                    fontSize: '13px',
                    color: '#374151',
                    padding: '6px 0',
                    borderBottom: '1px solid #f3f4f6'
                  }}
                >
                  🎭 {d}
                </div>
              ))}
            </div>

            <div>
              <p
                style={{
                  fontSize: '13px',
                  fontWeight: '700',
                  color: '#f97316',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  margin: '0 0 12px'
                }}
              >
                Folk
              </p>
              {[
                'Garba — Gujarat',
                'Bhangra — Punjab',
                'Lavani — Maharashtra',
                'Bihu — Assam'
              ].map(d => (
                <div
                  key={d}
                  style={{
                    fontSize: '13px',
                    color: '#374151',
                    padding: '6px 0',
                    borderBottom: '1px solid #f3f4f6'
                  }}
                >
                  🥁 {d}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#111827', margin: '0 0 12px' }}>
            Ready to Start Learning? 🚀
          </h2>
          <p style={{ fontSize: '16px', color: '#6b7280', margin: '0 0 24px' }}>
            Join thousands of learners exploring India's dance heritage!
          </p>
          <Link
            to="/"
            style={{
              background: '#f97316',
              color: 'white',
              padding: '14px 40px',
              borderRadius: '12px',
              textDecoration: 'none',
              fontSize: '16px',
              fontWeight: '700'
            }}
          >
            Explore Dance Forms →
          </Link>
        </div>
      </div>
    </div>
  )
}