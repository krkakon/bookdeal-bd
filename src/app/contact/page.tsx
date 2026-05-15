'use client';
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 120, paddingBottom: 80, minHeight: '80vh' }}>
        <div className="container" style={{ maxWidth: 800 }}>
          <h1 className="section-title" style={{ marginBottom: 24 }}>Contact Us</h1>
          <div className="glass-card" style={{ padding: 32 }}>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: 32 }}>Have a question, feedback, or need support? We'd love to hear from you!</p>
            <div style={{ display: 'grid', gap: 24, marginBottom: 40 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 50, height: 50, borderRadius: '50%', background: 'rgba(14,165,233,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' }}>
                  <Mail size={24} />
                </div>
                <div>
                  <h3 style={{ fontWeight: 700, fontSize: '1.1rem' }}>Email Support</h3>
                  <p style={{ color: 'var(--color-text-dim)' }}>support@bookdeal.com.bd</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 50, height: 50, borderRadius: '50%', background: 'rgba(14,165,233,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' }}>
                  <Phone size={24} />
                </div>
                <div>
                  <h3 style={{ fontWeight: 700, fontSize: '1.1rem' }}>Phone Support</h3>
                  <p style={{ color: 'var(--color-text-dim)' }}>+880 1XXX-XXXXXX</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 50, height: 50, borderRadius: '50%', background: 'rgba(14,165,233,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' }}>
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 style={{ fontWeight: 700, fontSize: '1.1rem' }}>Office Address</h3>
                  <p style={{ color: 'var(--color-text-dim)' }}>Dhaka, Bangladesh 🇧🇩</p>
                </div>
              </div>
            </div>
            
            <form style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <h3 style={{ fontWeight: 700, fontSize: '1.2rem', marginBottom: 8 }}>Send us a message</h3>
              <input className="input" placeholder="Your Name" required />
              <input className="input" type="email" placeholder="Your Email" required />
              <textarea className="input" rows={5} placeholder="Your Message" required style={{ resize: 'vertical' }}></textarea>
              <button className="btn btn-primary btn-lg" style={{ width: 'fit-content' }}>Send Message</button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
