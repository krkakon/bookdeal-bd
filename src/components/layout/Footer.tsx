'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Globe, Camera, Video, Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import { useSite } from '@/context/SiteContext';

export default function Footer() {
  const { settings } = useSite();

  const links = {
    browse: [
      { href: '/books?category=ssc', label: 'SSC Books' },
      { href: '/books?category=hsc', label: 'HSC Books' },
      { href: '/books?category=bachelor', label: 'University Books' },
      { href: '/books?category=admission', label: 'Admission Prep' },
      { href: '/books?category=guide', label: 'Guide Books' },
    ],
    company: [
      { href: '/about', label: 'About Us' },
      { href: '/contact', label: 'Contact' },
      { href: '/privacy', label: 'Privacy Policy' },
      { href: '/terms', label: 'Terms of Service' },
      { href: '/faq', label: 'FAQ' },
    ],
    seller: [
      { href: '/dashboard/sell', label: 'Start Selling' },
      { href: '/dashboard', label: 'Seller Dashboard' },
      { href: '/how-it-works', label: 'How It Works' },
    ],
  };

  return (
    <footer style={{ background: 'rgba(8, 12, 22, 0.97)', borderTop: '1px solid var(--glass-border)', marginTop: 80 }}>
      <div className="container" style={{ paddingTop: 60, paddingBottom: 40 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '48px 32px' }}>
          {/* Brand */}
          <div>
            <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ width: 42, height: 42, borderRadius: 10, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Image src="/logo.jpg" alt="BookDeal BD Logo" width={42} height={42} style={{ objectFit: 'cover' }} />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '1.2rem' }}>
                  <span style={{ color: 'var(--color-primary)' }}>Book</span>Deal
                  <span style={{ color: 'var(--color-accent)' }}>BD</span>
                </div>
                <div style={{ fontSize: '0.65rem', color: 'var(--color-text-dim)', fontFamily: 'var(--font-bengali)' }}>বই কিনুন | বই বেচুন</div>
              </div>
            </Link>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.7, marginBottom: 20 }}>
              {settings.tagline}<br />
              <span style={{ fontFamily: 'var(--font-bengali)', fontSize: '0.82rem', color: 'var(--color-text-dim)' }}>{settings.taglineBengali}</span>
            </p>
            {/* Social */}
            <div style={{ display: 'flex', gap: 10 }}>
              {[
                { icon: <Globe size={16} />, href: '#', color: '#1877f2' },
                { icon: <Camera size={16} />, href: '#', color: '#e1306c' },
                { icon: <Video size={16} />, href: '#', color: '#ff0000' },
                { icon: <MessageCircle size={16} />, href: '#', color: '#1da1f2' },
              ].map((s, i) => (
                <a key={i} href={s.href} style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-muted)', transition: 'all 0.2s', textDecoration: 'none' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = s.color; (e.currentTarget as HTMLAnchorElement).style.color = 'white'; (e.currentTarget as HTMLAnchorElement).style.borderColor = s.color; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'var(--glass-bg)'; (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-text-muted)'; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--glass-border)'; }}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Browse */}
          <div>
            <h4 style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--color-text)', marginBottom: 20, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Browse / ব্রাউজ করুন</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {links.browse.map(l => (
                <li key={l.href}>
                  <Link href={l.href} style={{ color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-primary)'}
                    onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-text-muted)'}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--color-text)', marginBottom: 20, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Company / কোম্পানি</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {links.company.map(l => (
                <li key={l.href}>
                  <Link href={l.href} style={{ color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-primary)'}
                    onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-text-muted)'}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--color-text)', marginBottom: 20, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Contact / যোগাযোগ</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { icon: <Mail size={15} />, text: 'support@bookdeal.com.bd' },
                { icon: <Phone size={15} />, text: '+880 1XXX-XXXXXX' },
                { icon: <MapPin size={15} />, text: 'Dhaka, Bangladesh 🇧🇩' },
              ].map((c, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
                  <span style={{ color: 'var(--color-primary)' }}>{c.icon}</span>
                  {c.text}
                </div>
              ))}
            </div>

            {/* Newsletter */}
            <div style={{ marginTop: 24 }}>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: 10 }}>Get offers in your inbox:</p>
              <div style={{ display: 'flex', gap: 8 }}>
                <input className="input" placeholder="Your email" style={{ fontSize: '0.8rem', padding: '8px 12px' }} />
                <button className="btn btn-primary btn-sm">Go</button>
              </div>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--glass-border)', marginTop: 48, paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--color-text-dim)' }}>
            <p style={{ marginBottom: 6 }}>{settings.footerText}</p>
            <p>Developed and managed by <strong style={{ color: 'var(--color-primary)' }}>Kakon Roy</strong></p>
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            {['Privacy', 'Terms', 'Cookies'].map(t => (
              <Link key={t} href={`/${t.toLowerCase()}`} style={{ fontSize: '0.8rem', color: 'var(--color-text-dim)', textDecoration: 'none' }}>{t}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
