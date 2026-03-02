import { Bell, Search, ChevronDown } from 'lucide-react';
import { buildingInfo } from '../../data/mockData';

export default function TopNavbar({ sidebarWidth }) {
  return (
    <header style={{
      position: 'fixed',
      top: 0,
      right: `${sidebarWidth}px`,
      left: 0,
      height: '64px',
      background: 'rgba(11, 17, 33, 0.90)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(255,255,255,0.07)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 28px',
      gap: '14px',
      zIndex: 50,
      transition: 'right 0.24s cubic-bezier(0.4, 0, 0.2, 1)',
    }}>
      {/* Building selector */}
      <button style={{
        display: 'flex', alignItems: 'center', gap: '7px',
        padding: '8px 13px',
        background: '#131D32',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '9px', cursor: 'pointer',
        boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
        flexShrink: 0,
      }}>
        <span style={{ fontFamily: 'Heebo, sans-serif', fontSize: '13px', fontWeight: '600', color: '#E2E8F3', whiteSpace: 'nowrap' }}>
          {buildingInfo.name}
        </span>
        <ChevronDown size={13} color="#4A5C78" />
      </button>

      {/* Search */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '8px',
        background: '#131D32',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '9px',
        padding: '8px 14px',
        flex: 1, maxWidth: '340px',
      }}>
        <Search size={13} color="#4A5C78" />
        <input
          type="text"
          placeholder="חיפוש…"
          style={{
            border: 'none', outline: 'none',
            background: 'transparent',
            fontFamily: 'Heebo, sans-serif',
            fontSize: '13px', color: '#E2E8F3',
            width: '100%', textAlign: 'right',
          }}
        />
      </div>

      <div style={{ flex: 1 }} />

      <span style={{ fontFamily: 'Heebo, sans-serif', fontSize: '12px', color: '#4A5C78', whiteSpace: 'nowrap' }}>
        מרץ 2026
      </span>

      {/* Notification bell */}
      <button style={{
        position: 'relative', padding: '9px',
        background: '#131D32',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '9px', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Bell size={17} color="#8B9DB8" strokeWidth={1.8} />
        <span style={{
          position: 'absolute', top: '6px', right: '6px',
          width: '7px', height: '7px',
          background: '#F97316', borderRadius: '50%',
          border: '1.5px solid #0B1121',
        }} />
      </button>

      {/* User avatar */}
      <button style={{
        display: 'flex', alignItems: 'center', gap: '9px',
        padding: '6px 12px 6px 8px',
        background: '#131D32',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '9px', cursor: 'pointer',
      }}>
        <div style={{
          width: '28px', height: '28px',
          background: 'linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)',
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <span style={{ color: '#0B1121', fontSize: '11px', fontWeight: '800', fontFamily: 'Heebo, sans-serif' }}>
            עא
          </span>
        </div>
        <span style={{ fontFamily: 'Heebo, sans-serif', fontSize: '13px', fontWeight: '500', color: '#E2E8F3', whiteSpace: 'nowrap' }}>
          {buildingInfo.manager}
        </span>
        <ChevronDown size={13} color="#4A5C78" />
      </button>
    </header>
  );
}
