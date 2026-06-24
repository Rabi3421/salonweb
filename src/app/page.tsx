import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyBottomCTA from '@/components/StickyBottomCTA';
import HeroSection from './components/HeroSection';
import ServicesPreview from './components/ServicesPreview';
import WhyChooseUs from './components/WhyChooseUs';
import AboutSection from './components/AboutSection';
import GallerySection from './components/GallerySection';
import TestimonialsSection from './components/TestimonialsSection';
import CTASection from './components/CTASection';

export const metadata: Metadata = {
  title: 'RoseLuxe — Premium Luxury Salon in Ahmedabad',
  description:
    'RoseLuxe offers premium hair, skin, nail and bridal salon services in Ahmedabad. Book your luxury beauty experience today with 6000+ happy clients.',
};

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="pb-16 md:pb-0">
        <HeroSection />
        <ServicesPreview />
        <WhyChooseUs />
        <AboutSection />
        <GallerySection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
      <StickyBottomCTA />
    </>
  );
}
