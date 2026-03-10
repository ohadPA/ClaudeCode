import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Send, Building2, User, Sparkles } from 'lucide-react';

// In development Vite proxies /api → localhost:3001.
// In production the built static app calls the live chatbot directly.
const CHAT_API = import.meta.env.PROD
  ? 'https://tool-box.once-in-a-lifetime-test-bed.com/api/chat'
  : '/api/chat';

const WELCOME = {
  id: 0,
  role: 'bot',
  text: 'שלום! אני ארגז הכלים – עוזר חכם לניהול ועד הבית 🏢\nשאלו אותי על תחזוקה, תקציב, ביטוח, אסיפות ועוד.\nיש לי גישה לכ-143 רשומות ידע מהמדריך הרשמי.',
  suggestions: ['מה תפקידי ועד הבית?', 'כיצד מכינים תקציב שנתי?', 'אילו ביטוחים חייב הבניין?'],
  category: null,
};

function TypingIndicator() {
  return (
    <div style={{ display: 'flex', gap: '4px', alignItems: 'center', padding: '14px 16px' }}>
      {[0, 1, 2].map((i) => (
        <span key={i} style={{
          width: '7px', height: '7px', borderRadius: '50%',
          background: '#14B8A6',
          animation: `blink 1.2s infinite`,
          animationDelay: `${i * 0.18}s`,
          display: 'inline-block',
        }} />
      ))}
    </div>
  );
}

