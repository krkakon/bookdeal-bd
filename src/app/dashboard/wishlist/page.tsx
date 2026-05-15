'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, BookOpen, Trash2 } from 'lucide-react';
import { MOCK_BOOKS } from '@/data/mockBooks';

export default function WishlistPage() {
  const wishlist = MOCK_BOOKS.slice(0, 4);
  return (
    <div>
      <h1 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: 4 }}>Wishlist / উইশলিস্ট</h1>
      <p style={{ color: 'var(--color-text-muted)', fontFamily: 'Hind Siliguri', marginBottom: 24 }}>আপনার পছন্দের বই — {wishlist.length} টি বই</p>
      {wishlist.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <Heart size={48} style={{ color: 'var(--color-text-dim)', marginBottom: 16 }} />
          <p>Your wishlist is empty. <Link href="/books" style={{ color: 'var(--color-primary)' }}>Browse books →</Link></p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {wishlist.map((book, i) => (
            <motion.div key={book.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
              <div className="glass-card" style={{ padding: 0, display: 'flex', overflow: 'hidden' }}>
                <img src={book.images[0]} alt={book.title} style={{ width: 90, height: 80, objectFit: 'cover', flexShrink: 0 }} />
                <div style={{ padding: '14px 16px', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: 2 }}>{book.title}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-dim)' }}>{book.author} · {book.level}</div>
                    <div className="price-tag" style={{ fontSize: '1rem', marginTop: 4 }}>৳{book.price}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <Link href={`/books/${book.id}`} className="btn btn-primary btn-sm">
                      <BookOpen size={14} /> View
                    </Link>
                    <button className="btn btn-glass btn-sm" style={{ color: '#f87171' }}><Trash2 size={14} /></button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
