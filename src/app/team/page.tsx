import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import StickyBottomCTA from '@/components/StickyBottomCTA';
import { buildPageMetadata } from '@/lib/seo';
import { buildBreadcrumbSchema } from '@/lib/structured-data';
import TeamHero from './components/TeamHero';
import TeamGrid from './components/TeamGrid';
import ExpertiseSection from './components/ExpertiseSection';
import TrainingPromise from './components/TrainingPromise';
import TeamCTA from './components/TeamCTA';

export const metadata = buildPageMetadata({
  title: 'Our Expert Team',
  description:
    'Meet the expert hair stylists, bridal makeup artists, nail artists and beauty specialists at Rosé Luxe Salon.',
  path: '/team',
});

export default function TeamPage() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Team', path: '/team' },
        ])}
      />
      <Header />
      <main className="pb-16 md:pb-0">
        <TeamHero />
        <TeamGrid />
        <ExpertiseSection />
        <TrainingPromise />
        <TeamCTA />
      </main>
      <Footer />
      <StickyBottomCTA />
    </>
  );
}
