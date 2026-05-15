'use client';
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 120, paddingBottom: 80, minHeight: '80vh' }}>
        <div className="container" style={{ maxWidth: 800 }}>
          <h1 className="section-title" style={{ marginBottom: 24 }}>Terms of Service</h1>
          <div className="glass-card" style={{ padding: 32, color: 'var(--color-text-muted)', lineHeight: 1.8 }}>
            <p style={{ marginBottom: 16 }}>Last updated: May 2024</p>
            <h3 style={{ fontWeight: 700, color: 'var(--color-text)', marginTop: 24, marginBottom: 12 }}>1. Acceptance of Terms</h3>
            <p style={{ marginBottom: 16 }}>By accessing and using BookDeal BD, you agree to be bound by these Terms of Service. If you do not agree, please do not use our platform.</p>
            
            <h3 style={{ fontWeight: 700, color: 'var(--color-text)', marginTop: 24, marginBottom: 12 }}>2. User Responsibilities</h3>
            <p style={{ marginBottom: 16 }}>Users must provide accurate information when registering and listing books. Sellers must accurately describe the condition of the books they list.</p>

            <h3 style={{ fontWeight: 700, color: 'var(--color-text)', marginTop: 24, marginBottom: 12 }}>3. Prohibited Items</h3>
            <p style={{ marginBottom: 16 }}>You may only list academic and educational books. Selling pirated copies, illegal materials, or non-book items is strictly prohibited and will result in account termination.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
