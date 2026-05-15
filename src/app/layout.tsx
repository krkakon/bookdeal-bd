import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import { SiteProvider } from '@/context/SiteContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BookDeal BD — Buy & Sell Used Books in Bangladesh',
  description: 'Bangladesh\'s #1 used book marketplace for students. Buy and sell used textbooks, guides, and academic books at the best prices. Covering all classes from Nursery to Masters.',
  keywords: 'used books bangladesh, sell books bangladesh, buy textbooks, student books, SSC books, HSC books, NCTB books, Dhaka books',
  openGraph: {
    title: 'BookDeal BD — Buy Smart. Sell Easy. Study More.',
    description: 'Bangladesh\'s #1 used book marketplace for students.',
    type: 'website',
    locale: 'en_BD',
    url: 'https://bookdeal.com.bd',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Hind+Siliguri:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <SiteProvider>
              <div className="bg-mesh" />
              <div className="bg-mesh-accent" />
              {children}
            </SiteProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
