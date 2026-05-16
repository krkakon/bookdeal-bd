'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, MessageCircle, Star, MapPin, Eye, ChevronRight, CheckCircle, Shield, Truck, RefreshCw } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Book } from '@/data/mockBooks';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import Image from 'next/image';

export default function BookDetailPage() {
  const params = useParams();
  const [book, setBook] = React.useState<Book | null>(null);
  const [loading, setLoading] = React.useState(true);
  const { addItem, items } = useCart();
  const { user } = useAuth();
  const [activeImg, setActiveImg] = useState(0);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMsg, setChatMsg] = useState('');
  const [messages, setMessages] = useState<{from: string, text: string, time: string}[]>([]);

  React.useEffect(() => {
    async function fetchBook() {
      if (!params.id) return;
      setLoading(true);
      try {
        const docRef = doc(db, 'books', params.id as string);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = { id: docSnap.id, ...docSnap.data() } as Book;
          setBook(data);
          setMessages([
            { from: 'seller', text: `Hi! I'm selling "${data.title}". Feel free to ask any questions!`, time: 'Now' },
          ]);
        }
      } catch (err) {
        console.error('Error fetching book:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchBook();
  }, [params.id]);

  if (loading) return (
    <><Navbar /><div style={{ textAlign: 'center', padding: '180px 24px' }}><div className="spinner" style={{ margin: '0 auto' }} /></div><Footer /></>
  );

  if (!book) return (
    <><Navbar /><div style={{ textAlign: 'center', padding: '180px 24px', color: 'var(--color-text-muted)' }}><p style={{ fontSize: '3rem' }}>📚</p><p>Book not found</p><Link href="/books" className="btn btn-primary" style={{ marginTop: 16, display: 'inline-flex' }}>Browse Books</Link></div><Footer /></>
  );

  const discount = Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100);
  const inCart = items.some(i => i.bookId === book.id);

  const conditionColors: Record<string, string> = { 'like-new': '#34d399', 'very-good': '#60a5fa', 'good': '#fbbf24', 'acceptable': '#f87171' };
  const conditionLabels: Record<string, string> = { 'like-new': 'Like New / একদম নতুন', 'very-good': 'Very Good / খুব ভালো', 'good': 'Good / ভালো', 'acceptable': 'Acceptable / গ্রহণযোগ্য' };

  const sendMsg = () => {
    if (!chatMsg.trim()) return;
    setMessages(prev => [...prev, { from: 'buyer', text: chatMsg, time: 'Just now' }]);
    setChatMsg('');
    setTimeout(() => setMessages(prev => [...prev, { from: 'seller', text: 'Thanks for your interest! I\'ll get back to you shortly. / ধন্যবাদ! আমি শীঘ্রই উত্তর দেব।', time: 'Just now' }]), 1200);
  };

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 100, paddingBottom: 80 }}>
        <div className="container">
          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.825rem', color: 'var(--color-text-dim)', marginBottom: 24 }}>
            <Link href="/" style={{ textDecoration: 'none', color: 'var(--color-text-dim)' }}>Home</Link>
            <ChevronRight size={14} />
            <Link href="/books" style={{ textDecoration: 'none', color: 'var(--color-text-dim)' }}>Books</Link>
            <ChevronRight size={14} />
            <span style={{ color: 'var(--color-text-muted)' }}>{book.title}</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
            {/* Left: Images */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <div className="glass-card" style={{ padding: 16, marginBottom: 12, position: 'relative', height: 400 }}>
                <Image 
                  src={book.images[activeImg]} 
                  alt={book.title} 
                  fill
                  style={{ borderRadius: 'var(--radius-lg)', objectFit: 'cover', padding: 16 }}
                  priority
                />
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                {book.images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImg(i)} style={{ position: 'relative', width: 72, height: 60, borderRadius: 'var(--radius-sm)', overflow: 'hidden', border: `2px solid ${i === activeImg ? 'var(--color-primary)' : 'var(--glass-border)'}`, cursor: 'pointer' }}>
                    <Image src={img} alt="" fill style={{ objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Right: Details */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div>
                <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
                  <span className="badge badge-cyan">{book.level}</span>
                  <span className="badge badge-purple">{book.category.toUpperCase()}</span>
                  {book.featured && <span className="badge badge-primary">⭐ Featured</span>}
                </div>
                <h1 style={{ fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', fontWeight: 800, color: 'var(--color-text)', marginBottom: 6, lineHeight: 1.3 }}>{book.title}</h1>
                <p style={{ color: 'var(--color-text-muted)', marginBottom: 4 }}>by <strong>{book.author}</strong></p>
                {book.publisher && <p style={{ fontSize: '0.85rem', color: 'var(--color-text-dim)' }}>{book.publisher} · {book.edition}</p>}
              </div>

              {/* Condition */}
              <div className="glass" style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: conditionColors[book.condition] }} />
                <span style={{ fontWeight: 600, fontSize: '0.9rem', color: conditionColors[book.condition] }}>{conditionLabels[book.condition]}</span>
              </div>

              {/* Price */}
              <div className="glass" style={{ padding: '20px 24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <span style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--color-primary)' }}>৳{book.price}</span>
                  <div>
                    <div className="price-original" style={{ fontSize: '1rem' }}>৳{book.originalPrice}</div>
                    {discount > 0 && <div className="price-discount">{discount}% SAVED</div>}
                  </div>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-dim)', marginTop: 6, fontFamily: 'Hind Siliguri' }}>আপনি ৳{book.originalPrice - book.price} সাশ্রয় করছেন!</p>
              </div>

              {/* CTAs */}
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <button onClick={() => addItem({ bookId: book.id, title: book.title, price: book.price, image: book.images[0], sellerName: book.sellerName, sellerId: book.sellerId, condition: book.condition, quantity: 1 })} className="btn btn-primary btn-lg" style={{ flex: 1, gap: 8 }} disabled={inCart} id="add-to-cart">
                  <ShoppingCart size={18} /> {inCart ? '✓ In Cart' : 'Add to Cart'}
                </button>
                <Link href="/cart" className="btn btn-secondary btn-lg" style={{ flex: 1, gap: 8 }}>
                  Buy Now / এখনই কিনুন
                </Link>
                <button className="btn btn-glass" style={{ padding: '14px' }}><Heart size={18} /></button>
              </div>

              {/* Trust badges */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                {[
                  { icon: <Shield size={16} />, text: 'Safe Purchase' },
                  { icon: <Truck size={16} />, text: 'Fast Delivery' },
                  { icon: <RefreshCw size={16} />, text: 'Return Policy' },
                ].map((t, i) => (
                  <div key={i} className="glass" style={{ padding: '10px 8px', textAlign: 'center', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                    <div style={{ color: 'var(--color-primary)', display: 'flex', justifyContent: 'center', marginBottom: 4 }}>{t.icon}</div>
                    {t.text}
                  </div>
                ))}
              </div>

              {/* Description */}
              <div className="glass" style={{ padding: 20 }}>
                <h3 style={{ fontWeight: 700, marginBottom: 10, fontSize: '0.95rem' }}>Description</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.7 }}>{book.description}</p>
              </div>

              {/* Seller Card */}
              <div className="glass-card" style={{ padding: 20 }}>
                <h3 style={{ fontWeight: 700, marginBottom: 14, fontSize: '0.95rem' }}>Seller Information / বিক্রেতার তথ্য</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
                  <div style={{ width: 50, height: 50, borderRadius: '50%', background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', color: 'white', fontWeight: 700 }}>
                    {book.sellerName[0]}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--color-text)' }}>{book.sellerName}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8rem' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 3, color: '#fbbf24' }}><Star size={12} fill="#fbbf24" />{book.sellerRating}</span>
                      <span style={{ color: 'var(--color-text-dim)' }}>· <MapPin size={10} style={{ display: 'inline' }} /> {book.sellerLocation}</span>
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--color-success)', display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                      <CheckCircle size={11} /> Verified Seller
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.75rem', color: 'var(--color-text-dim)', marginBottom: 14 }}>
                  <Eye size={13} /> {book.views} views
                  <span>·</span>
                  <Heart size={13} /> {book.wishlistCount} wishlisted
                </div>
                <button onClick={() => { if (!user) window.location.href = '/auth/login'; else setChatOpen(!chatOpen); }} className="btn btn-glass" style={{ width: '100%', gap: 8 }} id="chat-seller-btn">
                  <MessageCircle size={16} /> Chat with Seller / বিক্রেতার সাথে চ্যাট করুন
                </button>
              </div>
            </motion.div>
          </div>

          {/* Chat Panel */}
          {chatOpen && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card" style={{ marginTop: 24, padding: 0, overflow: 'hidden', maxWidth: 540 }}>
              <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700 }}>{book.sellerName[0]}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{book.sellerName}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--color-success)' }}>● Online</div>
                </div>
              </div>
              <div style={{ height: 240, overflowY: 'auto', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                {messages.map((m, i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: m.from === 'buyer' ? 'flex-end' : 'flex-start' }}>
                    <div className={m.from === 'buyer' ? 'chat-bubble chat-bubble-sent' : 'chat-bubble chat-bubble-received'}>{m.text}</div>
                    <span style={{ fontSize: '0.65rem', color: 'var(--color-text-dim)', marginTop: 3 }}>{m.time}</span>
                  </div>
                ))}
              </div>
              <div style={{ padding: '12px 20px', borderTop: '1px solid var(--glass-border)', display: 'flex', gap: 8 }}>
                <input className="input" placeholder="Type a message... / বার্তা লিখুন" value={chatMsg} onChange={e => setChatMsg(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMsg()} style={{ flex: 1 }} id="chat-input" />
                <button className="btn btn-primary btn-sm" onClick={sendMsg}>Send</button>
              </div>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />

      <style jsx>{`@media (max-width: 768px) { div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; } }`}</style>
    </>
  );
}
