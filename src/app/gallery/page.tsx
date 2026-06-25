import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import StickyBottomCTA from '@/components/StickyBottomCTA';
import { buildPageMetadata } from '@/lib/seo';
import { buildBreadcrumbSchema } from '@/lib/structured-data';
import GalleryHero from './components/GalleryHero';
import GalleryMasonry from './components/GalleryMasonry';
import BeforeAfterSection from './components/BeforeAfterSection';
import InstagramCTA from './components/InstagramCTA';
import GalleryCTA from './components/GalleryCTA';

export const metadata = buildPageMetadata({
  title: 'Gallery | Beauty Transformations',
  description:
    'Explore salon interiors, bridal makeup, hair styling, nail art, facial care and beauty transformations.',
  path: '/gallery',
});

export default function GalleryPage() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Gallery', path: '/gallery' },
        ])}
      />
      <Header />
      <main className="pb-16 md:pb-0">
        <GalleryHero />
        <GalleryMasonry />
        <BeforeAfterSection />
        <InstagramCTA />
        <GalleryCTA />
      </main>
      <Footer />
      <StickyBottomCTA />
    </>
  );
}
