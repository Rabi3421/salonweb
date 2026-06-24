import type { Metadata } from 'next';
import { getPublicSiteData } from '@/lib/public-site-data';
import { SITE_URL } from '@/lib/env';

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  keywords?: string[];
};

export function getSiteUrl(): string {
  return SITE_URL.replace(/\/+$/, '');
}

export function absoluteUrl(path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${getSiteUrl()}${cleanPath === '/' ? '' : cleanPath}`;
}

export function buildCanonical(path: string): string {
  return absoluteUrl(path);
}

export function buildPageMetadata({
  title,
  description,
  path,
  image = '/assets/images/app_logo.png',
  keywords,
}: PageMetadataInput): Metadata {
  const data = getPublicSiteData();
  const canonical = buildCanonical(path);
  const imageUrl = absoluteUrl(image);

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical,
    },
    openGraph: {
      type: 'website',
      url: canonical,
      title,
      description,
      siteName: data.brand.fullName,
      locale: 'en_IN',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${data.brand.fullName} logo`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
  };
}
