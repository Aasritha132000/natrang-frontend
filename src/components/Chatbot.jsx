import { useState } from "react";

const faqs = {
  "How to book a class?": "To book a class: Go to 🗓️ Book Class in the navbar → Select your dance form → Choose level (Beginner/Intermediate/Advanced) → Pick a date → Select a time slot → Click Request Booking. Admin will confirm your booking soon!",
  "What dance forms are available?": "NataRang has 10 dance forms: 💃 Bharatanatyam, Kathak, Odissi, Kuchipudi, Mohiniyattam, Manipuri, Kathakali, Sattriya, Garba, and Bhangra. Click any dance on the home page to explore!",
  "How to take a quiz?": "To take a quiz: Open any dance form → Scroll down → Click 🎯 Take Quiz → Answer the questions → See your score and badge at the end!",
  "How to watch videos?": "To watch videos: Open any dance form from home page → Scroll to 🎬 Video Lessons section → Watch the embedded YouTube videos → Click Mark Complete when done!",
  "How to create account?": "To create account: Click Sign Up here on login page → Enter your Full Name, Email, Password → Check the terms checkbox → Click Create Account. You're in! 🎉",
  "How to login?": "To login: Go to natrang-frontend-bgi5.vercel.app → Enter your Email and Password → Click Login to NataRang. If you forgot password, contact admin at hello@natrang.in",
  "How to save a dance?": "To save/bookmark a dance: Open any dance form → Click the ❤️ heart icon on the dance card → View all saved dances in ❤️ Saved section in navbar!",
  "How to track progress?": "To track progress: Open any dance form → Watch videos → Click Mark Complete on each video → See your progress bar at the top of the dance page!",
  "What is Bharatanatyam?": "Bharatanatyam is one of the oldest classical dance forms from Tamil Nadu. It features expressive gestures, footwork, and storytelling. It uses mudras like Pataka, Tripataka, and Anjali.",
  "What is Kathak?": "Kathak is a classical dance from Uttar Pradesh known for its fast spins, rhythmic footwork, and expressive storytelling. It blends Hindu and Islamic influences.",
  "What is Odissi?": "Odissi is a classical dance from Odisha known for its sculpturesque poses and fluid movements. It is one of the oldest surviving dance forms of India.",
  "What is Kuchipudi?": "Kuchipudi is a classical dance from Andhra Pradesh that combines dance and drama. It is known for its fast rhythms and expressive movements.",
  "What is Mohiniyattam?": "Mohiniyattam is a graceful classical dance from Kerala performed by women. It features soft swaying movements and uses mudras like Alapadma and Katakamukha.",
  "What is Manipuri?": "Manipuri is a classical dance from Manipur known for its gentle, lyrical movements. It is usually performed during religious festivals.",
  "What is Kathakali?": "Kathakali is a classical dance-drama from Kerala known for its elaborate costumes and makeup. It depicts stories from Hindu epics using mudras like Pataka and Mushti.",
  "What is Sattriya?": "Sattriya is a classical dance from Assam originally performed in monasteries. It combines devotional themes with graceful movements.",
  "What is Garba?": "Garba is a folk dance from Gujarat performed during Navratri festival. It involves circular movements and clapping in colorful costumes.",
  "What is Bhangra?": "Bhangra is an energetic folk dance from Punjab performed during harvest festival. It features vigorous movements and is accompanied by dhol drums.",
  "What are Mudras?": "Mudras are hand gestures used in Indian classical dance to express emotions and tell stories. NataRang has 15 mudras from Basic to Advanced level. Visit 🤲 Mudras in the navbar!",
  "What is Pataka Mudra?": "Pataka (Flag) 🤚 — All fingers extended and joined, thumb bent. Used to represent a flag, cloud, forest, or blessing. Used in Bharatanatyam, Kathak, and Odissi. Level: Basic",
  "What is Tripataka Mudra?": "Tripataka (Three parts of flag) ✋ — Like Pataka but ring finger bent down. Used to represent a crown, tree, or flame. Used in Bharatanatyam and Kathakali. Level: Basic",
  "What is Alapadma Mudra?": "Alapadma (Bloomed lotus) 🌸 — All fingers spread and slightly curved. Used to represent a lotus, beauty, or moon. Used in Bharatanatyam, Odissi, Mohiniyattam. Level: Basic",
  "What is Anjali Mudra?": "Anjali (Salutation) 🙏 — Both hands joined in prayer. Used for greeting, prayer, or salutation. Used in all classical dance forms. Level: Basic",
  "What is Kartarimukha Mudra?": "Kartarimukha (Scissors face) ✌️ — Index and middle finger separated like scissors. Used for separation, lightning, or a thief. Used in Bharatanatyam, Kathak, Kathakali. Level: Advanced",
  "What is Mayura Mudra?": "Mayura (Peacock) 🦚 — Thumb, index and little finger extended, middle and ring finger bent. Used to represent a peacock or applying tilak. Used in Odissi, Kuchipudi, Mohiniyattam. Level: Advanced",
  "How to contact us?": "📧 Email: hello@natrang.in\n📞 Phone: +91 98765 43210\n📍 Location: Bengaluru, India\n\nFor booking queries, use the Book Class page in the app!",
}

