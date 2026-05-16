'use client';
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { Search, Filter, ChevronDown, Heart, Star, Eye, MapPin, X, SlidersHorizontal } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { BD_EDUCATION, BOOK_CATEGORIES, BOOK_CONDITIONS } from '@/lib/constants';
import { useCart } from '@/context/CartContext';
import { useBooks } from '@/lib/hooks/useBooks';
import { Book } from '@/data/mockBooks';

import Image from 'next/image';
import { CustomSelect } from '@/components/ui/CustomSelect';

function BookCard({ book }: { book: Book }) {
  const { addItem } = useCart();
  const discount = Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100);
  const conditionColors: Record<string, string> = { 'like-new': '#34d399', 'very-good': '#60a5fa', 'good': '#fbbf24', 'acceptable': '#f87171' };
  const conditionLabels: Record<string, string> = { 'like-new': 'Like New', 'very-good': 'Very Good', 'good': 'Good', 'acceptable': 'Acceptable' };

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 300 }}>
      <div className="book-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <Link href={`/books/${book.id}`}>
            <div style={{ position: 'relative', height: 180, width: '100%' }}>
              <Image 
                src={book.images[0]} 
                alt={book.title} 
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                style={{ objectFit: 'cover', transition: 'transform 0.4s' }}
                loading="lazy" 
              />
            </div>
          </Link>
          {discount > 0 && <div style={{ position: 'absolute', top: 10, left: 10 }}><span className="badge badge-success">{discount}% OFF</span></div>}
          <button style={{ position: 'absolute', top: 10, right: 10, width: 32, height: 32, borderRadius: '50%', background: 'rgba(10,15,30,0.8)', border: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--color-text-muted)' }}><Heart size={14} /></button>
        </div>
        <div style={{ padding: 14, flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: '0.7rem', fontWeight: 700, color: conditionColors[book.condition], background: `${conditionColors[book.condition]}18`, padding: '2px 8px', borderRadius: 999, border: `1px solid ${conditionColors[book.condition]}30` }}>{conditionLabels[book.condition]}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.7rem', color: 'var(--color-text-dim)' }}><Eye size={10} />{book.views}</div>
          </div>
          <Link href={`/books/${book.id}`} style={{ textDecoration: 'none' }}>
            <h3 style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--color-text)', marginBottom: 3, lineHeight: 1.3, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{book.title}</h3>
          </Link>
          <p style={{ fontSize: '0.75rem', color: 'var(--color-text-dim)', marginBottom: 8 }}>{book.author}</p>
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 10 }}>
            <span className="badge badge-cyan" style={{ fontSize: '0.65rem', padding: '1px 7px' }}>{book.level}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
            <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', color: 'white', fontWeight: 700 }}>{book.sellerName[0]}</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>
              {book.sellerName}
              <span style={{ color: 'var(--color-text-dim)', marginLeft: 6 }}><MapPin size={8} style={{ display: 'inline' }} /> {book.sellerLocation}</span>
            </div>
          </div>
          <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div className="price-tag" style={{ fontSize: '1.1rem' }}>৳{book.price}</div>
              <div className="price-original" style={{ fontSize: '0.8rem' }}>৳{book.originalPrice}</div>
            </div>
            <button onClick={() => addItem({ bookId: book.id, title: book.title, price: book.price, image: book.images[0], sellerName: book.sellerName, sellerId: book.sellerId, condition: book.condition, quantity: 1 })} className="btn btn-primary btn-sm" style={{ fontSize: '0.75rem', padding: '6px 12px' }}>Add</button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function BooksContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  const initialLevel = searchParams.get('level') || '';
  const initialSubject = searchParams.get('subject') || '';
  const initialSearch = searchParams.get('search') || '';

  const [search, setSearch] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedLevel, setSelectedLevel] = useState(initialLevel);
  const [selectedSubject, setSelectedSubject] = useState(initialSubject);
  const [selectedCondition, setSelectedCondition] = useState('');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [filterOpen, setFilterOpen] = useState(false);

  const eduKey = Object.keys(BD_EDUCATION).find(k =>
    (BD_EDUCATION as Record<string, { label: string; levels: string[]; subjects: string[] }>)[k].label.toLowerCase().includes(selectedCategory.replace(/-/g, ' ').toLowerCase())
  );
  const currentEdu = eduKey ? (BD_EDUCATION as Record<string, { label: string; levels: string[]; subjects: string[] }>)[eduKey] : null;

  const isGuideCategory = selectedCategory === 'guide';
  const availableLevels = isGuideCategory 
    ? Array.from(new Set(Object.values(BD_EDUCATION).flatMap((e: any) => e.levels)))
    : currentEdu?.levels || [];
  
  const availableSubjects = isGuideCategory
    ? Array.from(new Set(Object.values(BD_EDUCATION).flatMap((e: any) => e.subjects)))
    : currentEdu?.subjects || [];

  const { books: allBooks, loading } = useBooks();

  const filtered = useMemo(() => {
    let books = [...allBooks];
    if (search) books = books.filter(b => b.title.toLowerCase().includes(search.toLowerCase()) || b.author.toLowerCase().includes(search.toLowerCase()) || b.subject.toLowerCase().includes(search.toLowerCase()));
    if (selectedCategory) books = books.filter(b => b.category === selectedCategory);
    if (selectedLevel) books = books.filter(b => b.level?.toLowerCase().includes(selectedLevel.toLowerCase()));
    if (selectedSubject) books = books.filter(b => b.subject?.toLowerCase().includes(selectedSubject.toLowerCase()));
    if (selectedCondition) books = books.filter(b => b.condition === selectedCondition);
    if (priceMin) books = books.filter(b => b.price >= Number(priceMin));
    if (priceMax) books = books.filter(b => b.price <= Number(priceMax));
    if (sortBy === 'price-asc') books.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-desc') books.sort((a, b) => b.price - a.price);
    else if (sortBy === 'popular') books.sort((a, b) => b.views - a.views);
    else books.sort((a, b) => new Date(b.createdAt as any).getTime() - new Date(a.createdAt as any).getTime());
    return books;
  }, [allBooks, search, selectedCategory, selectedCondition, priceMin, priceMax, sortBy]);

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 100 }}>
        <div className="container" style={{ paddingBottom: 80 }}>
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 32 }}>
            <h1 className="section-title" style={{ marginBottom: 4 }}>Browse Books</h1>
            <p style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-bengali)' }}>সব ধরনের বই খুঁজুন — {filtered.length} টি বই পাওয়া গেছে</p>
          </motion.div>

          {/* Search + Sort Bar */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 200, position: 'relative' }}>
              <Search size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-dim)' }} />
              <input className="input" style={{ paddingLeft: 42 }} placeholder="Search books, subjects, authors..."
                value={search} onChange={e => setSearch(e.target.value)} id="books-search" />
            </div>
            <div style={{ width: 220 }}>
              <CustomSelect 
                value={sortBy} 
                onChange={setSortBy} 
                options={[
                  { value: 'newest', label: 'Newest First' },
                  { value: 'price-asc', label: 'Price: Low to High' },
                  { value: 'price-desc', label: 'Price: High to Low' },
                  { value: 'popular', label: 'Most Popular' },
                ]} 
                placeholder="Sort By" 
              />
            </div>
            <button className="btn btn-glass" onClick={() => setFilterOpen(!filterOpen)} style={{ gap: 8 }} id="filter-toggle">
              <SlidersHorizontal size={16} /> Filters {filterOpen ? <X size={14} /> : <ChevronDown size={14} />}
            </button>
          </div>

          {/* Filter Panel */}
          {filterOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
              className="glass" style={{ padding: 24, marginBottom: 24, borderRadius: 'var(--radius-xl)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
                {/* Category Filter */}
                <div>
                  <CustomSelect 
                    label="Category / বিভাগ"
                    value={selectedCategory} 
                    onChange={v => { setSelectedCategory(v); setSelectedLevel(''); setSelectedSubject(''); }}
                    options={BOOK_CATEGORIES.map(c => ({ value: c.id, label: c.label, bengali: c.bengali }))}
                    placeholder="All Categories"
                  />
                </div>

                {/* Education Level */}
                {(currentEdu || isGuideCategory) && (
                  <div>
                    <CustomSelect 
                      label="Level / শ্রেণী"
                      value={selectedLevel} 
                      onChange={setSelectedLevel}
                      options={availableLevels.map(l => ({ value: l, label: l }))}
                      placeholder="All Levels"
                    />
                  </div>
                )}

                {/* Subject Filter */}
                {(currentEdu || isGuideCategory) && (
                  <div>
                    <CustomSelect 
                      label="Subject / বিষয়"
                      value={selectedSubject} 
                      onChange={setSelectedSubject}
                      options={availableSubjects.map(s => ({ value: s, label: s }))}
                      placeholder="All Subjects"
                    />
                  </div>
                )}

                {/* Condition */}
                <div>
                  <CustomSelect 
                    label="Condition / অবস্থা"
                    value={selectedCondition} 
                    onChange={setSelectedCondition}
                    options={BOOK_CONDITIONS.map(c => ({ value: c.value, label: c.label }))}
                    placeholder="Any Condition"
                  />
                </div>

                {/* Price Range */}
                <div>
                  <label className="input-label">Price Range / মূল্য পরিসীমা (৳)</label>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <input className="input" placeholder="Min" type="number" value={priceMin} onChange={e => setPriceMin(e.target.value)} style={{ width: '50%' }} />
                    <input className="input" placeholder="Max" type="number" value={priceMax} onChange={e => setPriceMax(e.target.value)} style={{ width: '50%' }} />
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
                  <button className="btn btn-primary" onClick={() => { setSearch(''); setSelectedCategory(''); setSelectedLevel(''); setSelectedSubject(''); setSelectedCondition(''); setPriceMin(''); setPriceMax(''); }}>Clear All</button>
                </div>
              </div>

              {/* Active Filters */}
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 16 }}>
                {selectedCategory && (
                  <span className="badge badge-primary">
                    {BOOK_CATEGORIES.find(c => c.id === selectedCategory)?.label || selectedCategory}
                    <button onClick={() => setSelectedCategory('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', marginLeft: 6 }}>×</button>
                  </span>
                )}
                {selectedCondition && (
                  <span className="badge badge-success">
                    {BOOK_CONDITIONS.find(c => c.value === selectedCondition)?.label || selectedCondition}
                    <button onClick={() => setSelectedCondition('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', marginLeft: 6 }}>×</button>
                  </span>
                )}
                {(priceMin || priceMax) && (
                  <span className="badge badge-warning">
                    ৳{priceMin || '0'} - ৳{priceMax || '∞'} 
                    <button onClick={() => { setPriceMin(''); setPriceMax(''); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', marginLeft: 6 }}>×</button>
                  </span>
                )}
              </div>
            </motion.div>
          )}

          {/* Results Grid */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <div className="spinner" style={{ margin: '0 auto' }} />
              <p style={{ marginTop: 16, color: 'var(--color-text-dim)' }}>Loading books...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--color-text-muted)' }}>
              <p style={{ fontSize: '3rem', marginBottom: 16 }}>📚</p>
              <p style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: 8 }}>No books found</p>
              <p style={{ fontFamily: 'var(--font-bengali)' }}>কোনো বই পাওয়া যায়নি। অনুসন্ধান পরিবর্তন করুন।</p>
            </div>
          ) : (
            <div className="books-grid">
              {filtered.map((book, i) => (
                <motion.div key={book.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                  <BookCard book={book} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function BooksPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BooksContent />
    </Suspense>
  );
}
