'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen } from 'lucide-react';

export default function CtaBanner() {
  return (
    <section className="section-sm">
      <div className="container">
        <motion.div initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
          <div style={{ background: 'linear-gradient(135deg, rgba(14,165,233,0.18) 0%, rgba(99,102,241,0.18) 50%, rgba(34,211,238,0.12) 100%)', border: '1px solid rgba(14,165,233,0.25)', borderRadius: 'var(--radius-2xl)', padding: 'clamp(40px, 6vw, 72px)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            {/* Background decoration */}
            <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(14,165,233,0.15) 0%, transparent 70%)', top: -100, right: -100, pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)', bottom: -80, left: -80, pointerEvents: 'none' }} />

            <BookOpen size={48} style={{ color: 'var(--color-primary)', marginBottom: 20 }} />
            <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', fontWeight: 800, color: 'var(--color-text)', marginBottom: 12 }}>
              Ready to <span className="gradient-text">Sell Your Books?</span>
            </h2>
            <p style={{ fontFamily: 'var(--font-bengali)', fontSize: '1.1rem', color: 'var(--color-text-muted)', marginBottom: 8 }}>
              আপনার পুরনো বই বিক্রি করুন এবং টাকা উপার্জন করুন
            </p>
            <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', maxWidth: 480, margin: '0 auto 32px', lineHeight: 1.7 }}>
              Join 8,500+ students who are buying and selling used books on BookDeal BD. It&apos;s free to register!
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/auth/register" className="btn btn-primary btn-xl w-full sm:w-auto" style={{ gap: 10 }}>
                Get Started Free <ArrowRight size={18} />
              </Link>
              <Link href="/books" className="btn btn-glass btn-xl w-full sm:w-auto">
                Browse Books
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
