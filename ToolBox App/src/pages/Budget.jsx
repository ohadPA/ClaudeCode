import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PiggyBank, Plus, Trash2, ChevronLeft, ChevronRight,
  TrendingUp, TrendingDown, AlertTriangle, MessageSquare, Edit3,
} from 'lucide-react';
import { getBudget, saveBudget, clearBudget } from '../utils/db';

// ─── Benchmark averages: Tel Aviv ~24-unit building (₪/month) ────────────────
const DEFAULT_EXPENSE_ROWS = [
  { id: 'clean',      label: 'ניקיון',          amount: '', benchmark: 2200 },
  { id: 'maintain',   label: 'תחזוקה שוטפת',     amount: '', benchmark: 2000 },
  { id: 'electric',   label: 'חשמל ותאורה',      amount: '', benchmark: 950  },
  { id: 'water',      label: 'מים',             amount: '', benchmark: 700  },
  { id: 'insurance',  label: 'ביטוח',           amount: '', benchmark: 650  },
  { id: 'garden',     label: 'גינון',           amount: '', benchmark: 480  },
  { id: 'elevator',   label: 'מעלית – תחזוקה',   amount: '', benchmark: 1400 },
  { id: 'management', label: 'ניהול',           amount: '', benchmark: 1800 },
  { id: 'misc',       label: 'שונות',           amount: '', benchmark: 300  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
const fmt = (n) => new Intl.NumberFormat('he-IL').format(Math.round(n));
const toNum = (v) => parseFloat(String(v).replace(/,/g, '')) || 0;

function useIsMobile() {
  const [mobile, setMobile] = useState(() => window.innerWidth < 680);
  useEffect(() => {
    const h = () => setMobile(window.innerWidth < 680);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);
  return mobile;
}

// ─── Shared style tokens ──────────────────────────────────────────────────────
const S = {
  card: {
    background: '#1A2540',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: '16px',
    padding: '24px',
  },
  input: {
    background: '#0F1829',
    border: '1px solid rgba(255,255,255,0.10)',
    borderRadius: '10px',
    padding: '10px 14px',
    fontFamily: 'Heebo, sans-serif',
    fontSize: '14px',
    color: '#E2E8F3',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
  },
  colHead: {
    fontFamily: 'Heebo, sans-serif',
    fontSize: '11px',
    fontWeight: '700',
    color: '#4A5C78',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  primaryBtn: {
    display: 'flex', alignItems: 'center', gap: '8px',
    padding: '12px 26px',
    background: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)',
    border: 'none', borderRadius: '12px',
    fontFamily: 'Heebo, sans-serif', fontSize: '15px', fontWeight: '700',
    color: '#fff', cursor: 'pointer',
    boxShadow: '0 4px 14px rgba(124,58,237,0.35)',
  },
  ghostBtn: {
    display: 'flex', alignItems: 'center', gap: '6px',
    padding: '10px 18px',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.10)',
    borderRadius: '12px',
    fontFamily: 'Heebo, sans-serif', fontSize: '14px', fontWeight: '600',
    color: '#94A3B8', cursor: 'pointer',
  },
};

// ─── Step indicator ───────────────────────────────────────────────────────────
function StepBar({ step }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '28px' }}>
      {[1, 2].map((s) => (
        <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '30px', height: '30px', borderRadius: '50%',
            background: s <= step ? 'linear-gradient(135deg,#7C3AED,#6D28D9)' : 'rgba(255,255,255,0.06)',
            border: s <= step ? 'none' : '1px solid rgba(255,255,255,0.12)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'Heebo', fontSize: '13px', fontWeight: '800',
            color: s <= step ? '#fff' : '#4A5C78',
            boxShadow: s <= step ? '0 0 12px rgba(124,58,237,0.4)' : 'none',
            transition: 'all 0.25s ease',
          }}>
            {s}
          </div>
          {s < 2 && (
            <div style={{
              width: '40px', height: '2px', borderRadius: '2px',
              background: step > 1 ? '#7C3AED' : 'rgba(255,255,255,0.08)',
              transition: 'background 0.3s ease',
            }} />
          )}
        </div>
      ))}
      <span style={{ fontFamily: 'Heebo', fontSize: '13px', color: '#4A5C78', marginRight: '8px' }}>
        שלב {step} מתוך 2
      </span>
    </div>
  );
}

