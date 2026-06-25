import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import StickyBottomCTA from '@/components/StickyBottomCTA';
import { CmsPageProvider } from '@/components/CmsPageProvider';
import { getPublicSiteDataAsync } from '@/lib/public-site-data';
import { fetchCmsPage } from '@/lib/cms-client';
import { buildPageMetadata } from '@/lib/seo';
import { buildBeautySalonSchema, buildBreadcrumbSchema } from '@/lib/structured-data';
import type { Metadata } from 'next';
import ContactHero from './components/ContactHero';
import ContactInfoCards from './components/ContactInfoCards';
import ContactForm from './components/ContactForm';
import LocationHours from './components/LocationHours';
import ContactCTA from './components/ContactCTA';

export async function generateMetadata(): Promise<Metadata> {
  const cmsPage = await fetchCmsPage('contact');
  return buildPageMetadata({
    title: cmsPage?.seo?.metaTitle || 'Contact The Salon',
    description:
      cmsPage?.seo?.metaDescription ||
      'Contact the salon by call, WhatsApp, email or visit us for beauty services and appointment enquiries.',
    path: '/contact',
  });
}

export default async function ContactPage() {
  const [data, cmsPage] = await Promise.all([
    getPublicSiteDataAsync(),
    fetchCmsPage('contact'),
  ]);

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
      <CmsPageProvider page={cmsPage}>
        <main className="pb-16 md:pb-0">
          <ContactHero />
          <ContactInfoCards />
          <ContactForm />
          <LocationHours />
          <ContactCTA />
        </main>
      </CmsPageProvider>
      <Footer />
      <StickyBottomCTA />
    </>
  );
}
