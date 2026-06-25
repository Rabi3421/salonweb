import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import StickyBottomCTA from '@/components/StickyBottomCTA';
import { getPublicSiteDataAsync } from '@/lib/public-site-data';
import { buildPageMetadata } from '@/lib/seo';
import { buildBeautySalonSchema, buildBreadcrumbSchema } from '@/lib/structured-data';
import ReviewsHero from './components/ReviewsHero';
import RatingSummary from './components/RatingSummary';
import TestimonialGrid from './components/TestimonialGrid';
import ReviewsCTA from './components/ReviewsCTA';

export const metadata = buildPageMetadata({
  title: 'Client Reviews',
  description:
    'Read client reviews and testimonials for hair, skin, nails, makeup and bridal beauty services.',
  path: '/reviews',
});

export default async function ReviewsPage() {
  const data = await getPublicSiteDataAsync();

  return (
    <>
      <JsonLd data={buildBeautySalonSchema(data)} />
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Reviews', path: '/reviews' },
        ])}
      />
      <Header />
      <main className="pb-16 md:pb-0">
        <ReviewsHero />
        <RatingSummary />
        <TestimonialGrid />
        <ReviewsCTA />
      </main>
      <Footer />
      <StickyBottomCTA />
    </>
  );
}
