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
import GalleryHero from './components/GalleryHero';
import GalleryMasonry from './components/GalleryMasonry';
import BeforeAfterSection from './components/BeforeAfterSection';
import InstagramCTA from './components/InstagramCTA';
import GalleryCTA from './components/GalleryCTA';

export async function generateMetadata(): Promise<Metadata> {
  const cmsPage = await fetchCmsPage('gallery');
  return buildPageMetadata({
    title: cmsPage?.seo?.metaTitle || 'Gallery | Beauty Transformations',
    description:
      cmsPage?.seo?.metaDescription ||
      'Explore salon interiors, bridal makeup, hair styling, nail art, facial care and beauty transformations.',
    path: '/gallery',
  });
}

export default async function GalleryPage() {
  const cmsPage = await fetchCmsPage('gallery');

  return (
    <>
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Gallery', path: '/gallery' },
        ])}
      />
      <Header />
      <CmsPageProvider page={cmsPage}>
        <main className="pb-16 md:pb-0">
          <GalleryHero />
          <GalleryMasonry />
          <BeforeAfterSection />
          <InstagramCTA />
          <GalleryCTA />
        </main>
      </CmsPageProvider>
      <Footer />
      <StickyBottomCTA />
    </>
  );
}
