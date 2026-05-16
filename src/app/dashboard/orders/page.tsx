'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, Truck, Package, MapPin, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const ORDERS = [
  { id: 'ORD-001', book: 'Physics 1st Paper - HSC', seller: 'Rahim Uddin', price: 180, date: '2024-05-10', status: 3, location: 'Delivered to your address', steps: ['Order Placed', 'Confirmed', 'Shipped', 'Delivered'] },
  { id: 'ORD-002', book: 'Higher Mathematics - SSC', seller: 'Fatema Begum', price: 150, date: '2024-05-12', status: 2, location: 'In transit - Dhaka to Chittagong', steps: ['Order Placed', 'Confirmed', 'Shipped', 'Delivered'] },
  { id: 'ORD-003', book: 'BUET Prep Guide 2024', seller: 'Arif Rahman', price: 350, date: '2024-05-14', status: 1, location: 'Seller confirmed your order', steps: ['Order Placed', 'Confirmed', 'Shipped', 'Delivered'] },
];

const STEP_ICONS = [<Package size={18} key="p" />, <CheckCircle size={18} key="c" />, <Truck size={18} key="t" />, <MapPin size={18} key="m" />];

export default function OrdersPage() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h1 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: 4 }}>My Orders / আমার অর্ডার</h1>
        <p style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-bengali)' }}>আপনার সব অর্ডার ট্র্যাক করুন</p>
      </div>

      {ORDERS.map((order, i) => (
        <motion.div key={order.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
          <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
            {/* Order Header */}
            <button onClick={() => setSelected(selected === order.id ? null : order.id)} style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
              <div style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: 'rgba(14,165,233,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem' }}>📚</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-text)' }}>{order.book}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--color-text-dim)' }}>
                      {order.id} · Seller: {order.seller} · {order.date}
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--color-primary)' }}>৳{order.price}</span>
                  <span className={`badge ${order.status === 3 ? 'badge-success' : order.status === 2 ? 'badge-primary' : 'badge-warning'}`}>
                    {order.steps[order.status]}
                  </span>
                  <ChevronRight size={16} style={{ color: 'var(--color-text-dim)', transform: selected === order.id ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }} />
                </div>
              </div>
            </button>

            {/* Order Tracker */}
            {selected === order.id && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                style={{ borderTop: '1px solid var(--glass-border)', padding: '24px' }}>
                {/* Step tracker */}
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24, overflow: 'auto', paddingBottom: 8 }}>
                  {order.steps.map((step, si) => (
                    <React.Fragment key={si}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, minWidth: 80 }}>
                        <motion.div
                          initial={{ scale: 0.8 }} animate={{ scale: 1 }}
                          className={`order-step-circle ${si < order.status ? 'done' : si === order.status ? 'active' : 'pending'}`}>
                          {si < order.status ? <CheckCircle size={18} /> : STEP_ICONS[si]}
                        </motion.div>
                        <span style={{ fontSize: '0.72rem', fontWeight: si <= order.status ? 700 : 400, color: si <= order.status ? 'var(--color-text)' : 'var(--color-text-dim)', textAlign: 'center', lineHeight: 1.3 }}>{step}</span>
                      </div>
                      {si < order.steps.length - 1 && (
                        <div style={{ flex: 1, height: 2, background: si < order.status ? 'var(--color-success)' : 'var(--glass-border)', minWidth: 24, margin: '0 4px', marginBottom: 24 }} />
                      )}
                    </React.Fragment>
                  ))}
                </div>

                <div className="glass" style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-success)', boxShadow: '0 0 8px rgba(16,185,129,0.6)', flexShrink: 0 }} />
                  <div>
                    <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text)' }}>{order.location}</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--color-text-dim)', fontFamily: 'var(--font-bengali)' }}>বর্তমান অবস্থান আপডেট</p>
                  </div>
                  <Clock size={14} style={{ marginLeft: 'auto', color: 'var(--color-text-dim)' }} />
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
