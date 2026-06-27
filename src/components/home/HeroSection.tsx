'use client';
import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, Star, Shield, Zap, BookOpen, Users, TrendingUp, ChevronDown } from 'lucide-react';
import { useSite } from '@/context/SiteContext';
import { BOOK_CATEGORIES } from '@/lib/constants';

const STATS = [
  { icon: <BookOpen size={20} />, value: '15,000+', label: 'Books Listed', bengali: 'বই তালিকাভুক্ত' },
  { icon: <Users size={20} />, value: '8,500+', label: 'Happy Students', bengali: 'সন্তুষ্ট শিক্ষার্থী' },
  { icon: <TrendingUp size={20} />, value: '৳2.5M+', label: 'Saved by Students', bengali: 'শিক্ষার্থীদের সাশ্রয়' },
  { icon: <Star size={20} />, value: '4.9/5', label: 'Average Rating', bengali: 'গড় রেটিং' },
];

const FLOATING_BOOKS = [
  { top: '12%', left: '6%', label: 'Physics', level: 'HSC', delay: 0, color: '#0ea5e9' },
  { top: '20%', right: '5%', label: 'Chemistry', level: 'SSC', delay: 0.5, color: '#6366f1' },
  { bottom: '28%', left: '4%', label: 'Mathematics', level: 'Class 9', delay: 1, color: '#22d3ee' },
  { bottom: '22%', right: '6%', label: 'Biology', level: 'HSC', delay: 1.5, color: '#10b981' },
  { top: '50%', left: '2%', label: 'English', level: 'Class 8', delay: 0.8, color: '#f59e0b' },
];

