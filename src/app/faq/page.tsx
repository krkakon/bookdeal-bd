'use client';
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function FAQPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 120, paddingBottom: 80, minHeight: '80vh' }}>
        <div className="container" style={{ maxWidth: 800 }}>
          <h1 className="section-title" style={{ marginBottom: 24 }}>Frequently Asked Questions</h1>
          <div className="glass-card" style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div>
              <h3 style={{ fontWeight: 700, marginBottom: 8, color: 'var(--color-text)' }}>How do I sell a book?</h3>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.6 }}>Simply register an account, go to your dashboard, click "Enable Selling", and then "Sell a Book". Fill in the book details and upload a clear picture!</p>
            </div>
            <div>
              <h3 style={{ fontWeight: 700, marginBottom: 8, color: 'var(--color-text)' }}>How do I pay for a book?</h3>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.6 }}>You can pay using bKash, Nagad, Card, or Cash on Delivery during the checkout process.</p>
            </div>
            <div>
              <h3 style={{ fontWeight: 700, marginBottom: 8, color: 'var(--color-text)' }}>Is my payment secure?</h3>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.6 }}>Yes, we use secure payment gateways. The money is held in escrow until you receive and verify the book.</p>
            </div>
            <div>
              <h3 style={{ fontWeight: 700, marginBottom: 8, color: 'var(--color-text)' }}>Can I return a book if it's damaged?</h3>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.6 }}>Yes, if the book condition does not match the seller's description, you can request a return within 3 days of delivery.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
