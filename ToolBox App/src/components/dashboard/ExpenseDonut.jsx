import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { expenseCategories } from '../../data/mockData';
import { formatCurrency } from '../../utils/formatters';

const CATS = [
  { name: 'ניקיון',  value: 2800, color: '#14B8A6' },
  { name: 'תחזוקה', value: 1900, color: '#10B981' },
  { name: 'חשמל',   value: 1200, color: '#F97316' },
  { name: 'מים',    value: 800,  color: '#06B6D4' },
  { name: 'ביטוח',  value: 600,  color: '#7C3AED' },
  { name: 'גינון',  value: 500,  color: '#FBBF24' },
  { name: 'שונות',  value: 320,  color: '#4A5C78' },
];
const total = CATS.reduce((s, c) => s + c.value, 0);

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const d = payload[0];
  return (
    <div style={{
      background: '#182540', border: '1px solid rgba(255,255,255,0.10)',
      borderRadius: '9px', padding: '9px 13px',
      boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
      fontFamily: 'Heebo, sans-serif', direction: 'rtl',
    }}>
      <p style={{ margin: 0, fontSize: '13px', fontWeight: '700', color: '#E2E8F3' }}>{d.name}</p>
      <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#8B9DB8' }}>
        {formatCurrency(d.value)} · {((d.value / total) * 100).toFixed(1)}%
      </p>
    </div>
  );
}

export default function ExpenseDonut() {
  return (
    <div className="anim-up anim-d7" style={{
      background: '#131D32', borderRadius: '14px', padding: '22px 24px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.5), 0 8px 32px rgba(0,0,0,0.35)',
      display: 'flex', flexDirection: 'column',
    }}>
      <h3 style={{ margin: '0 0 16px', fontFamily: 'Heebo, sans-serif', fontSize: '15px', fontWeight: '700', color: '#E2E8F3' }}>
        פילוח הוצאות
      </h3>

      <div dir="ltr" style={{ position: 'relative' }}>
        <ResponsiveContainer width="100%" height={190}>
          <PieChart>
            <Pie data={CATS} cx="50%" cy="50%" innerRadius={56} outerRadius={86} paddingAngle={2} dataKey="value" strokeWidth={0}>
              {CATS.map((entry, i) => <Cell key={i} fill={entry.color} />)}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center', pointerEvents: 'none',
        }}>
          <div style={{ fontFamily: 'Heebo, sans-serif', fontSize: '17px', fontWeight: '800', color: '#E2E8F3', lineHeight: 1.2 }}>
            {formatCurrency(total)}
          </div>
          <div style={{ fontSize: '10px', color: '#4A5C78', fontFamily: 'Heebo, sans-serif' }}>סה״כ הוצאות</div>
        </div>
      </div>

      <div dir="rtl" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 14px', marginTop: '14px' }}>
        {CATS.map((cat) => (
          <div key={cat.name} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '2px', background: cat.color, display: 'inline-block', flexShrink: 0 }} />
            <span style={{ fontFamily: 'Heebo, sans-serif', fontSize: '11px', color: '#8B9DB8' }}>{cat.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
