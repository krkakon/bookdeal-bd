'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, ShoppingBag, DollarSign, TrendingUp, TrendingDown, Eye, Star, AlertCircle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const STATS = [
  { icon: <BookOpen size={22} />, label: 'Total Books', value: '15,234', change: '+12%', up: true, color: '#0ea5e9' },
  { icon: <Users size={22} />, label: 'Total Users', value: '8,521', change: '+8%', up: true, color: '#6366f1' },
  { icon: <ShoppingBag size={22} />, label: 'Total Orders', value: '3,892', change: '+15%', up: true, color: '#22d3ee' },
  { icon: <DollarSign size={22} />, label: 'Revenue (৳)', value: '৳4,20,000', change: '+22%', up: true, color: '#10b981' },
  { icon: <Eye size={22} />, label: 'Page Views', value: '1,24,500', change: '+5%', up: true, color: '#f59e0b' },
  { icon: <Star size={22} />, label: 'Avg Rating', value: '4.87', change: '+0.2', up: true, color: '#ec4899' },
];

const CHART_DATA = [
  { name: 'Jan', books: 800, orders: 240, users: 180 },
  { name: 'Feb', books: 1200, orders: 380, users: 290 },
  { name: 'Mar', books: 1800, orders: 520, users: 410 },
  { name: 'Apr', books: 2400, orders: 680, users: 560 },
  { name: 'May', books: 3100, orders: 890, users: 720 },
  { name: 'Jun', books: 3800, orders: 1040, users: 890 },
];

const RECENT_ACTIVITY = [
  { type: 'book', msg: 'New book listed: "Physics 1st Paper HSC"', time: '2 min ago', color: '#0ea5e9' },
  { type: 'user', msg: 'New user registered: Tanvir Ahmed', time: '5 min ago', color: '#6366f1' },
  { type: 'order', msg: 'Order #ORD-892 placed — ৳350', time: '12 min ago', color: '#22d3ee' },
  { type: 'report', msg: 'Book flagged for review: ID #1234', time: '25 min ago', color: '#ef4444' },
  { type: 'order', msg: 'Order #ORD-891 delivered successfully', time: '1 hr ago', color: '#10b981' },
];

const PENDING = [
  { label: 'Books pending review', value: 12, color: '#f59e0b', icon: <BookOpen size={14} /> },
  { label: 'Reported books', value: 3, color: '#ef4444', icon: <AlertCircle size={14} /> },
  { label: 'Pending seller verifications', value: 7, color: '#6366f1', icon: <Users size={14} /> },
];

export default function AdminDashboard() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      {/* Welcome */}
      <div style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.12), rgba(239,68,68,0.08))', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 'var(--radius-xl)', padding: '24px 28px' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: 4 }}>Admin Dashboard 📊</h1>
        <p style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-bengali)' }}>BookDeal BD প্ল্যাটফর্মের সম্পূর্ণ নিয়ন্ত্রণ</p>
      </div>

      {/* Pending Alerts */}
      {PENDING.some(p => p.value > 0) && (
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {PENDING.map((p, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', borderRadius: 'var(--radius)', background: `${p.color}12`, border: `1px solid ${p.color}30`, fontSize: '0.825rem', color: p.color }}>
              {p.icon}
              <strong>{p.value}</strong> {p.label}
            </div>
          ))}
        </div>
      )}

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
        {STATS.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
            whileHover={{ y: -3 }}>
            <div className="admin-stat-card" style={{ borderLeft: `3px solid ${s.color}` }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${s.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color }}>
                  {s.icon}
                </div>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: s.up ? '#34d399' : '#f87171', display: 'flex', alignItems: 'center', gap: 3 }}>
                  {s.up ? <TrendingUp size={13} /> : <TrendingDown size={13} />} {s.change}
                </span>
              </div>
              <div style={{ fontSize: '1.7rem', fontWeight: 800, color: 'var(--color-text)', marginBottom: 4 }}>{s.value}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>{s.label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div className="glass-card" style={{ padding: 24 }}>
          <h3 style={{ fontWeight: 700, marginBottom: 20, fontSize: '0.95rem' }}>Platform Growth</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={CHART_DATA}>
              <defs>
                <linearGradient id="colorBooks" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} />
              <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
              <Tooltip contentStyle={{ background: 'rgba(10,15,30,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, fontSize: '0.8rem' }} />
              <Area type="monotone" dataKey="books" stroke="#0ea5e9" fill="url(#colorBooks)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card" style={{ padding: 24 }}>
          <h3 style={{ fontWeight: 700, marginBottom: 20, fontSize: '0.95rem' }}>Orders & Users</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={CHART_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} />
              <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
              <Tooltip contentStyle={{ background: 'rgba(10,15,30,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, fontSize: '0.8rem' }} />
              <Bar dataKey="orders" fill="#6366f1" radius={[4, 4, 0, 0]} />
              <Bar dataKey="users" fill="#22d3ee" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="glass-card" style={{ padding: 24 }}>
        <h3 style={{ fontWeight: 700, marginBottom: 20, fontSize: '0.95rem' }}>Recent Activity / সাম্প্রতিক কার্যকলাপ</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {RECENT_ACTIVITY.map((a, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 16px', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius)', border: '1px solid var(--glass-border)' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: a.color, flexShrink: 0 }} />
                <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', flex: 1 }}>{a.msg}</span>
                <span style={{ fontSize: '0.72rem', color: 'var(--color-text-dim)', flexShrink: 0 }}>{a.time}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`@media (max-width: 768px) { div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}
