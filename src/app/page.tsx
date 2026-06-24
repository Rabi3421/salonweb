import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import StickyBottomCTA from '@/components/StickyBottomCTA';
import { getPublicSiteData } from '@/lib/public-site-data';
import { buildPageMetadata } from '@/lib/seo';
import { buildBeautySalonSchema, buildBreadcrumbSchema } from '@/lib/structured-data';
import HeroSection from './components/HeroSection';
import ServicesPreview from './components/ServicesPreview';
import WhyChooseUs from './components/WhyChooseUs';
import AboutSection from './components/AboutSection';
import GallerySection from './components/GallerySection';
import TestimonialsSection from './components/TestimonialsSection';
import CTASection from './components/CTASection';

export const metadata = buildPageMetadata({
  title: 'Rosé Luxe Salon | Premium Beauty Salon in Ahmedabad',
  description:
    'Experience premium salon services including hair styling, facial treatments, nail art, bridal makeup and beauty packages at Rosé Luxe Salon in Ahmedabad.',
  path: '/',
});

export default function HomePage() {
  const data = getPublicSiteData();

  return (
    <>
      <JsonLd data={buildBeautySalonSchema(data)} />
      <JsonLd data={buildBreadcrumbSchema([{ name: 'Home', path: '/' }])} />
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
