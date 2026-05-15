'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { LayoutDashboard, BookOpen, ShoppingBag, Heart, MessageCircle, Settings, PlusCircle, LogOut, Menu, X, TrendingUp, BookMarked, Store } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const NAV = [
  { href: '/dashboard', icon: <LayoutDashboard size={18} />, label: 'Dashboard', bengali: 'ড্যাশবোর্ড' },
  { href: '/dashboard/orders', icon: <ShoppingBag size={18} />, label: 'My Orders', bengali: 'আমার অর্ডার' },
  { href: '/dashboard/purchases', icon: <BookMarked size={18} />, label: 'Purchases', bengali: 'ক্রয়' },
  { href: '/dashboard/messages', icon: <MessageCircle size={18} />, label: 'Messages', bengali: 'বার্তা' },
  { href: '/dashboard/wishlist', icon: <Heart size={18} />, label: 'Wishlist', bengali: 'উইশলিস্ট' },
  { href: '/dashboard/sell', icon: <PlusCircle size={18} />, label: 'Sell a Book', bengali: 'বই বেচুন', highlight: true },
  { href: '/dashboard/profile', icon: <Settings size={18} />, label: 'Profile', bengali: 'প্রোফাইল' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, userProfile, logout, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.push('/auth/login');
  }, [user, loading, router]);

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <div className="spinner" />
    </div>
  );

  if (!user) return null;

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'mobile-open' : ''}`} style={{ paddingTop: 0 }}>
        <div style={{ padding: '24px 16px', borderBottom: '1px solid var(--glass-border)', marginBottom: 8 }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <BookOpen size={18} color="white" />
            </div>
            <span style={{ fontWeight: 800, fontSize: '1rem' }}>
              <span style={{ color: 'var(--color-primary)' }}>Book</span>Deal<span style={{ color: 'var(--color-accent)' }}>BD</span>
            </span>
          </Link>
        </div>

        {/* User info */}
        <div style={{ padding: '16px', margin: '0 8px 8px', background: 'rgba(14,165,233,0.08)', borderRadius: 'var(--radius)', border: '1px solid rgba(14,165,233,0.15)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700 }}>
              {userProfile?.displayName?.[0]?.toUpperCase() || 'U'}
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>{userProfile?.displayName}</div>
              <div className="badge badge-primary" style={{ fontSize: '0.65rem', padding: '1px 6px' }}>
                {userProfile?.isSeller ? <><Store size={9} /> Seller</> : '👤 Buyer'}
              </div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ padding: '8px 0', flex: 1 }}>
          {NAV.map(item => (
            <Link key={item.href} href={item.href}
              className={`sidebar-nav-item ${pathname === item.href ? 'active' : ''}`}
              style={item.highlight ? { color: 'var(--color-primary)', background: 'rgba(14,165,233,0.08)', margin: '8px', borderRadius: 'var(--radius)' } : {}}>
              {item.icon}
              <div>
                <div style={{ fontSize: '0.875rem', fontWeight: pathname === item.href ? 700 : 500 }}>{item.label}</div>
                <div style={{ fontSize: '0.7rem', opacity: 0.6, fontFamily: 'Hind Siliguri' }}>{item.bengali}</div>
              </div>
            </Link>
          ))}
        </nav>

        <div style={{ padding: '16px', borderTop: '1px solid var(--glass-border)' }}>
          <button onClick={() => logout()} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 'var(--radius-sm)', color: '#f87171', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.15)', cursor: 'pointer', fontWeight: 500, fontSize: '0.875rem' }}>
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div style={{ flex: 1, marginLeft: 260, minHeight: '100vh' }}>
        {/* Top bar */}
        <div className="glass" style={{ position: 'sticky', top: 0, zIndex: 40, borderRadius: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', borderLeft: 'none', borderRight: 'none', borderTop: 'none' }}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text)' }} className="show-mobile">
            {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <h2 style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--color-text)' }}>
            {NAV.find(n => n.href === pathname)?.label || 'Dashboard'}
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.8rem', color: 'var(--color-text-dim)' }}>
            <TrendingUp size={14} style={{ color: 'var(--color-success)' }} />
            <span>Welcome back, {userProfile?.displayName?.split(' ')[0]}! / স্বাগতম</span>
          </div>
        </div>

        <div style={{ padding: '32px 24px' }}>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            {children}
          </motion.div>
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && <div onClick={() => setSidebarOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 49 }} />}

      <style jsx>{`
        @media (max-width: 768px) {
          div[style*="margin-left: 260px"] { margin-left: 0 !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 769px) { .show-mobile { display: none !important; } }
      `}</style>
    </div>
  );
}