export default function HeroSection() {
  const { settings } = useSite();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCategory, setSearchCategory] = useState('');
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const ref = useRef(null);
  const categoryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (categoryRef.current && !categoryRef.current.contains(event.target as Node)) {
        setIsCategoryOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [categoryRef]);

  const selectedCategoryLabel = searchCategory 
    ? BOOK_CATEGORIES.find(c => c.id === searchCategory)?.label 
    : 'All Categories';
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  return (
    <section ref={ref} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative', overflow: 'hidden', paddingTop: 120, paddingBottom: 80 }}>
      {/* Animated background rings */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
        {[600, 800, 1000].map((size, i) => (
          <motion.div key={size} animate={{ scale: [1, 1.05, 1], opacity: [0.04, 0.08, 0.04] }}
            transition={{ duration: 6 + i * 2, repeat: Infinity, delay: i * 1.5 }}
            style={{ position: 'absolute', width: size, height: size, border: `1px solid var(--color-primary)`, borderRadius: '50%' }} />
        ))}
      </div>

      {/* Floating Book Bubbles */}
      {FLOATING_BOOKS.map((book, i) => (
        <motion.div key={i} className="hidden md:block"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1, y: [0, -12, 0] }}
          transition={{ opacity: { delay: book.delay + 0.8, duration: 0.5 }, scale: { delay: book.delay + 0.8 }, y: { duration: 4 + i, repeat: Infinity, ease: 'easeInOut', delay: book.delay } }}
          style={{ position: 'absolute', ...(book.top ? { top: book.top } : {}), ...(book.bottom ? { bottom: book.bottom } : {}), ...(book.left ? { left: book.left } : {}), ...(book.right ? { right: book.right } : {}) }}>
          <div className="glass" style={{ padding: '10px 16px', backdropFilter: 'blur(16px)', borderColor: `${book.color}40`, boxShadow: `0 8px 30px rgba(0,0,0,0.3), 0 0 20px ${book.color}25` }}>
            <div style={{ fontWeight: 700, fontSize: '0.8rem', color: book.color }}>{book.label}</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--color-text-dim)' }}>{book.level}</div>
          </div>
        </motion.div>
      ))}

      <motion.div className="container" style={{ y, opacity, position: 'relative', zIndex: 2, textAlign: 'center' }}>
        <motion.div variants={containerVariants} initial="hidden" animate="show">

          {/* Badge */}
          <motion.div variants={itemVariants} style={{ marginBottom: 24 }}>
            <div className="badge badge-primary" style={{ fontSize: '0.8rem', padding: '6px 16px', gap: 8 }}>
              <Zap size={12} /> Bangladesh&apos;s #1 Used Book Marketplace / বাংলাদেশের শীর্ষ বই বাজার
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1 variants={itemVariants} style={{ fontSize: 'clamp(2.2rem, 6vw, 4.2rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: 12 }}>
            <span className="gradient-text">Buy Smart.</span>{' '}
            <span style={{ color: 'var(--color-text)' }}>Sell Easy.</span>
            <br />
            <span className="gradient-text-purple">Study More.</span>
          </motion.h1>

          {/* Bengali Headline */}
          <motion.div variants={itemVariants} style={{ fontFamily: 'var(--font-bengali), sans-serif', fontSize: 'clamp(1rem, 3vw, 1.4rem)', color: 'var(--color-text-muted)', marginBottom: 20, fontWeight: 400 }}>
            {settings.heroBengali}
          </motion.div>

          {/* Subtitle */}
          <motion.p variants={itemVariants} style={{ fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', color: 'var(--color-text-muted)', maxWidth: 580, margin: '0 auto 40px', lineHeight: 1.7 }}>
            {settings.heroSubtitle}
          </motion.p>

          {/* Search Bar */}
          <motion.div variants={itemVariants} className="w-full px-4 md:px-0" style={{ maxWidth: 720, margin: '0 auto 40px' }}>
            <div className="glass flex flex-col md:flex-row" style={{ padding: '6px', gap: 8, borderRadius: 'var(--radius-xl)' }}>
              
              {/* Category Dropdown */}
              <div ref={categoryRef} className="w-full md:w-auto" style={{ position: 'relative', minWidth: '130px', zIndex: 50 }}>
                <button
                  type="button"
                  className="input"
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                  style={{ 
                    width: '100%',
                    border: 'none', 
                    background: 'var(--glass-bg)', 
                    borderRadius: 'var(--radius-lg)', 
                    cursor: 'pointer', 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 16px',
                    height: '100%',
                    minHeight: '48px',
                    color: 'var(--color-text)',
                    textAlign: 'left',
                    outline: 'none'
                  }}
                >
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {selectedCategoryLabel}
                  </span>
                  <ChevronDown 
                    size={16} 
                    style={{ 
                      color: 'var(--color-text-dim)',
                      transform: isCategoryOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s ease',
                      flexShrink: 0,
                      marginLeft: '8px'
                    }} 
                  />
                </button>

                <AnimatePresence>
                  {isCategoryOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      style={{
                        position: 'absolute',
                        top: 'calc(100% + 8px)',
                        left: 0,
                        width: '100%',
                        minWidth: '220px',
                        background: 'rgba(15, 20, 30, 0.95)',
                        backdropFilter: 'blur(16px)',
                        border: '1px solid var(--glass-border)',
                        borderRadius: 'var(--radius-lg)',
                        padding: '8px',
                        boxShadow: '0 10px 40px -10px rgba(0,0,0,0.5)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px',
                        maxHeight: '320px',
                        overflowY: 'auto'
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          setSearchCategory('');
                          setIsCategoryOpen(false);
                        }}
                        style={{
                          padding: '10px 14px',
                          textAlign: 'left',
                          background: searchCategory === '' ? 'rgba(255,255,255,0.08)' : 'transparent',
                          color: searchCategory === '' ? 'var(--color-primary)' : 'var(--color-text)',
                          border: 'none',
                          borderRadius: 'var(--radius-md)',
                          cursor: 'pointer',
                          fontSize: '0.9rem',
                          fontWeight: searchCategory === '' ? 600 : 400,
                          transition: 'all 0.2s ease',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                        }}
                        onMouseEnter={(e) => {
                          if (searchCategory !== '') e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                        }}
                        onMouseLeave={(e) => {
                          if (searchCategory !== '') e.currentTarget.style.background = 'transparent';
                        }}
                      >
                        All Categories
                        {searchCategory === '' && <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-primary)' }} />}
                      </button>
                      
                      <div style={{ height: 1, background: 'var(--glass-border)', margin: '4px 0' }} />

                      {BOOK_CATEGORIES.map((cat) => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => {
                            setSearchCategory(cat.id);
                            setIsCategoryOpen(false);
                          }}
                          style={{
                            padding: '10px 14px',
                            textAlign: 'left',
                            background: searchCategory === cat.id ? 'rgba(255,255,255,0.08)' : 'transparent',
                            color: searchCategory === cat.id ? 'var(--color-primary)' : 'var(--color-text)',
                            border: 'none',
                            borderRadius: 'var(--radius-md)',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            fontWeight: searchCategory === cat.id ? 600 : 400,
                            transition: 'all 0.2s ease',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                          }}
                          onMouseEnter={(e) => {
                            if (searchCategory !== cat.id) e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                          }}
                          onMouseLeave={(e) => {
                            if (searchCategory !== cat.id) e.currentTarget.style.background = 'transparent';
                          }}
                        >
                          {cat.label}
                          {searchCategory === cat.id && <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-primary)' }} />}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="w-full" style={{ flex: 1, position: 'relative' }}>
                <Search size={18} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-dim)' }} />
                <input
                  className="input"
                  placeholder="Search SSC Physics, HSC Chemistry... / বই খুঁজুন"
                  style={{ paddingLeft: 44, border: 'none', background: 'transparent', borderRadius: 'var(--radius-lg)' }}
                  id="hero-search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      router.push(`/books?search=${encodeURIComponent(searchQuery)}${searchCategory ? `&category=${searchCategory}` : ''}`);
                    }
                  }}
                />
              </div>
              <Link href={`/books?search=${encodeURIComponent(searchQuery)}${searchCategory ? `&category=${searchCategory}` : ''}`} className="btn btn-primary w-full md:w-auto" style={{ borderRadius: 'var(--radius-lg)', gap: 8, flexShrink: 0, justifyContent: 'center' }}>
                Search <ArrowRight size={16} />
              </Link>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              {['SSC Books', 'HSC Books', 'BUET Prep', 'Medical Admission', 'NCTB'].map(tag => (
                <Link key={tag} href={`/books?search=${tag}`} style={{ fontSize: '0.78rem', padding: '4px 12px', borderRadius: 999, background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', color: 'var(--color-text-muted)', textDecoration: 'none', transition: 'all 0.2s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--color-primary)'; (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-primary)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--glass-border)'; (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-text-muted)'; }}>
                  {tag}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div variants={itemVariants} style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 64 }}>
            <Link href="/books" className="btn btn-primary btn-xl" style={{ gap: 10 }}>
              <BookOpen size={20} /> Browse Books / বই দেখুন
            </Link>
            <Link href="/auth/register" className="btn btn-glass btn-xl" style={{ gap: 10 }}>
              Start Selling / বিক্রি শুরু করুন <ArrowRight size={18} />
            </Link>
          </motion.div>

          {/* Trust badges */}
          <motion.div variants={itemVariants} style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 64 }}>
            {[
              { icon: <Shield size={14} />, text: 'Safe & Secure' },
              { icon: <Star size={14} />, text: 'Verified Sellers' },
              { icon: <Zap size={14} />, text: 'Fast Delivery' },
            ].map((t, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                <span style={{ color: 'var(--color-primary)' }}>{t.icon}</span> {t.text}
              </div>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div variants={itemVariants}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 16, maxWidth: 700, margin: '0 auto' }}>
              {STATS.map((stat, i) => (
                <motion.div key={i} whileHover={{ y: -4 }} className="glass" style={{ padding: '20px 16px', textAlign: 'center', borderRadius: 'var(--radius-lg)' }}>
                  <div style={{ color: 'var(--color-primary)', marginBottom: 8, display: 'flex', justifyContent: 'center' }}>{stat.icon}</div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-text)', lineHeight: 1 }}>{stat.value}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: 4 }}>{stat.label}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--color-text-dim)', fontFamily: 'var(--font-bengali)' }}>{stat.bengali}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}
        style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', color: 'var(--color-text-dim)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, fontSize: '0.75rem' }}>
        <span>Scroll to explore</span>
        <ChevronDown size={20} />
      </motion.div>
    </section>
  );
}
