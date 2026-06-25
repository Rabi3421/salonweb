import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import StickyBottomCTA from '@/components/StickyBottomCTA';
import { CmsPageProvider } from '@/components/CmsPageProvider';
import { fetchCmsPage } from '@/lib/cms-client';
import { buildPageMetadata } from '@/lib/seo';
import { buildBreadcrumbSchema } from '@/lib/structured-data';
import type { Metadata } from 'next';
import AboutHero from './components/AboutHero';
import StorySection from './components/StorySection';
import FounderMessage from './components/FounderMessage';
import HygienePromise from './components/HygienePromise';
import StatsSection from './components/StatsSection';
import TeamPreview from './components/TeamPreview';
import AboutCTA from './components/AboutCTA';

export async function generateMetadata(): Promise<Metadata> {
  const cmsPage = await fetchCmsPage('about');
  return buildPageMetadata({
    title: cmsPage?.seo?.metaTitle || 'About The Salon',
    description:
      cmsPage?.seo?.metaDescription ||
      'Learn about the salon, our story, expert stylists, hygiene promise, premium products and beauty experience.',
    path: '/about',
  });
}

export default async function AboutPage() {
  const cmsPage = await fetchCmsPage('about');

  return (
    <>
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ])}
      />
      <Header />
      <CmsPageProvider page={cmsPage}>
        <main className="pb-16 md:pb-0">
          <AboutHero />
          <StorySection />
          <FounderMessage />
          <HygienePromise />
          <StatsSection />
          <TeamPreview />
          <AboutCTA />
        </main>
      </CmsPageProvider>
      <Footer />
      <StickyBottomCTA />
    </>
  );
}