function BotBubble({ msg, onSuggest }) {
  return (
    <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '18px' }}>
      {/* Bot avatar */}
      <div style={{
        width: '34px', height: '34px', borderRadius: '10px', flexShrink: 0,
        background: 'linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 4px 12px rgba(20,184,166,0.25)',
        marginTop: '2px',
      }}>
        <Building2 size={17} color="#0B1121" strokeWidth={2.5} />
      </div>

      <div style={{ maxWidth: '72%' }}>
        {/* Bubble */}
        <div style={{
          background: '#182540',
          border: '1px solid rgba(20,184,166,0.14)',
          borderRadius: '4px 14px 14px 14px',
          padding: '13px 16px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
        }}>
          {msg.text === '__typing__' ? (
            <TypingIndicator />
          ) : (
            <p style={{
              margin: 0,
              fontFamily: 'Heebo, sans-serif',
              fontSize: '14px',
              lineHeight: 1.7,
              color: '#E2E8F3',
              whiteSpace: 'pre-wrap',
            }}>
              {msg.text}
            </p>
          )}
        </div>

        {/* Category badge */}
        {msg.category && msg.category !== 'ברירת מחדל' && (
          <div style={{ marginTop: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Sparkles size={10} color="#14B8A6" />
            <span style={{ fontFamily: 'Heebo, sans-serif', fontSize: '10px', color: '#4A5C78' }}>
              {msg.category}
            </span>
          </div>
        )}

        {/* Suggestion pills */}
        {msg.suggestions?.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '10px' }}>
            {msg.suggestions.map((s) => (
              <button key={s} onClick={() => onSuggest(s)} style={{
                padding: '5px 12px',
                background: 'rgba(20,184,166,0.08)',
                border: '1px solid rgba(20,184,166,0.22)',
                borderRadius: '20px',
                fontFamily: 'Heebo, sans-serif',
                fontSize: '12px', fontWeight: '500',
                color: '#2DD4BF',
                cursor: 'pointer',
                transition: 'background 0.15s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(20,184,166,0.16)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(20,184,166,0.08)'}
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function UserBubble({ text }) {
  return (
    <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', justifyContent: 'flex-end', marginBottom: '18px' }}>
      <div style={{ maxWidth: '68%' }}>
        <div style={{
          background: 'linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)',
          borderRadius: '14px 4px 14px 14px',
          padding: '12px 16px',
          boxShadow: '0 2px 12px rgba(20,184,166,0.25)',
        }}>
          <p style={{
            margin: 0,
            fontFamily: 'Heebo, sans-serif',
            fontSize: '14px',
            lineHeight: 1.65,
            color: '#0B1121',
            fontWeight: '500',
          }}>
            {text}
          </p>
        </div>
      </div>
      {/* User avatar */}
      <div style={{
        width: '34px', height: '34px', borderRadius: '10px', flexShrink: 0,
        background: 'rgba(249,115,22,0.15)',
        border: '1px solid rgba(249,115,22,0.25)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginTop: '2px',
      }}>
        <User size={16} color="#F97316" strokeWidth={2} />
      </div>
    </div>
  );
}

export default function Chatbot() {
  const [messages, setMessages] = useState([WELCOME]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const location = useLocation();
  const prefillSent = useRef(false);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Auto-send a message when navigated from Budget page via "איך לחסוך?"
  useEffect(() => {
    const prefill = location.state?.prefillMessage;
    if (prefill && !prefillSent.current) {
      prefillSent.current = true;
      // Small delay so the chat window is ready
      setTimeout(() => send(prefill), 400);
    }
  }, []);

  const send = async (text) => {
    const q = (text ?? input).trim();
    if (!q || loading) return;

    setInput('');
    setMessages((prev) => [...prev, { id: Date.now(), role: 'user', text: q }]);
    setLoading(true);

    // Add typing indicator
    const typingId = Date.now() + 1;
    setMessages((prev) => [...prev, { id: typingId, role: 'bot', text: '__typing__' }]);

    try {
      const res = await fetch(CHAT_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: q }),
      });
      const data = await res.json();

      setMessages((prev) =>
        prev
          .filter((m) => m.id !== typingId)
          .concat({
            id: Date.now() + 2,
            role: 'bot',
            text: data.response ?? 'מצטערים, אירעה שגיאה. נסו שנית.',
            suggestions: data.suggestions ?? [],
            category: data.category ?? null,
          })
      );
    } catch {
      setMessages((prev) =>
        prev
          .filter((m) => m.id !== typingId)
          .concat({
            id: Date.now() + 2,
            role: 'bot',
            text: 'לא ניתן להתחבר לשרת הידע. בדקו שהשרת פעיל.',
            suggestions: [],
            category: null,
          })
      );
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="anim-up anim-d1" style={{
      height: 'calc(100vh - 140px)',
      display: 'flex',
      flexDirection: 'column',
      background: '#131D32',
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: '0 2px 8px rgba(0,0,0,0.5), 0 8px 32px rgba(0,0,0,0.35)',
      border: '1px solid rgba(255,255,255,0.07)',
    }}>
      {/* Header */}
      <div style={{
        padding: '18px 24px',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        flexShrink: 0,
        background: '#182540',
      }}>
        <div style={{
          width: '40px', height: '40px', borderRadius: '12px',
          background: 'linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 14px rgba(20,184,166,0.25)',
          flexShrink: 0,
        }}>
          <Building2 size={21} color="#0B1121" strokeWidth={2.5} />
        </div>
        <div>
          <h2 style={{ margin: 0, fontFamily: 'Heebo, sans-serif', fontSize: '16px', fontWeight: '800', color: '#E2E8F3' }}>
            צ׳אטבוט ידע – ארגז הכלים
          </h2>
          <p style={{ margin: '2px 0 0', fontFamily: 'Heebo, sans-serif', fontSize: '12px', color: '#4A5C78' }}>
            גרסת מרץ 2026 · 143 רשומות ידע · מקור: הרשות הממשלתית להתחדשות עירונית
          </p>
        </div>
        <div style={{ marginRight: 'auto' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '5px',
            padding: '5px 11px', borderRadius: '20px',
            background: 'rgba(20,184,166,0.12)',
            border: '1px solid rgba(20,184,166,0.20)',
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#14B8A6', display: 'inline-block' }} />
            <span style={{ fontFamily: 'Heebo, sans-serif', fontSize: '11px', fontWeight: '600', color: '#2DD4BF' }}>
              פעיל
            </span>
          </div>
        </div>
      </div>

      {/* Chat window */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '24px 24px 8px',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {messages.map((msg) =>
          msg.role === 'user'
            ? <UserBubble key={msg.id} text={msg.text} />
            : <BotBubble key={msg.id} msg={msg} onSuggest={(s) => send(s)} />
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input row */}
      <div style={{
        padding: '16px 20px',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        background: '#182540',
        flexShrink: 0,
        display: 'flex',
        gap: '10px',
        alignItems: 'flex-end',
      }}>
        <div style={{
          flex: 1,
          background: '#0F1829',
          border: '1px solid rgba(255,255,255,0.10)',
          borderRadius: '12px',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
        }}>
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="שאלו שאלה על ניהול הבניין…"
            rows={1}
            disabled={loading}
            style={{
              flex: 1,
              border: 'none', outline: 'none',
              background: 'transparent',
              fontFamily: 'Heebo, sans-serif',
              fontSize: '14px',
              color: '#E2E8F3',
              resize: 'none',
              lineHeight: 1.5,
              maxHeight: '120px',
              overflowY: 'auto',
              textAlign: 'right',
              direction: 'rtl',
            }}
          />
        </div>

        <button
          onClick={() => send()}
          disabled={!input.trim() || loading}
          style={{
            width: '46px', height: '46px',
            background: input.trim() && !loading
              ? 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)'
              : 'rgba(255,255,255,0.07)',
            border: 'none', borderRadius: '12px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: input.trim() && !loading ? 'pointer' : 'not-allowed',
            transition: 'all 0.18s ease',
            flexShrink: 0,
            boxShadow: input.trim() && !loading ? '0 4px 14px rgba(249,115,22,0.35)' : 'none',
          }}
        >
          <Send size={18} color={input.trim() && !loading ? '#fff' : '#4A5C78'} strokeWidth={2} style={{ transform: 'rotate(180deg)' }} />
        </button>
      </div>
    </div>
  );
}
