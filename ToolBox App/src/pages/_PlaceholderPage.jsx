export default function PlaceholderPage({ icon: Icon, title, subtitle, color, glow }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
      <div className="anim-up anim-d1" style={{
        textAlign: 'center',
        fontFamily: 'Heebo, sans-serif',
        background: '#131D32',
        borderRadius: '20px',
        padding: '52px 64px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.5), 0 8px 32px rgba(0,0,0,0.35)',
        border: '1px solid rgba(255,255,255,0.07)',
      }}>
        <div style={{
          width: '72px', height: '72px',
          background: glow,
          border: `1.5px solid ${color}30`,
          borderRadius: '20px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 20px',
        }}>
          <Icon size={32} color={color} strokeWidth={1.8} />
        </div>
        <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#E2E8F3', margin: '0 0 8px' }}>{title}</h2>
        <p style={{ fontSize: '14px', color: '#4A5C78', margin: 0 }}>{subtitle}</p>
        <div style={{
          marginTop: '28px',
          display: 'inline-flex', padding: '9px 22px',
          background: glow,
          border: `1px solid ${color}30`,
          color: color, borderRadius: '9px',
          fontSize: '13px', fontWeight: '700',
        }}>
          בקרוב
        </div>
      </div>
    </div>
  );
}
