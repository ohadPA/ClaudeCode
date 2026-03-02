import KpiCards from '../components/dashboard/KpiCards';
import RevenueChart from '../components/dashboard/RevenueChart';
import ExpenseDonut from '../components/dashboard/ExpenseDonut';
import QuickActions from '../components/dashboard/QuickActions';
import RecentActivity from '../components/dashboard/RecentActivity';
import MarketplacePreview from '../components/dashboard/MarketplacePreview';

export default function Dashboard() {
  return (
    <div>
      <div className="anim-up anim-d1" style={{ marginBottom: '22px' }}>
        <h1 style={{ margin: 0, fontFamily: 'Heebo, sans-serif', fontSize: '22px', fontWeight: '800', color: '#E2E8F3', letterSpacing: '-0.02em' }}>
          לוח בקרה
        </h1>
        <p style={{ margin: '3px 0 0', fontFamily: 'Heebo, sans-serif', fontSize: '13px', color: '#4A5C78' }}>
          ברוך הבא, עומר · מרץ 2026
        </p>
      </div>

      <KpiCards />

      <div className="charts-row" style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '18px', marginBottom: '18px', alignItems: 'start' }}>
        <RevenueChart />
        <ExpenseDonut />
      </div>

      <div className="bottom-row" style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '18px', marginBottom: '18px', alignItems: 'start' }}>
        <RecentActivity />
        <QuickActions />
      </div>

      <MarketplacePreview />
    </div>
  );
}
