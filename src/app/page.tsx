import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import CategoriesSection from '@/components/home/CategoriesSection';
import FeaturedBooks from '@/components/home/FeaturedBooks';
import HowItWorks from '@/components/home/HowItWorks';
import Testimonials from '@/components/home/Testimonials';
import CtaBanner from '@/components/home/CtaBanner';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 0 }}>
        <HeroSection />
        <CategoriesSection />
        <FeaturedBooks />
        <HowItWorks />
        <Testimonials />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
