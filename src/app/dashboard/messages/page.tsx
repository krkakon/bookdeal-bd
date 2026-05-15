'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Send } from 'lucide-react';

const CONVERSATIONS = [
  { id: '1', name: 'Rahim Uddin', book: 'Physics 1st Paper', lastMsg: 'Is the book still available?', time: '2m', unread: 2 },
  { id: '2', name: 'Fatema Begum', book: 'Higher Mathematics', lastMsg: 'Can you ship to Chittagong?', time: '1h', unread: 0 },
  { id: '3', name: 'Karim Hossain', book: 'Bangla 1st Paper Guide', lastMsg: 'Deal confirmed!', time: '3h', unread: 0 },
];

export default function MessagesPage() {
  const [active, setActive] = useState<string | null>('1');
  const [msg, setMsg] = useState('');
  const [messages, setMessages] = useState([
    { from: 'other', text: 'Hi! Is the Physics book still available?', time: '2m' },
    { from: 'me', text: 'Yes, it is! In very good condition.', time: '1m' },
  ]);

  const send = () => {
    if (!msg.trim()) return;
    setMessages(prev => [...prev, { from: 'me', text: msg, time: 'Just now' }]);
    setMsg('');
  };

  return (
    <div>
      <h1 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: 24 }}>Messages / বার্তা</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 16, height: '70vh' }}>
        {/* Conversation List */}
        <div className="glass-card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--glass-border)', fontWeight: 700, fontSize: '0.875rem' }}>Conversations</div>
          <div style={{ overflow: 'auto', flex: 1 }}>
            {CONVERSATIONS.map(conv => (
              <button key={conv.id} onClick={() => setActive(conv.id)} style={{ width: '100%', padding: '14px 16px', background: active === conv.id ? 'rgba(14,165,233,0.1)' : 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', borderBottom: '1px solid var(--glass-border)', borderLeft: active === conv.id ? '2px solid var(--color-primary)' : '2px solid transparent' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '0.85rem', flexShrink: 0 }}>{conv.name[0]}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--color-text)' }}>{conv.name}</span>
                      <span style={{ fontSize: '0.7rem', color: 'var(--color-text-dim)' }}>{conv.time}</span>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-dim)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{conv.book}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{conv.lastMsg}</div>
                  </div>
                  {conv.unread > 0 && <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'var(--color-primary)', color: 'white', fontSize: '0.65rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{conv.unread}</div>}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        {active ? (
          <div className="glass-card" style={{ padding: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700 }}>R</div>
              <div>
                <div style={{ fontWeight: 700 }}>Rahim Uddin</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--color-success)' }}>● Online · Physics 1st Paper</div>
              </div>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
              {messages.map((m, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: m.from === 'me' ? 'flex-end' : 'flex-start' }}>
                  <div className={m.from === 'me' ? 'chat-bubble chat-bubble-sent' : 'chat-bubble chat-bubble-received'}>{m.text}</div>
                  <span style={{ fontSize: '0.65rem', color: 'var(--color-text-dim)', marginTop: 3 }}>{m.time}</span>
                </div>
              ))}
            </div>
            <div style={{ padding: '14px 20px', borderTop: '1px solid var(--glass-border)', display: 'flex', gap: 10 }}>
              <input className="input" placeholder="Type a message..." value={msg} onChange={e => setMsg(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} style={{ flex: 1 }} id="msg-input" />
              <button className="btn btn-primary" onClick={send} style={{ padding: '10px 16px' }}><Send size={16} /></button>
            </div>
          </div>
        ) : (
          <div className="glass-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-dim)' }}>
            <div style={{ textAlign: 'center' }}><MessageCircle size={40} style={{ marginBottom: 10 }} /><p>Select a conversation</p></div>
          </div>
        )}
      </div>
      <style jsx>{`@media (max-width: 600px) { div[style*="grid-template-columns: 280px 1fr"] { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}
