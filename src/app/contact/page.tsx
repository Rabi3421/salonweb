import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import StickyBottomCTA from '@/components/StickyBottomCTA';
import { getPublicSiteData } from '@/lib/public-site-data';
import { buildPageMetadata } from '@/lib/seo';
import { buildBeautySalonSchema, buildBreadcrumbSchema } from '@/lib/structured-data';
import ContactHero from './components/ContactHero';
import ContactInfoCards from './components/ContactInfoCards';
import ContactForm from './components/ContactForm';
import LocationHours from './components/LocationHours';
import ContactCTA from './components/ContactCTA';

export const metadata = buildPageMetadata({
  title: 'Contact Rosé Luxe Salon',
  description:
    'Contact Rosé Luxe Salon by call, WhatsApp, email or visit us for premium beauty services and appointment enquiries.',
  path: '/contact',
});

export default function ContactPage() {
  const data = getPublicSiteData();

  return (
    <>
      <JsonLd data={buildBeautySalonSchema(data)} />
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' },
        ])}
      />
      <Header />
      <main className="pb-16 md:pb-0">
        <ContactHero />
        <ContactInfoCards />
        <ContactForm />
        <LocationHours />
        <ContactCTA />
      </main>
      <Footer />
      <StickyBottomCTA />
    </>
  );
}
