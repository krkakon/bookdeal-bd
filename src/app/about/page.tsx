'use client';
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 120, paddingBottom: 80, minHeight: '80vh' }}>
        <div className="container" style={{ maxWidth: 800 }}>
          <h1 className="section-title" style={{ marginBottom: 24 }}>About BookDeal BD</h1>
          <div className="glass-card" style={{ padding: 32, lineHeight: 1.8, color: 'var(--color-text-muted)' }}>
            <p style={{ marginBottom: 16 }}>
              Welcome to BookDeal BD! We are Bangladesh's first dedicated platform for students to buy and sell their used academic books. Our mission is to make education more affordable by extending the life of books and connecting students across the country.
            </p>
            <p style={{ marginBottom: 16 }}>
              Founded with the vision of creating a circular economy for educational resources, we provide a secure, easy-to-use marketplace. Whether you are looking for SSC, HSC, Admission, or University level books, you can find them here at discounted prices.
            </p>
            <p>
              Join thousands of students who are saving money and helping the environment!
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
