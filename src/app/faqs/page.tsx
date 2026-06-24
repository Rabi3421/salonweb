import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import StickyBottomCTA from '@/components/StickyBottomCTA';
import { getPublicSiteData } from '@/lib/public-site-data';
import { buildPageMetadata } from '@/lib/seo';
import { buildBreadcrumbSchema, buildFAQSchema } from '@/lib/structured-data';
import FAQHero from './components/FAQHero';
import FAQAccordion from './components/FAQAccordion';
import FAQCTA from './components/FAQCTA';

export const metadata = buildPageMetadata({
  title: 'FAQs',
  description:
    'Find answers to common questions about salon appointments, services, bridal packages, hygiene, payments and rescheduling.',
  path: '/faqs',
});

export default function FAQsPage() {
  const data = getPublicSiteData();

  return (
    <>
      <JsonLd data={buildFAQSchema(data.faqs)} />
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'FAQs', path: '/faqs' },
        ])}
      />
      <Header />
      <main className="pb-16 md:pb-0">
        <FAQHero />
        <FAQAccordion />
        <FAQCTA />
      </main>
      <Footer />
      <StickyBottomCTA />
    </>
  );
}
