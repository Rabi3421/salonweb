import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import StickyBottomCTA from '@/components/StickyBottomCTA';
import { buildPageMetadata } from '@/lib/seo';
import { buildBreadcrumbSchema } from '@/lib/structured-data';
import PackagesHero from './components/PackagesHero';
import PackageGrid from './components/PackageGrid';
import PackageBenefits from './components/PackageBenefits';
import PackagesCTA from './components/PackagesCTA';

export const metadata = buildPageMetadata({
  title: 'Beauty Packages',
  description:
    'Explore curated salon packages for bridal glow, monthly grooming, party looks, hair care, nail care and complete beauty transformations.',
  path: '/packages',
});

export default function PackagesPage() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Packages', path: '/packages' },
        ])}
      />
      <Header />
      <main className="pb-16 md:pb-0">
        <PackagesHero />
        <PackageGrid />
        <PackageBenefits />
        <PackagesCTA />
      </main>
      <Footer />
      <StickyBottomCTA />
    </>
  );
}
