'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface CartItem {
  bookId: string;
  title: string;
  price: number;
  image: string;
  sellerName: string;
  sellerId: string;
  condition: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (bookId: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  appliedVoucher: string | null;
  discount: number;
  applyVoucher: (code: string) => boolean;
  removeVoucher: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const VOUCHERS: Record<string, number> = {
  'BOOKDEAL10': 10,
  'STUDENT20': 20,
  'FIRSTBUY15': 15,
  'EID25': 25,
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [appliedVoucher, setAppliedVoucher] = useState<string | null>(null);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem('bookdeal_cart');
    if (stored) { try { setItems(JSON.parse(stored)); } catch { /* ignore */ } }
  }, []);

  const save = (newItems: CartItem[]) => {
    setItems(newItems);
    localStorage.setItem('bookdeal_cart', JSON.stringify(newItems));
  };

  const addItem = (item: CartItem) => {
    const existing = items.find(i => i.bookId === item.bookId);
    if (existing) return;
    save([...items, item]);
  };

  const removeItem = (bookId: string) => save(items.filter(i => i.bookId !== bookId));
  const clearCart = () => { save([]); setAppliedVoucher(null); setDiscount(0); };

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const applyVoucher = (code: string): boolean => {
    const pct = VOUCHERS[code.toUpperCase()];
    if (pct) {
      setAppliedVoucher(code.toUpperCase());
      setDiscount(pct);
      return true;
    }
    return false;
  };

  const removeVoucher = () => { setAppliedVoucher(null); setDiscount(0); };

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart, totalItems, totalPrice, appliedVoucher, discount, applyVoucher, removeVoucher }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
