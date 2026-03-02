import { recentActivity } from '../../data/mockData';
import { formatCurrency } from '../../utils/formatters';

const STATUS_STYLE = {
  הושלם:  { bg: 'rgba(20,184,166,0.12)',  color: '#2DD4BF' },
  בטיפול: { bg: 'rgba(251,191,36,0.12)',  color: '#FCD34D' },
  ממתין:  { bg: 'rgba(249,115,22,0.12)',  color: '#FB923C' },
};
const TYPE_COLOR = {
  הכנסה: '#10B981',
  הוצאה: '#F97316',
  פניה:  '#14B8A6',
};
const HEADERS = ['תאריך', 'סוג', 'תיאור', 'סכום', 'סטטוס'];

export default function RecentActivity() {
  return (
    <div className="anim-up anim-d9" style={{
      background: '#131D32', borderRadius: '14px', padding: '22px 24px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.5), 0 8px 32px rgba(0,0,0,0.35)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <button style={{
          fontFamily: 'Heebo, sans-serif', fontSize: '13px', color: '#14B8A6',
          background: 'none', border: 'none', cursor: 'pointer', fontWeight: '500', padding: 0,
        }}>
          ← צפה בכל
        </button>
        <h3 style={{ margin: 0, fontFamily: 'Heebo, sans-serif', fontSize: '15px', fontWeight: '700', color: '#E2E8F3' }}>
          פעילות אחרונה
        </h3>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'Heebo, sans-serif' }}>
          <thead>
            <tr>
              {HEADERS.map((h) => (
                <th key={h} style={{
                  padding: '9px 12px', textAlign: 'right',
                  fontSize: '10px', fontWeight: '700', color: '#4A5C78',
                  borderBottom: '1px solid rgba(255,255,255,0.07)',
                  letterSpacing: '0.05em', textTransform: 'uppercase', whiteSpace: 'nowrap',
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {recentActivity.map((row) => (
              <tr key={row.id} className="table-row" style={{ cursor: 'default' }}>
                <td style={{ padding: '11px 12px', fontSize: '13px', color: '#8B9DB8', borderBottom: '1px solid rgba(255,255,255,0.04)', whiteSpace: 'nowrap' }}>
                  {row.date}
                </td>
                <td style={{ padding: '11px 12px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <span style={{ fontSize: '12px', fontWeight: '700', color: TYPE_COLOR[row.type] ?? '#8B9DB8' }}>
                    {row.type}
                  </span>
                </td>
                <td style={{ padding: '11px 12px', fontSize: '13px', color: '#E2E8F3', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  {row.desc}
                </td>
                <td style={{
                  padding: '11px 12px', fontSize: '13px', fontWeight: '700',
                  borderBottom: '1px solid rgba(255,255,255,0.04)', whiteSpace: 'nowrap',
                  color: row.amount == null ? '#4A5C78' : row.amount > 0 ? '#10B981' : '#F97316',
                }}>
                  {row.amount == null ? '—' : (row.amount > 0 ? '+' : '−') + formatCurrency(row.amount)}
                </td>
                <td style={{ padding: '11px 12px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <span style={{
                    display: 'inline-block', padding: '3px 10px', borderRadius: '20px',
                    fontSize: '11px', fontWeight: '700',
                    background: STATUS_STYLE[row.status]?.bg ?? 'rgba(255,255,255,0.06)',
                    color: STATUS_STYLE[row.status]?.color ?? '#8B9DB8',
                  }}>
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
