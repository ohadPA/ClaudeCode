import { MessageSquare, PiggyBank, Wrench, Plus, Minus, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ACTIONS = [
  { label: "שאל את הצ'אטבוט", icon: MessageSquare, color: '#14B8A6', bg: 'rgba(20,184,166,0.10)',  path: '/chatbot' },
  { label: 'בנה תקציב',        icon: PiggyBank,    color: '#7C3AED', bg: 'rgba(124,58,237,0.10)',  path: '/budget' },
  { label: 'מצא בעל מקצוע',   icon: Wrench,       color: '#10B981', bg: 'rgba(16,185,129,0.10)',  path: '/marketplace' },
  { label: 'רשום הכנסה',       icon: Plus,         color: '#10B981', bg: 'rgba(16,185,129,0.10)',  path: '/income' },
  { label: 'רשום הוצאה',       icon: Minus,        color: '#F97316', bg: 'rgba(249,115,22,0.10)',  path: '/expenses' },
  { label: 'שלח הודעה לדיירים',icon: Bell,         color: '#FBBF24', bg: 'rgba(251,191,36,0.10)',  path: '/' },
];

export default function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="anim-up anim-d8" style={{
      background: '#131D32', borderRadius: '14px', padding: '22px 22px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.5), 0 8px 32px rgba(0,0,0,0.35)',
    }}>
      <h3 style={{ margin: '0 0 14px', fontFamily: 'Heebo, sans-serif', fontSize: '15px', fontWeight: '700', color: '#E2E8F3' }}>
        פעולות מהירות
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '9px' }}>
        {ACTIONS.map((action) => {
          const Icon = action.icon;
          return (
            <button key={action.label} className="qa-card" onClick={() => navigate(action.path)} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
              padding: '15px 6px 13px',
              background: action.bg,
              border: `1px solid ${action.color}22`,
              borderRadius: '11px', cursor: 'pointer',
              fontFamily: 'Heebo, sans-serif',
            }}>
              <div style={{
                width: '38px', height: '38px',
                background: 'rgba(0,0,0,0.25)',
                borderRadius: '10px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon size={17} color={action.color} strokeWidth={2} />
              </div>
              <span style={{ fontSize: '11px', fontWeight: '600', color: '#E2E8F3', textAlign: 'center', lineHeight: 1.35 }}>
                {action.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
