import { Wallet, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import { kpiData } from '../../data/mockData';
import { formatCurrency, formatNumber } from '../../utils/formatters';

const CARDS = [
  {
    label: 'יתרת קופה',
    value: formatCurrency(kpiData.balance),
    change: kpiData.balanceChange,
    icon: Wallet,
    accent: '#14B8A6',
    iconBg: 'rgba(20,184,166,0.12)',
    delay: 'anim-d2',
  },
  {
    label: 'הכנסות חודשיות',
    value: formatCurrency(kpiData.monthlyIncome),
    change: kpiData.incomeChange,
    icon: TrendingUp,
    accent: '#10B981',
    iconBg: 'rgba(16,185,129,0.12)',
    delay: 'anim-d3',
  },
  {
    label: 'הוצאות חודשיות',
    value: formatCurrency(kpiData.monthlyExpenses),
    change: kpiData.expenseChange,
    icon: TrendingDown,
    accent: '#F97316',
    iconBg: 'rgba(249,115,22,0.12)',
    delay: 'anim-d4',
  },
  {
    label: 'פניות פתוחות',
    value: formatNumber(kpiData.openRequests),
    change: kpiData.requestsChange,
    icon: AlertCircle,
    accent: '#FBBF24',
    iconBg: 'rgba(251,191,36,0.12)',
    delay: 'anim-d5',
  },
];

export default function KpiCards() {
  return (
    <div className="kpi-grid" style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '18px',
      marginBottom: '22px',
    }}>
      {CARDS.map((card) => {
        const Icon = card.icon;
        const positive = card.change >= 0;

        return (
          <div key={card.label} className={`anim-up ${card.delay}`} style={{
            background: '#131D32',
            borderRadius: '14px',
            padding: '22px 22px 20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.5), 0 8px 32px rgba(0,0,0,0.35)',
            borderTop: `3px solid ${card.accent}`,
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Watermark circle */}
            <div style={{
              position: 'absolute', bottom: '-18px', left: '-18px',
              width: '80px', height: '80px',
              borderRadius: '50%',
              background: card.iconBg,
              pointerEvents: 'none',
            }} />

            {/* Icon chip */}
            <div style={{
              position: 'absolute', top: '20px', left: '20px',
              width: '38px', height: '38px',
              background: card.iconBg,
              borderRadius: '10px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon size={18} color={card.accent} strokeWidth={2} />
            </div>

            {/* Label */}
            <div style={{
              fontFamily: 'Heebo, sans-serif',
              fontSize: '11px', fontWeight: '600',
              color: '#4A5C78',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              marginBottom: '7px',
            }}>
              {card.label}
            </div>

            {/* Value */}
            <div style={{
              fontFamily: 'Heebo, sans-serif',
              fontSize: '26px', fontWeight: '800',
              color: '#E2E8F3',
              lineHeight: 1.15, marginBottom: '10px',
              letterSpacing: '-0.02em',
            }}>
              {card.value}
            </div>

            {/* Change badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '4px',
              padding: '3px 9px', borderRadius: '20px',
              background: positive ? 'rgba(16,185,129,0.14)' : 'rgba(249,115,22,0.14)',
              color: positive ? '#34D399' : '#FB923C',
              fontSize: '11px', fontWeight: '700',
              fontFamily: 'Heebo, sans-serif',
            }}>
              {positive ? '▲' : '▼'} {Math.abs(card.change)}%
              <span style={{ fontWeight: '400', color: '#4A5C78', marginRight: '3px', fontSize: '10px' }}>
                מהחודש שעבר
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
