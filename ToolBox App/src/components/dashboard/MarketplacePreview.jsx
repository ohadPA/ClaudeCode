import { Star, CheckCircle, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { technicians } from '../../data/mockData';

export default function MarketplacePreview() {
  const navigate = useNavigate();

  return (
    <div className="anim-up anim-d10" style={{
      background: '#131D32', borderRadius: '14px', padding: '22px 24px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.5), 0 8px 32px rgba(0,0,0,0.35)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <button onClick={() => navigate('/marketplace')} style={{
          fontFamily: 'Heebo, sans-serif', fontSize: '13px', color: '#14B8A6',
          background: 'none', border: 'none', cursor: 'pointer', fontWeight: '500', padding: 0,
        }}>
          ← צפה בכולם
        </button>
        <h3 style={{ margin: 0, fontFamily: 'Heebo, sans-serif', fontSize: '15px', fontWeight: '700', color: '#E2E8F3' }}>
          בעלי מקצוע מובילים
        </h3>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
        {technicians.map((tech) => (
          <div key={tech.id} style={{
            display: 'flex', flexDirection: 'column', gap: '10px',
            padding: '14px', borderRadius: '12px',
            background: '#182540',
            border: '1px solid rgba(255,255,255,0.07)',
          }}>
            {/* Top row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '38px', height: '38px', borderRadius: '10px',
                background: `${tech.color}1A`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: tech.color, fontSize: '12px', fontWeight: '800',
                fontFamily: 'Heebo, sans-serif', flexShrink: 0,
                border: `1.5px solid ${tech.color}30`,
              }}>
                {tech.avatar}
              </div>
              <div style={{ flex: 1, overflow: 'hidden' }}>
                <div style={{ fontFamily: 'Heebo, sans-serif', fontSize: '13px', fontWeight: '700', color: '#E2E8F3', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {tech.name}
                </div>
                <div style={{ fontFamily: 'Heebo, sans-serif', fontSize: '11px', color: '#8B9DB8' }}>
                  {tech.profession}
                </div>
              </div>
            </div>

            {/* Rating + availability */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                <Star size={11} color="#FBBF24" fill="#FBBF24" />
                <span style={{ fontFamily: 'Heebo, sans-serif', fontSize: '12px', fontWeight: '700', color: '#E2E8F3' }}>{tech.rating}</span>
                <span style={{ fontFamily: 'Heebo, sans-serif', fontSize: '11px', color: '#4A5C78' }}>({tech.reviews})</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '3px', padding: '3px 7px', borderRadius: '20px', background: tech.available ? 'rgba(20,184,166,0.12)' : 'rgba(255,255,255,0.05)' }}>
                {tech.available ? <CheckCircle size={10} color="#14B8A6" /> : <Clock size={10} color="#4A5C78" />}
                <span style={{ fontFamily: 'Heebo, sans-serif', fontSize: '10px', fontWeight: '700', color: tech.available ? '#2DD4BF' : '#4A5C78' }}>
                  {tech.available ? 'זמין' : 'עסוק'}
                </span>
              </div>
            </div>

            <button style={{
              padding: '7px',
              background: tech.available ? 'rgba(20,184,166,0.15)' : 'rgba(255,255,255,0.04)',
              color: tech.available ? '#2DD4BF' : '#4A5C78',
              border: tech.available ? '1px solid rgba(20,184,166,0.25)' : '1px solid rgba(255,255,255,0.06)',
              borderRadius: '8px', fontSize: '12px', fontWeight: '700',
              cursor: tech.available ? 'pointer' : 'not-allowed',
              fontFamily: 'Heebo, sans-serif',
              transition: 'background 0.15s ease',
            }}>
              צור קשר
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
