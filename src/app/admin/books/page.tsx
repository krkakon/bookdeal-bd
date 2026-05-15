'use client';
import React from 'react';
import { MOCK_BOOKS } from '@/data/mockBooks';
import { Eye, Trash2, CheckCircle } from 'lucide-react';

export default function AdminBooksPage() {
  return (
    <div>
      <h1 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: 24 }}>Manage Books / বই পরিচালনা</h1>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
              {['Book', 'Seller', 'Price', 'Category', 'Status', 'Actions'].map(h => (
                <th key={h} style={{ padding: '12px 16px', textAlign: 'left', color: 'var(--color-text-muted)', fontWeight: 600, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MOCK_BOOKS.map(book => (
              <tr key={book.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                onMouseEnter={e => (e.currentTarget as HTMLTableRowElement).style.background = 'rgba(255,255,255,0.03)'}
                onMouseLeave={e => (e.currentTarget as HTMLTableRowElement).style.background = 'transparent'}>
                <td style={{ padding: '12px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <img src={book.images[0]} alt={book.title} style={{ width: 40, height: 34, objectFit: 'cover', borderRadius: 6, flexShrink: 0 }} />
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--color-text)', maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{book.title}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--color-text-dim)' }}>{book.level}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '12px 16px', color: 'var(--color-text-muted)' }}>{book.sellerName}</td>
                <td style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--color-primary)' }}>৳{book.price}</td>
                <td style={{ padding: '12px 16px' }}><span className="badge badge-cyan" style={{ fontSize: '0.65rem' }}>{book.category}</span></td>
                <td style={{ padding: '12px 16px' }}>
                  <span className={`badge ${book.sold ? 'badge-danger' : 'badge-success'}`}>{book.sold ? 'Sold' : 'Active'}</span>
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button className="btn btn-glass btn-sm" style={{ padding: '5px 10px' }}><Eye size={13} /></button>
                    <button className="btn btn-glass btn-sm" style={{ padding: '5px 10px', color: '#34d399' }}><CheckCircle size={13} /></button>
                    <button className="btn btn-danger btn-sm" style={{ padding: '5px 10px' }}><Trash2 size={13} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
