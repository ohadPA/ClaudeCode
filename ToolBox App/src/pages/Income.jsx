import { useState, useEffect } from 'react';
import { Plus, Trash2, RefreshCw } from 'lucide-react';
import { getIncome, saveIncome } from '../utils/db';

// ─── Constants ────────────────────────────────────────────────────────────────
const M_LABELS = ['ינו׳','פבר׳','מרץ','אפר׳','מאי','יוני','יולי','אוג׳','ספט׳','אוק׳','נוב׳','דצמ׳'];
const CURRENT_MONTH = 2; // March 2026 (0-indexed)
const DEFAULT_FEE = 400;

// Seed data from the building's spreadsheet
const SEED_ROWS = [
  { id:'r1',  apt:'1',  m:[400,null,null,null,null,null,null,null,null,null,null,null], oneTime:null },
  { id:'r2',  apt:'2',  m:[400,400,null,null,null,null,null,null,null,null,null,null], oneTime:null },
  { id:'r3',  apt:'3',  m:[400,null,null,null,null,null,null,null,null,null,null,null], oneTime:null },
  { id:'r4',  apt:'4',  m:[400,null,null,null,null,null,null,null,null,null,null,null], oneTime:null },
  { id:'r5',  apt:'5',  m:[400,400,null,null,null,null,null,null,null,null,null,null], oneTime:null },
  { id:'r6',  apt:'6',  m:[400,null,null,null,null,null,null,null,null,null,null,null], oneTime:null },
  { id:'r7',  apt:'7',  m:[400,400,null,null,null,null,null,null,null,null,null,null], oneTime:null },
  { id:'r8',  apt:'8',  m:[400,400,null,null,null,null,null,null,null,null,null,null], oneTime:null },
  { id:'r9',  apt:'9',  m:[400,null,null,null,null,null,null,null,null,null,null,null], oneTime:null },
  { id:'r10', apt:'10', m:[400,400,null,null,null,null,null,null,null,null,null,null], oneTime:null },
  { id:'r11', apt:'11', m:[300,null,null,null,null,null,null,null,null,null,null,null], oneTime:null },
  { id:'r12', apt:'12', m:[400,400,null,null,null,null,null,null,null,null,null,null], oneTime:null },
  { id:'r13', apt:'13', m:[400,null,null,null,null,null,null,null,null,null,null,null], oneTime:null },
  { id:'r14', apt:'14', m:[400,400,null,null,null,null,null,null,null,null,null,null], oneTime:null },
  { id:'r15', apt:'15', m:[400,400,null,null,null,null,null,null,null,null,null,null], oneTime:null },
  { id:'r16', apt:'16', m:[400,400,400,null,null,null,null,null,null,null,null,null], oneTime:null },
  { id:'r17', apt:'17', m:[400,400,null,null,null,null,null,null,null,null,null,null], oneTime:null },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
const toNum = (v) => {
  if (v === '' || v === null || v === undefined) return null;
  const n = parseFloat(String(v).replace(/[,₪ ]/g, ''));
  return isNaN(n) ? null : n;
};

const fmt = (n) => n == null ? '' : new Intl.NumberFormat('he-IL').format(Math.round(n));

const pct = (num, den) => {
  if (!den) return '—';
  return Math.round((num / den) * 100) + '%';
};

function inferFee(m) {
  const vals = m.filter(v => v !== null && v > 0);
  return vals.length > 0 ? Math.max(...vals) : DEFAULT_FEE;
}

function computeRow(row) {
  const fee = inferFee(row.m);
  const paid = row.m.reduce((s, v) => s + (v || 0), 0) + (row.oneTime || 0);
  // Past months up to current month: unpaid = debt
  const debt = row.m.slice(0, CURRENT_MONTH + 1).reduce((s, v) => s + (v === null ? fee : 0), 0);
  // Future months: planned but not yet due
  const future = row.m.slice(CURRENT_MONTH + 1).reduce((s, v) => s + (v === null ? fee : 0), 0);
  return { fee, paid, debt, future };
}

// ─── Editable cell ────────────────────────────────────────────────────────────
function EditableCell({ value, onSave, align = 'center', style = {}, inputStyle = {} }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState('');

  const open = () => {
    setDraft(value != null ? String(value) : '');
    setEditing(true);
  };
  const commit = () => {
    setEditing(false);
    onSave(draft);
  };
  const handleKey = (e) => {
    if (e.key === 'Enter') commit();
    if (e.key === 'Escape') setEditing(false);
  };

  return (
    <td
      onClick={!editing ? open : undefined}
      style={{
        textAlign: align,
        cursor: editing ? 'default' : 'pointer',
        padding: 0,
        position: 'relative',
        ...style,
      }}
    >
      {editing ? (
        <input
          autoFocus
          value={draft}
          onChange={e => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={handleKey}
          style={{
            width: '100%',
            background: 'rgba(20,184,166,0.12)',
            border: 'none',
            outline: '2px solid #14B8A6',
            outlineOffset: '-2px',
            color: '#E2E8F3',
            fontFamily: 'Heebo, sans-serif',
            fontSize: '13px',
            textAlign: align,
            padding: '7px 6px',
            boxSizing: 'border-box',
            height: '100%',
            ...inputStyle,
          }}
        />
      ) : (
        <div style={{ padding: '7px 6px', minHeight: '36px', display: 'flex', alignItems: 'center', justifyContent: align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start' }}>
          {value != null && value !== '' ? fmt(value) : <span style={{ color: 'transparent' }}>·</span>}
        </div>
      )}
    </td>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function Income() {
  const [rows, setRows] = useState(null);
  const [confirmReset, setConfirmReset] = useState(false);

  useEffect(() => {
    const saved = getIncome();
    setRows(saved ?? SEED_ROWS);
  }, []);

  useEffect(() => {
    if (rows) saveIncome(rows);
  }, [rows]);

  const updateCell = (rowId, field, rawVal) => {
    setRows(prev => prev.map(r => {
      if (r.id !== rowId) return r;
      if (field === 'apt') return { ...r, apt: rawVal };
      if (field === 'oneTime') return { ...r, oneTime: toNum(rawVal) };
      const mi = parseInt(field.slice(1)); // 'm0' → 0
      const newM = [...r.m];
      newM[mi] = toNum(rawVal);
      return { ...r, m: newM };
    }));
  };

  const deleteRow = (rowId) => setRows(prev => prev.filter(r => r.id !== rowId));

  const addRow = () => {
    const newId = `r${Date.now()}`;
    setRows(prev => [...prev, {
      id: newId,
      apt: String(prev.length + 1),
      m: Array(12).fill(null),
      oneTime: null,
    }]);
  };

  const resetToSeed = () => {
    setRows(SEED_ROWS);
    setConfirmReset(false);
  };

  if (!rows) return null;

  // ── Summary computations ───────────────────────────────────────────────────
  const totalPlanned = rows.reduce((s, r) => s + inferFee(r.m), 0);
  const monthSums    = M_LABELS.map((_, i) => rows.reduce((s, r) => s + (r.m[i] || 0), 0));
  const totalPaid    = rows.reduce((s, r) => s + computeRow(r).paid, 0);
  const totalDebt    = rows.reduce((s, r) => s + computeRow(r).debt, 0);
  const totalFuture  = rows.reduce((s, r) => s + computeRow(r).future, 0);

  // ── Styles ─────────────────────────────────────────────────────────────────
  const thBase = {
    fontFamily: 'Heebo, sans-serif',
    fontSize: '11px',
    fontWeight: '700',
    color: '#4A5C78',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    padding: '10px 6px',
    whiteSpace: 'nowrap',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
    background: '#111C30',
    textAlign: 'center',
  };
  const summaryTd = {
    fontFamily: 'Heebo, sans-serif',
    fontSize: '12px',
    fontWeight: '700',
    color: '#94A3B8',
    padding: '8px 6px',
    textAlign: 'center',
    borderTop: '1px solid rgba(255,255,255,0.07)',
    background: '#111C30',
    whiteSpace: 'nowrap',
  };
  const computedTd = {
    fontFamily: 'Heebo, sans-serif',
    fontSize: '13px',
    fontWeight: '700',
    padding: '7px 10px',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    background: 'rgba(0,0,0,0.15)',
    cursor: 'default',
  };

  return (
    <div className="anim-up anim-d1">
      {/* Page header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '20px', gap: '12px', flexWrap: 'wrap' }}>
        <div>
          <h1 style={{ margin: 0, fontFamily: 'Heebo', fontSize: '26px', fontWeight: '800', color: '#E2E8F3' }}>
            ניהול הכנסות
          </h1>
          <p style={{ margin: '5px 0 0', fontFamily: 'Heebo', fontSize: '13px', color: '#4A5C78' }}>
            מעקב גבייה חודשי · {rows.length} יחידות · סה"כ מתוכנן: {fmt(totalPlanned * 12)} ₪ לשנה
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px', flexShrink: 0 }}>
          {/* Reset confirmation */}
          {confirmReset ? (
            <>
              <button onClick={() => setConfirmReset(false)} style={{ ...btnStyle, background: 'rgba(255,255,255,0.05)', color: '#94A3B8' }}>ביטול</button>
              <button onClick={resetToSeed} style={{ ...btnStyle, background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', color: '#EF4444' }}>אפס נתונים</button>
            </>
          ) : (
            <button onClick={() => setConfirmReset(true)} style={{ ...btnStyle, background: 'rgba(255,255,255,0.04)', color: '#4A5C78', border: '1px solid rgba(255,255,255,0.07)' }}>
              <RefreshCw size={14} />
              איפוס
            </button>
          )}
          <button onClick={addRow} style={{ ...btnStyle, background: 'linear-gradient(135deg,#10B981,#059669)', boxShadow: '0 4px 12px rgba(16,185,129,0.3)' }}>
            <Plus size={16} />
            הוסף דירה
          </button>
        </div>
      </div>

      {/* KPI strip */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {[
          { label: 'שולם בפועל', value: totalPaid, color: '#10B981', bg: 'rgba(16,185,129,0.10)', border: 'rgba(16,185,129,0.22)' },
          { label: 'חוב שוטף',  value: totalDebt,  color: totalDebt > 0 ? '#F97316' : '#10B981', bg: totalDebt > 0 ? 'rgba(249,115,22,0.10)' : 'rgba(16,185,129,0.08)', border: totalDebt > 0 ? 'rgba(249,115,22,0.22)' : 'rgba(16,185,129,0.15)' },
          { label: 'עתידי',     value: totalFuture, color: '#4A5C78', bg: 'rgba(255,255,255,0.03)', border: 'rgba(255,255,255,0.08)' },
          { label: 'מתוכנן/חודש', value: totalPlanned, color: '#7C3AED', bg: 'rgba(124,58,237,0.10)', border: 'rgba(124,58,237,0.22)' },
        ].map(({ label, value, color, bg, border }) => (
          <div key={label} style={{ flex: '1 1 140px', background: bg, border: `1px solid ${border}`, borderRadius: '12px', padding: '14px 18px' }}>
            <p style={{ margin: 0, fontFamily: 'Heebo', fontSize: '11px', fontWeight: '700', color: '#4A5C78', letterSpacing: '0.04em' }}>{label}</p>
            <p style={{ margin: '4px 0 0', fontFamily: 'Heebo', fontSize: '20px', fontWeight: '800', color }}>{fmt(value)} ₪</p>
          </div>
        ))}
      </div>

      {/* Table container */}
      <div style={{ borderRadius: '16px', border: '1px solid rgba(255,255,255,0.07)', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{
            borderCollapse: 'collapse',
            width: '100%',
            direction: 'rtl',
            fontFamily: 'Heebo, sans-serif',
            fontSize: '13px',
          }}>
            <thead>
              <tr>
                {/* Apt */}
                <th style={{ ...thBase, width: '52px', position: 'sticky', right: 0, zIndex: 2 }}>דירה</th>

                {/* Month headers */}
                {M_LABELS.map((m, i) => (
                  <th key={i} style={{
                    ...thBase,
                    width: '56px',
                    color: i === CURRENT_MONTH ? '#2DD4BF' : i < CURRENT_MONTH ? '#CBD5E1' : '#4A5C78',
                    borderBottom: i === CURRENT_MONTH ? '2px solid #14B8A6' : thBase.borderBottom,
                  }}>
                    {m}
                  </th>
                ))}

                {/* One-time */}
                <th style={{ ...thBase, width: '80px', color: '#A78BFA' }}>חד פעמי</th>

                {/* Computed cols */}
                <th style={{ ...thBase, width: '96px', color: '#10B981', background: '#0D1A26' }}>שולם בפועל</th>
                <th style={{ ...thBase, width: '86px', color: '#F97316', background: '#0D1A26' }}>חוב שוטף</th>
                <th style={{ ...thBase, width: '110px', color: '#4A5C78', background: '#0D1A26' }}>תשלומים עתידיים</th>

                {/* Delete */}
                <th style={{ ...thBase, width: '36px', background: '#111C30' }} />
              </tr>
            </thead>

            <tbody>
              {rows.map((row, rowIdx) => {
                const { paid, debt, future } = computeRow(row);
                const rowBg = rowIdx % 2 === 0 ? '#1A2540' : '#182038';

                return (
                  <tr key={row.id} style={{ background: rowBg }} onMouseEnter={e => e.currentTarget.style.background = '#1E2D4A'} onMouseLeave={e => e.currentTarget.style.background = rowBg}>

                    {/* Apartment number — sticky */}
                    <EditableCell
                      value={row.apt}
                      onSave={v => updateCell(row.id, 'apt', v)}
                      align="center"
                      style={{
                        position: 'sticky', right: 0, zIndex: 1,
                        background: 'inherit',
                        fontWeight: '700',
                        color: '#E2E8F3',
                        borderLeft: '1px solid rgba(255,255,255,0.06)',
                      }}
                    />

                    {/* Monthly payment cells */}
                    {row.m.map((v, mi) => {
                      const isPast = mi <= CURRENT_MONTH;
                      const isPaid = v !== null;
                      const isCurrent = mi === CURRENT_MONTH;

                      let cellBg = 'transparent';
                      let cellColor = '#E2E8F3';
                      if (isPaid) {
                        cellBg = 'rgba(16,185,129,0.10)';
                        cellColor = '#10B981';
                      } else if (isPast) {
                        cellBg = 'rgba(249,115,22,0.07)';
                        cellColor = '#F97316';
                      }

                      return (
                        <EditableCell
                          key={mi}
                          value={v}
                          onSave={v => updateCell(row.id, `m${mi}`, v)}
                          align="center"
                          style={{
                            background: cellBg,
                            color: cellColor,
                            fontWeight: isPaid ? '600' : '400',
                            borderRight: isCurrent ? '1px solid rgba(20,184,166,0.20)' : undefined,
                            borderLeft: isCurrent ? '1px solid rgba(20,184,166,0.20)' : undefined,
                          }}
                        />
                      );
                    })}

                    {/* One-time payment */}
                    <EditableCell
                      value={row.oneTime}
                      onSave={v => updateCell(row.id, 'oneTime', v)}
                      align="center"
                      style={{ color: row.oneTime ? '#A78BFA' : '#2A3A55' }}
                    />

                    {/* Computed: שולם בפועל */}
                    <td style={{ ...computedTd, color: '#10B981' }}>
                      <div style={{ padding: '7px 10px' }}>{fmt(paid)} ₪</div>
                    </td>

                    {/* Computed: חוב שוטף */}
                    <td style={{ ...computedTd, color: debt > 0 ? '#F97316' : '#2A3A55' }}>
                      <div style={{ padding: '7px 10px' }}>{debt > 0 ? fmt(debt) + ' ₪' : '—'}</div>
                    </td>

                    {/* Computed: תשלומים עתידיים */}
                    <td style={{ ...computedTd, color: '#4A5C78' }}>
                      <div style={{ padding: '7px 10px' }}>{fmt(future)} ₪</div>
                    </td>

                    {/* Delete */}
                    <td style={{ textAlign: 'center', padding: '0 4px', background: 'rgba(0,0,0,0.15)' }}>
                      <button
                        onClick={() => deleteRow(row.id)}
                        title="מחק שורה"
                        style={{
                          width: '28px', height: '28px', borderRadius: '6px',
                          background: 'transparent', border: 'none',
                          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                          cursor: 'pointer', opacity: 0.4, transition: 'opacity 0.15s ease',
                        }}
                        onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                        onMouseLeave={e => e.currentTarget.style.opacity = '0.4'}
                      >
                        <Trash2 size={13} color="#EF4444" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>

            {/* ── Summary footer ─────────────────────────────────────────── */}
            <tfoot>
              {/* שולם row */}
              <tr>
                <td style={{ ...summaryTd, position: 'sticky', right: 0, zIndex: 1, color: '#CBD5E1', textAlign: 'right', paddingRight: '12px' }}>שולם</td>
                {monthSums.map((s, i) => (
                  <td key={i} style={{ ...summaryTd, color: s > 0 ? '#10B981' : '#2A3A55' }}>
                    {s > 0 ? fmt(s) : '—'}
                  </td>
                ))}
                <td style={summaryTd}>—</td>
                <td style={{ ...summaryTd, color: '#10B981' }}>{fmt(totalPaid)} ₪</td>
                <td style={{ ...summaryTd, color: totalDebt > 0 ? '#F97316' : '#2A3A55' }}>{totalDebt > 0 ? fmt(totalDebt) + ' ₪' : '—'}</td>
                <td style={{ ...summaryTd, color: '#4A5C78' }}>{fmt(totalFuture)} ₪</td>
                <td style={summaryTd} />
              </tr>

              {/* מתוכנן row */}
              <tr>
                <td style={{ ...summaryTd, position: 'sticky', right: 0, zIndex: 1, color: '#CBD5E1', textAlign: 'right', paddingRight: '12px' }}>מתוכנן</td>
                {M_LABELS.map((_, i) => (
                  <td key={i} style={{ ...summaryTd, color: '#4A5C78' }}>{fmt(totalPlanned)}</td>
                ))}
                <td style={summaryTd} />
                <td style={{ ...summaryTd, color: '#7C3AED' }}>{fmt(totalPlanned * 12)} ₪</td>
                <td style={summaryTd} />
                <td style={summaryTd} />
                <td style={summaryTd} />
              </tr>

              {/* % row */}
              <tr>
                <td style={{ ...summaryTd, position: 'sticky', right: 0, zIndex: 1, color: '#CBD5E1', textAlign: 'right', paddingRight: '12px' }}>%</td>
                {monthSums.map((s, i) => {
                  const p = totalPlanned > 0 ? Math.round((s / totalPlanned) * 100) : 0;
                  const color = i > CURRENT_MONTH ? '#2A3A55' : p >= 100 ? '#10B981' : p >= 60 ? '#F59E0B' : '#EF4444';
                  return (
                    <td key={i} style={{ ...summaryTd, color }}>
                      {i > CURRENT_MONTH ? '—' : p + '%'}
                    </td>
                  );
                })}
                <td style={summaryTd} colSpan={5} />
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Hint */}
      <p style={{ margin: '12px 0 0', fontFamily: 'Heebo', fontSize: '12px', color: '#2A3A55', textAlign: 'right' }}>
        לחצו על כל תא לעריכה · Enter לאישור · Esc לביטול · עמודות מחושבות מתעדכנות אוטומטית
      </p>
    </div>
  );
}

// ─── Button base style ────────────────────────────────────────────────────────
const btnStyle = {
  display: 'flex', alignItems: 'center', gap: '6px',
  padding: '9px 16px', borderRadius: '10px',
  border: 'none', fontFamily: 'Heebo, sans-serif',
  fontSize: '13px', fontWeight: '600', color: '#fff',
  cursor: 'pointer',
};
