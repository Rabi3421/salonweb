'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyBottomCTA from '@/components/StickyBottomCTA';
import ServicesHero from './components/ServicesHero';
import ServiceCatalog from './components/ServiceCatalog';
import PackagesSection from './components/PackagesSection';
import BookingForm from './components/BookingForm';
import FAQSection from './components/FAQSection';

export default function ServicesClient() {
  const [selectedService, setSelectedService] = useState('');

  const handleBookService = (serviceName: string) => {
    setSelectedService(serviceName);
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Header />
      <main className="pb-16 md:pb-0">
        <ServicesHero />
        <ServiceCatalog onBookService={handleBookService} />
        <PackagesSection />
        <BookingForm prefilledService={selectedService} />
        <FAQSection />
      </main>
      <Footer />
      <StickyBottomCTA />
    </>
  );
}
