import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import DanceShow from './pages/DanceShow'
import AboutUs from './pages/AboutUs'
import Profile from './pages/Profile'
import Bookmarks from './pages/Bookmarks'
import Quiz from './pages/Quiz'
import IndiaMap from './pages/IndiaMap'
import MudraDictionary from './pages/MudraDictionary'
import FestivalCalendar from './pages/FestivalCalendar'
import HallOfFame from './pages/HallOfFame'
import Temples from './pages/Temples'
import Admin from './pages/Admin'
import Navbar from './components/Navbar'

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token')
  return token ? children : <Navigate to="/login" replace />
}

function Footer() {
  return (
    <footer style={{ background: '#1a0a00', color: 'white', padding: '40px 32px 20px' }}>
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '32px', maxWidth: '1200px', margin: '0 auto', paddingBottom: '32px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div>
          <div style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px' }}>
            <span style={{ color: '#f97316' }}>Nata</span>
            <span style={{ color: '#dc2626' }}>Rang</span>
          </div>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: '1.8' }}>
            India's premier platform for learning classical and folk dance forms.
          </p>
        </div>

        <div>
          <div style={{ fontSize: '13px', fontWeight: '700', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px', color: '#f97316' }}>
            Dance Forms
          </div>
          {['Bharatanatyam', 'Kathak', 'Odissi', 'Kuchipudi', 'Garba', 'Bhangra'].map((d) => (
            <div key={d} style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', marginBottom: '6px' }}>
              {d}
            </div>
          ))}
        </div>

        <div>
          <div style={{ fontSize: '13px', fontWeight: '700', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px', color: '#f97316' }}>
            Quick Links
          </div>
          {['Home', 'About Us', 'Dance Forms', 'Contact'].map((l) => (
            <div key={l} style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', marginBottom: '6px', cursor: 'pointer' }}>
              {l}
            </div>
          ))}
        </div>

        <div>
          <div style={{ fontSize: '13px', fontWeight: '700', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px', color: '#f97316' }}>
            Contact
          </div>
          <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: '2' }}>
            <div>📧 hello@natrang.in</div>
            <div>📞 +91 98765 43210</div>
            <div>📍 Bengaluru, India</div>
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'center', paddingTop: '20px', fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>
        © 2026 NataRang. Made with ❤️ in India
      </div>
    </footer>
  )
}

function MainLayout() {
  const location = useLocation()
  const hideLayout = location.pathname === '/login' || location.pathname === '/signup'

  return (
    <>
      {!hideLayout && <Navbar />}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/dances/:id" element={<ProtectedRoute><DanceShow /></ProtectedRoute>} />
        <Route path="/about" element={<ProtectedRoute><AboutUs /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/bookmarks" element={<ProtectedRoute><Bookmarks /></ProtectedRoute>} />
        <Route path="/dances/:id/quiz" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
        <Route path="/map" element={<ProtectedRoute><IndiaMap /></ProtectedRoute>} />
        <Route path="/mudras" element={<ProtectedRoute><MudraDictionary /></ProtectedRoute>} />
        <Route path="/festivals" element={<ProtectedRoute><FestivalCalendar /></ProtectedRoute>} />
        <Route path="/hall-of-fame" element={<ProtectedRoute><HallOfFame /></ProtectedRoute>} />
        <Route path="/temples" element={<ProtectedRoute><Temples /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
      </Routes>

      {!hideLayout && <Footer />}
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
  )
}
