'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BOOK_CATEGORIES } from '@/lib/constants';

export default function CategoriesSection() {
  const icons: Record<string, string> = {
    'pre-primary': '🌱', 'primary': '📗', 'junior-secondary': '📘',
    'ssc': '📙', 'hsc': '📕', 'bachelor': '🎓',
    'masters': '🏛️', 'admission': '🎯', 'guide': '📚',
  };

  const gradients: Record<string, string> = {
    'pre-primary': 'linear-gradient(135deg, #10b981, #059669)',
    'primary': 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
    'junior-secondary': 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
    'ssc': 'linear-gradient(135deg, #0ea5e9, #0369a1)',
    'hsc': 'linear-gradient(135deg, #f59e0b, #d97706)',
    'bachelor': 'linear-gradient(135deg, #6366f1, #4f46e5)',
    'masters': 'linear-gradient(135deg, #ec4899, #be185d)',
    'admission': 'linear-gradient(135deg, #ef4444, #dc2626)',
    'guide': 'linear-gradient(135deg, #22d3ee, #0891b2)',
  };

  return (
    <section className="section">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 className="section-title">Browse by Category</h2>
          <p style={{ fontFamily: 'var(--font-bengali)', color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>বিভাগ অনুযায়ী বই খুঁজুন</p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 16 }}>
          {BOOK_CATEGORIES.map((cat, i) => (
            <motion.div key={cat.id}
              initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              whileHover={{ y: -6, scale: 1.03 }}>
              <Link href={`/books?category=${cat.id}`} style={{ textDecoration: 'none' }}>
                <div className="glass-card" style={{ padding: '24px 16px', textAlign: 'center', borderRadius: 'var(--radius-xl)', cursor: 'pointer' }}>
                  <div style={{ width: 54, height: 54, borderRadius: 14, background: gradients[cat.id], display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', fontSize: '1.6rem', boxShadow: `0 8px 20px ${gradients[cat.id].match(/#[0-9a-f]{6}/)?.[0]}40` }}>
                    {icons[cat.id]}
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--color-text)', marginBottom: 4 }}>{cat.label}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-dim)', fontFamily: 'var(--font-bengali)' }}>{cat.bengali}</div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
