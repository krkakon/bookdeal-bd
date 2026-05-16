'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, ShoppingBag, TrendingUp, Star, PlusCircle, Eye, ArrowRight, Store } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const STATS = [
  { icon: <BookOpen size={22} />, label: 'Books Listed', bengali: 'তালিকাভুক্ত বই', value: '3', color: '#0ea5e9' },
  { icon: <ShoppingBag size={22} />, label: 'Total Sales', bengali: 'মোট বিক্রয়', value: '৳1,200', color: '#6366f1' },
  { icon: <TrendingUp size={22} />, label: 'Purchases', bengali: 'ক্রয়', value: '5', color: '#22d3ee' },
  { icon: <Star size={22} />, label: 'Rating', bengali: 'রেটিং', value: '4.8', color: '#f59e0b' },
];

const RECENT_ORDERS = [
  { id: 'ORD-001', book: 'Physics 1st Paper', status: 'Delivered', date: '2024-05-10', price: 180 },
  { id: 'ORD-002', book: 'Higher Mathematics', status: 'Shipped', date: '2024-05-12', price: 150 },
  { id: 'ORD-003', book: 'BUET Prep Guide', status: 'Processing', date: '2024-05-14', price: 350 },
];

const STATUS_COLORS: Record<string, string> = { 'Delivered': 'success', 'Shipped': 'primary', 'Processing': 'warning', 'Cancelled': 'danger' };

export default function DashboardPage() {
  const { userProfile, enableSelling } = useAuth();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      {/* Welcome banner */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        style={{ background: 'linear-gradient(135deg, rgba(14,165,233,0.15), rgba(99,102,241,0.12))', border: '1px solid rgba(14,165,233,0.2)', borderRadius: 'var(--radius-xl)', padding: '24px 28px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: -20, top: -20, fontSize: '6rem', opacity: 0.05 }}>📚</div>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: 6 }}>
          Welcome, {userProfile?.displayName?.split(' ')[0]}! 👋
        </h2>
        <p style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-bengali)', marginBottom: 16 }}>
          আপনার BookDeal BD ড্যাশবোর্ডে স্বাগতম
        </p>
        {!userProfile?.isSeller && (
          <button onClick={enableSelling} className="btn btn-primary" style={{ gap: 8 }} id="enable-selling">
            <Store size={16} /> Enable Selling / বিক্রয় চালু করুন <ArrowRight size={14} />
          </button>
        )}
        {userProfile?.isSeller && (
          <Link href="/dashboard/sell" className="btn btn-primary" style={{ gap: 8 }}>
            <PlusCircle size={16} /> List New Book / নতুন বই যোগ করুন
          </Link>
        )}
      </motion.div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {STATS.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.07 }}
            whileHover={{ y: -3 }}>
            <div className="admin-stat-card" style={{ borderLeft: `3px solid ${s.color}` }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${s.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color }}>
                  {s.icon}
                </div>
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-text)', marginBottom: 4 }}>{s.value}</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>{s.label}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-dim)', fontFamily: 'var(--font-bengali)' }}>{s.bengali}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick actions */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
        {[
          { href: '/dashboard/sell', icon: '📗', label: 'Sell a Book', bengali: 'বই বেচুন', color: '#0ea5e9' },
          { href: '/books', icon: '🔍', label: 'Browse Books', bengali: 'বই খুঁজুন', color: '#6366f1' },
          { href: '/dashboard/messages', icon: '💬', label: 'Messages', bengali: 'বার্তা', color: '#22d3ee' },
          { href: '/dashboard/orders', icon: '📦', label: 'Track Orders', bengali: 'অর্ডার ট্র্যাক', color: '#10b981' },
        ].map((a, i) => (
          <motion.div key={i} whileHover={{ y: -3 }}>
            <Link href={a.href} style={{ textDecoration: 'none' }}>
              <div className="glass-card" style={{ padding: '20px 16px', textAlign: 'center', borderTop: `2px solid ${a.color}40` }}>
                <div style={{ fontSize: '2rem', marginBottom: 10 }}>{a.icon}</div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-text)' }}>{a.label}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-dim)', fontFamily: 'var(--font-bengali)' }}>{a.bengali}</div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="glass-card" style={{ padding: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <h3 style={{ fontWeight: 700, fontSize: '1rem' }}>Recent Orders / সাম্প্রতিক অর্ডার</h3>
          <Link href="/dashboard/orders" style={{ fontSize: '0.825rem', color: 'var(--color-primary)', textDecoration: 'none' }}>View All →</Link>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {RECENT_ORDERS.map(order => (
            <div key={order.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', background: 'rgba(255,255,255,0.04)', borderRadius: 'var(--radius)', border: '1px solid var(--glass-border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(14,165,233,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>📚</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--color-text)' }}>{order.book}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-dim)' }}>{order.id} · {order.date}</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontWeight: 700, color: 'var(--color-primary)' }}>৳{order.price}</span>
                <span className={`badge badge-${STATUS_COLORS[order.status] || 'primary'}`}>{order.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