// ─── Wizard Step 1 — Expenses ─────────────────────────────────────────────────
function Step1({ rows, setRows, onNext }) {
  const isMobile = useIsMobile();
  const canNext = rows.some((r) => r.label && toNum(r.amount) > 0);

  const add = () =>
    setRows((r) => [...r, { id: `custom_${Date.now()}`, label: '', amount: '', benchmark: null }]);
  const del = (id) => setRows((r) => r.filter((x) => x.id !== id));
  const upd = (id, field, val) =>
    setRows((r) => r.map((x) => (x.id === id ? { ...x, [field]: val } : x)));

  return (
    <div className="anim-up anim-d1" style={{ maxWidth: '700px', margin: '0 auto' }}>
      <StepBar step={1} />
      <h2 style={{ margin: '0 0 6px', fontFamily: 'Heebo', fontSize: isMobile ? '20px' : '22px', fontWeight: '800', color: '#E2E8F3' }}>
        הוצאות חודשיות
      </h2>
      <p style={{ margin: '0 0 20px', fontFamily: 'Heebo', fontSize: '14px', color: '#4A5C78' }}>
        הזינו את כל ההוצאות החודשיות של הבניין לפי קטגוריה
      </p>

      <div style={S.card}>
        {/* Header row — hidden on mobile */}
        {!isMobile && (
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 150px 36px',
            gap: '10px', paddingBottom: '10px',
            borderBottom: '1px solid rgba(255,255,255,0.06)', marginBottom: '14px',
          }}>
            <span style={S.colHead}>קטגוריה</span>
            <span style={{ ...S.colHead, textAlign: 'left' }}>סכום (₪)</span>
            <span />
          </div>
        )}

        {rows.map((row, i) => (
          <div
            key={row.id}
            className={`anim-up anim-d${Math.min(i + 2, 10)}`}
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr 110px 36px' : '1fr 150px 36px',
              gap: '8px', marginBottom: '10px', alignItems: 'center',
            }}
          >
            <input
              value={row.label}
              onChange={(e) => upd(row.id, 'label', e.target.value)}
              placeholder="שם הוצאה…"
              style={S.input}
              dir="rtl"
            />
            <input
              value={row.amount}
              onChange={(e) => upd(row.id, 'amount', e.target.value)}
              placeholder="0"
              type="number"
              min="0"
              style={{ ...S.input, textAlign: 'left', direction: 'ltr' }}
            />
            <button
              onClick={() => del(row.id)}
              style={{
                width: '36px', height: '36px', borderRadius: '8px', flexShrink: 0,
                background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.18)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              }}
            >
              <Trash2 size={15} color="#F97316" />
            </button>
          </div>
        ))}

        <button
          onClick={add}
          style={{
            display: 'flex', alignItems: 'center', gap: '6px', marginTop: '12px',
            padding: '8px 16px',
            background: 'rgba(124,58,237,0.10)', border: '1px solid rgba(124,58,237,0.22)',
            borderRadius: '10px', fontFamily: 'Heebo', fontSize: '13px', fontWeight: '600',
            color: '#A78BFA', cursor: 'pointer',
          }}
        >
          <Plus size={14} />
          הוסף הוצאה
        </button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '24px' }}>
        <button
          onClick={onNext}
          disabled={!canNext}
          style={{ ...S.primaryBtn, opacity: canNext ? 1 : 0.4, cursor: canNext ? 'pointer' : 'not-allowed' }}
        >
          הבא
          <ChevronLeft size={18} />
        </button>
      </div>
    </div>
  );
}

