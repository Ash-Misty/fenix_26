import React from 'react';
import { LogOut, LayoutDashboard, Users, CreditCard, Calendar, ClipboardCheck, Megaphone, MessageCircle, X } from 'lucide-react';

const NAV = [
  { label: 'Dashboard', icon: LayoutDashboard, to: '/admin' },
  { label: 'Registrations', icon: Users, to: '/admin/registrations' },
  { label: 'Payments', icon: CreditCard, to: '/admin/payments' },
  { label: 'Workshops', icon: Calendar, to: '/admin/workshops' },
  { label: 'Workshop review', icon: ClipboardCheck, to: '/admin/workshop-registrations' },
  { label: 'Announcements', icon: Megaphone, to: '/admin/announcements' },
  { label: 'Enquiries', icon: MessageCircle, to: '/admin/enquiries' },
];

export function AdminLayout({ children }) {
  const [open, setOpen] = React.useState(false);
  const [location, setLocation] = React.useState(window.location.hash.replace(/^#/, '') || '/admin');
  const adminName = localStorage.getItem('adminName') || 'Admin';

  React.useEffect(() => {
    const syncLocation = () => setLocation(window.location.hash.replace(/^#/, '') || '/admin');
    window.addEventListener('hashchange', syncLocation);
    return () => window.removeEventListener('hashchange', syncLocation);
  }, []);

  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminName');
    window.location.hash = '#/admin/login';
  };

  return (
    <div className="admin-layout">
      {/* Mobile overlay */}
      {open && <div className="admin-overlay" onClick={() => setOpen(false)} />}

      {/* Sidebar */}
      <aside className={'admin-sidebar' + (open ? ' open' : '')}>
        <div className="admin-sidebar-header">
          <span className="admin-logo">FENIX'26</span>
          <span className="admin-logo-sub">Admin Panel</span>
          <button className="admin-close" onClick={() => setOpen(false)} aria-label="Close menu">
            <X size={20} />
          </button>
        </div>

        <nav className="admin-nav">
          {NAV.map((item) => {
            const active = location === item.to;
            return (
              <a
                key={item.to}
                href={`#${item.to}`}
                className={'admin-nav-item' + (active ? ' active' : '')}
                onClick={() => setOpen(false)}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>

        <div className="admin-sidebar-footer">
          <div className="admin-user">
            <span className="admin-avatar">{adminName[0]?.toUpperCase()}</span>
            <div>
              <strong>{adminName}</strong>
              <small>Administrator</small>
            </div>
          </div>
          <button className="admin-logout" onClick={logout}>
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="admin-main">
        <header className="admin-header">
          <button className="admin-menu" onClick={() => setOpen(true)} aria-label="Menu">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <h1 className="admin-page-title">
            {NAV.find((n) => n.to === location)?.label || 'Admin'}
          </h1>
          <div className="admin-header-right">
            <span className="admin-status-dot" />
            <span className="admin-status-text">Live</span>
          </div>
        </header>
        <div className="admin-content">{children}</div>
      </main>
    </div>
  );
}
