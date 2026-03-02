import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';

export default function MainLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const sidebarWidth = collapsed ? 72 : 260;

  return (
    <div className="dot-bg" style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />
      <div style={{
        marginRight: `${sidebarWidth}px`,
        flex: 1,
        transition: 'margin-right 0.24s cubic-bezier(0.4, 0, 0.2, 1)',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <TopNavbar sidebarWidth={sidebarWidth} />
        <main style={{ paddingTop: '64px', padding: '88px 32px 40px 32px', flex: 1 }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
