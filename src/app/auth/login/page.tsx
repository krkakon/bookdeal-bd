'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { BookOpen, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/layout/Navbar';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      router.push('/dashboard');
    } catch {
      setError('Invalid email or password. Please try again.');
    } finally { setLoading(false); }
  };

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '120px 24px 60px' }}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} style={{ width: '100%', maxWidth: 440 }}>
          <div className="glass-strong" style={{ padding: 40, borderRadius: 'var(--radius-2xl)' }}>
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
              <div style={{ width: 56, height: 56, borderRadius: 14, background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', boxShadow: 'var(--shadow-glow-primary)' }}>
                <BookOpen size={28} color="white" />
              </div>
              <h1 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: 6 }}>Welcome Back!</h1>
              <p style={{ fontFamily: 'var(--font-bengali)', color: 'var(--color-text-muted)' }}>আপনার অ্যাকাউন্টে লগইন করুন</p>
            </div>

            {error && (
              <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 'var(--radius)', padding: '12px 16px', marginBottom: 20, fontSize: '0.875rem', color: '#f87171' }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label className="input-label">Email Address</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-dim)' }} />
                  <input className="input" style={{ paddingLeft: 42 }} type="email" placeholder="your@email.com"
                    value={email} onChange={e => setEmail(e.target.value)} required id="login-email" autoComplete="email" />
                </div>
              </div>
              <div>
                <label className="input-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Password</span>
                  <Link href="/auth/forgot" style={{ color: 'var(--color-primary)', fontWeight: 400, textTransform: 'none' }}>Forgot password?</Link>
                </label>
                <div style={{ position: 'relative' }}>
                  <Lock size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-dim)' }} />
                  <input className="input" style={{ paddingLeft: 42, paddingRight: 42 }} type={showPass ? 'text' : 'password'} placeholder="Your password"
                    value={password} onChange={e => setPassword(e.target.value)} required id="login-password" autoComplete="current-password" />
                  <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-dim)' }}>
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-lg" disabled={loading} style={{ gap: 10, width: '100%' }} id="login-submit">
                {loading ? <><div className="spinner" style={{ width: 20, height: 20, borderWidth: 2 }} /> Logging in...</> : <>Login <ArrowRight size={18} /></>}
              </button>
            </form>

            {/* Demo credentials */}
            <div className="glass" style={{ padding: '12px 16px', marginTop: 20, borderRadius: 'var(--radius)', fontSize: '0.78rem', color: 'var(--color-text-dim)' }}>
              <strong style={{ color: 'var(--color-warning)' }}>Demo:</strong> Create a new account or use any registered email.
              <br />Admin login: <Link href="/admin/login" style={{ color: 'var(--color-primary)' }}>admin@bookdeal.com.bd</Link>
            </div>

            <div style={{ textAlign: 'center', marginTop: 24, fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
              New to BookDeal BD?{' '}
              <Link href="/auth/register" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Create Account / নিবন্ধন</Link>
            </div>
          </div>
        </motion.div>
      </main>
    </>
  );
}
