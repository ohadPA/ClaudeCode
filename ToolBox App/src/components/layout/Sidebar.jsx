import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, MessageSquare, PiggyBank, Wrench,
  TrendingUp, TrendingDown, Settings, User, ChevronLeft, Building2,
} from 'lucide-react';

const NAV = [
  { path: '/',            label: 'לוח בקרה',       icon: LayoutDashboard, exact: true },
  { path: '/chatbot',     label: "צ'אטבוט ידע",     icon: MessageSquare },
  { path: '/budget',      label: 'בנה תקציב',       icon: PiggyBank },
  { path: '/marketplace', label: 'שוק בעלי מקצוע', icon: Wrench },
  { path: '/income',      label: 'ניהול הכנסות',    icon: TrendingUp },
  { path: '/expenses',    label: 'ניהול הוצאות',    icon: TrendingDown },
];
const BOTTOM = [
  { path: '/settings', label: 'הגדרות', icon: Settings },
  { path: '/profile',  label: 'פרופיל',  icon: User },
];

function NavItem({ item, collapsed }) {
  const location = useLocation();
  const active = item.exact
    ? location.pathname === item.path
    : location.pathname.startsWith(item.path);
  const Icon = item.icon;

  return (
    <NavLink
      to={item.path}
      className="sidebar-item"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: collapsed ? 'center' : 'flex-start',
        gap: '11px',
        padding: collapsed ? '11px' : '10px 14px',
        borderRadius: '9px',
        marginBottom: '2px',
        textDecoration: 'none',
        background: active ? 'rgba(20,184,166,0.12)' : 'transparent',
        position: 'relative',
        transition: 'background 0.15s ease',
      }}
      title={collapsed ? item.label : undefined}
    >
      {active && (
        <span style={{
          position: 'absolute',
          right: 0, top: '50%',
          transform: 'translateY(-50%)',
          width: '3px', height: '22px',
          background: '#14B8A6',
          borderRadius: '3px 0 0 3px',
        }} />
      )}
      <Icon
        size={17}
        color={active ? '#2DD4BF' : 'rgba(255,255,255,0.32)'}
        strokeWidth={active ? 2.5 : 1.8}
        style={{ flexShrink: 0 }}
      />
      {!collapsed && (
        <span style={{
          fontFamily: 'Heebo, sans-serif',
          fontSize: '14px',
          fontWeight: active ? '600' : '400',
          color: active ? '#2DD4BF' : 'rgba(255,255,255,0.42)',
          letterSpacing: '0.01em',
        }}>
          {item.label}
        </span>
      )}
    </NavLink>
  );
}

export default function Sidebar({ collapsed, onToggle }) {
  const w = collapsed ? 72 : 260;

  return (
    <aside style={{
      width: `${w}px`,
      minHeight: '100vh',
      position: 'fixed',
      right: 0, top: 0, bottom: 0,
      zIndex: 100,
      display: 'flex',
      flexDirection: 'column',
      background: 'linear-gradient(175deg, #0F1829 0%, #08101F 100%)',
      borderLeft: '1px solid rgba(255,255,255,0.07)',
      transition: 'width 0.24s cubic-bezier(0.4, 0, 0.2, 1)',
      overflowX: 'hidden',
      overflowY: 'auto',
    }}>
      {/* Logo */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: collapsed ? 'center' : 'flex-start',
        gap: '12px',
        padding: collapsed ? '20px 0' : '20px 20px',
        minHeight: '72px',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        flexShrink: 0,
      }}>
        <div style={{
          width: '36px', height: '36px',
          background: 'linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)',
          borderRadius: '10px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
          boxShadow: '0 4px 14px rgba(20,184,166,0.25)',
        }}>
          <Building2 size={19} color="#0B1121" strokeWidth={2.5} />
        </div>
        {!collapsed && (
          <div style={{ overflow: 'hidden' }}>
            <div style={{ fontFamily: 'Heebo, sans-serif', color: '#E2E8F3', fontSize: '15px', fontWeight: '800', lineHeight: 1.2, whiteSpace: 'nowrap' }}>
              ארגז הכלים
            </div>
            <div style={{ fontFamily: 'Heebo, sans-serif', color: '#4A5C78', fontSize: '11px', whiteSpace: 'nowrap' }}>
              ועד הבית
            </div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '12px 10px', overflowY: 'auto' }}>
        {NAV.map((item) => <NavItem key={item.path} item={item} collapsed={collapsed} />)}
      </nav>

      {/* Bottom */}
      <div style={{ padding: '10px 10px', borderTop: '1px solid rgba(255,255,255,0.07)', flexShrink: 0 }}>
        {BOTTOM.map((item) => <NavItem key={item.path} item={item} collapsed={collapsed} />)}

        <button onClick={onToggle} style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: '100%', padding: '9px', marginTop: '6px',
          background: 'rgba(255,255,255,0.05)',
          border: 'none', borderRadius: '8px', cursor: 'pointer',
          color: '#4A5C78',
          transition: 'background 0.15s ease',
        }}>
          <ChevronLeft size={15} style={{
            transform: collapsed ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.24s ease',
          }} />
        </button>

        {!collapsed && (
          <div style={{
            marginTop: '14px', padding: '10px 12px', borderRadius: '9px',
            background: 'rgba(20,184,166,0.08)',
            border: '1px solid rgba(20,184,166,0.14)',
          }}>
            <div style={{ fontSize: '10px', color: '#4A5C78', marginBottom: '3px', fontFamily: 'Heebo' }}>
              בניין מנוהל
            </div>
            <div style={{ fontSize: '13px', color: '#2DD4BF', fontWeight: '600', fontFamily: 'Heebo' }}>
              הרצל 24 · תל אביב
            </div>
            <div style={{ fontSize: '11px', color: '#4A5C78', marginTop: '2px', fontFamily: 'Heebo' }}>
              24 יחידות דיור
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
