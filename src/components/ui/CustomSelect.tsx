'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface Option {
  value: string;
  label: string;
  bengali?: string;
}

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder: string;
  label?: string;
  required?: boolean;
}

export function CustomSelect({ value, onChange, options, placeholder, label, required }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find(o => o.value === value);

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {label && <label className="input-label">{label}{required && ' *'}</label>}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="input" 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          cursor: 'pointer',
          borderColor: isOpen ? 'var(--color-primary)' : 'rgba(255,255,255,0.12)',
          background: isOpen ? 'rgba(14, 165, 233, 0.08)' : 'rgba(255,255,255,0.06)',
          height: '48px', // Consistent height
        }}
      >
        <span style={{ color: value ? 'var(--color-text)' : 'var(--color-text-dim)', fontSize: '0.875rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {selectedOption ? (
            <>
              {selectedOption.label} {selectedOption.bengali && <span style={{ color: 'var(--color-text-dim)', marginLeft: 4 }}>— {selectedOption.bengali}</span>}
            </>
          ) : placeholder}
        </span>
        <ChevronDown size={16} style={{ transition: 'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', color: 'var(--color-text-dim)', flexShrink: 0 }} />
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <div style={{ position: 'fixed', inset: 0, zIndex: 1000 }} onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.15 }}
              style={{
                position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 8,
                background: 'rgba(15,23,42,0.95)', backdropFilter: 'blur(20px)',
                border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-lg)',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5)', zIndex: 1001,
                maxHeight: 260, overflowY: 'auto', padding: 6
              }}
            >
              {!required && (
                <div 
                  onClick={() => { onChange(''); setIsOpen(false); }}
                  style={{ 
                    padding: '10px 14px', borderRadius: 'var(--radius-sm)', cursor: 'pointer', 
                    color: !value ? 'var(--color-primary)' : 'var(--color-text-dim)',
                    background: !value ? 'rgba(14,165,233,0.1)' : 'transparent',
                    fontSize: '0.875rem', marginBottom: 2
                  }}
                >
                  {placeholder}
                </div>
              )}
              {options.map(opt => (
                <div 
                  key={opt.value}
                  onClick={() => { onChange(opt.value); setIsOpen(false); }}
                  style={{ 
                    padding: '10px 14px', borderRadius: 'var(--radius-sm)', cursor: 'pointer', 
                    color: value === opt.value ? 'var(--color-primary)' : 'var(--color-text)',
                    background: value === opt.value ? 'rgba(14,165,233,0.1)' : 'transparent',
                    fontSize: '0.875rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    marginBottom: 2
                  }}
                  onMouseEnter={e => { if (value !== opt.value) e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                  onMouseLeave={e => { if (value !== opt.value) e.currentTarget.style.background = 'transparent'; }}
                >
                  <span>{opt.label}</span>
                  {opt.bengali && <span style={{ fontSize: '0.75rem', opacity: 0.6, fontFamily: 'var(--font-bengali)' }}>{opt.bengali}</span>}
                </div>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
