'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { auth, db } from '@/lib/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: 'buyer' | 'seller' | 'admin';
  isSeller: boolean;
  phone?: string;
  division?: string;
  address?: string;
  createdAt?: unknown;
  totalSales?: number;
  totalPurchases?: number;
  rating?: number;
  bio?: string;
}

interface AuthContextType {
  user: FirebaseUser | null;
  userProfile: UserProfile | null;
  loading: boolean;
  register: (email: string, password: string, name: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  enableSelling: () => Promise<void>;
  updateUserProfile: (data: Partial<UserProfile>) => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        try {
          const docRef = doc(db, 'users', firebaseUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserProfile(docSnap.data() as UserProfile);
          }
        } catch {
          // Firebase not configured - use local fallback
          const stored = localStorage.getItem(`user_${firebaseUser.uid}`);
          if (stored) setUserProfile(JSON.parse(stored));
        }
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const register = async (email: string, password: string, name: string) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(cred.user, { displayName: name });
    const profile: UserProfile = {
      uid: cred.user.uid,
      email,
      displayName: name,
      role: 'buyer',
      isSeller: false,
      totalSales: 0,
      totalPurchases: 0,
      rating: 0,
      createdAt: serverTimestamp(),
    };
    try {
      await setDoc(doc(db, 'users', cred.user.uid), profile);
    } catch {
      localStorage.setItem(`user_${cred.user.uid}`, JSON.stringify(profile));
    }
    setUserProfile(profile);
  };

  const login = async (email: string, password: string) => {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    // Check admin
    if (email === 'admin@bookdeal.com.bd') {
      const adminProfile: UserProfile = {
        uid: cred.user.uid, email, displayName: 'Admin', role: 'admin', isSeller: false,
      };
      setUserProfile(adminProfile);
      return;
    }
    try {
      const docSnap = await getDoc(doc(db, 'users', cred.user.uid));
      if (docSnap.exists()) setUserProfile(docSnap.data() as UserProfile);
    } catch {
      const stored = localStorage.getItem(`user_${cred.user.uid}`);
      if (stored) setUserProfile(JSON.parse(stored));
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUserProfile(null);
  };

  const enableSelling = async () => {
    if (!user || !userProfile) return;
    const updated = { ...userProfile, isSeller: true, role: 'seller' as const };
    try {
      await setDoc(doc(db, 'users', user.uid), updated, { merge: true });
    } catch {
      localStorage.setItem(`user_${user.uid}`, JSON.stringify(updated));
    }
    setUserProfile(updated);
  };

  const updateUserProfile = async (data: Partial<UserProfile>) => {
    if (!user || !userProfile) return;
    const updated = { ...userProfile, ...data };
    try {
      await setDoc(doc(db, 'users', user.uid), updated, { merge: true });
    } catch {
      localStorage.setItem(`user_${user.uid}`, JSON.stringify(updated));
    }
    setUserProfile(updated);
  };

  const isAdmin = userProfile?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, userProfile, loading, register, login, logout, enableSelling, updateUserProfile, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
