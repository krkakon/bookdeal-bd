'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Shield, Mail, Lock, Eye, EyeOff, ArrowRight, BookOpen } from 'lucide-react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    // Admin credentials check (in production: use Firebase with admin role)
    if (email === 'admin@bookdeal.com.bd' && password === 'Admin@123') {
      localStorage.setItem('bookdeal_admin_auth', 'true');
      router.push('/admin');
    } else {
      setError('Invalid admin credentials. Please try again.');
    }
    setLoading(false);
  };

  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} style={{ width: '100%', maxWidth: 440 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <BookOpen size={20} color="white" />
            </div>
            <span style={{ fontWeight: 800 }}><span style={{ color: 'var(--color-primary)' }}>Book</span>Deal<span style={{ color: 'var(--color-accent)' }}>BD</span></span>
          </Link>
        </div>

        <div className="glass-strong" style={{ padding: 40, borderRadius: 'var(--radius-2xl)' }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'linear-gradient(135deg, #f59e0b, #ef4444)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', boxShadow: '0 0 30px rgba(245,158,11,0.4)' }}>
              <Shield size={30} color="white" />
            </div>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: 4 }}>Admin Portal</h1>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Restricted access — authorized personnel only</p>
            <div className="badge badge-warning" style={{ marginTop: 8 }}>🔐 Admin Only</div>
          </div>

          {error && (
            <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 'var(--radius)', padding: '12px 16px', marginBottom: 20, fontSize: '0.875rem', color: '#f87171' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label className="input-label">Admin Email</label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-dim)' }} />
                <input className="input" style={{ paddingLeft: 42 }} type="email" placeholder="admin@bookdeal.com.bd"
                  value={email} onChange={e => setEmail(e.target.value)} required id="admin-email" />
              </div>
            </div>
            <div>
              <label className="input-label">Admin Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-dim)' }} />
                <input className="input" style={{ paddingLeft: 42, paddingRight: 42 }} type={showPass ? 'text' : 'password'} placeholder="Admin password"
                  value={password} onChange={e => setPassword(e.target.value)} required id="admin-password" />
                <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-dim)' }}>
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <button type="submit" className="btn btn-lg" style={{ background: 'linear-gradient(135deg, #f59e0b, #ef4444)', color: 'white', gap: 10, boxShadow: '0 4px 20px rgba(245,158,11,0.35)' }} disabled={loading} id="admin-login-submit">
              {loading ? <><div className="spinner" style={{ width: 20, height: 20, borderWidth: 2, borderTopColor: 'white' }} /> Authenticating...</> : <>Access Admin Panel <ArrowRight size={18} /></>}
            </button>
          </form>

          <div className="glass" style={{ padding: '12px 16px', marginTop: 20, borderRadius: 'var(--radius)', fontSize: '0.75rem', color: 'var(--color-text-dim)' }}>
            <strong style={{ color: '#fbbf24' }}>Demo credentials:</strong><br />
            Email: admin@bookdeal.com.bd<br />
            Password: Admin@123
          </div>

          <div style={{ textAlign: 'center', marginTop: 20 }}>
            <Link href="/" style={{ fontSize: '0.825rem', color: 'var(--color-text-dim)', textDecoration: 'none' }}>← Back to website</Link>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
