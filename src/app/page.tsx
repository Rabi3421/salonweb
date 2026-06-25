import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import StickyBottomCTA from '@/components/StickyBottomCTA';
import { getPublicSiteDataAsync } from '@/lib/public-site-data';
import { buildPageMetadata } from '@/lib/seo';
import { buildBeautySalonSchema, buildBreadcrumbSchema } from '@/lib/structured-data';
import type { Metadata } from 'next';
import HeroSection from './components/HeroSection';
import ServicesPreview from './components/ServicesPreview';
import WhyChooseUs from './components/WhyChooseUs';
import AboutSection from './components/AboutSection';
import GallerySection from './components/GallerySection';
import TestimonialsSection from './components/TestimonialsSection';
import CTASection from './components/CTASection';

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPublicSiteDataAsync();
  const location = data.brand.location || data.contact.city || 'your city';

  return buildPageMetadata({
    title: `${data.brand.fullName} | Premium Beauty Salon in ${location}`,
    description:
      data.brand.shortDescription ||
      `Experience salon services, beauty packages, and appointments at ${data.brand.fullName}.`,
    path: '/',
  });
}

export default async function HomePage() {
  const data = await getPublicSiteDataAsync();

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
