'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyBottomCTA from '@/components/StickyBottomCTA';
import BookingHero from './components/BookingHero';
import PopularServices from './components/PopularServices';
import AppointmentForm from './components/AppointmentForm';
import WhatHappensNext from './components/WhatHappensNext';
import BookingFAQ from './components/BookingFAQ';

export default function BookAppointmentClient() {
  const [selectedService, setSelectedService] = useState('');

  const handleSelectService = (name: string) => {
    setSelectedService(name);
    document.getElementById('appointment-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Header />
      <main className="pb-16 md:pb-0">
        <BookingHero />
        <PopularServices onSelectService={handleSelectService} />
        <AppointmentForm prefilledService={selectedService} />
        <WhatHappensNext />
        <BookingFAQ />
      </main>
      <Footer />
      <StickyBottomCTA />
    </>
  );
}
