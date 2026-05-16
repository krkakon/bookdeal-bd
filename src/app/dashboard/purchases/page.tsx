'use client';
import React from 'react';
import { MOCK_BOOKS } from '@/data/mockBooks';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import Image from 'next/image';

export default function PurchasesPage() {
  const purchases = MOCK_BOOKS.slice(0, 3);
  return (
    <div>
      <h1 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: 4 }}>My Purchases / আমার ক্রয়</h1>
      <p style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-bengali)', marginBottom: 24 }}>আপনার কেনা সব বইয়ের তালিকা</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {purchases.map((book) => (
          <div key={book.id} className="glass-card" style={{ padding: 0, display: 'flex', overflow: 'hidden' }}>
            <div style={{ position: 'relative', width: 90, height: 80, flexShrink: 0 }}>
              <Image src={book.images[0]} alt={book.title} fill style={{ objectFit: 'cover' }} />
            </div>
            <div style={{ padding: '14px 16px', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: 2 }}>{book.title}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-dim)' }}>Seller: {book.sellerName} · {book.level}</div>
                <div className="price-tag" style={{ fontSize: '1rem', marginTop: 4 }}>৳{book.price}</div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <span className="badge badge-success">✓ Delivered</span>
                <Link href={`/books/${book.id}`} className="btn btn-glass btn-sm"><BookOpen size={13} /> Review</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
