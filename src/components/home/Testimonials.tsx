'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'Tanvir Ahmed', role: 'HSC Student, Dhaka', rating: 5,
    text: 'I sold my SSC books and earned ৳2,400 within a week! The platform is so easy to use. Highly recommended for all students.',
    textBn: 'আমি এক সপ্তাহের মধ্যে আমার SSC বই বিক্রি করে ৳২,৪০০ পেলাম! খুবই সহজ প্ল্যাটফর্ম।',
    avatar: 'T',
  },
  {
    name: 'Fatema Khanam', role: 'SSC Student, Chittagong', rating: 5,
    text: 'Found all my HSC books here at 50% less than original price. The seller was super helpful and delivery was fast!',
    textBn: 'এখানে মূল দামের ৫০% কমে আমার HSC বই পেলাম। বিক্রেতা অনেক সহায়ক ছিলেন।',
    avatar: 'F',
  },
  {
    name: 'Rakib Hasan', role: 'University Student, Rajshahi', rating: 5,
    text: 'BookDeal BD saved me thousands of taka on university books. The chat feature helped me negotiate the price directly.',
    textBn: 'BookDeal BD-তে বিশ্ববিদ্যালয়ের বই কিনে হাজার টাকা বাঁচালাম। চ্যাট ফিচার দারুণ কাজে লাগলো।',
    avatar: 'R',
  },
  {
    name: 'Sumaiya Islam', role: 'BUET Student, Dhaka', rating: 5,
    text: 'The BUET admission prep books were exactly what I needed. Great condition, great price. Will definitely use again.',
    textBn: 'BUET ভর্তি প্রস্তুতির বই হুবহু যা দরকার ছিল তাই পেলাম। দারুণ অবস্থায় ছিল।',
    avatar: 'S',
  },
];

const AVATARS = ['#0ea5e9', '#6366f1', '#22d3ee', '#10b981'];

export default function Testimonials() {
  return (
    <section className="section" style={{ background: 'rgba(255,255,255,0.02)' }}>
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 className="section-title">What Students Say</h2>
          <p style={{ fontFamily: 'var(--font-bengali)', color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>শিক্ষার্থীরা কি বলছেন</p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
          {TESTIMONIALS.map((t, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4 }}>
              <div className="glass-card" style={{ padding: 28, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Quote size={24} style={{ color: AVATARS[i], opacity: 0.5, marginBottom: 16 }} />
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.7, flex: 1, marginBottom: 12 }}>{t.text}</p>
                <p style={{ fontSize: '0.78rem', color: 'var(--color-text-dim)', fontFamily: 'var(--font-bengali)', lineHeight: 1.6, marginBottom: 20 }}>{t.textBn}</p>
                <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: `linear-gradient(135deg, ${AVATARS[i]}, ${AVATARS[(i + 1) % 4]})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700 }}>
                      {t.avatar}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--color-text)' }}>{t.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-dim)' }}>{t.role}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', color: '#fbbf24', gap: 2 }}>
                    {Array(t.rating).fill(0).map((_, j) => <Star key={j} size={13} fill="#fbbf24" />)}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
