'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, ShoppingCart, User, Search, Menu, X,
  ChevronDown, ChevronRight, Bell, Heart, LogOut, LayoutDashboard,
  BookMarked, Settings, Shield
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { useSite } from '@/context/SiteContext';

const NAV_LINKS = [
  { href: '/', label: 'Home', bengali: 'হোম' },
  {
    label: 'Books', bengali: 'বই',
    children: [
      { href: '/books', label: 'Browse All Books', bengali: 'সব বই দেখুন' },
      { href: '/books?category=ssc', label: 'SSC Books', bengali: 'এসএসসি বই' },
      { href: '/books?category=hsc', label: 'HSC Books', bengali: 'এইচএসসি বই' },
      { href: '/books?category=admission', label: 'Admission Prep', bengali: 'ভর্তি পরীক্ষা' },
      { 
        href: '/books?category=bachelor', label: 'University Books', bengali: 'বিশ্ববিদ্যালয়',
        subChildren: [
          { href: '/books?category=bachelor', label: 'Honours/Bachelors', bengali: 'অনার্স' },
          { href: '/books?category=masters', label: 'Masters', bengali: 'মাস্টার্স' }
        ]
      },
    ]
  },
  {
    label: 'Guides', bengali: 'গাইড বই',
    children: [
      { href: '/books?category=guide', label: 'Browse All Guides', bengali: 'সব গাইড দেখুন' },
      { href: '/books?category=guide&level=SSC', label: 'SSC Guides', bengali: 'এসএসসি গাইড' },
      { href: '/books?category=guide&level=HSC', label: 'HSC Guides', bengali: 'এইচএসসি গাইড' },
      { href: '/books?category=guide&level=Admission', label: 'Admission Guides', bengali: 'ভর্তি গাইড' },
      { href: '/books?category=guide&level=1st+Year', label: 'Honours Guides', bengali: 'অনার্স গাইড' },
      { href: '/books?category=guide&level=Masters', label: 'Masters Guides', bengali: 'মাস্টার্স গাইড' },
      { href: '/books?category=guide&subject=Test+Papers', label: 'Test Papers', bengali: 'টেস্ট পেপারস' },
    ]
  },
  { href: '/categories', label: 'Categories', bengali: 'বিভাগ' },
  { href: '/about', label: 'About', bengali: 'আমাদের সম্পর্কে' },
  { href: '/contact', label: 'Contact', bengali: 'যোগাযোগ' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openSubDropdown, setOpenSubDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();
  const { user, userProfile, logout } = useAuth();
  const { totalItems } = useCart();
  const { settings } = useSite();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const handleLogout = async () => { await logout(); };

  return (
    <>
      {/* Announcement Banner */}
      {settings.announcementBanner && (
        <div className="announcement-bar">
          <motion.div
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            {settings.announcementBanner}
          </motion.div>
        </div>
      )}

      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} style={{ top: settings.announcementBanner ? '40px' : 0 }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '70px' }}>

            {/* Logo */}
            <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <motion.div whileHover={{ scale: 1.05 }} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: 40, height: 40, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                  boxShadow: '0 4px 20px rgba(14,165,233,0.4)',
                }}>
                  <BookOpen size={22} color="white" />
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--color-text)', lineHeight: 1 }}>
                    <span style={{ color: 'var(--color-primary)' }}>Book</span>Deal
                    <span style={{ color: 'var(--color-accent)', marginLeft: 2 }}>BD</span>
                  </div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--color-text-dim)', fontFamily: 'Hind Siliguri, sans-serif' }}>
                    বই কিনুন | বই বেচুন
                  </div>
                </div>
              </motion.div>
            </Link>

            {/* Desktop Nav */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }} className="hidden-mobile">
              {NAV_LINKS.map((link) => (
                <div key={link.label} style={{ position: 'relative' }}
                  onMouseEnter={() => link.children && setOpenDropdown(link.label)}
                  onMouseLeave={() => setOpenDropdown(null)}>
                  {link.href ? (
                    <Link href={link.href} style={{
                      padding: '8px 14px', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', gap: 4,
                      color: pathname === link.href ? 'var(--color-primary)' : 'var(--color-text-muted)',
                      fontWeight: 500, fontSize: '0.9rem', textDecoration: 'none',
                      background: pathname === link.href ? 'rgba(14,165,233,0.1)' : 'transparent',
                      transition: 'all 0.2s',
                    }}>
                      {link.label}
                    </Link>
                  ) : (
                    <button style={{
                      padding: '8px 14px', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', gap: 4,
                      color: 'var(--color-text-muted)', fontWeight: 500, fontSize: '0.9rem',
                      background: 'transparent', border: 'none', cursor: 'pointer',
                    }}>
                      {link.label} <ChevronDown size={14} />
                    </button>
                  )}
                  {/* Dropdown */}
                  <AnimatePresence>
                    {link.children && openDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.18 }}
                        style={{
                          position: 'absolute', top: '100%', left: 0, width: 220,
                          background: 'rgba(10,15,30,0.95)', backdropFilter: 'blur(20px)',
                          border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-lg)',
                          padding: '8px', marginTop: 8,
                          boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
                          zIndex: 200,
                        }}>
                        {link.children.map((child) => (
                          <div key={child.label} style={{ position: 'relative' }}
                            onMouseEnter={() => child.subChildren && setOpenSubDropdown(child.label)}
                            onMouseLeave={() => setOpenSubDropdown(null)}>
                            <Link href={child.href || '#'} style={{
                              display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px',
                              borderRadius: 'var(--radius-sm)', textDecoration: 'none',
                              transition: 'background 0.2s',
                            }}
                              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(14,165,233,0.1)')}
                              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                              <div>
                                <div style={{ color: 'var(--color-text)', fontWeight: 500, fontSize: '0.875rem' }}>{child.label}</div>
                                <div style={{ color: 'var(--color-text-dim)', fontSize: '0.75rem', fontFamily: 'Hind Siliguri' }}>{child.bengali}</div>
                              </div>
                              {child.subChildren && <ChevronRight size={14} style={{ color: 'var(--color-text-muted)' }} />}
                            </Link>

                            {/* Sub-dropdown */}
                            <AnimatePresence>
                              {child.subChildren && openSubDropdown === child.label && (
                                <motion.div
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: -10 }}
                                  transition={{ duration: 0.18 }}
                                  style={{
                                    position: 'absolute', top: 0, left: '100%', width: 200,
                                    background: 'rgba(10,15,30,0.95)', backdropFilter: 'blur(20px)',
                                    border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-lg)',
                                    padding: '8px', marginLeft: 4,
                                    boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
                                  }}>
                                  {child.subChildren.map(sub => (
                                    <Link key={sub.href} href={sub.href} style={{
                                      display: 'flex', flexDirection: 'column', padding: '10px 14px',
                                      borderRadius: 'var(--radius-sm)', textDecoration: 'none',
                                      transition: 'background 0.2s',
                                    }}
                                      onMouseEnter={e => (e.currentTarget.style.background = 'rgba(14,165,233,0.1)')}
                                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                                      <span style={{ color: 'var(--color-text)', fontWeight: 500, fontSize: '0.875rem' }}>{sub.label}</span>
                                      <span style={{ color: 'var(--color-text-dim)', fontSize: '0.75rem', fontFamily: 'Hind Siliguri' }}>{sub.bengali}</span>
                                    </Link>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Right Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {/* Search */}
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                onClick={() => setSearchOpen(!searchOpen)}
                style={{ padding: '8px', borderRadius: 'var(--radius-sm)', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', color: 'var(--color-text-muted)', cursor: 'pointer' }}>
                <Search size={18} />
              </motion.button>

              {/* Cart */}
              <Link href="/cart" style={{ position: 'relative', padding: '8px', borderRadius: 'var(--radius-sm)', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', color: 'var(--color-text-muted)', display: 'flex' }}>
                <ShoppingCart size={18} />
                {totalItems > 0 && (
                  <span style={{
                    position: 'absolute', top: -4, right: -4, width: 18, height: 18,
                    background: 'var(--color-primary)', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.65rem', fontWeight: 700, color: 'white',
                  }}>{totalItems}</span>
                )}
              </Link>

              {/* User Menu */}
              {user ? (
                <div style={{ position: 'relative' }}
                  onMouseEnter={() => setOpenDropdown('user')}
                  onMouseLeave={() => setOpenDropdown(null)}>
                  <button style={{
                    display: 'flex', alignItems: 'center', gap: 8, padding: '7px 14px',
                    background: 'rgba(14,165,233,0.1)', border: '1px solid rgba(14,165,233,0.25)',
                    borderRadius: 'var(--radius)', color: 'var(--color-text)', cursor: 'pointer', fontSize: '0.875rem',
                  }}>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.75rem', fontWeight: 700 }}>
                      {userProfile?.displayName?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <span className="hidden-mobile">{userProfile?.displayName?.split(' ')[0] || 'User'}</span>
                    <ChevronDown size={14} />
                  </button>
                  <AnimatePresence>
                    {openDropdown === 'user' && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                        style={{ position: 'absolute', top: '100%', right: 0, width: 220, background: 'rgba(10,15,30,0.97)', backdropFilter: 'blur(20px)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-lg)', padding: '8px', marginTop: 8, boxShadow: '0 20px 60px rgba(0,0,0,0.5)', zIndex: 200 }}>
                        <div style={{ padding: '12px 14px', borderBottom: '1px solid var(--glass-border)', marginBottom: 8 }}>
                          <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{userProfile?.displayName}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-dim)' }}>{userProfile?.email}</div>
                          <div className="badge badge-primary" style={{ marginTop: 6 }}>
                            {userProfile?.isSeller ? '🛒 Seller' : '👤 Buyer'}
                          </div>
                        </div>
                        {[
                          { href: '/dashboard', icon: <LayoutDashboard size={15} />, label: 'Dashboard' },
                          { href: '/dashboard/orders', icon: <BookMarked size={15} />, label: 'My Orders' },
                          { href: '/dashboard/wishlist', icon: <Heart size={15} />, label: 'Wishlist' },
                          { href: '/dashboard/profile', icon: <Settings size={15} />, label: 'Settings' },
                        ].map(item => (
                          <Link key={item.href} href={item.href} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 'var(--radius-sm)', color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '0.875rem', transition: 'all 0.2s' }}
                            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(14,165,233,0.1)'; (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-primary)'; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-text-muted)'; }}>
                            {item.icon} {item.label}
                          </Link>
                        ))}
                        {userProfile?.role === 'admin' && (
                          <Link href="/admin" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 'var(--radius-sm)', color: '#fbbf24', textDecoration: 'none', fontSize: '0.875rem' }}>
                            <Shield size={15} /> Admin Portal
                          </Link>
                        )}
                        <div style={{ borderTop: '1px solid var(--glass-border)', marginTop: 8, paddingTop: 8 }}>
                          <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 'var(--radius-sm)', color: '#f87171', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '0.875rem', width: '100%' }}>
                            <LogOut size={15} /> Logout
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div style={{ display: 'flex', gap: 8 }}>
                  <Link href="/auth/login" className="btn btn-glass btn-sm">Login</Link>
                  <Link href="/auth/register" className="btn btn-primary btn-sm hidden-mobile">Register</Link>
                </div>
              )}

              {/* Mobile Menu Toggle */}
              <button onClick={() => setMobileOpen(!mobileOpen)} style={{ padding: '8px', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-sm)', color: 'var(--color-text)', cursor: 'pointer' }} className="show-mobile">
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Search Overlay */}
          <AnimatePresence>
            {searchOpen && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                style={{ paddingBottom: 16, overflow: 'hidden' }}>
                <Link href={`/books?search=${encodeURIComponent(searchQuery)}`}>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <input className="input" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                      placeholder="Search books, subjects, authors... / বই, বিষয় বা লেখক খুঁজুন"
                      autoFocus onKeyDown={e => e.key === 'Enter' && setSearchOpen(false)} />
                    <button className="btn btn-primary" onClick={() => setSearchOpen(false)}>
                      <Search size={16} /> Search
                    </button>
                  </div>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div initial={{ opacity: 0, x: '100%' }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 28 }}
              className="mobile-menu" style={{ paddingTop: 80 }}>
              <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 4 }}>
                {NAV_LINKS.map(link => (
                  <div key={link.label}>
                    {link.href ? (
                      <Link href={link.href} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', borderRadius: 'var(--radius)', color: 'var(--color-text)', textDecoration: 'none', fontSize: '1rem', fontWeight: 500 }}>
                        <span>{link.label}</span>
                        <span style={{ fontSize: '0.8rem', color: 'var(--color-text-dim)', fontFamily: 'Hind Siliguri' }}>{link.bengali}</span>
                      </Link>
                    ) : (
                      <>
                        <div style={{ padding: '10px 16px', color: 'var(--color-text-muted)', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: 8 }}>{link.label}</div>
                        {link.children?.map(child => (
                          <div key={child.label}>
                            <Link href={child.href || '#'} style={{ display: 'block', padding: '10px 28px', borderRadius: 'var(--radius-sm)', color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>
                              {child.label}
                            </Link>
                            {child.subChildren?.map(sub => (
                              <Link key={sub.href} href={sub.href} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 40px', borderRadius: 'var(--radius-sm)', color: 'var(--color-text-dim)', textDecoration: 'none', fontSize: '0.85rem' }}>
                                <ChevronRight size={12} /> {sub.label}
                              </Link>
                            ))}
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                ))}
                <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {user ? (
                    <>
                      <Link href="/dashboard" className="btn btn-primary btn-lg">My Dashboard</Link>
                      <button onClick={handleLogout} className="btn btn-glass btn-lg">Logout</button>
                    </>
                  ) : (
                    <>
                      <Link href="/auth/login" className="btn btn-outline btn-lg">Login / লগইন</Link>
                      <Link href="/auth/register" className="btn btn-primary btn-lg">Register / নিবন্ধন</Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <style jsx>{`
        @media (max-width: 900px) { .hidden-mobile { display: none !important; } }
        @media (min-width: 901px) { .show-mobile { display: none !important; } }
        @media (max-width: 600px) { .hidden-mobile { display: none !important; } }
      `}</style>
    </>
  );
}
