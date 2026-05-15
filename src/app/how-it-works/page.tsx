'use client';
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HowItWorks from '@/components/home/HowItWorks';

export default function HowItWorksPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 120, paddingBottom: 80, minHeight: '80vh' }}>
        <div className="container" style={{ maxWidth: 800, textAlign: 'center', marginBottom: 40 }}>
          <h1 className="section-title">Step by Step Guide</h1>
          <p style={{ color: 'var(--color-text-muted)' }}>Learn how to buy and sell books on BookDeal BD</p>
        </div>
        <HowItWorks />
      </main>
      <Footer />
    </>
  );
}
