'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, User, Phone, MapPin, Camera } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { DIVISIONS_BD } from '@/lib/constants';

export default function ProfilePage() {
  const { userProfile, updateUserProfile } = useAuth();
  const [form, setForm] = useState({
    displayName: userProfile?.displayName || '',
    phone: userProfile?.phone || '',
    division: userProfile?.division || '',
    address: userProfile?.address || '',
    bio: userProfile?.bio || '',
  });
  const [saved, setSaved] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateUserProfile(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div style={{ maxWidth: 640 }}>
      <h1 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: 4 }}>Profile Settings / প্রোফাইল</h1>
      <p style={{ color: 'var(--color-text-muted)', fontFamily: 'Hind Siliguri', marginBottom: 28 }}>আপনার তথ্য আপডেট করুন</p>

      {/* Avatar */}
      <div className="glass-card" style={{ padding: 28, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 24 }}>
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '2rem', fontWeight: 800, boxShadow: 'var(--shadow-glow-primary)' }}>
            {userProfile?.displayName?.[0]?.toUpperCase() || 'U'}
          </div>
          <button style={{ position: 'absolute', bottom: 0, right: 0, width: 28, height: 28, borderRadius: '50%', background: 'var(--color-primary)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Camera size={14} color="white" />
          </button>
        </div>
        <div>
          <h3 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: 4 }}>{userProfile?.displayName}</h3>
          <p style={{ fontSize: '0.825rem', color: 'var(--color-text-dim)' }}>{userProfile?.email}</p>
          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            <span className={`badge ${userProfile?.isSeller ? 'badge-primary' : 'badge-cyan'}`}>
              {userProfile?.isSeller ? '🛒 Seller' : '👤 Buyer'}
            </span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSave}>
        <div className="glass-card" style={{ padding: 28, marginBottom: 20 }}>
          <h3 style={{ fontWeight: 700, marginBottom: 20, color: 'var(--color-primary)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Personal Information</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label className="input-label">Full Name / পুরো নাম</label>
              <div style={{ position: 'relative' }}>
                <User size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-dim)' }} />
                <input className="input" style={{ paddingLeft: 38 }} value={form.displayName} onChange={e => setForm({ ...form, displayName: e.target.value })} />
              </div>
            </div>
            <div>
              <label className="input-label">Phone / ফোন</label>
              <div style={{ position: 'relative' }}>
                <Phone size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-dim)' }} />
                <input className="input" style={{ paddingLeft: 38 }} placeholder="+880 1XXX-XXXXXX" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
              </div>
            </div>
            <div>
              <label className="input-label">Division / বিভাগ</label>
              <div style={{ position: 'relative' }}>
                <MapPin size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-dim)' }} />
                <select className="input select" style={{ paddingLeft: 38 }} value={form.division} onChange={e => setForm({ ...form, division: e.target.value })}>
                  <option value="">Select Division</option>
                  {DIVISIONS_BD.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="input-label">Address / ঠিকানা</label>
              <input className="input" placeholder="Your address" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label className="input-label">Bio / পরিচয়</label>
              <textarea className="input" rows={3} placeholder="Tell buyers about yourself..." value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} style={{ resize: 'vertical' }} />
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary btn-lg" style={{ gap: 10 }} id="save-profile">
          <Save size={18} /> {saved ? '✓ Profile Saved!' : 'Save Profile / সংরক্ষণ করুন'}
        </button>
      </form>

      <style jsx>{`@media (max-width: 600px) { div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}
