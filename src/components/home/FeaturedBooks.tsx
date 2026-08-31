'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Heart, MapPin, Star, Eye } from 'lucide-react';
import { Book } from '@/data/mockBooks';
import { useCart } from '@/context/CartContext';
import { useBooks } from '@/lib/hooks/useBooks';

import BookCard from '@/components/ui/BookCard';

export default function FeaturedBooks() {
  const { books: featured, loading } = useBooks({ featured: true, limitCount: 8 });

  if (loading) {
    return (
      <section className="section" style={{ background: 'rgba(255,255,255,0.02)' }}>
        <div className="container" style={{ textAlign: 'center', padding: '40px 0' }}>
          <div className="spinner" style={{ margin: '0 auto' }} />
        </div>
      </section>
    );
  }

  if (featured.length === 0) return null;

  return (
    <section className="section" style={{ background: 'rgba(255,255,255,0.02)' }}>
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 40, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h2 className="section-title">Featured Books</h2>
            <p className="section-subtitle" style={{ fontFamily: 'var(--font-bengali)' }}>বিশেষ বাছাই করা বই — সেরা দামে</p>
          </div>
          <Link href="/books" className="btn btn-outline">View All Books →</Link>
        </motion.div>

        <div className="books-grid">
          {featured.map((book, i) => (
            <motion.div key={book.id}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
              <BookCard book={book} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export { BookCard };
