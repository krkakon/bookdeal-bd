'use client';
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function CookiesPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 120, paddingBottom: 80, minHeight: '80vh' }}>
        <div className="container" style={{ maxWidth: 800 }}>
          <h1 className="section-title" style={{ marginBottom: 24 }}>Cookie Policy</h1>
          <div className="glass-card" style={{ padding: 32, color: 'var(--color-text-muted)', lineHeight: 1.8 }}>
            <p style={{ marginBottom: 16 }}>Last updated: May 2024</p>
            <h3 style={{ fontWeight: 700, color: 'var(--color-text)', marginTop: 24, marginBottom: 12 }}>What Are Cookies?</h3>
            <p style={{ marginBottom: 16 }}>Cookies are small data files that are placed on your computer or mobile device when you visit a website. They are widely used by website owners to make their websites work, or to work more efficiently.</p>
            
            <h3 style={{ fontWeight: 700, color: 'var(--color-text)', marginTop: 24, marginBottom: 12 }}>How We Use Cookies</h3>
            <p style={{ marginBottom: 16 }}>We use cookies to keep you signed in, remember your preferences, and understand how you interact with our platform to improve your experience.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
