'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SITE_DEFAULTS } from '@/lib/constants';

export interface SiteSettings {
  name: string;
  tagline: string;
  taglineBengali: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  heroTitle: string;
  heroBengali: string;
  heroSubtitle: string;
  announcementBanner: string;
  footerText: string;
  logoText: string;
  heroBgImage?: string;
  featuredOffer?: string;
  maintenanceMode?: boolean;
  allowNewRegistrations?: boolean;
}

interface SiteContextType {
  settings: SiteSettings;
  updateSettings: (data: Partial<SiteSettings>) => void;
  resetSettings: () => void;
}

const defaultSettings: SiteSettings = {
  ...SITE_DEFAULTS,
  logoText: 'BookDeal BD',
};

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export function SiteProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);

  useEffect(() => {
    const stored = localStorage.getItem('bookdeal_site_settings');
    if (stored) {
      try { setSettings({ ...defaultSettings, ...JSON.parse(stored) }); } catch { /* ignore */ }
    }
  }, []);

  const updateSettings = (data: Partial<SiteSettings>) => {
    const updated = { ...settings, ...data };
    setSettings(updated);
    localStorage.setItem('bookdeal_site_settings', JSON.stringify(updated));
    // Apply CSS vars
    if (data.primaryColor) document.documentElement.style.setProperty('--color-primary', data.primaryColor);
    if (data.secondaryColor) document.documentElement.style.setProperty('--color-secondary', data.secondaryColor);
    if (data.accentColor) document.documentElement.style.setProperty('--color-accent', data.accentColor);
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    localStorage.removeItem('bookdeal_site_settings');
  };

  return (
    <SiteContext.Provider value={{ settings, updateSettings, resetSettings }}>
      {children}
    </SiteContext.Provider>
  );
}

export const useSite = () => {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error('useSite must be used within SiteProvider');
  return ctx;
};