// ─── Wizard Step 2 — Income ───────────────────────────────────────────────────
function Step2({ income, setIncome, onBack, onSubmit }) {
  const isMobile = useIsMobile();
  const canSubmit = toNum(income) > 0;

  return (
    <div className="anim-up anim-d1" style={{ maxWidth: '700px', margin: '0 auto' }}>
      <StepBar step={2} />
      <h2 style={{ margin: '0 0 6px', fontFamily: 'Heebo', fontSize: isMobile ? '20px' : '22px', fontWeight: '800', color: '#E2E8F3' }}>
        הכנסות חודשיות
      </h2>
      <p style={{ margin: '0 0 20px', fontFamily: 'Heebo', fontSize: '14px', color: '#4A5C78' }}>
        כמה גובה הוועד מכלל הדיירים בחודש?
      </p>

      <div style={S.card}>
        <label style={{ fontFamily: 'Heebo', fontSize: '14px', fontWeight: '600', color: '#CBD5E1' }}>
          סך גבייה חודשית
        </label>
        <div style={{ position: 'relative', marginTop: '10px' }}>
          <input
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            placeholder="0"
            type="number"
            min="0"
            style={{ ...S.input, fontSize: isMobile ? '18px' : '22px', padding: '16px 18px', paddingLeft: '44px', direction: 'ltr' }}
            autoFocus
          />
          <span style={{
            position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)',
            color: '#4A5C78', fontFamily: 'Heebo', fontSize: isMobile ? '16px' : '20px',
            pointerEvents: 'none',
          }}>
            ₪
          </span>
        </div>
        <p style={{ margin: '12px 0 0', fontFamily: 'Heebo', fontSize: '13px', color: '#4A5C78' }}>
          לדוגמה: 24 דירות × 500 ₪ = 12,000 ₪ לחודש
        </p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '24px', gap: '12px' }}>
        <button onClick={onBack} style={S.ghostBtn}>
          <ChevronRight size={18} />
          {!isMobile && 'חזור'}
        </button>
        <button
          onClick={onSubmit}
          disabled={!canSubmit}
          style={{ ...S.primaryBtn, opacity: canSubmit ? 1 : 0.4, cursor: canSubmit ? 'pointer' : 'not-allowed' }}
        >
          <PiggyBank size={18} />
          בנה תקציב
        </button>
      </div>
    </div>
  );
}

