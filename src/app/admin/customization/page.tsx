'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, RefreshCw, Eye, Image, Type, Palette, Megaphone, Gift, Globe } from 'lucide-react';
import { useSite } from '@/context/SiteContext';

export default function AdminCustomizationPage() {
  const { settings, updateSettings, resetSettings } = useSite();
  const [form, setForm] = useState({ ...settings });
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState('branding');

  const handleSave = () => {
    updateSettings(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const TABS = [
    { id: 'branding', label: 'Branding', icon: <Globe size={16} /> },
    { id: 'hero', label: 'Hero Section', icon: <Image size={16} /> },
    { id: 'content', label: 'Content', icon: <Type size={16} /> },
    { id: 'colors', label: 'Colors', icon: <Palette size={16} /> },
    { id: 'announcements', label: 'Banners & Offers', icon: <Megaphone size={16} /> },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 900 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: 4 }}>Site Customization</h1>
          <p style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-bengali)' }}>ওয়েবসাইটের সব কিছু এখান থেকে পরিবর্তন করুন</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={resetSettings} className="btn btn-glass btn-sm" style={{ gap: 6 }}>
            <RefreshCw size={14} /> Reset Defaults
          </button>
          <button onClick={() => window.open('/', '_blank')} className="btn btn-glass btn-sm" style={{ gap: 6 }}>
            <Eye size={14} /> Preview Site
          </button>
          <button onClick={handleSave} className="btn btn-sm" style={{ background: saved ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #f59e0b, #d97706)', color: 'white', gap: 6 }}>
            <Save size={14} /> {saved ? '✓ Saved!' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div style={{ display: 'flex', gap: 4, overflow: 'auto', paddingBottom: 4 }}>
        {TABS.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 18px', borderRadius: 'var(--radius)', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem', whiteSpace: 'nowrap', background: activeTab === tab.id ? 'rgba(245,158,11,0.15)' : 'var(--glass-bg)', color: activeTab === tab.id ? '#fbbf24' : 'var(--color-text-muted)', borderBottom: activeTab === tab.id ? '2px solid #f59e0b' : '2px solid transparent', transition: 'all 0.2s' }}>
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="glass-card" style={{ padding: 28 }}>
          {activeTab === 'branding' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <h2 style={{ fontWeight: 700, fontSize: '1rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: 12 }}>Brand Identity / ব্র্যান্ড পরিচয়</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label className="input-label">Website Name</label>
                  <input className="input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                </div>
                <div>
                  <label className="input-label">Logo Text</label>
                  <input className="input" value={form.logoText} onChange={e => setForm({ ...form, logoText: e.target.value })} />
                </div>
                <div>
                  <label className="input-label">Tagline (English)</label>
                  <input className="input" value={form.tagline} onChange={e => setForm({ ...form, tagline: e.target.value })} />
                </div>
                <div>
                  <label className="input-label">Tagline (Bengali / বাংলা)</label>
                  <input className="input" style={{ fontFamily: 'var(--font-bengali)' }} value={form.taglineBengali} onChange={e => setForm({ ...form, taglineBengali: e.target.value })} />
                </div>
                <div>
                  <label className="input-label">Footer Text</label>
                  <input className="input" value={form.footerText} onChange={e => setForm({ ...form, footerText: e.target.value })} />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'hero' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <h2 style={{ fontWeight: 700, fontSize: '1rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: 12 }}>Hero Section / হিরো সেকশন</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label className="input-label">Hero Title (English)</label>
                  <input className="input" value={form.heroTitle} onChange={e => setForm({ ...form, heroTitle: e.target.value })} />
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label className="input-label">Hero Title (Bengali / বাংলা)</label>
                  <input className="input" style={{ fontFamily: 'var(--font-bengali)' }} value={form.heroBengali} onChange={e => setForm({ ...form, heroBengali: e.target.value })} />
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label className="input-label">Hero Subtitle</label>
                  <textarea className="input" rows={2} value={form.heroSubtitle} onChange={e => setForm({ ...form, heroSubtitle: e.target.value })} style={{ resize: 'vertical' }} />
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label className="input-label">Hero Background Image URL (optional)</label>
                  <input className="input" placeholder="https://..." value={form.heroBgImage || ''} onChange={e => setForm({ ...form, heroBgImage: e.target.value })} />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'colors' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <h2 style={{ fontWeight: 700, fontSize: '1rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: 12 }}>Color Scheme / রঙের সেটিং</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
                {[
                  { key: 'primaryColor', label: 'Primary Color', desc: 'Main brand color' },
                  { key: 'secondaryColor', label: 'Secondary Color', desc: 'Accent & buttons' },
                  { key: 'accentColor', label: 'Accent Color', desc: 'Highlights & effects' },
                ].map(c => (
                  <div key={c.key}>
                    <label className="input-label">{c.label}</label>
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                      <input type="color" value={form[c.key as keyof typeof form] as string} onChange={e => setForm({ ...form, [c.key]: e.target.value })}
                        style={{ width: 50, height: 44, border: 'none', borderRadius: 8, cursor: 'pointer', background: 'transparent', padding: 0 }} />
                      <div>
                        <input className="input" value={form[c.key as keyof typeof form] as string} onChange={e => setForm({ ...form, [c.key]: e.target.value })} style={{ fontSize: '0.85rem', fontFamily: 'monospace' }} />
                        <p style={{ fontSize: '0.72rem', color: 'var(--color-text-dim)', marginTop: 3 }}>{c.desc}</p>
                      </div>
                    </div>
                    <div style={{ width: '100%', height: 8, borderRadius: 4, background: form[c.key as keyof typeof form] as string, marginTop: 8 }} />
                  </div>
                ))}
              </div>
              <div className="glass" style={{ padding: '16px 20px', borderRadius: 'var(--radius)' }}>
                <p style={{ fontSize: '0.825rem', color: 'var(--color-text-muted)' }}>
                  💡 Color changes apply immediately to the live website. Click &quot;Save Changes&quot; to make them permanent.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'announcements' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <h2 style={{ fontWeight: 700, fontSize: '1rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: 12 }}>Banners & Offers / ব্যানার ও অফার</h2>
              <div>
                <label className="input-label">Announcement Banner Text</label>
                <input className="input" value={form.announcementBanner} onChange={e => setForm({ ...form, announcementBanner: e.target.value })} placeholder="e.g. 🎉 Special offer! Use code BOOKDEAL10 for 10% off" />
                <p style={{ fontSize: '0.78rem', color: 'var(--color-text-dim)', marginTop: 6 }}>This appears as a scrolling banner at the top of every page. Leave blank to hide.</p>
              </div>
              <div>
                <label className="input-label">Featured Offer Text</label>
                <textarea className="input" rows={2} value={form.featuredOffer || ''} onChange={e => setForm({ ...form, featuredOffer: e.target.value })} placeholder="Homepage special offer description..." style={{ resize: 'vertical' }} />
              </div>

              {/* Active Vouchers Preview */}
              <div className="glass" style={{ padding: 20, borderRadius: 'var(--radius-lg)' }}>
                <h3 style={{ fontWeight: 700, marginBottom: 14, fontSize: '0.9rem' }}>Active Vouchers <Gift size={16} style={{ display: 'inline', verticalAlign: 'middle' }} /></h3>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  {[
                    { code: 'BOOKDEAL10', discount: '10%' },
                    { code: 'STUDENT20', discount: '20%' },
                    { code: 'FIRSTBUY15', discount: '15%' },
                    { code: 'EID25', discount: '25%' },
                  ].map(v => (
                    <div key={v.code} style={{ padding: '8px 16px', borderRadius: 8, border: '1px dashed var(--color-primary)', fontSize: '0.825rem' }}>
                      <span style={{ fontWeight: 700, color: 'var(--color-primary)' }}>{v.code}</span>
                      <span style={{ color: 'var(--color-text-dim)', marginLeft: 8 }}>{v.discount} OFF</span>
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: '0.78rem', color: 'var(--color-text-dim)', marginTop: 10 }}>
                  Manage all vouchers from the <a href="/admin/vouchers" style={{ color: 'var(--color-primary)' }}>Vouchers section</a>.
                </p>
              </div>

              <div>
                <label className="input-label">Maintenance Mode</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <button onClick={() => setForm({ ...form, maintenanceMode: !form.maintenanceMode })}
                    style={{ width: 52, height: 28, borderRadius: 14, background: form.maintenanceMode ? '#ef4444' : 'var(--glass-bg)', border: `1px solid ${form.maintenanceMode ? '#ef4444' : 'var(--glass-border)'}`, cursor: 'pointer', position: 'relative', transition: 'all 0.3s' }}>
                    <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'white', position: 'absolute', top: 2, left: form.maintenanceMode ? 27 : 3, transition: 'left 0.3s', boxShadow: '0 2px 4px rgba(0,0,0,0.3)' }} />
                  </button>
                  <span style={{ fontSize: '0.875rem', color: form.maintenanceMode ? '#f87171' : 'var(--color-text-muted)' }}>
                    {form.maintenanceMode ? '⚠️ Maintenance mode ON — site is hidden from public' : 'Site is live and accessible'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'content' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <h2 style={{ fontWeight: 700, fontSize: '1rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: 12 }}>Content Settings / কন্টেন্ট সেটিং</h2>
              <div>
                <label className="input-label">Allow New Registrations</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <button onClick={() => setForm({ ...form, allowNewRegistrations: !form.allowNewRegistrations })}
                    style={{ width: 52, height: 28, borderRadius: 14, background: form.allowNewRegistrations !== false ? '#10b981' : 'var(--glass-bg)', border: 'none', cursor: 'pointer', position: 'relative', transition: 'all 0.3s' }}>
                    <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'white', position: 'absolute', top: 2, left: form.allowNewRegistrations !== false ? 27 : 3, transition: 'left 0.3s', boxShadow: '0 2px 4px rgba(0,0,0,0.3)' }} />
                  </button>
                  <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                    {form.allowNewRegistrations !== false ? 'New registrations allowed' : 'Registrations disabled'}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Save button sticky at bottom */}
      <div style={{ position: 'sticky', bottom: 16, display: 'flex', justifyContent: 'flex-end' }}>
        <button onClick={handleSave} className="btn btn-lg pulse-glow" style={{ background: saved ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #f59e0b, #d97706)', color: 'white', gap: 10 }}>
          <Save size={18} /> {saved ? '✓ All Changes Saved!' : 'Save All Changes'}
        </button>
      </div>

      <style jsx>{`@media (max-width: 768px) { div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}
