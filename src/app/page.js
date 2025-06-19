'use client';

import AboutLegalFirm from '@/components/organisms/About';
import LegalFeatures from '@/components/organisms/Features';
import Footer from '@/components/organisms/Footer';
import HeroSection from '@/components/organisms/Hero';
import Navbar from '@/components/organisms/Navbar';
import OurProcess from '@/components/organisms/Process';
import ProductGrid from '@/components/organisms/Products';
import InteractiveServices from '@/components/organisms/Services';
import Testimonials from '@/components/organisms/Testimonials';

export default function Home() {
  return (
    <main
      style={{
        backgroundColor: '#fff',
      }}
    >
      <Navbar />

      <HeroSection />
      <LegalFeatures />
      <AboutLegalFirm />
      <InteractiveServices />
      <ProductGrid />
      <OurProcess />
      <Testimonials />
      <Footer />
    </main>
  );
}
