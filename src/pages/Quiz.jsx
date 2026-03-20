import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

export default function Quiz() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [questions, setQuestions] = useState([])
  const [danceName, setDanceName] = useState('')
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [result, setResult] = useState(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const [loading, setLoading] = useState(true)

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
      .then(res => setDanceName(res.data.name))
      .catch(() => navigate('/'))

    axios
      .get(`https://natrang-backend.onrender.com/dances/${id}/quizzes`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
       const formatted = res.data.map(q => ({
          ...q,
          options: { a: q.option_a, b: q.option_b, c: q.option_c, d: q.option_d },
          correct_answer: q.correct_answer?.toLowerCase()
        }))
        setQuestions(formatted)
        setLoading(false)
       
      })
      .catch(() => {
        setLoading(false)
        navigate('/')
      })
  }, [id, navigate])

  async function handleAnswer(optionKey) {
    if (selected) return

    setSelected(optionKey)
    const token = localStorage.getItem('token')

    try {
      const res = await axios.post(
        `https://natrang-backend.onrender.com/quizzes/${questions[current].id}/check`,
        { answer: optionKey },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setResult(res.data)
      if (res.data.correct) setScore(prev => prev + 1)
    } catch (error) {
      console.error('Error checking answer:', error)
    }
  }

  function handleNext() {
    if (current + 1 >= questions.length) {
      setFinished(true)
    } else {
      setCurrent(current + 1)
      setSelected(null)
      setResult(null)
    }
  }

  function getBadge() {
    const percent = questions.length > 0 ? (score / questions.length) * 100 : 0
    if (percent === 100) return { icon: '⭐', label: 'Perfect Score!', color: '#f59e0b' }
    if (percent >= 75) return { icon: '🏆', label: 'Excellent!', color: '#22c55e' }
    if (percent >= 50) return { icon: '👍', label: 'Good Job!', color: '#3b82f6' }
    return { icon: '📚', label: 'Keep Learning!', color: '#f97316' }
  }

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontSize: '24px' }}>Loading Quiz... 🎯</div>
      </div>
    )
  }

  if (!questions.length) {
    return (
      <div style={{ minHeight: '100vh', background: '#fff7ed', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <div style={{ background: 'white', borderRadius: '24px', padding: '40px', maxWidth: '500px', width: '100%', textAlign: 'center', boxShadow: '0 8px 40px rgba(0,0,0,0.1)' }}>
          <div style={{ fontSize: '56px', marginBottom: '16px' }}>📝</div>
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#111827', margin: '0 0 8px' }}>No quiz available</h2>
          <p style={{ fontSize: '14px', color: '#6b7280', margin: '0 0 24px' }}>
            Quiz questions for {danceName || 'this dance'} are not available right now.
          </p>
          <Link
            to={`/dances/${id}`}
            style={{
              background: '#f97316',
              color: 'white',
              borderRadius: '10px',
              padding: '12px 24px',
              fontSize: '14px',
              fontWeight: '600',
              textDecoration: 'none'
            }}
          >
            ← Back to Dance
          </Link>
        </div>
      </div>
    )
  }

  if (finished) {
    const badge = getBadge()
    const percent = Math.round((score / questions.length) * 100)

    return (
      <div style={{ minHeight: '100vh', background: '#fff7ed', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <div style={{ background: 'white', borderRadius: '24px', padding: '48px', maxWidth: '500px', width: '100%', textAlign: 'center', boxShadow: '0 8px 40px rgba(0,0,0,0.1)' }}>
          <div style={{ fontSize: '80px', marginBottom: '16px' }}>{badge.icon}</div>
          <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#111827', margin: '0 0 8px' }}>{badge.label}</h1>
          <p style={{ fontSize: '16px', color: '#6b7280', margin: '0 0 32px' }}>
            You completed the {danceName} Quiz!
          </p>

          <div style={{ background: 'linear-gradient(135deg, #f97316, #dc2626)', borderRadius: '16px', padding: '32px', marginBottom: '32px', color: 'white' }}>
            <div style={{ fontSize: '64px', fontWeight: '800' }}>{score}/{questions.length}</div>
            <div style={{ fontSize: '18px', opacity: 0.9 }}>{percent}% Correct</div>
          </div>

          <div style={{ background: '#f3f4f6', borderRadius: '50px', height: '12px', overflow: 'hidden', marginBottom: '32px' }}>
            <div
              style={{
                background: 'linear-gradient(90deg, #f97316, #dc2626)',
                height: '100%',
                borderRadius: '50px',
                width: `${percent}%`,
                transition: 'width 0.5s'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => {
                setCurrent(0)
                setSelected(null)
                setResult(null)
                setScore(0)
                setFinished(false)
              }}
              style={{
                background: '#f97316',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                padding: '12px 24px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              🔄 Try Again
            </button>

            <Link
              to={`/dances/${id}`}
              style={{
                background: 'white',
                color: '#f97316',
                border: '2px solid #f97316',
                borderRadius: '10px',
                padding: '12px 24px',
                fontSize: '14px',
                fontWeight: '600',
                textDecoration: 'none'
              }}
            >
              ← Back to Dance
            </Link>

            <Link
              to="/"
              style={{
                background: '#111827',
                color: 'white',
                borderRadius: '10px',
                padding: '12px 24px',
                fontSize: '14px',
                fontWeight: '600',
                textDecoration: 'none'
              }}
            >
              🏠 Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const q = questions[current]

  const optionColors = {
    a: selected ? (result?.correct_answer === 'a' ? '#dcfce7' : selected === 'a' ? '#fef2f2' : '#f9fafb') : '#f9fafb',
    b: selected ? (result?.correct_answer === 'b' ? '#dcfce7' : selected === 'b' ? '#fef2f2' : '#f9fafb') : '#f9fafb',
    c: selected ? (result?.correct_answer === 'c' ? '#dcfce7' : selected === 'c' ? '#fef2f2' : '#f9fafb') : '#f9fafb',
    d: selected ? (result?.correct_answer === 'd' ? '#dcfce7' : selected === 'd' ? '#fef2f2' : '#f9fafb') : '#f9fafb',
  }

  const borderColors = {
    a: selected ? (result?.correct_answer === 'a' ? '#86efac' : selected === 'a' ? '#fecaca' : '#e5e7eb') : '#e5e7eb',
    b: selected ? (result?.correct_answer === 'b' ? '#86efac' : selected === 'b' ? '#fecaca' : '#e5e7eb') : '#e5e7eb',
    c: selected ? (result?.correct_answer === 'c' ? '#86efac' : selected === 'c' ? '#fecaca' : '#e5e7eb') : '#e5e7eb',
    d: selected ? (result?.correct_answer === 'd' ? '#86efac' : selected === 'd' ? '#fecaca' : '#e5e7eb') : '#e5e7eb',
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fff7ed', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ background: 'white', borderRadius: '24px', padding: '40px', maxWidth: '600px', width: '100%', boxShadow: '0 8px 40px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div>
            <p style={{ fontSize: '12px', color: '#f97316', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 4px' }}>
              💃 {danceName} Quiz
            </p>
            <p style={{ fontSize: '13px', color: '#9ca3af', margin: 0 }}>
              Question {current + 1} of {questions.length}
            </p>
          </div>
          <div style={{ background: 'linear-gradient(135deg, #f97316, #dc2626)', color: 'white', borderRadius: '12px', padding: '8px 16px', textAlign: 'center' }}>
            <div style={{ fontSize: '20px', fontWeight: '700' }}>{score}</div>
            <div style={{ fontSize: '10px', opacity: 0.9 }}>Score</div>
          </div>
        </div>

        <div style={{ background: '#f3f4f6', borderRadius: '50px', height: '8px', overflow: 'hidden', marginBottom: '32px' }}>
          <div
            style={{
              background: 'linear-gradient(90deg, #f97316, #dc2626)',
              height: '100%',
              borderRadius: '50px',
              width: `${(current / questions.length) * 100}%`,
              transition: 'width 0.3s'
            }}
          />
        </div>

        <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#111827', margin: '0 0 28px', lineHeight: '1.5' }}>
          {q.question}
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
          {Object.entries(q.options).map(([key, value]) => (
            <button
              key={key}
              onClick={() => handleAnswer(key)}
              style={{
                padding: '16px 20px',
                borderRadius: '12px',
                border: `2px solid ${borderColors[key]}`,
                background: optionColors[key],
                cursor: selected ? 'default' : 'pointer',
                textAlign: 'left',
                fontSize: '14px',
                fontWeight: '500',
                color: '#111827',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                transition: 'all 0.2s'
              }}
            >
              <span
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'white',
                  border: `2px solid ${borderColors[key]}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '700',
                  fontSize: '13px',
                  flexShrink: 0
                }}
              >
                {key.toUpperCase()}
              </span>
              {value}
              {selected && result?.correct_answer === key && <span style={{ marginLeft: 'auto' }}>✅</span>}
              {selected && selected === key && result?.correct_answer !== key && <span style={{ marginLeft: 'auto' }}>❌</span>}
            </button>
          ))}
        </div>

        {result && (
          <div
            style={{
              background: result.correct ? '#dcfce7' : '#fef2f2',
              border: `1px solid ${result.correct ? '#86efac' : '#fecaca'}`,
              borderRadius: '12px',
              padding: '14px 16px',
              marginBottom: '20px',
              textAlign: 'center'
            }}
          >
            <p
              style={{
                margin: 0,
                fontWeight: '600',
                color: result.correct ? '#166534' : '#dc2626',
                fontSize: '16px'
              }}
            >
              {result.correct
                ? '🎉 Correct! Well done!'
                : `❌ Wrong! Correct answer is: ${q.options[result.correct_answer]}`}
            </p>
          </div>
        )}

        {selected && (
          <button
            onClick={handleNext}
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #f97316, #dc2626)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              padding: '14px',
              fontSize: '15px',
              fontWeight: '700',
              cursor: 'pointer'
            }}
          >
            {current + 1 >= questions.length ? '🏆 See Results' : 'Next Question →'}
          </button>
        )}

        <div style={{ textAlign: 'center', marginTop: '16px' }}>
          <Link to={`/dances/${id}`} style={{ color: '#9ca3af', fontSize: '13px', textDecoration: 'none' }}>
            ← Back to {danceName}
          </Link>
        </div>
      </div>
    </div>
  )
}