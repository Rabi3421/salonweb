import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import StickyBottomCTA from '@/components/StickyBottomCTA';
import { buildPageMetadata } from '@/lib/seo';
import { buildBreadcrumbSchema } from '@/lib/structured-data';
import AboutHero from './components/AboutHero';
import StorySection from './components/StorySection';
import FounderMessage from './components/FounderMessage';
import HygienePromise from './components/HygienePromise';
import StatsSection from './components/StatsSection';
import TeamPreview from './components/TeamPreview';
import AboutCTA from './components/AboutCTA';

export const metadata = buildPageMetadata({
  title: 'About The Salon',
  description:
    'Learn about the salon, our story, expert stylists, hygiene promise, premium products and beauty experience.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ])}
      />
      <Header />
      <main className="pb-16 md:pb-0">
        <AboutHero />
        <StorySection />
        <FounderMessage />
        <HygienePromise />
        <StatsSection />
        <TeamPreview />
        <AboutCTA />
      </main>
      <Footer />
      <StickyBottomCTA />
    </>
  );
}
