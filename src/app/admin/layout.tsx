'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { LayoutDashboard, BookOpen, Users, ShoppingBag, Settings, Palette, Tag, BarChart3, LogOut, Menu, X, Shield, MessageSquare } from 'lucide-react';

const ADMIN_NAV = [
  { href: '/admin', icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
  { href: '/admin/books', icon: <BookOpen size={18} />, label: 'Manage Books' },
  { href: '/admin/users', icon: <Users size={18} />, label: 'Manage Users' },
  { href: '/admin/orders', icon: <ShoppingBag size={18} />, label: 'Orders' },
  { href: '/admin/vouchers', icon: <Tag size={18} />, label: 'Vouchers' },
  { href: '/admin/customization', icon: <Palette size={18} />, label: 'Site Customization' },
  { href: '/admin/reports', icon: <BarChart3 size={18} />, label: 'Reports' },
  { href: '/admin/messages', icon: <MessageSquare size={18} />, label: 'Messages' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authed, setAuthed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const isAdmin = localStorage.getItem('bookdeal_admin_auth') === 'true';
    if (!isAdmin && pathname !== '/admin/login') {
      router.push('/admin/login');
    } else {
      setAuthed(true);
    }
  }, [pathname, router]);

  if (pathname === '/admin/login') return <>{children}</>;
  if (!authed) return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}><div className="spinner" /></div>;

  const logout = () => { localStorage.removeItem('bookdeal_admin_auth'); router.push('/admin/login'); };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Admin Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'mobile-open' : ''}`} style={{ background: 'rgba(8,12,22,0.98)' }}>
        <div style={{ padding: '24px 16px', borderBottom: '1px solid rgba(245,158,11,0.2)', marginBottom: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #f59e0b, #ef4444)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Shield size={18} color="white" />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>Admin Portal</div>
              <div style={{ fontSize: '0.65rem', color: 'var(--color-text-dim)' }}>BookDeal BD</div>
            </div>
          </div>
        </div>

        <div style={{ padding: '12px', margin: '0 8px 12px', background: 'rgba(245,158,11,0.06)', borderRadius: 'var(--radius)', border: '1px solid rgba(245,158,11,0.15)', fontSize: '0.78rem', color: 'var(--color-text-dim)' }}>
          🔐 admin@bookdeal.com.bd
        </div>

        <nav style={{ padding: '4px 0' }}>
          {ADMIN_NAV.map(item => (
            <Link key={item.href} href={item.href}
              style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 20px', margin: '2px 8px', borderRadius: 'var(--radius)', color: pathname === item.href ? '#fbbf24' : 'var(--color-text-muted)', background: pathname === item.href ? 'rgba(245,158,11,0.1)' : 'transparent', fontWeight: 500, fontSize: '0.875rem', textDecoration: 'none', transition: 'all 0.2s', borderLeft: pathname === item.href ? '2px solid #f59e0b' : '2px solid transparent' }}>
              {item.icon} {item.label}
            </Link>
          ))}
        </nav>

        <div style={{ padding: '16px', borderTop: '1px solid var(--glass-border)', marginTop: 'auto' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 'var(--radius-sm)', color: 'var(--color-text-dim)', textDecoration: 'none', fontSize: '0.825rem', marginBottom: 8 }}>
            <BookOpen size={14} /> View Website
          </Link>
          <button onClick={logout} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 'var(--radius-sm)', color: '#f87171', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.15)', cursor: 'pointer', fontWeight: 500, fontSize: '0.875rem' }}>
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 min-h-screen ml-0 md:ml-[260px]">
        <div style={{ position: 'sticky', top: 0, zIndex: 40, background: 'rgba(8,12,22,0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(245,158,11,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text)' }} className="md:hidden">
              {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
            <h2 style={{ fontWeight: 700, fontSize: '1.05rem' }}>
              {ADMIN_NAV.find(n => n.href === pathname)?.label || 'Admin Dashboard'}
            </h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="badge badge-warning">🔐 Admin</span>
          </div>
        </div>

        <div style={{ padding: '28px 24px' }}>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            {children}
          </motion.div>
        </div>
      </div>

      {sidebarOpen && <div onClick={() => setSidebarOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 49 }} />}

      {/* Responsive styles handled by Tailwind */}
    </div>
  );
}
