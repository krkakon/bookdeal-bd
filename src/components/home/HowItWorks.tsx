'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, BookOpen, ShoppingBag, CheckCircle, ArrowRight } from 'lucide-react';

const STEPS = [
  {
    icon: <UserPlus size={28} />, step: '01',
    title: 'Create Account', titleBn: 'অ্যাকাউন্ট তৈরি করুন',
    desc: 'Register for free in seconds. You start as a buyer automatically.',
    descBn: 'বিনামূল্যে রেজিস্ট্রেশন করুন। আপনি স্বয়ংক্রিয়ভাবে ক্রেতা হবেন।',
    color: '#0ea5e9',
  },
  {
    icon: <BookOpen size={28} />, step: '02',
    title: 'List Your Books', titleBn: 'আপনার বই তালিকাভুক্ত করুন',
    desc: 'Enable selling from your profile and list books with photos & price.',
    descBn: 'প্রোফাইল থেকে বিক্রয় চালু করুন এবং ছবি ও দাম সহ বই তালিকাভুক্ত করুন।',
    color: '#6366f1',
  },
  {
    icon: <ShoppingBag size={28} />, step: '03',
    title: 'Buy & Sell', titleBn: 'কিনুন এবং বেচুন',
    desc: 'Browse thousands of books. Chat with sellers. Place orders.',
    descBn: 'হাজার হাজার বই দেখুন। বিক্রেতার সাথে চ্যাট করুন। অর্ডার দিন।',
    color: '#22d3ee',
  },
  {
    icon: <CheckCircle size={28} />, step: '04',
    title: 'Track & Receive', titleBn: 'ট্র্যাক করুন এবং পান',
    desc: 'Track your order in real time. Receive books and save money!',
    descBn: 'রিয়েল-টাইমে অর্ডার ট্র্যাক করুন। বই পান এবং টাকা সাশ্রয় করুন!',
    color: '#10b981',
  },
];

export default function HowItWorks() {
  return (
    <section className="section">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: 60 }}>
          <h2 className="section-title">How It Works</h2>
          <p style={{ fontFamily: 'Hind Siliguri', color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>এটি কীভাবে কাজ করে</p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24, position: 'relative' }}>
          {STEPS.map((step, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.12 }}
              style={{ position: 'relative' }}>
              <div className="glass-card" style={{ padding: 28, height: '100%' }}>
                {/* Step number */}
                <div style={{ position: 'absolute', top: -14, right: 20, fontSize: '3rem', fontWeight: 900, color: `${step.color}18`, lineHeight: 1 }}>{step.step}</div>
                {/* Icon */}
                <div style={{ width: 60, height: 60, borderRadius: 16, background: `${step.color}18`, border: `1px solid ${step.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: step.color, marginBottom: 20, boxShadow: `0 8px 20px ${step.color}20` }}>
                  {step.icon}
                </div>
                <h3 style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--color-text)', marginBottom: 6 }}>{step.title}</h3>
                <p style={{ fontFamily: 'Hind Siliguri', fontSize: '0.82rem', color: step.color, marginBottom: 10 }}>{step.titleBn}</p>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: 8 }}>{step.desc}</p>
                <p style={{ fontSize: '0.78rem', color: 'var(--color-text-dim)', fontFamily: 'Hind Siliguri', lineHeight: 1.6 }}>{step.descBn}</p>
              </div>
              {/* Arrow connector */}
              {i < STEPS.length - 1 && (
                <div style={{ position: 'absolute', right: -16, top: '50%', transform: 'translateY(-50%)', zIndex: 10, color: 'var(--color-primary)', display: 'flex' }} className="hidden-mobile">
                  <ArrowRight size={20} />
                </div>
              )}
            </motion.div>
          ))}
        </div>
        <style jsx>{`@media (max-width: 900px) { .hidden-mobile { display: none !important; } }`}</style>
      </div>
    </section>
  );
}