const categories = [
  {
    label: "📱 App Help",
    questions: [
      "How to book a class?",
      "How to watch videos?",
      "How to take a quiz?",
      "How to create account?",
      "How to login?",
      "How to save a dance?",
      "How to track progress?",
      "How to contact us?",
    ],
  },
  {
    label: "💃 Dance Forms",
    questions: [
      "What dance forms are available?",
      "What is Bharatanatyam?",
      "What is Kathak?",
      "What is Odissi?",
      "What is Kuchipudi?",
      "What is Mohiniyattam?",
      "What is Manipuri?",
      "What is Kathakali?",
      "What is Sattriya?",
      "What is Garba?",
      "What is Bhangra?",
    ],
  },
  {
    label: "🤲 Mudras",
    questions: [
      "What are Mudras?",
      "What is Pataka Mudra?",
      "What is Tripataka Mudra?",
      "What is Alapadma Mudra?",
      "What is Anjali Mudra?",
      "What is Kartarimukha Mudra?",
      "What is Mayura Mudra?",
    ],
  },
]

function getAutoReply(input) {
  const text = input.toLowerCase().trim()
  if (text.match(/^(hi|hello|hey|namaste|hii|helo)$/))
    return "Namaste! 🙏 Welcome to NataRang! I'm here to help you. Choose a question below 👇"
  if (text.match(/thank|thanks|thank you|thankyou/))
    return "You're welcome! 🙏 Is there anything else I can help you with? Choose from the options below 👇"
  if (text.match(/bye|goodbye|see you/))
    return "Goodbye! 🙏 Have a wonderful day! Keep dancing! 💃"
  return "I can only answer questions about NataRang. Please choose from the options below 👇"
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { from: "bot", text: "Namaste! 🙏 I'm your NataRang assistant. Choose a question below or say Hi!" },
  ])
  const [input, setInput] = useState("")
  const [activeCategory, setActiveCategory] = useState(0)

  function handleQuestion(question) {
    const answer = faqs[question]
    setMessages((prev) => [
      ...prev,
      { from: "user", text: question },
      { from: "bot", text: answer },
    ])
  }

  function handleSend() {
    if (!input.trim()) return
    const userText = input.trim()
    const reply = getAutoReply(userText)
    setMessages((prev) => [
      ...prev,
      { from: "user", text: userText },
      { from: "bot", text: reply },
    ])
    setInput("")
  }

  return (
    <div style={{ position: "fixed", bottom: "24px", right: "24px", zIndex: 50 }}>
      {isOpen && (
        <div style={{ width: "340px", height: "520px", background: "white", borderRadius: "20px", boxShadow: "0 8px 40px rgba(0,0,0,0.15)", display: "flex", flexDirection: "column", marginBottom: "12px", border: "1px solid #fed7aa" }}>
          
          {/* Header */}
          <div style={{ background: "linear-gradient(135deg, #f97316, #dc2626)", color: "white", padding: "14px 16px", borderRadius: "20px 20px 0 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontWeight: "700", fontSize: "15px" }}>🪔 NataRang Assistant</div>
              <div style={{ fontSize: "11px", opacity: 0.85 }}>Ask me anything about the app!</div>
            </div>
            <button onClick={() => setIsOpen(false)} style={{ background: "rgba(255,255,255,0.2)", border: "none", color: "white", borderRadius: "50%", width: "28px", height: "28px", cursor: "pointer", fontSize: "14px" }}>✕</button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ display: "flex", justifyContent: msg.from === "user" ? "flex-end" : "flex-start" }}>
                <div style={{ maxWidth: "80%", padding: "10px 14px", borderRadius: msg.from === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px", background: msg.from === "user" ? "#f97316" : "#f3f4f6", color: msg.from === "user" ? "white" : "#111827", fontSize: "13px", lineHeight: "1.6", whiteSpace: "pre-line" }}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Category tabs */}
          <div style={{ padding: "8px 12px 0", borderTop: "1px solid #f3f4f6" }}>
            <div style={{ display: "flex", gap: "6px", marginBottom: "8px" }}>
              {categories.map((cat, i) => (
                <button key={i} onClick={() => setActiveCategory(i)}
                  style={{ flex: 1, padding: "5px 4px", borderRadius: "8px", border: "none", background: activeCategory === i ? "#f97316" : "#f3f4f6", color: activeCategory === i ? "white" : "#6b7280", fontSize: "10px", fontWeight: "600", cursor: "pointer" }}>
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Question buttons */}
            <div style={{ maxHeight: "120px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "4px", marginBottom: "8px" }}>
              {categories[activeCategory].questions.map((q, i) => (
                <button key={i} onClick={() => handleQuestion(q)}
                  style={{ padding: "7px 10px", borderRadius: "8px", border: "1px solid #fed7aa", background: "#fff7ed", color: "#f97316", fontSize: "12px", fontWeight: "500", cursor: "pointer", textAlign: "left" }}>
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div style={{ padding: "8px 12px 12px", display: "flex", gap: "8px" }}>
            <input
              style={{ flex: 1, border: "1px solid #e5e7eb", borderRadius: "10px", padding: "8px 12px", fontSize: "13px", outline: "none" }}
              placeholder="Say hi or thank you..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend}
              style={{ background: "#f97316", color: "white", border: "none", borderRadius: "10px", padding: "8px 14px", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}>
              Send
            </button>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button onClick={() => setIsOpen(!isOpen)}
        style={{ background: "linear-gradient(135deg, #f97316, #dc2626)", color: "white", width: "56px", height: "56px", borderRadius: "50%", border: "none", fontSize: "24px", cursor: "pointer", boxShadow: "0 4px 20px rgba(249,115,22,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        🪔
      </button>
    </div>
  )
}