// ─── Expense row — Desktop ────────────────────────────────────────────────────
function DesktopExpenseRow({ row, i, onSave }) {
  const amount = toNum(row.amount);
  const bench = row.benchmark ?? null;
  const pct = bench ? Math.round(((amount - bench) / bench) * 100) : null;
  const isHigh = bench !== null && amount > bench * 1.1;

  return (
    <div
      className={`anim-up anim-d${Math.min(i + 2, 10)}`}
      style={{
        display: 'grid', gridTemplateColumns: '1fr 130px 170px 100px 150px',
        gap: '8px', padding: '12px 14px', borderRadius: '10px', marginBottom: '6px',
        background: isHigh ? 'rgba(249,115,22,0.07)' : 'rgba(255,255,255,0.02)',
        border: `1px solid ${isHigh ? 'rgba(249,115,22,0.20)' : 'rgba(255,255,255,0.04)'}`,
        alignItems: 'center',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
        {isHigh && <AlertTriangle size={14} color="#F97316" style={{ flexShrink: 0 }} />}
        <span style={{ fontFamily: 'Heebo', fontSize: '14px', fontWeight: '500', color: isHigh ? '#FDBA74' : '#CBD5E1' }}>
          {row.label}
        </span>
      </div>
      <span style={{ fontFamily: 'Heebo', fontSize: '15px', fontWeight: '700', color: isHigh ? '#F97316' : '#E2E8F3', textAlign: 'center' }}>
        {fmt(amount)} ₪
      </span>
      <div style={{ textAlign: 'center' }}>
        {bench !== null
          ? <span style={{ fontFamily: 'Heebo', fontSize: '13px', color: '#4A5C78' }}>{fmt(bench)} ₪</span>
          : <span style={{ color: '#2A3A55' }}>—</span>}
      </div>
      <div style={{ textAlign: 'center' }}>
        {bench !== null && (
          isHigh
            ? <span style={{ fontFamily: 'Heebo', fontSize: '11px', fontWeight: '700', color: '#F97316', background: 'rgba(249,115,22,0.13)', padding: '3px 9px', borderRadius: '20px' }}>+{pct}% גבוה</span>
            : <span style={{ fontFamily: 'Heebo', fontSize: '11px', fontWeight: '700', color: '#10B981', background: 'rgba(16,185,129,0.10)', padding: '3px 9px', borderRadius: '20px' }}>תקין</span>
        )}
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        {isHigh && <SaveBtn label={row.label} onSave={onSave} />}
      </div>
    </div>
  );
}

// ─── Expense row — Mobile card ────────────────────────────────────────────────
function MobileExpenseCard({ row, i, onSave }) {
  const amount = toNum(row.amount);
  const bench = row.benchmark ?? null;
  const pct = bench ? Math.round(((amount - bench) / bench) * 100) : null;
  const isHigh = bench !== null && amount > bench * 1.1;

  return (
    <div
      className={`anim-up anim-d${Math.min(i + 2, 10)}`}
      style={{
        padding: '14px 16px', borderRadius: '12px', marginBottom: '8px',
        background: isHigh ? 'rgba(249,115,22,0.07)' : 'rgba(255,255,255,0.02)',
        border: `1px solid ${isHigh ? 'rgba(249,115,22,0.20)' : 'rgba(255,255,255,0.04)'}`,
      }}
    >
      {/* Row 1: name + badge */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {isHigh && <AlertTriangle size={13} color="#F97316" />}
          <span style={{ fontFamily: 'Heebo', fontSize: '14px', fontWeight: '600', color: isHigh ? '#FDBA74' : '#CBD5E1' }}>
            {row.label}
          </span>
        </div>
        {bench !== null && (
          isHigh
            ? <span style={{ fontFamily: 'Heebo', fontSize: '11px', fontWeight: '700', color: '#F97316', background: 'rgba(249,115,22,0.13)', padding: '2px 8px', borderRadius: '20px' }}>+{pct}% גבוה</span>
            : <span style={{ fontFamily: 'Heebo', fontSize: '11px', fontWeight: '700', color: '#10B981', background: 'rgba(16,185,129,0.10)', padding: '2px 8px', borderRadius: '20px' }}>תקין</span>
        )}
      </div>
      {/* Row 2: amounts */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '18px' }}>
          <div>
            <p style={{ margin: 0, fontFamily: 'Heebo', fontSize: '11px', color: '#4A5C78', fontWeight: '600' }}>הוצאה שלכם</p>
            <p style={{ margin: '2px 0 0', fontFamily: 'Heebo', fontSize: '16px', fontWeight: '800', color: isHigh ? '#F97316' : '#E2E8F3' }}>{fmt(amount)} ₪</p>
          </div>
          {bench !== null && (
            <div>
              <p style={{ margin: 0, fontFamily: 'Heebo', fontSize: '11px', color: '#4A5C78', fontWeight: '600' }}>ממוצע</p>
              <p style={{ margin: '2px 0 0', fontFamily: 'Heebo', fontSize: '14px', fontWeight: '600', color: '#4A5C78' }}>{fmt(bench)} ₪</p>
            </div>
          )}
        </div>
        {isHigh && <SaveBtn label={row.label} onSave={onSave} small />}
      </div>
    </div>
  );
}

// ─── "How to save" button ─────────────────────────────────────────────────────
function SaveBtn({ label, onSave, small }) {
  return (
    <button
      onClick={() => onSave(label)}
      style={{
        display: 'flex', alignItems: 'center', gap: '5px',
        padding: small ? '6px 10px' : '7px 13px',
        borderRadius: '20px',
        background: 'rgba(249,115,22,0.13)', border: '1px solid rgba(249,115,22,0.28)',
        fontFamily: 'Heebo', fontSize: small ? '11px' : '12px', fontWeight: '600',
        color: '#F97316', cursor: 'pointer', whiteSpace: 'nowrap',
        flexShrink: 0,
      }}
      onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(249,115,22,0.23)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(249,115,22,0.13)'; }}
    >
      <MessageSquare size={small ? 11 : 13} />
      {small ? 'לחסוך?' : 'איך לחסוך?'}
    </button>
  );
}

// ─── Budget Table View ────────────────────────────────────────────────────────
function BudgetView({ data, onReset }) {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const totalExpenses = data.expenses.reduce((s, r) => s + toNum(r.amount), 0);
  const totalIncome = toNum(data.income);
  const balance = totalIncome - totalExpenses;
  const isDeficit = balance < 0;

  const updatedDate = data.updatedAt
    ? new Date(data.updatedAt).toLocaleDateString('he-IL', { day: '2-digit', month: '2-digit', year: '2-digit' })
    : '';

  const askSave = (category) => {
    navigate('/chatbot', {
      state: { prefillMessage: `כיצד אוכל לחסוך בהוצאות ${category} של הבניין?` },
    });
  };

  return (
    <div className="anim-up anim-d1">
      {/* Page header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '20px', gap: '12px' }}>
        <div>
          <h1 style={{ margin: 0, fontFamily: 'Heebo', fontSize: isMobile ? '22px' : '26px', fontWeight: '800', color: '#E2E8F3' }}>
            התקציב החודשי שלך
          </h1>
          {updatedDate && (
            <p style={{ margin: '5px 0 0', fontFamily: 'Heebo', fontSize: '13px', color: '#4A5C78' }}>
              עודכן: {updatedDate}
            </p>
          )}
        </div>
        <button onClick={onReset} style={{ ...S.ghostBtn, fontSize: '13px', padding: '8px 14px', flexShrink: 0 }}>
          <Edit3 size={14} />
          {!isMobile && 'עדכן תקציב'}
        </button>
      </div>

      {/* Balance hero card */}
      <div style={{
        borderRadius: '18px', padding: isMobile ? '20px' : '28px 32px', marginBottom: '20px',
        background: isDeficit
          ? 'linear-gradient(135deg, rgba(239,68,68,0.14) 0%, rgba(220,38,38,0.06) 100%)'
          : 'linear-gradient(135deg, rgba(16,185,129,0.14) 0%, rgba(5,150,105,0.06) 100%)',
        border: `1px solid ${isDeficit ? 'rgba(239,68,68,0.25)' : 'rgba(16,185,129,0.25)'}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{
            width: '50px', height: '50px', borderRadius: '14px', flexShrink: 0,
            background: isDeficit ? 'rgba(239,68,68,0.16)' : 'rgba(16,185,129,0.16)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {isDeficit ? <TrendingDown size={26} color="#EF4444" /> : <TrendingUp size={26} color="#10B981" />}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ margin: 0, fontFamily: 'Heebo', fontSize: '12px', fontWeight: '700', letterSpacing: '0.06em', color: isDeficit ? '#FCA5A5' : '#6EE7B7' }}>
              {isDeficit ? 'גירעון חודשי' : 'עודף חודשי'}
            </p>
            <p style={{ margin: '4px 0 0', fontFamily: 'Heebo', fontSize: isMobile ? '30px' : '38px', fontWeight: '800', color: isDeficit ? '#EF4444' : '#10B981', direction: 'ltr', lineHeight: 1 }}>
              {isDeficit ? '−' : '+'}{fmt(Math.abs(balance))} ₪
            </p>
          </div>
        </div>

        {/* Income / Expense sub-row */}
        <div style={{ display: 'flex', gap: isMobile ? '20px' : '32px', marginTop: '16px', paddingTop: '16px', borderTop: `1px solid ${isDeficit ? 'rgba(239,68,68,0.15)' : 'rgba(16,185,129,0.15)'}`, flexWrap: 'wrap' }}>
          <div>
            <p style={{ margin: 0, fontFamily: 'Heebo', fontSize: '11px', color: '#4A5C78', fontWeight: '700' }}>סך הכנסות</p>
            <p style={{ margin: '3px 0 0', fontFamily: 'Heebo', fontSize: isMobile ? '16px' : '18px', fontWeight: '800', color: '#10B981' }}>{fmt(totalIncome)} ₪</p>
          </div>
          <div>
            <p style={{ margin: 0, fontFamily: 'Heebo', fontSize: '11px', color: '#4A5C78', fontWeight: '700' }}>סך הוצאות</p>
            <p style={{ margin: '3px 0 0', fontFamily: 'Heebo', fontSize: isMobile ? '16px' : '18px', fontWeight: '800', color: '#EF4444' }}>{fmt(totalExpenses)} ₪</p>
          </div>
        </div>
      </div>

      {/* Expense breakdown */}
      <div style={S.card}>
        <h3 style={{ margin: '0 0 16px', fontFamily: 'Heebo', fontSize: '16px', fontWeight: '700', color: '#E2E8F3' }}>
          פירוט הוצאות
        </h3>

        {/* Desktop column headers */}
        {!isMobile && (
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 130px 170px 100px 150px',
            gap: '8px', padding: '0 14px 10px',
            borderBottom: '1px solid rgba(255,255,255,0.06)', marginBottom: '10px',
          }}>
            <span style={S.colHead}>קטגוריה</span>
            <span style={{ ...S.colHead, textAlign: 'center' }}>הוצאה</span>
            <span style={{ ...S.colHead, textAlign: 'center' }}>ממוצע בניינים דומים</span>
            <span style={{ ...S.colHead, textAlign: 'center' }}>מצב</span>
            <span />
          </div>
        )}

        {/* Rows */}
        {data.expenses.map((row, i) =>
          isMobile
            ? <MobileExpenseCard key={row.id} row={row} i={i} onSave={askSave} />
            : <DesktopExpenseRow key={row.id} row={row} i={i} onSave={askSave} />
        )}

        {/* Totals */}
        <div style={{ marginTop: '18px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          {[
            { label: 'סך כל ההוצאות', value: fmt(totalExpenses) + ' ₪', color: '#EF4444' },
            { label: 'סך כל ההכנסות', value: fmt(totalIncome)  + ' ₪', color: '#10B981' },
          ].map(({ label, value, color }) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 14px' }}>
              <span style={{ fontFamily: 'Heebo', fontSize: '14px', fontWeight: '600', color: '#CBD5E1' }}>{label}</span>
              <span style={{ fontFamily: 'Heebo', fontSize: isMobile ? '16px' : '19px', fontWeight: '800', color }}>{value}</span>
            </div>
          ))}

          {/* Final balance */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '14px 16px', borderRadius: '12px', marginTop: '8px',
            background: isDeficit ? 'rgba(239,68,68,0.09)' : 'rgba(16,185,129,0.09)',
            border: `1px solid ${isDeficit ? 'rgba(239,68,68,0.20)' : 'rgba(16,185,129,0.20)'}`,
          }}>
            <span style={{ fontFamily: 'Heebo', fontSize: '16px', fontWeight: '800', color: '#E2E8F3' }}>יתרה חודשית</span>
            <span style={{ fontFamily: 'Heebo', fontSize: isMobile ? '20px' : '24px', fontWeight: '800', color: isDeficit ? '#EF4444' : '#10B981', direction: 'ltr' }}>
              {isDeficit ? '−' : '+'}{fmt(Math.abs(balance))} ₪
            </span>
          </div>
        </div>

        {/* Footnote */}
        <p style={{ margin: '16px 0 0', fontFamily: 'Heebo', fontSize: '12px', color: '#2A3A55', textAlign: 'right', lineHeight: 1.6 }}>
          * הממוצעים מבוססים על בניינים בני 20–30 יחידות באזור תל אביב, מרץ 2026.
          הוצאות גבוהות ב-10%+ מהממוצע מסומנות ומוצעת עצה לחיסכון.
        </p>
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function Budget() {
  const [budgetData, setBudgetData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [wizardStep, setWizardStep] = useState(1);
  const [expenses, setExpenses] = useState(DEFAULT_EXPENSE_ROWS);
  const [income, setIncome] = useState('');

  useEffect(() => {
    setBudgetData(getBudget());
    setLoading(false);
  }, []);

  const handleSubmit = () => {
    const filled = expenses.filter((r) => r.label && toNum(r.amount) > 0);
    saveBudget({ expenses: filled, income });
    setBudgetData(getBudget());
  };

  const handleReset = () => {
    clearBudget();
    setBudgetData(null);
    setWizardStep(1);
    setExpenses(DEFAULT_EXPENSE_ROWS);
    setIncome('');
  };

  if (loading) return null;

  if (!budgetData) {
    return (
      <div className="anim-up anim-d1">
        <div style={{ marginBottom: '4px' }}>
          <h1 style={{ margin: 0, fontFamily: 'Heebo', fontSize: '26px', fontWeight: '800', color: '#E2E8F3' }}>
            התקציב החודשי שלך
          </h1>
          <p style={{ margin: '5px 0 24px', fontFamily: 'Heebo', fontSize: '14px', color: '#4A5C78' }}>
            לפני שנתחיל — נזין את נתוני ההוצאות וההכנסות של הבניין
          </p>
        </div>
        {wizardStep === 1 && (
          <Step1 rows={expenses} setRows={setExpenses} onNext={() => setWizardStep(2)} />
        )}
        {wizardStep === 2 && (
          <Step2
            income={income}
            setIncome={setIncome}
            onBack={() => setWizardStep(1)}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    );
  }

  return <BudgetView data={budgetData} onReset={handleReset} />;
}
