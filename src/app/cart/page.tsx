'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingCart, Trash2, ArrowRight, Tag, CheckCircle, CreditCard, Smartphone } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Image from 'next/image';

export default function CartPage() {
  const { items, removeItem, clearCart, totalPrice, appliedVoucher, discount, applyVoucher, removeVoucher } = useCart();
  const [voucher, setVoucher] = useState('');
  const [voucherError, setVoucherError] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('bkash');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [loading, setLoading] = useState(false);

  const discountAmount = (totalPrice * discount) / 100;
  const finalPrice = totalPrice - discountAmount;

  const handleVoucher = () => {
    if (!voucher.trim()) return;
    const ok = applyVoucher(voucher);
    if (!ok) setVoucherError('Invalid or expired voucher code');
    else setVoucherError('');
  };

  const handleOrder = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 2000));
    setOrderPlaced(true);
    clearCart();
    setLoading(false);
  };

  if (orderPlaced) return (
    <>
      <Navbar />
      <main style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '120px 24px' }}>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', maxWidth: 460 }}>
          <div style={{ fontSize: '5rem', marginBottom: 20 }}>🎉</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-success)', marginBottom: 10 }}>Order Placed!</h1>
          <p style={{ fontFamily: 'var(--font-bengali)', color: 'var(--color-text-muted)', marginBottom: 8 }}>আপনার অর্ডার সফলভাবে দেওয়া হয়েছে!</p>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: 28, fontSize: '0.9rem' }}>Track your order from your dashboard.</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <Link href="/dashboard/orders" className="btn btn-primary btn-lg">Track Order</Link>
            <Link href="/books" className="btn btn-glass btn-lg">Continue Shopping</Link>
          </div>
        </motion.div>
      </main>
      <Footer />
    </>
  );

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 100, paddingBottom: 80 }}>
        <div className="container">
          <h1 className="section-title" style={{ marginBottom: 8 }}>Shopping Cart / শপিং কার্ট</h1>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: 32 }}>{items.length} item{items.length !== 1 ? 's' : ''} in your cart</p>

          {items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 20px' }}>
              <ShoppingCart size={64} style={{ color: 'var(--color-text-dim)', marginBottom: 20 }} />
              <p style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: 8 }}>Your cart is empty</p>
              <p style={{ fontFamily: 'var(--font-bengali)', color: 'var(--color-text-muted)', marginBottom: 24 }}>আপনার কার্ট খালি। বই যোগ করুন!</p>
              <Link href="/books" className="btn btn-primary btn-lg">Browse Books</Link>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 32 }}>
              {/* Cart Items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {items.map((item, i) => (
                  <motion.div key={item.bookId} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}>
                    <div className="glass-card" style={{ padding: 0, display: 'flex', gap: 0, overflow: 'hidden' }}>
                      <div style={{ position: 'relative', width: 110, height: 100, flexShrink: 0 }}>
                        <Image src={item.image} alt={item.title} fill style={{ objectFit: 'cover' }} />
                      </div>
                      <div style={{ padding: '14px 16px', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: 4 }}>{item.title}</div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--color-text-dim)' }}>Seller: {item.sellerName} · {item.condition}</div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                          <span className="price-tag" style={{ fontSize: '1.1rem' }}>৳{item.price}</span>
                          <button onClick={() => removeItem(item.bookId)} style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 8, padding: '6px', cursor: 'pointer', color: '#f87171' }}>
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Order Summary */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, height: 'fit-content', position: 'sticky', top: 100 }}>
                <div className="glass-card" style={{ padding: 24 }}>
                  <h3 style={{ fontWeight: 700, marginBottom: 20 }}>Order Summary</h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                      <span style={{ color: 'var(--color-text-muted)' }}>Subtotal ({items.length} items)</span>
                      <span>৳{totalPrice}</span>
                    </div>
                    {discount > 0 && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                        <span style={{ color: '#34d399' }}>Voucher ({appliedVoucher})</span>
                        <span style={{ color: '#34d399' }}>-৳{discountAmount.toFixed(0)}</span>
                      </div>
                    )}
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                      <span style={{ color: 'var(--color-text-muted)' }}>Delivery</span>
                      <span style={{ color: '#34d399' }}>Free</span>
                    </div>
                    <div className="divider" style={{ margin: '8px 0' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '1.1rem' }}>
                      <span>Total</span>
                      <span className="gradient-text">৳{finalPrice.toFixed(0)}</span>
                    </div>
                  </div>

                  {/* Voucher */}
                  <div style={{ marginBottom: 20 }}>
                    <label className="input-label">Voucher Code / ভাউচার</label>
                    {appliedVoucher ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 'var(--radius)', fontSize: '0.875rem' }}>
                        <CheckCircle size={14} style={{ color: '#34d399' }} />
                        <span style={{ color: '#34d399', fontWeight: 700 }}>{appliedVoucher}</span>
                        <span style={{ color: 'var(--color-text-muted)' }}>— {discount}% off applied!</span>
                        <button onClick={removeVoucher} style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', color: '#f87171', fontSize: '1rem' }}>×</button>
                      </div>
                    ) : (
                      <>
                        <div style={{ display: 'flex', gap: 8 }}>
                          <input className="input" placeholder="e.g. BOOKDEAL10" value={voucher} onChange={e => { setVoucher(e.target.value); setVoucherError(''); }} id="voucher-input" />
                          <button className="btn btn-outline btn-sm" onClick={handleVoucher} style={{ flexShrink: 0 }}>
                            <Tag size={13} /> Apply
                          </button>
                        </div>
                        {voucherError && <p style={{ fontSize: '0.75rem', color: '#f87171', marginTop: 4 }}>{voucherError}</p>}
                        <p style={{ fontSize: '0.72rem', color: 'var(--color-text-dim)', marginTop: 4 }}>Try: BOOKDEAL10, STUDENT20, EID25</p>
                      </>
                    )}
                  </div>

                  {/* Payment Method */}
                  <div style={{ marginBottom: 20 }}>
                    <label className="input-label">Payment Method / পেমেন্ট পদ্ধতি</label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {[
                        { id: 'bkash', label: 'bKash', icon: '📱', color: '#d62b8b' },
                        { id: 'nagad', label: 'Nagad', icon: '📲', color: '#f59e0b' },
                        { id: 'card', label: 'Card (Visa/Master)', icon: '💳', color: '#0ea5e9' },
                        { id: 'cod', label: 'Cash on Delivery', icon: '💵', color: '#10b981' },
                      ].map(pm => (
                        <label key={pm.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 'var(--radius)', border: `1px solid ${paymentMethod === pm.id ? pm.color : 'var(--glass-border)'}`, background: paymentMethod === pm.id ? `${pm.color}12` : 'transparent', cursor: 'pointer' }}>
                          <input type="radio" name="payment" value={pm.id} checked={paymentMethod === pm.id} onChange={() => setPaymentMethod(pm.id)} style={{ accentColor: pm.color }} />
                          <span style={{ fontSize: '1rem' }}>{pm.icon}</span>
                          <span style={{ fontWeight: paymentMethod === pm.id ? 700 : 400, fontSize: '0.875rem', color: paymentMethod === pm.id ? pm.color : 'var(--color-text-muted)' }}>{pm.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <button onClick={handleOrder} className="btn btn-primary btn-lg" style={{ width: '100%', gap: 10 }} disabled={loading} id="place-order">
                    {loading ? <><div className="spinner" style={{ width: 20, height: 20, borderWidth: 2 }} /> Placing order...</> : <>Place Order <ArrowRight size={18} /></>}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <style jsx>{`@media (max-width: 900px) { div[style*="grid-template-columns: 1fr 380px"] { grid-template-columns: 1fr !important; } }`}</style>
    </>
  );
}
