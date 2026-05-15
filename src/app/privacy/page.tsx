'use client';
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 120, paddingBottom: 80, minHeight: '80vh' }}>
        <div className="container" style={{ maxWidth: 800 }}>
          <h1 className="section-title" style={{ marginBottom: 24 }}>Privacy Policy</h1>
          <div className="glass-card" style={{ padding: 32, color: 'var(--color-text-muted)', lineHeight: 1.8 }}>
            <p style={{ marginBottom: 16 }}>Last updated: May 2024</p>
            <h3 style={{ fontWeight: 700, color: 'var(--color-text)', marginTop: 24, marginBottom: 12 }}>1. Information We Collect</h3>
            <p style={{ marginBottom: 16 }}>We collect information you provide directly to us, such as your name, email address, phone number, and shipping address when you create an account or place an order.</p>
            
            <h3 style={{ fontWeight: 700, color: 'var(--color-text)', marginTop: 24, marginBottom: 12 }}>2. How We Use Your Information</h3>
            <p style={{ marginBottom: 16 }}>We use your information to facilitate transactions between buyers and sellers, provide customer support, and improve our platform.</p>

            <h3 style={{ fontWeight: 700, color: 'var(--color-text)', marginTop: 24, marginBottom: 12 }}>3. Data Security</h3>
            <p style={{ marginBottom: 16 }}>We implement appropriate security measures to protect your personal information against unauthorized access or disclosure.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
