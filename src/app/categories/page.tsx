'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BOOK_CATEGORIES } from '@/lib/constants';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const COUNTS: Record<string, number> = { 'pre-primary': 145, 'primary': 892, 'junior-secondary': 1234, 'ssc': 3456, 'hsc': 4123, 'bachelor': 2876, 'masters': 987, 'admission': 2345, 'guide': 1678 };
const GRADIENTS: Record<string, string> = { 'pre-primary': 'linear-gradient(135deg, #10b981, #059669)', 'primary': 'linear-gradient(135deg, #3b82f6, #1d4ed8)', 'junior-secondary': 'linear-gradient(135deg, #8b5cf6, #6d28d9)', 'ssc': 'linear-gradient(135deg, #0ea5e9, #0369a1)', 'hsc': 'linear-gradient(135deg, #f59e0b, #d97706)', 'bachelor': 'linear-gradient(135deg, #6366f1, #4f46e5)', 'masters': 'linear-gradient(135deg, #ec4899, #be185d)', 'admission': 'linear-gradient(135deg, #ef4444, #dc2626)', 'guide': 'linear-gradient(135deg, #22d3ee, #0891b2)' };
const ICONS: Record<string, string> = { 'pre-primary': '🌱', 'primary': '📗', 'junior-secondary': '📘', 'ssc': '📙', 'hsc': '📕', 'bachelor': '🎓', 'masters': '🏛️', 'admission': '🎯', 'guide': '📚' };

export default function CategoriesPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 100, paddingBottom: 80 }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: 48 }}>
            <h1 className="section-title">All Categories / সব বিভাগ</h1>
            <p style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-bengali)', fontSize: '1.1rem' }}>আপনার পছন্দের বিভাগ বেছে নিন</p>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
            {BOOK_CATEGORIES.map((cat, i) => (
              <motion.div key={cat.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} whileHover={{ y: -6 }}>
                <Link href={`/books?category=${cat.id}`} style={{ textDecoration: 'none' }}>
                  <div className="glass-card" style={{ padding: 28, display: 'flex', alignItems: 'center', gap: 20 }}>
                    <div style={{ width: 64, height: 64, borderRadius: 16, background: GRADIENTS[cat.id], display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', flexShrink: 0 }}>{ICONS[cat.id]}</div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--color-text)', marginBottom: 2 }}>{cat.label}</div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--color-text-dim)', fontFamily: 'var(--font-bengali)', marginBottom: 6 }}>{cat.bengali}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{(COUNTS[cat.id] || 0).toLocaleString()} books available</div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
