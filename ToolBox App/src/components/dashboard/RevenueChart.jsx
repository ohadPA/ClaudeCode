import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { monthlyRevenue } from '../../data/mockData';
import { formatCurrency } from '../../utils/formatters';

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: '#182540', border: '1px solid rgba(255,255,255,0.10)',
      borderRadius: '10px', padding: '11px 15px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
      fontFamily: 'Heebo, sans-serif', direction: 'rtl', minWidth: '160px',
    }}>
      <p style={{ margin: '0 0 7px', fontWeight: '700', color: '#E2E8F3', fontSize: '13px' }}>{label}</p>
      {payload.map((entry) => (
        <p key={entry.name} style={{ margin: '3px 0', fontSize: '13px', color: entry.color, fontWeight: '500' }}>
          {entry.name}: {formatCurrency(entry.value)}
        </p>
      ))}
    </div>
  );
}

function LegendDot({ color, label }) {
  return (
    <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontFamily: 'Heebo, sans-serif', fontSize: '12px', color: '#8B9DB8' }}>
      <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: color, display: 'inline-block', flexShrink: 0 }} />
      {label}
    </span>
  );
}

export default function RevenueChart() {
  return (
    <div className="anim-up anim-d6" style={{
      background: '#131D32', borderRadius: '14px', padding: '22px 24px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.5), 0 8px 32px rgba(0,0,0,0.35)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <LegendDot color="#10B981" label="הכנסות" />
          <LegendDot color="#F97316" label="הוצאות" />
        </div>
        <h3 style={{ margin: 0, fontFamily: 'Heebo, sans-serif', fontSize: '15px', fontWeight: '700', color: '#E2E8F3' }}>
          הכנסות מול הוצאות
        </h3>
      </div>

      <div dir="ltr">
        <ResponsiveContainer width="100%" height={230}>
          <AreaChart data={monthlyRevenue} margin={{ top: 4, right: 8, bottom: 0, left: 44 }}>
            <defs>
              <linearGradient id="grad-income" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#10B981" stopOpacity={0.18} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="grad-expense" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#F97316" stopOpacity={0.16} />
                <stop offset="95%" stopColor="#F97316" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#4A5C78', fontFamily: 'Heebo, sans-serif' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#4A5C78' }} axisLine={false} tickLine={false} tickFormatter={(v) => `₪${(v/1000).toFixed(0)}K`} width={42} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="income" name="הכנסות" stroke="#10B981" strokeWidth={2.5} fill="url(#grad-income)" dot={false} activeDot={{ r: 5, fill: '#10B981', strokeWidth: 0 }} />
            <Area type="monotone" dataKey="expenses" name="הוצאות" stroke="#F97316" strokeWidth={2.5} fill="url(#grad-expense)" dot={false} activeDot={{ r: 5, fill: '#F97316', strokeWidth: 0 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
