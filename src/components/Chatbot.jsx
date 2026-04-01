import { useState } from "react";
const GROQ_API_KEY = atob("Z3NrX1Fsa1Zub1hWWkZQbUlRZDhMdndjV0d5YjNGWUg3SnhMbElndHhFUGxTOFBVZk5mbjJCVw==");
export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Namaste! 🙏 Ask me anything about Indian culture, festivals, or traditions!" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { from: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: "llama3-8b-8192",
          messages: [
            {
              role: "system",
              content: "You are a helpful assistant for Natrang, an Indian culture app. Answer questions about Indian festivals, traditions, dance forms, music, and culture. Keep answers concise and friendly."
            },
            {
              role: "user",
              content: input
            }
          ],
          max_tokens: 300
        }),
      });
      const data = await response.json();
      const answer = data?.choices?.[0]?.message?.content;
      setMessages((prev) => [...prev, { from: "bot", text: answer || "Sorry, I couldn't understand that!" }]);
    } catch (error) {
      setMessages((prev) => [...prev, { from: "bot", text: "Sorry, something went wrong!" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="w-80 h-96 bg-white rounded-2xl shadow-2xl flex flex-col mb-4 border border-orange-200">
          <div className="bg-orange-500 text-white px-4 py-3 rounded-t-2xl flex justify-between items-center">
            <span className="font-bold">🪔 Natrang Assistant</span>
            <button onClick={() => setIsOpen(false)}>✕</button>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`px-3 py-2 rounded-xl text-sm max-w-[75%] ${msg.from === "user" ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-800"}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && <div className="text-gray-400 text-sm">Thinking... 🪔</div>}
          </div>
          <div className="p-3 border-t flex gap-2">
            <input
              className="flex-1 border rounded-lg px-3 py-1 text-sm outline-none focus:border-orange-400"
              placeholder="Ask something..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage} className="bg-orange-500 text-white px-3 py-1 rounded-lg text-sm">
              Send
            </button>
          </div>
        </div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-orange-500 text-white w-14 h-14 rounded-full shadow-lg text-2xl flex items-center justify-center hover:bg-orange-600"
      >
        🪔
      </button>
    </div>
  );
}
