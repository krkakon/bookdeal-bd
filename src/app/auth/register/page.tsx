'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { BookOpen, Mail, Lock, Eye, EyeOff, ArrowRight, User, Phone } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/layout/Navbar';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirm) { setError('Passwords do not match'); return; }
    if (form.password.length < 6) { setError('Password must be at least 6 characters'); return; }
    setLoading(true);
    try {
      await register(form.email, form.password, form.name);
      router.push('/dashboard');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Registration failed';
      setError(msg.includes('email-already-in-use') ? 'Email already registered' : msg.includes('invalid-email') ? 'Invalid email address' : 'Registration failed. Please try again.');
    } finally { setLoading(false); }
  };

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '120px 24px 60px' }}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} style={{ width: '100%', maxWidth: 480 }}>
          <div className="glass-strong" style={{ padding: 40, borderRadius: 'var(--radius-2xl)' }}>
            {/* Logo */}
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
              <div style={{ width: 56, height: 56, borderRadius: 14, background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', boxShadow: 'var(--shadow-glow-primary)' }}>
                <BookOpen size={28} color="white" />
              </div>
              <h1 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: 6 }}>Create Account</h1>
              <p style={{ fontFamily: 'Hind Siliguri', color: 'var(--color-text-muted)' }}>নিখরচায় অ্যাকাউন্ট তৈরি করুন</p>
            </div>

            {error && (
              <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 'var(--radius)', padding: '12px 16px', marginBottom: 20, fontSize: '0.875rem', color: '#f87171' }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label className="input-label">Full Name / পুরো নাম</label>
                <div style={{ position: 'relative' }}>
                  <User size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-dim)' }} />
                  <input className="input" style={{ paddingLeft: 42 }} placeholder="Your full name"
                    value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required id="reg-name" />
                </div>
              </div>
              <div>
                <label className="input-label">Email Address</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-dim)' }} />
                  <input className="input" style={{ paddingLeft: 42 }} type="email" placeholder="your@email.com"
                    value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required id="reg-email" />
                </div>
              </div>
              <div>
                <label className="input-label">Phone (optional) / ফোন</label>
                <div style={{ position: 'relative' }}>
                  <Phone size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-dim)' }} />
                  <input className="input" style={{ paddingLeft: 42 }} placeholder="+880 1XXX-XXXXXX"
                    value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} id="reg-phone" />
                </div>
              </div>
              <div>
                <label className="input-label">Password</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-dim)' }} />
                  <input className="input" style={{ paddingLeft: 42, paddingRight: 42 }} type={showPass ? 'text' : 'password'} placeholder="Min. 6 characters"
                    value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required id="reg-password" />
                  <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-dim)' }}>
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="input-label">Confirm Password</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-dim)' }} />
                  <input className="input" style={{ paddingLeft: 42 }} type="password" placeholder="Repeat password"
                    value={form.confirm} onChange={e => setForm({ ...form, confirm: e.target.value })} required id="reg-confirm" />
                </div>
              </div>

              <div style={{ fontSize: '0.78rem', color: 'var(--color-text-dim)', lineHeight: 1.5 }}>
                By registering, you agree to our <Link href="/terms" style={{ color: 'var(--color-primary)' }}>Terms of Service</Link> and <Link href="/privacy" style={{ color: 'var(--color-primary)' }}>Privacy Policy</Link>.
              </div>

              <button type="submit" className="btn btn-primary btn-lg" disabled={loading} style={{ gap: 10, width: '100%' }} id="reg-submit">
                {loading ? <><div className="spinner" style={{ width: 20, height: 20, borderWidth: 2 }} /> Creating Account...</> : <> Create Account <ArrowRight size={18} /></>}
              </button>
            </form>

            <div style={{ textAlign: 'center', marginTop: 24, fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
              Already have an account?{' '}
              <Link href="/auth/login" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Login / লগইন</Link>
            </div>
          </div>
        </motion.div>
      </main>
    </>
  );
}
