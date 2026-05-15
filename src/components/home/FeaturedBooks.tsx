'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, MapPin, Star, Eye } from 'lucide-react';
import { MOCK_BOOKS, Book } from '@/data/mockBooks';
import { useCart } from '@/context/CartContext';

function BookCard({ book }: { book: Book }) {
  const { addItem } = useCart();
  const discount = Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100);

  const conditionColors: Record<string, string> = {
    'like-new': '#34d399', 'very-good': '#60a5fa', 'good': '#fbbf24', 'acceptable': '#f87171',
  };
  const conditionLabels: Record<string, string> = {
    'like-new': 'Like New', 'very-good': 'Very Good', 'good': 'Good', 'acceptable': 'Acceptable',
  };

  return (
    <motion.div whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 300 }}>
      <div className="book-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Image */}
        <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0' }}>
          <Link href={`/books/${book.id}`}>
            <img src={book.images[0]} alt={book.title} className="book-card-img" loading="lazy"
              style={{ height: 190, objectFit: 'cover', width: '100%' }} />
          </Link>
          {/* Discount badge */}
          {discount > 0 && (
            <div style={{ position: 'absolute', top: 10, left: 10 }}>
              <span className="badge badge-success">{discount}% OFF</span>
            </div>
          )}
          {/* Wishlist */}
          <button style={{ position: 'absolute', top: 10, right: 10, width: 34, height: 34, borderRadius: '50%', background: 'rgba(10,15,30,0.7)', border: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--color-text-muted)' }}>
            <Heart size={15} />
          </button>
          {book.featured && (
            <div style={{ position: 'absolute', bottom: 10, left: 10 }}>
              <span className="badge badge-primary">⭐ Featured</span>
            </div>
          )}
        </div>

        {/* Body */}
        <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', flex: 1 }}>
          {/* Condition */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: conditionColors[book.condition], background: `${conditionColors[book.condition]}18`, padding: '2px 8px', borderRadius: 999, border: `1px solid ${conditionColors[book.condition]}30` }}>
              {conditionLabels[book.condition]}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.72rem', color: 'var(--color-text-dim)' }}>
              <Eye size={11} /> {book.views}
            </div>
          </div>

          {/* Title */}
          <Link href={`/books/${book.id}`} style={{ textDecoration: 'none' }}>
            <h3 style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-text)', marginBottom: 4, lineHeight: 1.35, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {book.title}
            </h3>
          </Link>
          <p style={{ fontSize: '0.78rem', color: 'var(--color-text-dim)', marginBottom: 10 }}>{book.author}</p>

          {/* Subject/Level */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
            <span className="badge badge-cyan" style={{ fontSize: '0.68rem', padding: '2px 8px' }}>{book.level}</span>
            <span className="badge badge-purple" style={{ fontSize: '0.68rem', padding: '2px 8px' }}>{book.subject.length > 16 ? book.subject.slice(0, 16) + '…' : book.subject}</span>
          </div>

          {/* Seller */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
            <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', color: 'white', fontWeight: 700 }}>
              {book.sellerName[0]}
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{book.sellerName}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 2, fontSize: '0.65rem', color: '#fbbf24' }}>
                <Star size={9} fill="#fbbf24" /> {book.sellerRating}
                <span style={{ color: 'var(--color-text-dim)', marginLeft: 4 }}>
                  <MapPin size={9} style={{ display: 'inline' }} /> {book.sellerLocation}
                </span>
              </div>
            </div>
          </div>

          {/* Price + CTA */}
          <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div className="price-tag">৳{book.price}</div>
              <div className="price-original">৳{book.originalPrice}</div>
            </div>
            <button
              onClick={() => addItem({ bookId: book.id, title: book.title, price: book.price, image: book.images[0], sellerName: book.sellerName, sellerId: book.sellerId, condition: book.condition, quantity: 1 })}
              className="btn btn-primary btn-sm">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function FeaturedBooks() {
  const featured = MOCK_BOOKS.filter(b => b.featured).slice(0, 8);

  return (
    <section className="section" style={{ background: 'rgba(255,255,255,0.02)' }}>
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 40, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h2 className="section-title">Featured Books</h2>
            <p className="section-subtitle" style={{ fontFamily: 'Hind Siliguri' }}>বিশেষ বাছাই করা বই — সেরা দামে</p>
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
