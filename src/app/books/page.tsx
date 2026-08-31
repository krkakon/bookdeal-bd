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

import BookCard from '@/components/ui/BookCard';

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
