import type { Metadata, Viewport } from 'next';
import { Inter, Hind_Siliguri } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import { SiteProvider } from '@/context/SiteContext';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const hindSiliguri = Hind_Siliguri({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['bengali', 'latin'],
  display: 'swap',
  variable: '--font-hind',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

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
    <html lang="en" className={`${inter.variable} ${hindSiliguri.variable}`}>
      <body>
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
