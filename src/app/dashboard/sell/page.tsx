'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, BookOpen, Camera, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { storage, db } from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { BD_EDUCATION, BOOK_CATEGORIES, BOOK_CONDITIONS } from '@/lib/constants';
import Image from 'next/image';

import { CustomSelect } from '@/components/ui/CustomSelect';

export default function SellPage() {
  const { userProfile, enableSelling } = useAuth();
  const [form, setForm] = useState({
    title: '', author: '', category: '', level: '', subject: '',
    publisher: '', edition: '', condition: '', price: '', description: '',
    imageUrl: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const eduKey = Object.keys(BD_EDUCATION).find(k =>
    BOOK_CATEGORIES.find(c => c.id === form.category)?.label.toLowerCase().includes(
      (BD_EDUCATION as Record<string, { label: string; levels: string[]; subjects: string[] }>)[k].label.split(' ')[0].toLowerCase()
    )
  );
  const currentEdu = eduKey ? (BD_EDUCATION as Record<string, { label: string; levels: string[]; subjects: string[] }>)[eduKey] : null;

  const isGuideCategory = form.category === 'guide';
  const availableLevels = isGuideCategory 
    ? Array.from(new Set(Object.values(BD_EDUCATION).flatMap((e: any) => e.levels)))
    : currentEdu?.levels || [];
  
  const availableSubjects = isGuideCategory
    ? Array.from(new Set(Object.values(BD_EDUCATION).flatMap((e: any) => e.subjects)))
    : currentEdu?.subjects || [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.imageUrl) {
      alert('Please upload at least one photo of the book.');
      return;
    }

    setLoading(true);
    try {
      const bookData = {
        ...form,
        price: Number(form.price),
        sellerId: userProfile?.uid,
        sellerName: userProfile?.displayName,
        sellerLocation: userProfile?.division || 'Dhaka',
        sellerRating: userProfile?.rating || 5,
        createdAt: serverTimestamp(),
        views: 0,
        wishlistCount: 0,
        sold: false,
        featured: false,
        images: [form.imageUrl], // For now support one image
      };

      await addDoc(collection(db, 'books'), bookData);
      setSubmitted(true);
    } catch (error) {
      console.error('Error listing book:', error);
      alert('Failed to list book. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !userProfile) return;

    // Validation
    if (file.size > 5 * 1024 * 1024) {
      alert('File size too large. Maximum 5MB allowed.');
      return;
    }

    setUploadingImage(true);
    try {
      const storageRef = ref(storage, `books/${userProfile.uid}/${Date.now()}-${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      setForm(prev => ({ ...prev, imageUrl: downloadURL }));
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  if (!userProfile?.isSeller) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <div style={{ fontSize: '4rem', marginBottom: 20 }}>🛒</div>
        <h2 style={{ fontWeight: 800, fontSize: '1.4rem', marginBottom: 10 }}>Enable Selling First</h2>
        <p style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-bengali)', marginBottom: 24 }}>
          বিক্রয় শুরু করতে প্রথমে বিক্রেতা মোড চালু করুন
        </p>
        <button onClick={enableSelling} className="btn btn-primary btn-lg" id="enable-selling-2">Enable Selling Mode</button>
      </div>
    );
  }

  if (submitted) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '60px 20px' }}>
        <div style={{ fontSize: '4rem', marginBottom: 20 }}>🎉</div>
        <h2 style={{ fontWeight: 800, fontSize: '1.4rem', color: 'var(--color-success)', marginBottom: 10 }}>Book Listed Successfully!</h2>
        <p style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-bengali)', marginBottom: 24 }}>
          আপনার বই সফলভাবে তালিকাভুক্ত হয়েছে! শিক্ষার্থীরা এখন এটি দেখতে পাবেন।
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <button onClick={() => setSubmitted(false)} className="btn btn-primary">List Another Book</button>
          <a href="/books" className="btn btn-glass">View My Listings</a>
        </div>
      </motion.div>
    );
  }

  return (
    <div style={{ maxWidth: 700 }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: 4 }}>List a Book for Sale / বই বিক্রির তালিকা</h1>
        <p style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-bengali)' }}>আপনার পুরনো বই বিক্রির জন্য তালিকাভুক্ত করুন</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="glass-card" style={{ padding: 28, marginBottom: 20 }}>
          <h3 style={{ fontWeight: 700, marginBottom: 20, color: 'var(--color-primary)', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Book Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div style={{ gridColumn: '1 / -1' }}>
              <label className="input-label">Book Title / বইয়ের নাম *</label>
              <input className="input" required placeholder="e.g. Physics 1st Paper" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} id="sell-title" />
            </div>
            <div>
              <label className="input-label">Author / লেখক *</label>
              <input className="input" required placeholder="Author name" value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} id="sell-author" />
            </div>
            <div>
              <label className="input-label">Publisher / প্রকাশক</label>
              <input className="input" placeholder="e.g. Panjeree" value={form.publisher} onChange={e => setForm({ ...form, publisher: e.target.value })} />
            </div>
            <div>
              <CustomSelect 
                label="Category / বিভাগ"
                required
                value={form.category}
                onChange={v => setForm({ ...form, category: v, level: '', subject: '' })}
                options={BOOK_CATEGORIES.map(c => ({ value: c.id, label: c.label, bengali: c.bengali }))}
                placeholder="Select Category"
              />
            </div>
            <div>
              <label className="input-label">Edition / সংস্করণ</label>
              <input className="input" placeholder="e.g. 2024" value={form.edition} onChange={e => setForm({ ...form, edition: e.target.value })} />
            </div>
            {(currentEdu || isGuideCategory) && (
              <>
                <div>
                  <CustomSelect 
                    label="Level / শ্রেণী"
                    required
                    value={form.level}
                    onChange={v => setForm({ ...form, level: v })}
                    options={availableLevels.map(l => ({ value: l, label: l }))}
                    placeholder="Select Level"
                  />
                </div>
                <div>
                  <CustomSelect 
                    label="Subject / বিষয়"
                    required
                    value={form.subject}
                    onChange={v => setForm({ ...form, subject: v })}
                    options={availableSubjects.map(s => ({ value: s, label: s }))}
                    placeholder="Select Subject"
                  />
                </div>
              </>
            )}
          </div>
        </div>

        <div className="glass-card" style={{ padding: 28, marginBottom: 20 }}>
          <h3 style={{ fontWeight: 700, marginBottom: 20, color: 'var(--color-primary)', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Condition & Price</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <CustomSelect 
                label="Book Condition / অবস্থা"
                required
                value={form.condition}
                onChange={v => setForm({ ...form, condition: v })}
                options={BOOK_CONDITIONS.map(c => ({ value: c.value, label: c.label }))}
                placeholder="Select Condition"
              />
            </div>
            <div>
              <label className="input-label">Selling Price / বিক্রয় মূল্য (৳) *</label>
              <input className="input" type="number" required placeholder="Enter price in BDT" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} id="sell-price" min="1" />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label className="input-label">Description / বিবরণ</label>
              <textarea className="input" rows={3} placeholder="Describe the book's condition, any marks, missing pages, etc..." value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} style={{ resize: 'vertical' }} />
            </div>
          </div>
        </div>

        {/* Photo Upload */}
        <div className="glass-card" style={{ padding: 28, marginBottom: 24 }}>
          <h3 style={{ fontWeight: 700, marginBottom: 20, color: 'var(--color-primary)', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Book Photos / ছবি</h3>
          
          <input 
            type="file" 
            accept="image/jpeg, image/png" 
            style={{ display: 'none' }} 
            ref={fileInputRef}
            onChange={handleImageUpload}
          />

          {form.imageUrl ? (
            <div style={{ position: 'relative', width: '100%', maxWidth: 300, margin: '0 auto', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--glass-border)' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
            <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', overflow: 'hidden', borderRadius: 'var(--radius-lg)' }}>
              <Image src={form.imageUrl} alt="Book Preview" fill style={{ objectFit: 'cover' }} />
            </div>
              <button 
                type="button"
                onClick={() => setForm({ ...form, imageUrl: '' })}
                style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(0,0,0,0.6)', color: 'white', border: 'none', borderRadius: '50%', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <div 
              style={{ border: '2px dashed var(--glass-border)', borderRadius: 'var(--radius-lg)', padding: '40px 20px', textAlign: 'center', cursor: uploadingImage ? 'wait' : 'pointer', opacity: uploadingImage ? 0.6 : 1 }}
              onClick={() => !uploadingImage && fileInputRef.current?.click()}
              onMouseEnter={e => !uploadingImage && ((e.currentTarget as HTMLDivElement).style.borderColor = 'var(--color-primary)')}
              onMouseLeave={e => !uploadingImage && ((e.currentTarget as HTMLDivElement).style.borderColor = 'var(--glass-border)')}
            >
              <Camera size={32} style={{ color: 'var(--color-primary)', marginBottom: 12 }} />
              <p style={{ fontWeight: 600, marginBottom: 4 }}>{uploadingImage ? 'Uploading...' : 'Click to upload photos'}</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-dim)', fontFamily: 'var(--font-bengali)' }}>ছবি আপলোড করুন (JPG, PNG — max 5MB)</p>
              <button type="button" className="btn btn-glass btn-sm" style={{ marginTop: 12, gap: 8 }} disabled={uploadingImage}>
                {uploadingImage ? <div className="spinner" style={{ width: 14, height: 14 }} /> : <Upload size={14} />} 
                {uploadingImage ? 'Uploading' : 'Choose Photos'}
              </button>
            </div>
          )}
        </div>

        <button type="submit" className="btn btn-primary btn-xl" style={{ width: '100%', gap: 10 }} disabled={loading} id="sell-submit">
          {loading ? <><div className="spinner" style={{ width: 20, height: 20, borderWidth: 2 }} /> Listing book...</> : <><BookOpen size={20} /> List Book for Sale / বিক্রির তালিকায় যোগ করুন</>}
        </button>
      </form>
    </div>
  );
}
