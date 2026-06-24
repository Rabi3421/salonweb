import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyBottomCTA from '@/components/StickyBottomCTA';
import ServicesHero from './components/ServicesHero';
import ServiceCatalog from './components/ServiceCatalog';
import PackagesSection from './components/PackagesSection';
import BookingForm from './components/BookingForm';
import FAQSection from './components/FAQSection';

export const metadata: Metadata = {
  title: 'Services & Booking — RoseLuxe Luxury Salon Ahmedabad',
  description:
    'Explore RoseLuxe premium hair, skin, nail, bridal and spa services with transparent pricing. Request your appointment online in minutes.',
};

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main className="pb-16 md:pb-0">
        <ServicesHero />
        <ServiceCatalog />
        <PackagesSection />
        <BookingForm />
        <FAQSection />
      </main>
      <Footer />
      <StickyBottomCTA />
    </>
  );
}
